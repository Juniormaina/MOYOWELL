import { useRef, useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  ShieldOff,
  Fingerprint,
  ArrowDown,
  Clock,
  ShieldAlert,
  ArrowRight,
  Lock,
  Check,
  PhoneCall,
} from "lucide-react";
import { MediaImage } from "./MediaImage";
import { INSTRUMENTS, type InstrumentId, type InstrumentCategory } from "@/src/data/instruments";
import type { AppView } from "./LayoutShell";
import sanctuaryPalmImg from "@/src/assets/images/sanctuary_pottery_palm_1794762544492.webp";
import botanicalFernsImg from "@/src/assets/images/botanical_ferns_courtyard_1794762545318.webp";

interface AssessmentsHubViewProps {
  consentAccepted: boolean;
  onConsentChange: (accepted: boolean) => void;
  onStartInstrument: (id: InstrumentId) => void;
  inProgressByInstrument: Partial<Record<InstrumentId, number>>;
  onNavigate: (view: AppView) => void;
}

type FilterOption = "all" | InstrumentCategory;

export function AssessmentsHubView({
  consentAccepted,
  onConsentChange,
  onStartInstrument,
  inProgressByInstrument,
  onNavigate,
}: AssessmentsHubViewProps) {
  const [filter, setFilter] = useState<FilterOption>("all");
  const [consentAttention, setConsentAttention] = useState(false);

  const consentSectionRef = useRef<HTMLElement | null>(null);
  const instrumentsRef = useRef<HTMLElement | null>(null);

  const instrumentList = [INSTRUMENTS.phq9, INSTRUMENTS.gad7, INSTRUMENTS.who5];
  const visibleInstruments = instrumentList.filter(
    (inst) => filter === "all" || inst.category === filter
  );

  const handleProceedClick = () => {
    if (!consentAccepted) {
      setConsentAttention(true);
      return;
    }
    instrumentsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleBeginInstrument = (id: InstrumentId) => {
    if (!consentAccepted) {
      setConsentAttention(true);
      consentSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    onStartInstrument(id);
  };

  return (
    <div className="w-full py-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-12 space-y-10">
        {/* Page Framing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary block">
              Clinical Integrity · Validated Screening
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-on-surface tracking-tight">
              Assessment &amp; Navigation Portal
            </h1>
            <p className="text-base md:text-lg text-on-surface-variant">
              Grounded psychometric screening instruments translated into clear, dignified self-knowledge pathways.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 bg-surface-container-high px-4 py-2.5 rounded-xl text-on-surface shrink-0">
            <ShieldCheck className="w-5 h-5 text-secondary shrink-0" />
            <div className="text-left">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-secondary">
                Local Execution
              </span>
              <span className="text-sm font-semibold leading-tight">
                Zero Telemetry Mode
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Informed Consent & Screening Scope */}
        <section
          ref={consentSectionRef}
          className={`w-full bg-surface-container-lowest rounded-xl p-6 md:p-10 border transition-colors ${
            consentAttention && !consentAccepted
              ? "border-primary ring-2 ring-primary/20"
              : "border-on-surface/[0.06]"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* Left Column: Scope & Plain-Language Pillars */}
            <div className="lg:w-7/12 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Screening, Not Diagnosis · No Personal Tracking · Deterministic Logic
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-medium text-on-surface leading-tight">
                Informed Consent &amp; Screening Scope
              </h2>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-low">
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="text-[15px] font-semibold text-on-surface block">
                      What this measures
                    </span>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Validated psychological indicators of mood vitality, somatic tension, and cognitive worry patterns over the past 14 days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-low">
                  <ShieldOff className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="text-[15px] font-semibold text-on-surface block">
                      What this is NOT
                    </span>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      A clinical diagnosis, medical evaluation, psychiatric triage, or therapeutic prescription. MoyoWell scores serve solely as guided navigation references.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-low">
                  <Fingerprint className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="text-[15px] font-semibold text-on-surface block">
                      How session data is handled
                    </span>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Session input stays inside your browser&apos;s local storage. MoyoWell does not monetize, track, or harvest personal identifiers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Sanctuary & Consent Checkbox */}
            <div className="lg:w-5/12 flex flex-col justify-between bg-surface-container-low rounded-xl p-5 md:p-6">
              <div className="space-y-4">
                <div className="relative w-full h-44 rounded-lg overflow-hidden">
                  <MediaImage
                    src={sanctuaryPalmImg}
                    alt="Warm sunlit architectural interior with terracotta vessels, raw linen, and botanical palm shadows"
                    className="w-full h-full object-cover"
                    fallbackTitle="Sanctuary of Reflection"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/70 via-transparent to-transparent flex items-end p-4">
                    <p className="text-[11px] font-semibold text-surface uppercase tracking-widest">
                      Sanctuary of Sovereign Reflection
                    </p>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer select-none p-3 rounded-lg hover:bg-surface-container transition-colors">
                  <input
                    type="checkbox"
                    checked={consentAccepted}
                    onChange={(e) => {
                      onConsentChange(e.target.checked);
                      if (e.target.checked) setConsentAttention(false);
                    }}
                    className="mt-1 w-5 h-5 accent-secondary cursor-pointer rounded shrink-0"
                  />
                  <span className="text-[15px] text-on-surface leading-snug">
                    I understand that MoyoWell provides wellbeing navigation and does not replace medical consultation.
                  </span>
                </label>

                {consentAttention && !consentAccepted && (
                  <p className="text-xs font-semibold text-primary px-3">
                    Please acknowledge the screening scope above before starting an instrument.
                  </p>
                )}
              </div>

              <div className="pt-4 space-y-2">
                <button
                  type="button"
                  onClick={handleProceedClick}
                  disabled={!consentAccepted}
                  className={`w-full py-3 px-5 rounded-lg text-[15px] font-semibold transition-colors flex items-center justify-center gap-2 ${
                    consentAccepted
                      ? "bg-primary hover:bg-primary-container text-on-primary shadow-sm cursor-pointer"
                      : "bg-primary/35 text-on-primary cursor-not-allowed"
                  }`}
                >
                  <span>Proceed to Assessments</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("home")}
                  className="w-full bg-transparent hover:bg-surface-container text-secondary py-2.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Decline &amp; Return Home
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Standardized Instruments Hub */}
        <section ref={instrumentsRef} className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-on-surface">
                Standardized Instruments
              </h2>
              <p className="text-sm text-on-surface-variant">
                Validated clinical screening scales adapted for clear personal reflection.
              </p>
            </div>

            {/* Functional Filter Controls */}
            <div
              role="tablist"
              aria-label="Filter screening instruments"
              className="flex flex-wrap items-center gap-2"
            >
              {(
                [
                  { id: "all", label: "All Assessments" },
                  { id: "mood", label: "Mood" },
                  { id: "anxiety", label: "Anxiety" },
                  { id: "wellbeing", label: "General Wellbeing" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 ${
                    filter === tab.id
                      ? "bg-secondary text-on-secondary shadow-xs"
                      : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Instruments List */}
            <div className="lg:col-span-8 space-y-6">
              {visibleInstruments.map((inst, index) => {
                const savedCount = inProgressByInstrument[inst.id] ?? 0;
                const badgeStyles =
                  inst.id === "phq9"
                    ? "bg-primary-fixed text-on-primary-fixed"
                    : inst.id === "gad7"
                      ? "bg-secondary-fixed text-on-secondary-fixed"
                      : "bg-tertiary-fixed text-on-tertiary-fixed";
                const ctaStyles =
                  inst.id === "phq9"
                    ? "bg-primary hover:bg-primary-container text-on-primary"
                    : inst.id === "gad7"
                      ? "bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary"
                      : "bg-tertiary-container hover:bg-tertiary text-on-tertiary-container";
                const numberLabel = `0${index + 1}`;

                return (
                  <article
                    key={inst.id}
                    className="bg-surface-container-lowest rounded-xl p-6 md:p-7 border border-on-surface/[0.06] space-y-5"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-serif text-lg font-medium shrink-0 tabular-nums ${badgeStyles}`}
                        >
                          {numberLabel}
                        </span>
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-widest text-secondary block">
                            {inst.shortTitle}
                          </span>
                          <h3 className="font-serif text-xl md:text-2xl font-medium text-on-surface">
                            {inst.name}
                          </h3>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-on-surface-variant shrink-0 tabular-nums">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{inst.durationLabel}</span>
                      </div>
                    </div>

                    {/* Scope Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-surface-container-low">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-on-surface-variant block">
                          Scale Length
                        </span>
                        <span className="text-sm font-semibold text-on-surface tabular-nums">
                          {inst.itemCount} Items
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-on-surface-variant block">
                          Score Range
                        </span>
                        <span className="text-sm font-semibold text-on-surface tabular-nums">
                          {inst.scoreRangeLabel}
                        </span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-[11px] uppercase tracking-wider text-on-surface-variant block">
                          Lookback Period
                        </span>
                        <span className="text-sm font-semibold text-on-surface">
                          {inst.lookback}
                        </span>
                      </div>
                    </div>

                    <p className="text-[15px] text-on-surface-variant leading-relaxed">
                      {inst.description}
                    </p>

                    {inst.safetyNotice && (
                      <div className="flex items-center gap-2 p-2.5 px-3 rounded-lg bg-error-container/70 text-on-error-container text-xs font-medium">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>{inst.safetyNotice}</span>
                      </div>
                    )}

                    {inst.id === "gad7" && (
                      <div className="p-3 rounded-lg bg-surface-container-low flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="text-on-surface-variant font-medium">
                          Spectrum Calibration:
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 tabular-nums">
                          <span className="text-on-surface">Minimal (0–4)</span>
                          <span aria-hidden="true">→</span>
                          <span className="text-secondary font-medium">Mild (5–9)</span>
                          <span aria-hidden="true">→</span>
                          <span className="text-tertiary font-medium">Moderate (10–14)</span>
                          <span aria-hidden="true">→</span>
                          <span className="text-error font-semibold">Severe (15–21)</span>
                        </div>
                      </div>
                    )}

                    {inst.id === "who5" && (
                      <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between text-xs">
                        <span className="text-on-surface-variant font-medium">
                          Optimal Wellbeing Zone:
                        </span>
                        <span className="font-semibold text-secondary tabular-nums">
                          &gt; 50% Vitality Baseline
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => handleBeginInstrument(inst.id)}
                        className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-xs flex items-center justify-center gap-2 whitespace-nowrap ${ctaStyles}`}
                      >
                        <span>
                          {savedCount > 0
                            ? `Resume ${inst.code} (${savedCount}/${inst.itemCount})`
                            : `Begin ${inst.code} Assessment`}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <span className="text-xs text-on-surface-variant">
                        {inst.citation}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Reassurance Sidebar */}
            <aside className="lg:col-span-4 space-y-5">
              <div className="bg-surface-container-lowest rounded-xl p-5 border border-on-surface/[0.06] space-y-3">
                <div className="flex items-center gap-2 text-secondary text-xs font-semibold uppercase tracking-widest">
                  <Clock className="w-4 h-4" />
                  <span>Time Investment</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-on-surface">
                  Gentle, Unhurried Reflection
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Take this space at your natural pace. Completing screening items in an undisturbed setting helps reflect how the past two weeks genuinely felt.
                </p>
                <div className="space-y-2 pt-1 text-sm tabular-nums">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                    <span className="text-on-surface">Full Battery (All 3)</span>
                    <span className="font-semibold text-primary">~10–12 min</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                    <span className="text-on-surface">Targeted Focus (Single)</span>
                    <span className="font-semibold text-secondary">~3–5 min</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-high rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-widest">
                  <Lock className="w-4 h-4" />
                  <span>Privacy Assurance</span>
                </div>
                <h3 className="font-sans text-lg font-semibold text-on-surface">
                  Data Sovereignty
                </h3>
                <ul className="space-y-2 text-sm text-on-surface-variant">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span>No account required to complete any screening.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span>Answers saved only in local browser storage.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span>Zero behavioral trackers or third-party ad pixels.</span>
                  </li>
                </ul>

                <div className="w-full h-32 rounded-lg overflow-hidden">
                  <MediaImage
                    src={botanicalFernsImg}
                    alt="Lush green ferns along a warm terracotta and stone courtyard pathway"
                    className="w-full h-full object-cover"
                    fallbackTitle="Private Sanctuary"
                  />
                </div>
              </div>

              <div className="bg-error-container/80 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-error font-semibold text-sm">
                  <PhoneCall className="w-4 h-4" />
                  <span>Immediate Support</span>
                </div>
                <p className="text-sm text-on-error-container">
                  If you are feeling overwhelmed, crisis counselors are available 24/7 without judgment.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate("crisis")}
                  className="text-xs font-semibold uppercase tracking-wider text-error underline hover:text-on-error-container pt-1"
                >
                  Access 24/7 Support Network →
                </button>
              </div>
            </aside>
          </div>
        </section>

        {/* Bottom Footnote */}
        <div className="pt-4 text-center max-w-3xl mx-auto space-y-1">
          <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-widest">
            Evidence-Based Psychometrics · Peer-Reviewed Standards
          </p>
          <p className="text-xs text-outline">
            MoyoWell adheres to clinically accepted screening cut-offs. Scores should be discussed with a primary healthcare physician or licensed behavioral specialist for tailored clinical context.
          </p>
        </div>
      </div>
    </div>
  );
}
