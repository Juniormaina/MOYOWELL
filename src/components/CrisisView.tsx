import { useEffect, useState } from "react";
import {
  ShieldCheck,
  PauseCircle,
  Heart,
  PhoneCall,
  Stethoscope,
  Brain,
  Wind,
  Users,
  MessageSquare,
  Building2,
  AlertCircle,
  Play,
  Pause,
  Check,
  Leaf,
} from "lucide-react";
import { MediaImage } from "./MediaImage";
import { CRISIS_HOTLINES, GROUNDING_STEPS } from "@/src/data/resources";
import botanicalFernsImg from "@/src/assets/images/botanical_ferns_courtyard_1794762545318.webp";

interface CrisisViewProps {
  onGoBack: () => void;
  onGoHome: () => void;
}

export function CrisisView({ onGoBack, onGoHome }: CrisisViewProps) {
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathTick, setBreathTick] = useState(0);

  useEffect(() => {
    if (!breathingActive) return;
    const id = window.setInterval(() => {
      setBreathTick((t) => t + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [breathingActive]);

  const cycleSecond = breathTick % 12;
  const breathPhase =
    cycleSecond < 4 ? "Inhale (4s)" : cycleSecond < 8 ? "Hold (4s)" : "Exhale (4s)";
  const breathCount = 4 - (cycleSecond % 4);

  const toggleGroundingStep = (count: number) => {
    setCheckedSteps((prev) =>
      prev.includes(count) ? prev.filter((c) => c !== count) : [...prev, count]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Status & Reassurance Top Bar */}
      <section className="w-full bg-surface-container-low py-3 px-5 lg:px-12 border-b border-on-surface/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold uppercase tracking-wider text-primary">
            Priority Protocol Activated
          </span>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
            <span>Free · Confidential · Human-to-Human Support</span>
          </div>
        </div>
      </section>

      {/* Editorial Sanctuary Statement */}
      <section className="w-full py-10 md:py-12 px-5 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary">
            <Leaf className="w-4 h-4" />
            <span>Crisis &amp; Safety Pathway</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-on-surface tracking-tight leading-[1.1]">
            You are not alone.
            <br />
            <span className="italic font-normal text-secondary">
              Immediate support is here for you.
            </span>
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            If you are feeling overwhelmed, having thoughts of harming yourself, or in acute distress, please connect with someone who can support you right now. Direct human care is available without judgment.
          </p>

          <div className="w-full p-4 md:p-5 rounded-xl bg-surface-container flex items-start gap-4 border border-on-surface/[0.06]">
            <div className="p-2 rounded-lg bg-surface-container-lowest text-primary shrink-0">
              <PauseCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                Digital Assessment Paused
              </p>
              <p className="text-xs md:text-sm text-on-surface-variant mt-0.5 leading-relaxed">
                Automated explanations and diagnostic scoring have been set aside to prioritize your direct human connection, physical safety, and grounded presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Hotlines Grid */}
      <section className="w-full pb-12 px-5 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-primary block">
                Immediate Assistance
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-on-surface mt-0.5">
                Verified Hotlines &amp; Direct Response
              </h2>
            </div>
            <p className="text-xs md:text-sm text-on-surface-variant">
              Operating 24/7 across Kenya and regional gateways
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CRISIS_HOTLINES.map((line) => {
              const Icon =
                line.badgeTone === "secondary"
                  ? Heart
                  : line.badgeTone === "error"
                    ? Stethoscope
                    : Brain;
              const badgeClass =
                line.badgeTone === "secondary"
                  ? "bg-secondary text-on-secondary"
                  : line.badgeTone === "error"
                    ? "bg-error-container text-on-error-container"
                    : "bg-tertiary-fixed text-on-tertiary-fixed";
              const iconColor =
                line.badgeTone === "secondary"
                  ? "text-secondary"
                  : line.badgeTone === "error"
                    ? "text-error"
                    : "text-tertiary";
              const btnClass =
                line.ctaTone === "primary"
                  ? "bg-primary hover:bg-primary-container text-on-primary"
                  : "bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary";

              return (
                <div
                  key={line.id}
                  className="bg-surface-container-lowest rounded-xl border border-on-surface/[0.06] shadow-sm flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold ${badgeClass}`}
                      >
                        {line.badge}
                      </span>
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-on-surface">
                      {line.name}
                    </h3>
                    <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                      {line.description}
                    </p>
                  </div>

                  <div className="p-6 bg-surface-container-low/70 border-t border-on-surface/[0.05] space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] text-on-surface-variant">
                        {line.availabilityLabel}
                      </span>
                      <span className="text-base font-semibold text-on-surface tabular-nums">
                        {line.phoneDisplay}
                      </span>
                    </div>
                    <a
                      href={line.telHref}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold tracking-wide transition-colors ${btnClass}`}
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>{line.ctaLabel}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Grounding Sanctuary & Breathing Pacer */}
      <section className="w-full bg-surface-container py-12 px-5 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* 5-4-3-2-1 Method */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 md:p-8 rounded-xl border border-on-surface/[0.06] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif text-2xl font-medium text-on-surface">
                3-Minute Grounding Technique
              </h3>
              <span className="text-[11px] font-semibold uppercase tracking-wider bg-secondary-fixed text-on-secondary-fixed px-2.5 py-1 rounded">
                5-4-3-2-1 Method
              </span>
            </div>

            <p className="text-sm text-on-surface-variant">
              Acute distress pulls attention inward. Take slow breaths while tapping each physical sensation step-by-step:
            </p>

            <div className="space-y-2.5">
              {GROUNDING_STEPS.map((step) => {
                const isDone = checkedSteps.includes(step.count);
                const badgeBg =
                  step.accent === "primary"
                    ? "bg-primary text-on-primary"
                    : step.accent === "secondary"
                      ? "bg-secondary text-on-secondary"
                      : "bg-tertiary text-on-tertiary";
                return (
                  <button
                    key={step.count}
                    type="button"
                    onClick={() => toggleGroundingStep(step.count)}
                    className={`w-full text-left flex items-center p-3.5 rounded-lg transition-colors ${
                      isDone
                        ? "bg-secondary-fixed/70"
                        : "bg-surface-container-low hover:bg-surface-variant/60"
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-serif text-base mr-3.5 shrink-0 tabular-nums ${badgeBg}`}
                    >
                      {isDone ? <Check className="w-4 h-4" /> : step.count}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-on-surface">
                        {step.title}
                      </p>
                      <p className="text-xs text-on-surface-variant">{step.hint}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
              <span className="tabular-nums">
                {checkedSteps.length} of 5 sensory anchors completed
              </span>
              <button
                type="button"
                onClick={() => setCheckedSteps([])}
                className="text-primary font-semibold hover:underline"
              >
                Reset Focus
              </button>
            </div>
          </div>

          {/* Sanctuary Photo & Controlled Box Breathing */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="relative rounded-xl overflow-hidden shadow-md h-72">
              <MediaImage
                src={botanicalFernsImg}
                alt="Serene botanical courtyard with lush ferns and warm terracotta tiles"
                className="w-full h-full object-cover"
                fallbackTitle="Sanctuary of Presence"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/35 to-transparent flex flex-col justify-end p-5 text-inverse-on-surface">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary-fixed">
                  Sanctuary of Presence
                </span>
                <p className="font-serif text-xl mt-1">
                  &ldquo;This moment will pass. Breathe with the earth beneath you.&rdquo;
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-xl border border-on-surface/[0.06] flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary-fixed/50 flex flex-col items-center justify-center shrink-0">
                {breathingActive ? (
                  <span className="font-serif text-xl font-semibold text-secondary tabular-nums">
                    {breathCount}
                  </span>
                ) : (
                  <Wind className="w-5 h-5 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-on-surface">
                  {breathingActive ? breathPhase : "Controlled Box Breathing"}
                </p>
                <p className="text-xs text-on-surface-variant">
                  Inhale 4s · Hold 4s · Exhale 4s
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBreathingActive((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-secondary text-on-secondary text-xs font-semibold shrink-0"
              >
                {breathingActive ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Start</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Safe Circle & International Emergency Numbers */}
      <section className="w-full py-12 px-5 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-on-surface/[0.06] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-on-surface">
                Connect With Your Safe Circle
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Hearing a familiar voice helps regulate the nervous system. Reach out to a family member, trusted friend, elder, or community guide—you do not need to explain everything right now.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-on-secondary text-xs font-semibold hover:bg-on-secondary-fixed-variant transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Open Phone Contacts</span>
              </a>
              <a
                href="sms:?body=Hi,%20I%20am%20having%20a%20difficult%20time%20right%20now%20and%20could%20use%20someone%20to%20talk%20to.%20Are%20you%20free?"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-variant transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Text A Trusted Friend</span>
              </a>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl border border-on-surface/[0.06] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-on-surface">
                International &amp; Casualty Response
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                If you are outside Kenya or in immediate physical danger, please call your national emergency service or visit the nearest casualty department:
              </p>
              <div className="grid grid-cols-3 gap-2.5 pt-1 text-center tabular-nums">
                <div className="p-2.5 rounded-lg bg-surface-container">
                  <span className="text-[11px] block text-on-surface-variant">
                    Kenya / UK
                  </span>
                  <span className="text-base font-bold text-primary">999</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container">
                  <span className="text-[11px] block text-on-surface-variant">
                    US / Canada
                  </span>
                  <span className="text-base font-bold text-primary">988 / 911</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container">
                  <span className="text-[11px] block text-on-surface-variant">
                    EU &amp; EAC
                  </span>
                  <span className="text-base font-bold text-primary">112</span>
                </div>
              </div>
            </div>

            <a
              href="tel:999"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Call Emergency Services (999 / 112)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Bottom Privacy & Return Bar */}
      <section className="w-full bg-surface-container-high py-6 px-5 lg:px-12 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-secondary shrink-0" />
            <div>
              <p className="text-sm font-semibold text-on-surface">
                Your privacy is fully protected
              </p>
              <p className="text-xs text-on-surface-variant">
                Accessing this pathway is confidential and unshared.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onGoBack}
              className="px-4 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface text-xs font-semibold hover:bg-surface-variant transition-colors"
            >
              Return to Previous Screen
            </button>
            <button
              type="button"
              onClick={onGoHome}
              className="px-4 py-2.5 rounded-lg bg-secondary text-on-secondary text-xs font-semibold hover:bg-on-secondary-fixed-variant transition-colors"
            >
              Return to Safety Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
