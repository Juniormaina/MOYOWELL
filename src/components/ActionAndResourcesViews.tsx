import { useEffect, useState } from "react";
import {
  CheckSquare,
  Square,
  Phone,
  MapPin,
  Search,
  Wind,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  X,
} from "lucide-react";
import { MediaImage } from "./MediaImage";
import {
  ACTION_PATHWAY_HABITS,
  CARE_PROVIDERS,
  RESOURCE_ARTICLES,
  type ResourceArticle,
} from "@/src/data/resources";

interface ActionPathwayViewProps {
  completedHabitIds: string[];
  onToggleHabit: (id: string) => void;
  reminderSet: boolean;
  onToggleReminder: () => void;
}

export function ActionPathwayView({
  completedHabitIds,
  onToggleHabit,
  reminderSet,
  onToggleReminder,
}: ActionPathwayViewProps) {
  const [query, setQuery] = useState("");
  const [modalityFilter, setModalityFilter] = useState("all");

  const filteredProviders = CARE_PROVIDERS.filter((provider) => {
    const matchesText =
      provider.name.toLowerCase().includes(query.toLowerCase()) ||
      provider.specialty.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
      provider.location.toLowerCase().includes(query.toLowerCase());
    const matchesFilter =
      modalityFilter === "all" ||
      provider.specialty.some((s) =>
        s.toLowerCase().includes(modalityFilter.toLowerCase())
      );
    return matchesText && matchesFilter;
  });

  const progressPct = Math.round(
    (completedHabitIds.length / ACTION_PATHWAY_HABITS.length) * 100
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary block">
            Personalized Care Plan
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-on-surface">
            Action Pathway &amp; Care Directory
          </h1>
          <p className="text-[15px] text-on-surface-variant max-w-2xl">
            Track daily restorative routines locally and browse clinical and community care options. Each listing shows whether it has been verified.
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleReminder}
          className={`px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 ${
            reminderSet
              ? "bg-secondary text-on-secondary"
              : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
          }`}
        >
          {reminderSet ? "14-Day Re-Screen Scheduled" : "Enable 14-Day Check-In Alert"}
        </button>
      </div>

      {/* Daily Grounding Checklist */}
      <section className="bg-surface-container-lowest rounded-xl p-6 border border-on-surface/[0.06] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl font-medium text-on-surface">
              Weekly Grounding &amp; Care Checklist
            </h2>
            <p className="text-sm text-on-surface-variant">
              Small, sustainable anchors saved in your local browser session.
            </p>
          </div>
          <span className="text-sm font-semibold text-secondary tabular-nums">
            {completedHabitIds.length} of {ACTION_PATHWAY_HABITS.length} completed ({progressPct}%)
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {ACTION_PATHWAY_HABITS.map((habit) => {
            const done = completedHabitIds.includes(habit.id);
            return (
              <button
                key={habit.id}
                type="button"
                onClick={() => onToggleHabit(habit.id)}
                className={`text-left p-4 rounded-xl border transition-colors flex items-start gap-3 ${
                  done
                    ? "bg-secondary-fixed/35 border-secondary/30"
                    : "bg-surface-container-low border-transparent hover:bg-surface-container"
                }`}
              >
                {done ? (
                  <CheckSquare className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-outline shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary block">
                    {habit.pillar}
                  </span>
                  <span
                    className={`text-[15px] font-semibold block ${
                      done ? "line-through text-on-surface-variant" : "text-on-surface"
                    }`}
                  >
                    {habit.title}
                  </span>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {habit.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Provider Directory */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-medium text-on-surface">
              Clinical &amp; Community Care Network
            </h2>
            <p className="text-sm text-on-surface-variant">
              Counseling centers, psychiatric outpatient teams, and community circles. Always confirm details by phone before visiting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search specialty or location..."
                className="pl-9 pr-3 py-2 rounded-lg bg-surface-container-lowest border border-on-surface/15 text-sm text-on-surface focus:outline-2 focus:outline-primary"
              />
            </div>

            {["all", "CBT", "Anxiety", "Peer Support"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setModalityFilter(tag)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  modalityFilter === tag
                    ? "bg-secondary text-on-secondary"
                    : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                }`}
              >
                {tag === "all" ? "All Care" : tag}
              </button>
            ))}
          </div>
        </div>

        {filteredProviders.length === 0 ? (
          <div className="bg-surface-container-low rounded-xl p-8 text-center space-y-2">
            <p className="text-sm font-semibold text-on-surface">
              No care centers match your current filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setModalityFilter("all");
              }}
              className="text-xs font-semibold text-primary underline"
            >
              Reset directory filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProviders.map((provider) => (
              <div
                key={provider.id}
                className="bg-surface-container-lowest rounded-xl p-6 border border-on-surface/[0.06] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary block">
                    {provider.credentials}
                  </span>
                  <span
                    className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      provider.verifiedOn
                        ? "bg-secondary-fixed/60 text-on-secondary-fixed"
                        : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {provider.verifiedOn
                      ? `Verified ${provider.verifiedOn}`
                      : "Sample listing · not yet verified"}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-on-surface">
                    {provider.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    {provider.specialty.join(" · ")}
                  </p>
                  <div className="pt-2 space-y-1 text-xs text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>
                        {provider.location} ({provider.modality})
                      </span>
                    </div>
                    <div className="text-on-surface font-medium">{provider.feeNote}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-surface-container-high flex items-center justify-between">
                  <span className="text-xs font-semibold text-on-surface tabular-nums">
                    {provider.contactLabel}
                  </span>
                  <a
                    href={
                      provider.contactLabel.includes("@")
                        ? `mailto:${provider.contactLabel}`
                        : `tel:${provider.contactLabel.replace(/\s+/g, "")}`
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Connect</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export function ResourcesView({
  onShowToast,
}: {
  onShowToast: (msg: string) => void;
}) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedArticle, setSelectedArticle] = useState<ResourceArticle | null>(
    null
  );

  // Interactive Box Breathing state
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathTick, setBreathTick] = useState(0);

  // Interactive CBT Thought Record state
  const [situation, setSituation] = useState("");
  const [automaticThought, setAutomaticThought] = useState("");
  const [balancedReframe, setBalancedReframe] = useState("");
  const [savedEntries, setSavedEntries] = useState<
    Array<{ id: string; situation: string; thought: string; reframe: string; date: string }>
  >(() => {
    try {
      const raw = localStorage.getItem("moyowell_thought_records");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  return (
    <ResourcesViewInner
      categoryFilter={categoryFilter}
      setCategoryFilter={setCategoryFilter}
      selectedArticle={selectedArticle}
      setSelectedArticle={setSelectedArticle}
      breathingActive={breathingActive}
      setBreathingActive={setBreathingActive}
      breathTick={breathTick}
      setBreathTick={setBreathTick}
      situation={situation}
      setSituation={setSituation}
      automaticThought={automaticThought}
      setAutomaticThought={setAutomaticThought}
      balancedReframe={balancedReframe}
      setBalancedReframe={setBalancedReframe}
      savedEntries={savedEntries}
      setSavedEntries={setSavedEntries}
      onShowToast={onShowToast}
    />
  );
}

function ResourcesViewInner({
  categoryFilter,
  setCategoryFilter,
  selectedArticle,
  setSelectedArticle,
  breathingActive,
  setBreathingActive,
  breathTick,
  setBreathTick,
  situation,
  setSituation,
  automaticThought,
  setAutomaticThought,
  balancedReframe,
  setBalancedReframe,
  savedEntries,
  setSavedEntries,
  onShowToast,
}: {
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  selectedArticle: ResourceArticle | null;
  setSelectedArticle: (art: ResourceArticle | null) => void;
  breathingActive: boolean;
  setBreathingActive: (v: boolean | ((p: boolean) => boolean)) => void;
  breathTick: number;
  setBreathTick: (v: number | ((p: number) => number)) => void;
  situation: string;
  setSituation: (v: string) => void;
  automaticThought: string;
  setAutomaticThought: (v: string) => void;
  balancedReframe: string;
  setBalancedReframe: (v: string) => void;
  savedEntries: Array<{
    id: string;
    situation: string;
    thought: string;
    reframe: string;
    date: string;
  }>;
  setSavedEntries: (
    entries: Array<{
      id: string;
      situation: string;
      thought: string;
      reframe: string;
      date: string;
    }>
  ) => void;
  onShowToast: (msg: string) => void;
}) {
  useEffect(() => {
    if (!breathingActive) return;
    const timer = window.setInterval(() => {
      setBreathTick((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [breathingActive, setBreathTick]);

  const cycleSecond = breathTick % 12;
  const phaseLabel =
    cycleSecond < 4 ? "Inhale gently" : cycleSecond < 8 ? "Hold softly" : "Exhale slowly";
  const phaseCountdown = 4 - (cycleSecond % 4);

  const visibleArticles = RESOURCE_ARTICLES.filter(
    (a) => categoryFilter === "all" || a.category === categoryFilter
  );

  const handleSaveThoughtRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim() || !automaticThought.trim() || !balancedReframe.trim()) {
      onShowToast("Please fill in all three reflection fields before saving.");
      return;
    }
    const next = [
      {
        id: `tr-${Date.now()}`,
        situation: situation.trim(),
        thought: automaticThought.trim(),
        reframe: balancedReframe.trim(),
        date: new Date().toLocaleDateString(),
      },
      ...savedEntries,
    ];
    setSavedEntries(next);
    try {
      localStorage.setItem("moyowell_thought_records", JSON.stringify(next));
    } catch {
      // Ignore storage quota issues
    }
    setSituation("");
    setAutomaticThought("");
    setBalancedReframe("");
    onShowToast("Thought reflection saved locally.");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary block">
          Psychoeducation &amp; Self-Care Tools
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-on-surface">
          Support Library &amp; Grounding Tools
        </h1>
        <p className="text-[15px] text-on-surface-variant max-w-2xl">
          Evidence-based reading, a live 4-4-4 somatic breathing pacer, and a private local thought-record worksheet.
        </p>
      </div>

      {/* Interactive Tools Row: Box Breathing + Thought Record */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Breathing Pacer */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-6 border border-on-surface/[0.06] flex flex-col justify-between space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-secondary text-xs font-semibold uppercase tracking-widest">
              <Wind className="w-4 h-4" />
              <span>Interactive Somatic Tool</span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-on-surface">
              4-4-4 Controlled Box Breathing
            </h2>
            <p className="text-sm text-on-surface-variant">
              Four seconds in, four seconds hold, four seconds out to settle sympathetic arousal.
            </p>
          </div>

          <div className="py-6 flex flex-col items-center justify-center bg-surface-container-low rounded-xl space-y-3">
            <div
              className={`w-28 h-28 rounded-full border-4 border-secondary flex flex-col items-center justify-center transition-transform duration-700 ${
                breathingActive && cycleSecond < 4
                  ? "scale-110 bg-secondary-fixed/50"
                  : breathingActive && cycleSecond < 8
                    ? "scale-110 bg-primary-fixed/40"
                    : "scale-100 bg-surface-container-lowest"
              }`}
            >
              <span className="font-serif text-3xl font-semibold text-on-surface tabular-nums">
                {breathingActive ? phaseCountdown : "4"}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
                {breathingActive ? phaseLabel : "Ready"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setBreathingActive((prev) => !prev)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-fixed-variant text-sm font-semibold transition-colors"
            >
              {breathingActive ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Pacer</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Start Breathing</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setBreathingActive(false);
                setBreathTick(0);
              }}
              className="p-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface"
              aria-label="Reset breathing timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive CBT Thought Record */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 border border-on-surface/[0.06] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary block">
                Local CBT Worksheet
              </span>
              <h2 className="font-serif text-2xl font-medium text-on-surface">
                Thought-Record Reflection
              </h2>
            </div>
            <span className="text-xs text-on-surface-variant tabular-nums">
              {savedEntries.length} saved locally
            </span>
          </div>

          <form onSubmit={handleSaveThoughtRecord} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                1. Situation (What happened?)
              </label>
              <input
                type="text"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="e.g., Received critical feedback on a draft report"
                className="w-full px-3.5 py-2 rounded-lg bg-surface-container-low border border-on-surface/10 text-sm text-on-surface focus:outline-2 focus:outline-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                2. Automatic Thought (What did my mind tell me?)
              </label>
              <input
                type="text"
                value={automaticThought}
                onChange={(e) => setAutomaticThought(e.target.value)}
                placeholder="e.g., I'm falling behind and nothing I do is good enough"
                className="w-full px-3.5 py-2 rounded-lg bg-surface-container-low border border-on-surface/10 text-sm text-on-surface focus:outline-2 focus:outline-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                3. Balanced Reframe (What is a fuller, kinder view?)
              </label>
              <textarea
                rows={2}
                value={balancedReframe}
                onChange={(e) => setBalancedReframe(e.target.value)}
                placeholder="e.g., Feedback helps refine one section; I am tired today, not incapable."
                className="w-full px-3.5 py-2 rounded-lg bg-surface-container-low border border-on-surface/10 text-sm text-on-surface focus:outline-2 focus:outline-primary"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container text-sm font-semibold transition-colors"
            >
              Save Reflection Locally
            </button>
          </form>

          {savedEntries.length > 0 && (
            <div className="pt-2 border-t border-surface-container-high space-y-2 max-h-36 overflow-y-auto">
              {savedEntries.slice(0, 3).map((entry) => (
                <div
                  key={entry.id}
                  className="p-3 rounded-lg bg-surface-container-low text-xs space-y-0.5"
                >
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="font-semibold text-on-surface">{entry.situation}</span>
                    <span className="tabular-nums">{entry.date}</span>
                  </div>
                  <p className="text-secondary font-medium">Reframe: {entry.reframe}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Curated Editorial Library */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-secondary" />
            <h2 className="font-serif text-2xl font-medium text-on-surface">
              Curated Reading &amp; Guides
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "all",
              "Mood & Sleep",
              "Anxiety & Somatic",
              "CBT & Reflection",
              "Clinical Prep",
            ].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  categoryFilter === cat
                    ? "bg-secondary text-on-secondary"
                    : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                }`}
              >
                {cat === "all" ? "All Guides" : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleArticles.map((article) => (
            <button
              key={article.id}
              type="button"
              onClick={() => setSelectedArticle(article)}
              className="text-left group bg-surface-container-lowest rounded-xl overflow-hidden border border-on-surface/[0.06] hover:border-primary/40 transition-colors flex flex-col"
            >
              <div className="h-40 w-full bg-surface-container overflow-hidden">
                <MediaImage
                  src={article.image}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fallbackTitle={article.title}
                />
              </div>
              <div className="p-4 space-y-1.5">
                <span className="text-[11px] font-semibold text-secondary">
                  {article.category} · {article.readTime}
                </span>
                <h3 className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-2">
                  {article.summary}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-surface-container-lowest rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                  {selectedArticle.category} · {selectedArticle.readTime}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-on-surface mt-1">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-lg hover:bg-surface-container"
                aria-label="Close guide"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <MediaImage
                src={selectedArticle.image}
                alt={selectedArticle.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 rounded-lg bg-secondary-fixed/40 text-on-secondary-fixed text-sm">
              <strong>Key Takeaway:</strong> {selectedArticle.keyTakeaway}
            </div>
            <div className="space-y-4">
              {selectedArticle.sections.map((sec) => (
                <div key={sec.heading} className="space-y-1">
                  <h4 className="font-serif text-lg font-medium text-on-surface">
                    {sec.heading}
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
