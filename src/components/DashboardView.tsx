import { useEffect, useState } from "react";
import {
  Download,
  Bookmark,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  Brain,
  ArrowRight,
  Route,
  Headphones,
  BedDouble,
  Calendar,
  CalendarCheck,
  Info,
  Sparkles,
  X,
} from "lucide-react";
import { MediaImage } from "./MediaImage";
import {
  INSTRUMENTS,
  buildDeterministicExplanation,
  type CompletedAssessment,
  type InstrumentId,
} from "@/src/data/instruments";
import { RESOURCE_ARTICLES, type ResourceArticle } from "@/src/data/resources";
import type { AppView } from "./LayoutShell";
import sanctuaryPalmImg from "@/src/assets/images/sanctuary_pottery_palm_1794762544492.webp";

interface DashboardViewProps {
  assessments: CompletedAssessment[];
  selectedAssessmentId: string;
  onSelectAssessment: (id: string) => void;
  onTogglePin: (id: string) => void;
  onUpdateAiParagraphs: (id: string, paragraphs: string[]) => void;
  reminderSet: boolean;
  onToggleReminder: () => void;
  onStartInstrument: (id: InstrumentId) => void;
  onNavigate: (view: AppView) => void;
  onShowToast: (message: string) => void;
}

export function DashboardView({
  assessments,
  selectedAssessmentId,
  onSelectAssessment,
  onTogglePin,
  onUpdateAiParagraphs,
  reminderSet,
  onToggleReminder,
  onStartInstrument,
  onNavigate,
  onShowToast,
}: DashboardViewProps) {
  const [aiLoading, setAiLoading] = useState(false);
  const [activeArticle, setActiveArticle] = useState<ResourceArticle | null>(null);
  const [showSleepProtocolModal, setShowSleepProtocolModal] = useState(false);

  const current =
    assessments.find((a) => a.id === selectedAssessmentId) ?? assessments[0];

  useEffect(() => {
    setAiLoading(false);
  }, [current?.id]);

  if (!current) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <h1 className="font-serif text-3xl text-on-surface">
          No assessments completed yet
        </h1>
        <p className="text-on-surface-variant">
          Start a confidential screening check to view your calibrated synthesis and care pathway.
        </p>
        <button
          type="button"
          onClick={() => onNavigate("assessments")}
          className="px-6 py-3 rounded-lg bg-primary text-on-primary font-semibold text-sm"
        >
          Go to Assessments
        </button>
      </div>
    );
  }

  const def = INSTRUMENTS[current.instrumentId];
  const deterministicParagraphs = buildDeterministicExplanation(
    current.instrumentId,
    current.answers,
    current.score,
    current.band
  );
  const displayedParagraphs =
    current.aiParagraphs && current.aiParagraphs.length > 0
      ? current.aiParagraphs
      : deterministicParagraphs;

  const percentPos = Math.max(
    4,
    Math.min(96, Math.round((current.score / current.maxScore) * 100))
  );

  const handleGenerateAiSynthesis = async () => {
    if (aiLoading) return;
    setAiLoading(true);
    try {
      const itemHighlights = def.questions
        .map((q, idx) => {
          const scoreVal = current.answers[idx] ?? 0;
          const opt = def.options.find((o) => o.value === scoreVal);
          return {
            label: q.cluster,
            score: scoreVal,
            answerLabel: opt?.label ?? String(scoreVal),
          };
        })
        .filter((item) => item.score > 0);

      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instrumentId: current.instrumentId,
          instrumentName: def.name,
          score: current.score,
          maxScore: current.maxScore,
          tierLabel: current.band.label,
          safetyTriggered: current.safetyTriggered,
          itemHighlights,
        }),
      });

      const data = (await response.json()) as {
        paragraphs?: string[];
        error?: string;
      };

      if (response.ok && Array.isArray(data.paragraphs) && data.paragraphs.length > 0) {
        onUpdateAiParagraphs(current.id, data.paragraphs);
        onShowToast("Refined synthesis generated from your deterministic scores.");
      } else {
        onShowToast(
          data.error ?? "Using deterministic clinical explanation for this session."
        );
      }
    } catch {
      onShowToast("Using deterministic clinical explanation.");
    } finally {
      setAiLoading(false);
    }
  };

  // Sub-domain calculations
  const subMetrics = (() => {
    if (current.instrumentId === "phq9") {
      const somatic =
        (current.answers[2] ?? 0) +
        (current.answers[3] ?? 0) +
        (current.answers[4] ?? 0);
      const cognitive =
        (current.answers[0] ?? 0) +
        (current.answers[1] ?? 0) +
        (current.answers[5] ?? 0) +
        (current.answers[6] ?? 0);
      const q9 = current.answers[8] ?? 0;
      return [
        { label: "Somatic", value: `${somatic}`, max: "/9", note: "Sleep & Fatigue" },
        { label: "Cognitive", value: `${cognitive}`, max: "/12", note: "Focus & Mood" },
        {
          label: "Safety Q9",
          value: `${q9}`,
          max: "/3",
          note: q9 === 0 ? "Clear / Neg" : "Attention Needed",
        },
      ];
    }
    if (current.instrumentId === "gad7") {
      const worry = (current.answers[1] ?? 0) + (current.answers[2] ?? 0);
      const somatic = (current.answers[3] ?? 0) + (current.answers[4] ?? 0);
      const affect =
        (current.answers[0] ?? 0) +
        (current.answers[5] ?? 0) +
        (current.answers[6] ?? 0);
      return [
        { label: "Worry", value: `${worry}`, max: "/6", note: "Thought Loops" },
        { label: "Somatic", value: `${somatic}`, max: "/6", note: "Restlessness" },
        { label: "Arousal", value: `${affect}`, max: "/9", note: "On Edge" },
      ];
    }
    const affect = (current.answers[0] ?? 0) + (current.answers[1] ?? 0);
    const vigor = (current.answers[2] ?? 0) + (current.answers[3] ?? 0);
    const interest = current.answers[4] ?? 0;
    return [
      { label: "Calm Mood", value: `${affect}`, max: "/10", note: "Spirits & Ease" },
      { label: "Vitality", value: `${vigor}`, max: "/10", note: "Energy & Rest" },
      { label: "Interest", value: `${interest}`, max: "/5", note: "Engagement" },
    ];
  })();

  const complementaryId: InstrumentId =
    current.instrumentId === "gad7" ? "phq9" : "gad7";
  const complementaryDef = INSTRUMENTS[complementaryId];

  const handlePrint = () => {
    onShowToast("Opening print-ready clinical reflection sheet...");
    setTimeout(() => window.print(), 200);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Assessment History Switcher (if multiple completed) */}
      {assessments.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 no-print">
          <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant mr-1">
            Session Records:
          </span>
          {assessments.map((item) => {
            const itemDef = INSTRUMENTS[item.instrumentId];
            const isSelected = item.id === current.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectAssessment(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors tabular-nums ${
                  isSelected
                    ? "bg-secondary text-on-secondary"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                {itemDef.code} ({item.score}
                {item.instrumentId === "who5" ? "%" : `/${item.maxScore}`}) · {item.completedAt}
              </button>
            );
          })}
        </div>
      )}

      {/* Top Editorial Header & Action Utilities */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-2">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant">
            <span className="font-semibold text-secondary uppercase tracking-wider">
              Deterministic Clinical Evaluation
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">Ref: {current.refCode}</span>
            <span aria-hidden="true">·</span>
            <span>Completed {current.completedAt}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-on-surface tracking-tight">
            Your Wellbeing{" "}
            <span className="italic font-normal text-primary">Synthesis</span>
          </h1>
          <p className="text-[15px] text-on-surface-variant">
            Validated instrument:{" "}
            <span className="font-semibold text-on-surface">{def.name}</span>.
            Synthesized with sovereign privacy standards for personal health navigation.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap no-print">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors text-sm font-semibold whitespace-nowrap"
          >
            <Download className="w-4 h-4 text-secondary" />
            <span>Download / Print PDF</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onTogglePin(current.id);
              onShowToast(
                current.pinned
                  ? "Removed from pinned overview."
                  : "Report pinned to your MoyoWell overview."
              );
            }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors text-sm font-semibold whitespace-nowrap ${
              current.pinned
                ? "bg-primary-fixed text-on-primary-fixed"
                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
            }`}
          >
            <Bookmark
              className="w-4 h-4 text-primary"
              fill={current.pinned ? "currentColor" : "none"}
            />
            <span>{current.pinned ? "Pinned to Dashboard" : "Pin to Dashboard"}</span>
          </button>
        </div>
      </div>

      {/* Hero Score & Calibrated Spectrum Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Primary Score Tile */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-6 border border-on-surface/[0.06] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-widest text-secondary">
                {current.instrumentId === "who5"
                  ? "Subjective Vitality Index"
                  : "Cumulative Severity Score"}
              </span>
              <span className="text-on-surface-variant">{def.lookback}</span>
            </div>

            <div className="flex items-baseline gap-2.5 tabular-nums">
              <span className="font-serif text-5xl md:text-6xl font-semibold text-primary leading-none">
                {current.score}
              </span>
              <span className="font-serif text-2xl text-outline">
                {current.instrumentId === "who5" ? "%" : `/ ${current.maxScore}`}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary-fixed/45 text-on-primary-fixed-variant text-sm font-semibold">
                <span>{current.band.label}</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed pt-1">
                Screening indicator only. A provisional measure over the past 14 days, not an autonomous diagnostic determination.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-surface-container-high grid grid-cols-3 gap-2.5">
            {subMetrics.map((m) => (
              <div key={m.label} className="bg-surface-container-low p-3 rounded-lg">
                <span className="block text-[11px] uppercase tracking-wider text-on-surface-variant">
                  {m.label}
                </span>
                <span className="font-serif text-xl font-medium text-on-surface tabular-nums">
                  {m.value}
                  <span className="font-sans text-xs text-outline">{m.max}</span>
                </span>
                <span className="block text-[11px] font-medium text-secondary truncate">
                  {m.note}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Calibrated Spectrum Visualizer */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 border border-on-surface/[0.06] flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl md:text-2xl font-medium text-on-surface">
                Calibrated Severity Spectrum
              </h2>
              <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                Clinical Cutoffs
              </span>
            </div>
            <p className="text-xs md:text-sm text-on-surface-variant">
              Standardized psychometric bands ({def.citation}). The marker indicates your current placement.
            </p>
          </div>

          {/* Spectrum Visual */}
          <div className="py-3 space-y-3">
            <div className="relative w-full h-8">
              <div
                className="absolute -translate-x-1/2 flex flex-col items-center transition-all duration-500"
                style={{ left: `${percentPos}%` }}
              >
                <span className="px-2.5 py-0.5 rounded bg-primary text-on-primary text-[11px] font-semibold shadow-xs whitespace-nowrap tabular-nums">
                  Current: {current.score}
                  {current.instrumentId === "who5" ? "%" : ""}
                </span>
                <span className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-primary" />
              </div>
            </div>

            <div
              className="grid gap-1.5 h-3.5 rounded-full p-0.5 bg-surface-container"
              style={{
                gridTemplateColumns: `repeat(${def.bands.length}, minmax(0, 1fr))`,
              }}
            >
              {def.bands.map((b, i) => {
                const isActive = b.id === current.band.id;
                const roundClass =
                  i === 0
                    ? "rounded-l-full"
                    : i === def.bands.length - 1
                      ? "rounded-r-full"
                      : "rounded-xs";
                return (
                  <div
                    key={b.id}
                    title={`${b.rangeLabel}: ${b.label}`}
                    className={`h-full ${roundClass} transition-all ${
                      isActive
                        ? "bg-primary ring-2 ring-primary/35"
                        : i === 0
                          ? "bg-secondary-fixed opacity-75"
                          : i === 1
                            ? "bg-secondary-container opacity-80"
                            : "bg-primary-fixed opacity-65"
                    }`}
                  />
                );
              })}
            </div>

            <div
              className="grid gap-1.5 text-center pt-1 text-[11px] tabular-nums"
              style={{
                gridTemplateColumns: `repeat(${def.bands.length}, minmax(0, 1fr))`,
              }}
            >
              {def.bands.map((b) => {
                const isActive = b.id === current.band.id;
                return (
                  <div
                    key={b.id}
                    className={
                      isActive ? "text-primary font-semibold" : "text-on-surface-variant"
                    }
                  >
                    <span className="block">{b.rangeLabel}</span>
                    <span className={isActive ? "underline underline-offset-4" : ""}>
                      {b.label.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Safety Assurance Bar */}
          {current.safetyTriggered ? (
            <div className="bg-error-container rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-on-error-container block">
                    Safety Safeguard Activated (Item 9 Affirmative)
                  </span>
                  <span className="text-xs text-on-error-container">
                    Direct crisis resources are available immediately without judgment.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("crisis")}
                className="px-3.5 py-2 rounded-lg bg-error text-on-error text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0"
              >
                Open Immediate Support
              </button>
            </div>
          ) : (
            <div className="bg-secondary/10 rounded-lg p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-on-surface block">
                    {current.instrumentId === "phq9"
                      ? "Question 9 (Self-Harm Protocol) Screened Negative"
                      : "Deterministic Screening Guardrail Active"}
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    {current.instrumentId === "phq9"
                      ? "Score: 0 / 3 (Not at all). Standard preventive navigation protocol active."
                      : "No acute safety flag detected. Standard preventive navigation protocol active."}
                  </span>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-secondary shrink-0">
                Status: Clear
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Editorial Synthesis & Explainability Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 border border-on-surface/[0.06] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Transparent Synthesis
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-on-surface-variant">
                  Rules Decide · AI Explains
                </span>
                {!current.safetyTriggered && (
                  <button
                    type="button"
                    onClick={handleGenerateAiSynthesis}
                    disabled={aiLoading}
                    className="no-print inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-on-surface text-xs font-semibold transition-colors disabled:opacity-60"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {aiLoading
                        ? "Synthesizing..."
                        : current.aiParagraphs
                          ? "Refresh Explanation"
                          : "Personalize Explanation"}
                    </span>
                  </button>
                )}
              </div>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-on-surface">
              Understanding Your 14-Day Trajectory
            </h2>

            <div className="space-y-3 text-[15px] text-on-surface-variant leading-relaxed">
              {displayedParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Collapsible Item Breakdown */}
          <div className="pt-4 border-t border-surface-container-high">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold text-secondary hover:text-on-surface transition-colors">
                <span>View Detailed Item Response Breakdown ({def.itemCount} items)</span>
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
              </summary>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {def.questions.map((q, idx) => {
                  const ans = current.answers[idx] ?? 0;
                  const opt = def.options.find((o) => o.value === ans);
                  const isElevated =
                    current.instrumentId === "who5" ? ans <= 2 : ans >= 2;
                  return (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-lg bg-surface-container-low space-y-1"
                    >
                      <div className="flex justify-between items-center text-[11px] font-semibold">
                        <span className="uppercase tracking-wider text-on-surface">
                          Item 0{q.number} · {q.cluster}
                        </span>
                        <span
                          className={`tabular-nums ${
                            isElevated ? "text-primary" : "text-secondary"
                          }`}
                        >
                          {opt?.label ?? ""} ({ans})
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {q.prompt}
                      </p>
                    </div>
                  );
                })}
              </div>
            </details>
          </div>
        </div>

        {/* Right Side-Panel */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="relative rounded-xl overflow-hidden min-h-[240px] flex-1 bg-surface-container">
            <MediaImage
              src={sanctuaryPalmImg}
              alt="Sunlit terracotta vessels and linen sanctuary"
              className="w-full h-full object-cover"
              fallbackTitle="Sanctuary Perspective"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/35 to-transparent flex flex-col justify-end p-5">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-secondary-fixed">
                Sanctuary Perspective
              </span>
              <p className="font-serif text-xl italic leading-snug mt-1 text-surface">
                &ldquo;Gentleness with oneself is the foundation of genuine recovery.&rdquo;
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-5 border border-on-surface/[0.06] space-y-3 no-print">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-tertiary" />
              <span className="text-sm font-semibold text-on-surface">
                Complementary Assessment
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Mood shifts and nervous system tension often travel together. Pair your current profile with the {complementaryDef.code} check.
            </p>
            <button
              type="button"
              onClick={() => onStartInstrument(complementaryId)}
              className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-colors text-on-surface text-sm font-semibold"
            >
              <span>Take {complementaryDef.code} Check</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Navigation Pathway */}
      <div className="bg-surface-container-lowest rounded-xl p-6 border border-on-surface/[0.06] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-secondary text-xs font-semibold uppercase tracking-widest">
              <Route className="w-4 h-4" />
              <span>Prescriptive Action Protocol</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-on-surface">
              Recommended Navigation Pathway
            </h2>
          </div>
          <span className="text-xs font-semibold text-secondary">
            {current.band.careTier}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1 */}
          <div className="rounded-xl bg-surface-container-low p-5 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-sm font-semibold tabular-nums">
                  1
                </span>
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                  Clinical Care
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-on-surface">
                Consult a Licensed Counselor or Psychologist
              </h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Explore structured modalities like CBT or ACT to identify automatic thought loops and safely restore emotional bandwidth.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("action-plan")}
              className="no-print w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors text-sm font-semibold"
            >
              <Headphones className="w-4 h-4" />
              <span>Find Network Providers</span>
            </button>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-xl bg-surface-container-low p-5 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-sm font-semibold tabular-nums">
                  2
                </span>
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                  Daily Grounding
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-on-surface">
                Structured Self-Care &amp; Somatic Reset
              </h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Anchor wake times, reduce evening blue light 90 minutes before sleep, and integrate 20 minutes of outdoor daylight movement.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSleepProtocolModal(true)}
              className="no-print w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-surface-container-highest hover:bg-surface-variant text-on-surface transition-colors text-sm font-semibold"
            >
              <BedDouble className="w-4 h-4" />
              <span>View Sleep Protocol</span>
            </button>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-xl bg-surface-container-low p-5 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center text-sm font-semibold tabular-nums">
                  3
                </span>
                <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                  Trajectory Check
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-on-surface">
                Schedule Follow-Up Screening (14 Days)
              </h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Symptoms shift over two-week windows. Re-evaluating in 14 days clarifies whether load is easing or needs clinical escalation.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onToggleReminder();
                onShowToast(
                  reminderSet
                    ? "14-day follow-up reminder cleared."
                    : "14-day check-in scheduled in your local portal."
                );
              }}
              className={`no-print w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg transition-colors text-sm font-semibold ${
                reminderSet
                  ? "bg-secondary text-on-secondary"
                  : "bg-surface-container-highest hover:bg-surface-variant text-on-surface"
              }`}
            >
              {reminderSet ? (
                <CalendarCheck className="w-4 h-4" />
              ) : (
                <Calendar className="w-4 h-4" />
              )}
              <span>
                {reminderSet
                  ? "Alert Scheduled (Day 14)"
                  : "Set 14-Day Check-In Alert"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Curated Editorial Resources */}
      <div className="space-y-4 no-print">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary block">
              Curated Reading
            </span>
            <h3 className="font-serif text-2xl font-medium text-on-surface">
              Library for Mood &amp; Restorative Routine
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("resources")}
            className="text-sm font-semibold text-secondary hover:text-primary transition-colors inline-flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RESOURCE_ARTICLES.map((article) => (
            <button
              key={article.id}
              type="button"
              onClick={() => setActiveArticle(article)}
              className="text-left group bg-surface-container-lowest rounded-xl overflow-hidden border border-on-surface/[0.06] hover:border-primary/40 transition-colors flex flex-col"
            >
              <div className="relative h-36 w-full bg-surface-container overflow-hidden">
                <MediaImage
                  src={article.image}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fallbackTitle={article.title}
                />
              </div>
              <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-medium text-secondary">
                    {article.formatLabel}
                  </span>
                  <h4 className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors mt-0.5 line-clamp-1">
                    {article.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">
                    {article.summary}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Clinical Boundary Notice */}
      <div className="bg-surface-container-low rounded-xl p-5 text-on-surface-variant text-xs leading-relaxed">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-outline shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-on-surface">
              Clinical Boundary &amp; Navigational Disclaimer
            </p>
            <p>
              This summary report is generated deterministically from self-reported inputs on a validated psychometric instrument. MoyoWell does not provide clinical diagnoses or emergency medical treatment through automated software. Share this summary with a qualified physician or psychologist during consultation.
            </p>
          </div>
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-xs no-print"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-surface-container-lowest rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                  {activeArticle.category} · {activeArticle.readTime}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-on-surface mt-1">
                  {activeArticle.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full h-48 rounded-lg overflow-hidden">
              <MediaImage
                src={activeArticle.image}
                alt={activeArticle.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 rounded-lg bg-secondary-fixed/40 text-on-secondary-fixed text-sm">
              <strong>Key Takeaway:</strong> {activeArticle.keyTakeaway}
            </div>

            <div className="space-y-4">
              {activeArticle.sections.map((sec) => (
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

      {/* Sleep Protocol Quick Modal */}
      {showSleepProtocolModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-xs no-print"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-6 md:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-medium text-on-surface">
                Circadian Sleep &amp; Somatic Reset
              </h3>
              <button
                type="button"
                onClick={() => setShowSleepProtocolModal(false)}
                className="p-1.5 rounded-lg hover:bg-surface-container"
                aria-label="Close sleep protocol"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li className="p-3 rounded-lg bg-surface-container-low">
                <strong className="text-on-surface block">Morning (Within 45 mins)</strong>
                Step outside for 15 minutes of natural daylight and hydrate before caffeine.
              </li>
              <li className="p-3 rounded-lg bg-surface-container-low">
                <strong className="text-on-surface block">Midday</strong>
                Take a 20-minute brisk walk or gentle stretch to discharge somatic tension.
              </li>
              <li className="p-3 rounded-lg bg-surface-container-low">
                <strong className="text-on-surface block">Evening (90 mins before sleep)</strong>
                Switch to warm ambient lighting, pause news/email feeds, and try 4-4-4 box breathing.
              </li>
            </ul>
            <button
              type="button"
              onClick={() => {
                setShowSleepProtocolModal(false);
                onNavigate("action-plan");
              }}
              className="w-full py-2.5 rounded-lg bg-secondary text-on-secondary text-sm font-semibold"
            >
              Track in Action Pathway
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
