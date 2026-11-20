import { useState } from "react";
import {
  ArrowRight,
  Compass,
  CheckCircle2,
  Lock,
  Sparkles,
  AlertTriangle,
  PhoneCall,
  Microscope,
  Route,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  SlidersHorizontal,
  BarChart3,
  MapPin,
  Siren,
  BedDouble,
  Wind,
  CalendarClock,
  BookOpen,
  Users,
  Stethoscope,
  FileText,
  Info,
} from "lucide-react";
import { MediaImage } from "./MediaImage";
import type { AppView } from "./LayoutShell";
import type { InstrumentId } from "@/src/data/instruments";
import teaJournalImg from "@/src/assets/images/tea_journal_still_life_1794762544818.webp";
import heroReflectionImg from "@/src/assets/images/hero_reflection.webp";

interface HomeViewProps {
  onNavigate: (view: AppView) => void;
  onStartInstrument: (id: InstrumentId) => void;
}

type SimulatorTier = "mild" | "moderate" | "elevated";

const SIMULATOR_STATES: Record<
  SimulatorTier,
  {
    title: string;
    scoreLabel: string;
    badgeClass: string;
    description: string;
    actions: Array<{ label: string; icon: typeof BedDouble; toneClass: string }>;
  }
> = {
  mild: {
    title: "Mild Adjustment Pattern",
    scoreLabel: "Score: 6/27 (Sub-threshold)",
    badgeClass: "bg-secondary-fixed text-on-secondary-fixed",
    description:
      "Sub-threshold depressive indicators observed. Recommended initial focus on circadian rhythm realignment, structured outdoor exposure, and 14-day self-monitoring check-ins.",
    actions: [
      { label: "Sleep Hygiene", icon: BedDouble, toneClass: "text-secondary" },
      { label: "Box Breathing", icon: Wind, toneClass: "text-secondary" },
      { label: "14-Day Check-in", icon: CalendarClock, toneClass: "text-secondary" },
    ],
  },
  moderate: {
    title: "Moderate Anxiety & Stress Symptoms",
    scoreLabel: "Score: 12/21 (Moderate)",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    description:
      "Symptoms may be interfering with daily concentration, task initiation, and physical tension. Structured cognitive reframing exercises and professional consultations are recommended.",
    actions: [
      { label: "Therapist Matching", icon: Stethoscope, toneClass: "text-tertiary" },
      { label: "CBT Worksheets", icon: BookOpen, toneClass: "text-tertiary" },
      { label: "Peer Circles", icon: Users, toneClass: "text-tertiary" },
    ],
  },
  elevated: {
    title: "Elevated Symptom Burden Detected",
    scoreLabel: "Score: 18/27 (Moderately Severe)",
    badgeClass: "bg-primary-fixed text-on-primary-fixed",
    description:
      "Notable disruption across sleep, energy, and daily functioning. Prioritizes warm clinical coordination, clinician summary export, and direct crisis hotline readiness.",
    actions: [
      { label: "Clinical Intake", icon: Stethoscope, toneClass: "text-primary" },
      { label: "Export Summary", icon: FileText, toneClass: "text-primary" },
      { label: "Crisis Helpline", icon: PhoneCall, toneClass: "text-error" },
    ],
  },
};

export function HomeView({ onNavigate, onStartInstrument }: HomeViewProps) {
  const [simTier, setSimTier] = useState<SimulatorTier>("mild");
  const activeSim = SIMULATOR_STATES[simTier];

  return (
    <div className="flex flex-col w-full">
      {/* Subtle Top Context Bar (Unboxed metadata) */}
      <section className="w-full bg-secondary-container/35 py-2.5 px-5 lg:px-12 border-b border-on-surface/[0.04]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-on-secondary-container">
          <div className="font-medium tracking-wide">
            MoyoWell Sanctuary · Private & Client-Side Sovereign
          </div>
          <div className="flex items-center gap-3 font-medium">
            <span>Zero Telemetry</span>
            <span aria-hidden="true">·</span>
            <span>Peer-Reviewed Clinical Scales</span>
          </div>
        </div>
      </section>

      {/* Hero Editorial Mosaic Section */}
      <section className="relative w-full overflow-hidden py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Editorial Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-secondary">
                Evidence-Based Mental Navigation
              </div>

              <div className="space-y-4">
                <h1 className="font-serif text-[clamp(2.35rem,4.3vw,3.5rem)] font-semibold text-on-surface tracking-tight leading-[1.08] max-w-2xl">
                  Your wellbeing <br />
                  <span className="italic font-normal text-primary">deserves more</span>{" "}
                  <br />
                  than a score.
                </h1>
                <p className="text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                  Understand how you are feeling with quiet dignity. Discover meaningful next steps, personalized care pathways, and navigate your emotional state with clinical rigor and human tenderness.
                </p>
              </div>

              {/* Primary + Secondary CTAs */}
              <div className="pt-1 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate("assessments")}
                  className="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container px-6 py-3.5 rounded-lg text-[15px] font-semibold transition-colors shadow-sm group"
                >
                  <span>Start a Wellbeing Check</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("assessments")}
                  className="inline-flex items-center gap-2 bg-surface-container-lowest text-secondary hover:bg-secondary-fixed/30 border border-on-surface/[0.08] px-6 py-3.5 rounded-lg text-[15px] font-semibold transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Instruments</span>
                </button>
              </div>

              {/* Clinical Standards Strip */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-on-surface-variant">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
                      PHQ-9 & GAD-7
                    </span>
                    <span className="text-xs">Gold-Standard Staging</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-tertiary">
                      Zero Tracking
                    </span>
                    <span className="text-xs">Strictly Local Data</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                      WHO-5 Index
                    </span>
                    <span className="text-xs">Psychological Vitality</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-surface-container-lowest p-3 rounded-xl shadow-md border border-on-surface/[0.06]">
                <div className="relative rounded-lg overflow-hidden aspect-[4/5] bg-surface-container">
                  <MediaImage
                    src={heroReflectionImg}
                    priority
                    alt="Woman in an olive linen shirt relaxing with a journal and tea in a sunlit room filled with botanical plants"
                    className="w-full h-full object-cover"
                    fallbackTitle="Restorative Reflection"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/65 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-surface/95 backdrop-blur-md px-4 py-2.5 rounded-lg flex items-center justify-between text-on-surface shadow-sm">
                    <span className="text-[11px] font-semibold uppercase tracking-wider">
                      Screening Standard
                    </span>
                    <span className="text-xs font-semibold text-secondary">
                      PHQ-9 · GAD-7 · WHO-5
                    </span>
                  </div>
                </div>

                {/* Floating Baseline Card */}
                <button
                  type="button"
                  onClick={() => onNavigate("dashboard")}
                  className="text-left absolute -bottom-5 -left-5 bg-surface-container-lowest p-4 rounded-xl shadow-lg border border-on-surface/[0.06] max-w-[230px] hidden sm:block hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
                      Vitality Baseline
                    </span>
                    <BarChart3 className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <div className="font-serif text-2xl font-medium text-on-surface tabular-nums">
                    68
                    <span className="font-sans text-xs text-on-surface-variant font-normal">
                      {" "}
                      / 100
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant pt-1">
                    View Amina&apos;s synthesis &amp; care pathway →
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Safety Crisis Interstitial Banner */}
      <section className="w-full bg-error-container/45 py-4 px-5 lg:px-12 border-y border-error/15">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-3">
            <div className="p-2 bg-error text-on-error rounded-lg shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[15px] font-semibold text-on-surface">
                In distress or feeling overwhelmed right now?
              </div>
              <p className="text-xs md:text-sm text-on-surface-variant">
                You do not have to wait for an assessment. Access verified, immediate, 24/7 crisis response counselors.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("crisis")}
            className="bg-error text-on-error hover:bg-on-error-container px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shrink-0 whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Access Crisis Support</span>
          </button>
        </div>
      </section>

      {/* Value Proposition Pillars */}
      <section className="w-full py-14 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-5 lg:px-12 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary block">
              Philosophy &amp; Guarantees
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-on-surface">
              Designed around patient dignity, clinical rigor, and total privacy.
            </h2>
            <p className="text-[15px] text-on-surface-variant">
              Screening is not a verdict; it is an instrument of orientation. We construct a safe sanctuary for honest self-reflection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-on-surface/[0.06] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                  <Microscope className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider block">
                    01. Standard
                  </span>
                  <h3 className="font-serif text-xl font-medium text-on-surface">
                    Rigorous &amp; Transparent
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Peer-reviewed screening instruments (PHQ-9, GAD-7, WHO-5) utilizing deterministic scoring rules. We show how responses align with published clinical cutoffs without black-box scoring.
                  </p>
                </div>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-secondary text-xs font-semibold uppercase tracking-wider">
                <span>Validated Question Sets</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-on-surface/[0.06] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                  <Route className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider block">
                    02. Standard
                  </span>
                  <h3 className="font-serif text-xl font-medium text-on-surface">
                    Compassionate Navigation
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Contextual next steps tailored to your state—connecting you smoothly to evidence-based self-care, sleep restoration regimens, or accredited counseling directories.
                  </p>
                </div>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-secondary text-xs font-semibold uppercase tracking-wider">
                <span>Human-Centric Outcomes</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl border border-on-surface/[0.06] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-tertiary uppercase tracking-wider block">
                    03. Standard
                  </span>
                  <h3 className="font-serif text-xl font-medium text-on-surface">
                    Uncompromising Privacy
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Zero third-party telemetry, no ad pixels, and strict local sandboxing. Your screening results stay in your browser and are never sold. If you opt in to an AI-personalized explanation, only your scores and answer labels (no name or contact details) are sent to generate it.
                  </p>
                </div>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-secondary text-xs font-semibold uppercase tracking-wider">
                <span>Guaranteed Anonymity</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screening Instruments Showcase */}
      <section className="w-full py-14">
        <div className="max-w-7xl mx-auto px-5 lg:px-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary block">
                Validated Clinical Battery
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-on-surface">
                Choose an instrument to begin your pathfinding.
              </h2>
              <p className="text-[15px] text-on-surface-variant">
                Each screening is paced gently. Take as much time as you require; answers autosave locally.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("assessments")}
              className="inline-flex items-center gap-1.5 text-secondary hover:text-primary font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
            >
              <span>View assessment portal &amp; consent</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PHQ-9 Card */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-on-surface/[0.06] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span className="font-semibold uppercase tracking-wider text-primary">
                    Depression Screen
                  </span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Clock className="w-3.5 h-3.5" /> ~4 min
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-medium text-on-surface">PHQ-9</h3>
                  <p className="text-sm font-semibold text-secondary mt-0.5">
                    Patient Health Questionnaire-9
                  </p>
                  <p className="text-sm text-on-surface-variant leading-relaxed mt-2">
                    Evaluates the presence and frequency of depressive symptoms over the prior two weeks, including mood, sleep patterns, energy levels, and safety screening.
                  </p>
                </div>
                <div className="p-3.5 bg-surface-container-low rounded-lg space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Total Items</span>
                    <span className="font-semibold text-on-surface tabular-nums">9 Questions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Score Spectrum</span>
                    <span className="font-semibold text-on-surface tabular-nums">0 – 27 Staging</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Clinical Standard</span>
                    <span className="font-semibold text-primary">Kroenke et al. (2001)</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onStartInstrument("phq9")}
                className="w-full inline-flex items-center justify-center gap-2 bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors"
              >
                <span>Begin PHQ-9</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* GAD-7 Card */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-on-surface/[0.06] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span className="font-semibold uppercase tracking-wider text-secondary">
                    Anxiety Screen
                  </span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Clock className="w-3.5 h-3.5" /> ~3 min
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-medium text-on-surface">GAD-7</h3>
                  <p className="text-sm font-semibold text-secondary mt-0.5">
                    Generalized Anxiety Disorder-7
                  </p>
                  <p className="text-sm text-on-surface-variant leading-relaxed mt-2">
                    Screens for generalized anxiety symptoms, persistent worry, emotional restlessness, irritability, and tension experienced in daily life.
                  </p>
                </div>
                <div className="p-3.5 bg-surface-container-low rounded-lg space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Total Items</span>
                    <span className="font-semibold text-on-surface tabular-nums">7 Questions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Score Spectrum</span>
                    <span className="font-semibold text-on-surface tabular-nums">0 – 21 Severity</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Clinical Standard</span>
                    <span className="font-semibold text-secondary">Spitzer et al. (2006)</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onStartInstrument("gad7")}
                className="w-full inline-flex items-center justify-center gap-2 bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-on-surface py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors"
              >
                <span>Begin GAD-7</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* WHO-5 Card */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-on-surface/[0.06] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span className="font-semibold uppercase tracking-wider text-tertiary">
                    Vitality Index
                  </span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Clock className="w-3.5 h-3.5" /> ~2 min
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-medium text-on-surface">WHO-5</h3>
                  <p className="text-sm font-semibold text-secondary mt-0.5">
                    Well-Being Index
                  </p>
                  <p className="text-sm text-on-surface-variant leading-relaxed mt-2">
                    A brief, positively phrased measure gauging positive mood, psychological resilience, energy vitality, and restorative rest over the past two weeks.
                  </p>
                </div>
                <div className="p-3.5 bg-surface-container-low rounded-lg space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Total Items</span>
                    <span className="font-semibold text-on-surface tabular-nums">5 Questions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Score Spectrum</span>
                    <span className="font-semibold text-on-surface tabular-nums">0 – 100% Index</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Global Standard</span>
                    <span className="font-semibold text-tertiary">WHO Psychiatric Research</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onStartInstrument("who5")}
                className="w-full inline-flex items-center justify-center gap-2 bg-surface-container-high hover:bg-tertiary hover:text-on-tertiary text-on-surface py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors"
              >
                <span>Begin WHO-5</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works + Interactive Severity Simulator */}
      <section className="w-full py-14 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-5 lg:px-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary block">
              The Architecture of Care
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-on-surface">
              How MoyoWell guides you from query to clarity.
            </h2>
            <p className="text-[15px] text-on-surface-variant">
              A deliberate four-phase navigation system designed to empower personal agency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: "01",
                title: "Take a 3-Minute Check",
                body: "Complete a validated assessment in a calm, distraction-free environment with no timers or pressure.",
                meta: "100% Confidential",
                icon: SlidersHorizontal,
                isAlert: false,
              },
              {
                num: "02",
                title: "Rule-Based Staging",
                body: "Responses are scored instantly against published clinical thresholds with clear item-level breakdowns.",
                meta: "Deterministic Logic",
                icon: BarChart3,
                isAlert: false,
              },
              {
                num: "03",
                title: "Tailored Navigation",
                body: "Receive three actionable paths: somatic groundings, peer community access, or clinical provider directories.",
                meta: "Actionable Routines",
                icon: MapPin,
                isAlert: false,
              },
              {
                num: "04",
                title: "Safety Safeguards",
                body: "If an elevated safety indicator is detected (such as PHQ-9 Item 9), direct crisis support is prioritized immediately.",
                meta: "Prioritized Safety",
                icon: Siren,
                isAlert: true,
              },
            ].map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-surface-container-lowest p-5 rounded-xl border border-on-surface/[0.06] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-3xl text-primary/35 tabular-nums">
                        {step.num}
                      </span>
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center ${
                          step.isAlert
                            ? "bg-error-container text-on-error-container"
                            : "bg-surface-container-high text-secondary"
                        }`}
                      >
                        <StepIcon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="font-sans text-lg font-semibold text-on-surface">
                      {step.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      step.isAlert ? "text-error" : "text-secondary"
                    }`}
                  >
                    {step.meta}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Interactive Severity Preview Simulator */}
          <div className="bg-surface-container-lowest rounded-xl p-6 md:p-8 border border-on-surface/[0.06]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-secondary block">
                  Interactive Demonstration
                </span>
                <h3 className="font-serif text-2xl font-medium text-on-surface">
                  How severity translates into proactive care
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Toggle sample score states below to see how MoyoWell transforms numeric evaluation into non-stigmatizing pathfinding.
                </p>
                <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Score tier preview">
                  {(
                    [
                      { id: "mild", label: "Mild (0–9)" },
                      { id: "moderate", label: "Moderate (10–14)" },
                      { id: "elevated", label: "Elevated (15+)" },
                    ] as const
                  ).map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => setSimTier(btn.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                        simTier === btn.id
                          ? "bg-secondary text-on-secondary"
                          : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 bg-surface-container rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant/30 pb-3">
                  <span className="text-base font-semibold text-on-surface">
                    {activeSim.title}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded tabular-nums ${activeSim.badgeClass}`}
                  >
                    {activeSim.scoreLabel}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
                    Recommended Pathway
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed">
                    {activeSim.description}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-1 text-center">
                  {activeSim.actions.map((action) => {
                    const ActionIcon = action.icon;
                    return (
                      <div
                        key={action.label}
                        className="bg-surface-container-lowest p-3 rounded-lg flex flex-col items-center justify-center gap-1.5"
                      >
                        <ActionIcon className={`w-4 h-4 ${action.toneClass}`} />
                        <span className="text-xs font-medium text-on-surface">
                          {action.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Narrative: The Sanctuary Philosophy */}
      <section className="w-full py-14">
        <div className="max-w-7xl mx-auto px-5 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="relative rounded-xl overflow-hidden shadow-lg aspect-square bg-surface-container">
                <MediaImage
                  src={teaJournalImg}
                  alt="Chamomile herbal tea in a hand-thrown stoneware mug beside a linen journal and eucalyptus sprigs"
                  className="w-full h-full object-cover"
                  fallbackTitle="Quiet Reflection"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-5 -right-5 bg-surface-container-lowest p-5 rounded-xl shadow-md border border-on-surface/[0.06] max-w-xs">
                <p className="font-serif text-lg italic text-primary leading-snug">
                  &ldquo;The first step toward healing is giving words to what has been wordless.&rdquo;
                </p>
                <span className="block text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant mt-2">
                  MoyoWell Clinical Advisory
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4 lg:pl-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary block">
                A Sovereign Alternative
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-on-surface">
                Moving beyond clinical sterility into warm, grounded healing.
              </h2>
              <p className="text-[15px] text-on-surface-variant leading-relaxed">
                Traditional online health assessments often look like hospital intake forms: sterile, intimidating, and emotionally barren. They reduce human distress to red alert tallies without honoring your lived experience.
              </p>
              <p className="text-[15px] text-on-surface-variant leading-relaxed">
                MoyoWell treats mental wellbeing as an organic landscape. Whether you are navigating temporary grief, enduring burnout, or exploring preventive self-care, our platform serves as a calm, private mirror—unhurried and completely your own.
              </p>

              <div className="pt-3 grid grid-cols-2 gap-6 border-t border-on-surface/[0.08]">
                <div>
                  <div className="font-serif text-3xl text-secondary tabular-nums">3 min</div>
                  <div className="text-xs text-on-surface-variant mt-1">
                    Average completion time per validated scale
                  </div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-primary tabular-nums">0 bytes</div>
                  <div className="text-xs text-on-surface-variant mt-1">
                    Personal identifiable data stored on external servers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clear Medical Disclaimer Callout */}
      <section className="w-full py-10 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-5 lg:px-12">
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-on-surface/[0.06] flex flex-col md:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-semibold text-on-surface uppercase tracking-wide">
                Essential Clinical Notice &amp; Scope of Service
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                <strong className="text-on-surface">
                  MoyoWell is a screening and navigation guide, not a medical diagnostic service.
                </strong>{" "}
                Scores and generated pathways are intended solely for educational, contemplative, and informational purposes. They do not constitute clinical psychiatric diagnoses, prescriptions, or therapeutic relationships. If you suspect you may be experiencing a clinical mental health condition, please consult a licensed psychiatrist, clinical psychologist, or physician.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Reflection */}
      <section className="w-full py-14 bg-surface">
        <div className="max-w-4xl mx-auto px-5 lg:px-12 text-center space-y-5">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary block">
            Begin Whenever You Are Ready
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-on-surface max-w-xl mx-auto">
            Give yourself three quiet minutes to check in.
          </h2>
          <p className="text-base text-on-surface-variant max-w-lg mx-auto">
            No account creation required. No email gatekeeping. Start directly with an anonymous, validated wellbeing instrument.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate("assessments")}
              className="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container px-7 py-3.5 rounded-lg text-[15px] font-semibold transition-colors shadow-sm"
            >
              <span>Start a Wellbeing Check</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("crisis")}
              className="inline-flex items-center gap-2 bg-surface-container-high text-on-surface hover:bg-surface-container-highest px-6 py-3.5 rounded-lg text-[15px] font-semibold transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-error" />
              <span>Emergency &amp; Crisis Support</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
