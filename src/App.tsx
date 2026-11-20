import { lazy, Suspense, useEffect, useState, useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import { PublicLayout, PortalLayout, type AppView } from "./components/LayoutShell";
import { HomeView } from "./components/HomeView";
import { LoginView } from "./components/LoginView";
import { PageLoader, RouteProgressBar } from "./components/PageLoader";

// Heavier screens are code-split so the first load stays small and slow
// connections get a loading state instead of a frozen page.
const AssessmentsHubView = lazy(() =>
  import("./components/AssessmentsHubView").then((m) => ({ default: m.AssessmentsHubView }))
);
const QuestionnaireView = lazy(() =>
  import("./components/QuestionnaireView").then((m) => ({ default: m.QuestionnaireView }))
);
const DashboardView = lazy(() =>
  import("./components/DashboardView").then((m) => ({ default: m.DashboardView }))
);
const ActionPathwayView = lazy(() =>
  import("./components/ActionAndResourcesViews").then((m) => ({ default: m.ActionPathwayView }))
);
const ResourcesView = lazy(() =>
  import("./components/ActionAndResourcesViews").then((m) => ({ default: m.ResourcesView }))
);
const CrisisView = lazy(() =>
  import("./components/CrisisView").then((m) => ({ default: m.CrisisView }))
);
import {
  INSTRUMENTS,
  INITIAL_DEMO_ASSESSMENTS,
  scoreAssessment,
  type CompletedAssessment,
  type InstrumentId,
} from "./data/instruments";

type DraftMap = Partial<Record<InstrumentId, Array<number | null>>>;

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [view, setView] = useState<AppView>("home");
  const [isNavigating, startNavigation] = useTransition();
  const [previousView, setPreviousView] = useState<AppView>("home");

  const [consentAccepted, setConsentAccepted] = useState<boolean>(() =>
    readStorage("moyowell_consent", false)
  );
  const [activeInstrument, setActiveInstrument] = useState<InstrumentId>("phq9");
  const [drafts, setDrafts] = useState<DraftMap>(() =>
    readStorage("moyowell_drafts", {})
  );
  const [assessments, setAssessments] = useState<CompletedAssessment[]>(() =>
    readStorage("moyowell_assessments", INITIAL_DEMO_ASSESSMENTS)
  );
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>(
    () => assessments[0]?.id ?? INITIAL_DEMO_ASSESSMENTS[0].id
  );
  const [reminderSet, setReminderSet] = useState<boolean>(() =>
    readStorage("moyowell_reminder_14d", false)
  );
  const [completedHabitIds, setCompletedHabitIds] = useState<string[]>(() =>
    readStorage("moyowell_habits", ["sleep-window"])
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("moyowell_consent", JSON.stringify(consentAccepted));
    } catch {
      // Ignore storage error
    }
  }, [consentAccepted]);

  useEffect(() => {
    try {
      localStorage.setItem("moyowell_drafts", JSON.stringify(drafts));
    } catch {
      // Ignore storage error
    }
  }, [drafts]);

  useEffect(() => {
    try {
      localStorage.setItem("moyowell_assessments", JSON.stringify(assessments));
    } catch {
      // Ignore storage error
    }
  }, [assessments]);

  useEffect(() => {
    try {
      localStorage.setItem("moyowell_reminder_14d", JSON.stringify(reminderSet));
    } catch {
      // Ignore storage error
    }
  }, [reminderSet]);

  useEffect(() => {
    try {
      localStorage.setItem("moyowell_habits", JSON.stringify(completedHabitIds));
    } catch {
      // Ignore storage error
    }
  }, [completedHabitIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const t = window.setTimeout(() => setToastMessage(null), 3400);
    return () => window.clearTimeout(t);
  }, [toastMessage]);

  const navigate = (nextView: AppView) => {
    if (nextView !== view) {
      setPreviousView(view);
      // Transition keeps the current page visible (with a progress bar) until
      // the next page's code has loaded.
      startNavigation(() => setView(nextView));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStartInstrument = (id: InstrumentId) => {
    if (!consentAccepted) {
      setActiveInstrument(id);
      navigate("assessments");
      showToast("Please review and accept the screening scope to begin.");
      return;
    }

    setActiveInstrument(id);
    setDrafts((prev) => {
      if (prev[id] && prev[id]!.length === INSTRUMENTS[id].itemCount) {
        return prev;
      }
      return {
        ...prev,
        [id]: Array(INSTRUMENTS[id].itemCount).fill(null),
      };
    });
    navigate("screening");
  };

  const handleSelectAnswer = (questionIndex: number, value: number) => {
    setDrafts((prev) => {
      const len = INSTRUMENTS[activeInstrument].itemCount;
      const existing = prev[activeInstrument] ?? Array(len).fill(null);
      const nextArr = [...existing];
      nextArr[questionIndex] = value;
      return {
        ...prev,
        [activeInstrument]: nextArr,
      };
    });
  };

  const handleCompleteAssessment = () => {
    const def = INSTRUMENTS[activeInstrument];
    const currentDraft = drafts[activeInstrument] ?? Array(def.itemCount).fill(0);
    const finalizedAnswers = currentDraft.map((v) => (v === null ? 0 : v));
    const result = scoreAssessment(activeInstrument, finalizedAnswers);

    const newRecord: CompletedAssessment = {
      id: `mw-${activeInstrument}-${Date.now()}`,
      refCode: `MW-LOC-${Math.floor(1000 + Math.random() * 9000)}`,
      instrumentId: activeInstrument,
      completedAt: "Just now",
      answers: finalizedAnswers,
      score: result.score,
      maxScore: def.maxScore,
      band: result.band,
      safetyTriggered: result.safetyTriggered,
      pinned: true,
    };

    setAssessments((prev) => [newRecord, ...prev]);
    setSelectedAssessmentId(newRecord.id);
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[activeInstrument];
      return next;
    });
    navigate("dashboard");
    showToast(`${def.code} synthesis ready.`);
  };

  const handleTogglePin = (id: string) => {
    setAssessments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a))
    );
  };

  const handleUpdateAiParagraphs = (id: string, paragraphs: string[]) => {
    setAssessments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, aiParagraphs: paragraphs } : a))
    );
  };

  const handleToggleHabit = (habitId: string) => {
    setCompletedHabitIds((prev) =>
      prev.includes(habitId)
        ? prev.filter((id) => id !== habitId)
        : [...prev, habitId]
    );
  };

  const inProgressByInstrument: Partial<Record<InstrumentId, number>> = {
    phq9: drafts.phq9?.filter((v) => v !== null).length ?? 0,
    gad7: drafts.gad7?.filter((v) => v !== null).length ?? 0,
    who5: drafts.who5?.filter((v) => v !== null).length ?? 0,
  };

  const activeAnswers =
    drafts[activeInstrument] ??
    Array(INSTRUMENTS[activeInstrument].itemCount).fill(null);

  const renderContent = () => {
    if (view === "login") {
      return (
        <PublicLayout currentView={view} onNavigate={navigate}>
          <LoginView onNavigate={navigate} />
        </PublicLayout>
      );
    }

    if (view === "crisis") {
      return (
        <CrisisView
          onGoBack={() =>
            navigate(previousView === "crisis" ? "home" : previousView)
          }
          onGoHome={() => navigate("home")}
        />
      );
    }

    if (view === "dashboard" || view === "action-plan" || view === "resources") {
      return (
        <PortalLayout currentView={view} onNavigate={navigate}>
          {view === "dashboard" && (
            <DashboardView
              assessments={assessments}
              selectedAssessmentId={selectedAssessmentId}
              onSelectAssessment={setSelectedAssessmentId}
              onTogglePin={handleTogglePin}
              onUpdateAiParagraphs={handleUpdateAiParagraphs}
              reminderSet={reminderSet}
              onToggleReminder={() => setReminderSet((r) => !r)}
              onStartInstrument={handleStartInstrument}
              onNavigate={navigate}
              onShowToast={showToast}
            />
          )}
          {view === "action-plan" && (
            <ActionPathwayView
              completedHabitIds={completedHabitIds}
              onToggleHabit={handleToggleHabit}
              reminderSet={reminderSet}
              onToggleReminder={() => setReminderSet((r) => !r)}
            />
          )}
          {view === "resources" && <ResourcesView onShowToast={showToast} />}
        </PortalLayout>
      );
    }

    return (
      <PublicLayout currentView={view} onNavigate={navigate}>
        {view === "home" && (
          <HomeView
            onNavigate={navigate}
            onStartInstrument={handleStartInstrument}
          />
        )}
        {view === "assessments" && (
          <AssessmentsHubView
            consentAccepted={consentAccepted}
            onConsentChange={setConsentAccepted}
            onStartInstrument={handleStartInstrument}
            inProgressByInstrument={inProgressByInstrument}
            onNavigate={navigate}
          />
        )}
        {view === "screening" && (
          <QuestionnaireView
            instrumentId={activeInstrument}
            answers={activeAnswers}
            onSelectAnswer={handleSelectAnswer}
            onSaveAndExit={() => {
              navigate("assessments");
              showToast("Progress saved locally. Resume anytime.");
            }}
            onComplete={handleCompleteAssessment}
            onNavigate={navigate}
          />
        )}
      </PublicLayout>
    );
  };

  return (
    <>
      <RouteProgressBar active={isNavigating} />
      <Suspense fallback={<PageLoader />}>{renderContent()}</Suspense>

      {/* Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 text-sm font-medium no-print"
        >
          <CheckCircle2 className="w-4 h-4 text-secondary-fixed shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
