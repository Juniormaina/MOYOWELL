import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Clock,
  ShieldCheck,
  History,
  Pencil,
  AlertTriangle,
  PhoneCall,
} from "lucide-react";
import { MediaImage } from "./MediaImage";
import {
  INSTRUMENTS,
  type InstrumentId,
} from "@/src/data/instruments";
import type { AppView } from "./LayoutShell";
import consultationLoungeImg from "@/src/assets/images/calm_consultation_lounge_1794762545595.jpg";

interface QuestionnaireViewProps {
  instrumentId: InstrumentId;
  answers: Array<number | null>;
  onSelectAnswer: (questionIndex: number, value: number) => void;
  onSaveAndExit: () => void;
  onComplete: () => void;
  onNavigate: (view: AppView) => void;
}

export function QuestionnaireView({
  instrumentId,
  answers,
  onSelectAnswer,
  onSaveAndExit,
  onComplete,
  onNavigate,
}: QuestionnaireViewProps) {
  const def = INSTRUMENTS[instrumentId];
  const firstUnanswered = answers.findIndex((a) => a === null);
  const [currentIndex, setCurrentIndex] = useState<number>(
    firstUnanswered === -1 ? def.questions.length - 1 : firstUnanswered
  );
  const [showSafetyModal, setShowSafetyModal] = useState(false);

  const currentQuestion = def.questions[currentIndex];
  const selectedValue = answers[currentIndex];
  const answeredCount = answers.filter((a) => a !== null).length;
  const percentComplete = Math.round(((currentIndex + 1) / def.questions.length) * 100);
  const isLastQuestion = currentIndex === def.questions.length - 1;

  const answeredIndices = answers
    .map((val, idx) => (val !== null && idx !== currentIndex ? idx : -1))
    .filter((idx) => idx !== -1);

  const handleChooseOption = (val: number) => {
    onSelectAnswer(currentIndex, val);
    if (currentQuestion.isSafetyItem && val > 0) {
      setShowSafetyModal(true);
    }
  };

  const handleNext = () => {
    if (selectedValue === null) return;
    if (currentQuestion.isSafetyItem && selectedValue > 0 && !showSafetyModal) {
      setShowSafetyModal(true);
      return;
    }
    if (isLastQuestion) {
      onComplete();
    } else {
      setCurrentIndex((i) => Math.min(def.questions.length - 1, i + 1));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  return (
    <div className="w-full py-10">
      <div className="max-w-5xl mx-auto px-5 lg:px-12 space-y-8">
        {/* Top Tracker & Safety Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
            <span className="text-secondary">In Progress</span>
            <span aria-hidden="true" className="text-outline-variant">·</span>
            <span className="text-on-surface-variant">Clinical Screening Suite</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-high text-on-surface-variant text-xs">
            <Heart className="w-4 h-4 text-primary shrink-0" />
            <span>Your safety matters. In distress?</span>
            <button
              type="button"
              onClick={() => onNavigate("crisis")}
              className="text-primary font-semibold hover:underline"
            >
              Immediate Support →
            </button>
          </div>
        </div>

        {/* Main Questionnaire Card */}
        <div className="bg-surface-container-lowest rounded-xl border border-on-surface/[0.06] shadow-sm p-6 md:p-10 space-y-8">
          {/* Header & Progress Bar */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-primary block">
                  Standardized Inventory · {def.code}
                </span>
                <h1 className="font-serif text-2xl md:text-3xl font-medium text-on-surface mt-1">
                  {def.name}
                </h1>
              </div>

              <div className="text-left md:text-right tabular-nums shrink-0">
                <span className="font-serif text-xl font-medium text-secondary">
                  Question {currentQuestion.number}
                </span>
                <span className="text-sm text-on-surface-variant">
                  {" "}
                  of {def.questions.length}
                </span>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
                  {percentComplete}% Completed ({answeredCount}/{def.questions.length} answered)
                </span>
              </div>
            </div>

            <div
              className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden"
              role="progressbar"
              aria-valuenow={percentComplete}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full bg-secondary rounded-full transition-all duration-300"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>

          {/* Timeframe Instruction */}
          <div className="bg-surface-container-low rounded-lg p-4">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-secondary block mb-1">
              Timeframe Instruction
            </span>
            <p className="text-[15px] text-on-surface italic">
              &ldquo;{def.timeframePrompt}&rdquo;
            </p>
          </div>

          {/* Active Question Prompt */}
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0 tabular-nums mt-0.5">
                {currentQuestion.number}
              </span>
              <h2 className="font-serif text-xl md:text-2xl font-medium text-on-surface leading-snug">
                {currentQuestion.prompt}
              </h2>
            </div>

            {currentQuestion.isSafetyItem && (
              <div className="p-3.5 rounded-lg bg-primary-fixed/40 text-on-primary-fixed-variant text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  This question includes an active safety check. If you are experiencing thoughts of self-harm, direct human support is available immediately.
                </span>
              </div>
            )}

            {/* Options Radio Group */}
            <div
              role="radiogroup"
              aria-label={currentQuestion.prompt}
              className={`grid grid-cols-1 gap-4 ${
                def.options.length === 6 ? "md:grid-cols-3" : "md:grid-cols-2"
              }`}
            >
              {def.options.map((opt) => {
                const isSelected = selectedValue === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleChooseOption(opt.value)}
                    className={`text-left p-5 rounded-xl transition-all flex flex-col justify-between min-h-[124px] focus-visible:outline-2 focus-visible:outline-primary ${
                      isSelected
                        ? "ring-2 ring-primary bg-gradient-to-br from-surface-container-lowest to-primary-fixed/25 shadow-sm"
                        : "bg-surface-container hover:bg-surface-container-high border border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-widest tabular-nums ${
                          isSelected ? "text-primary" : "text-on-surface-variant"
                        }`}
                      >
                        Score: {opt.value} {isSelected ? "· Selected" : ""}
                      </span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-highest"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </span>
                    </div>

                    <div className="pt-3">
                      <span
                        className={`text-lg font-semibold block ${
                          isSelected ? "text-primary" : "text-on-surface"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="text-xs text-on-surface-variant mt-0.5 block">
                        {opt.sublabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Local Privacy Micro-Panel */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3.5 rounded-lg bg-surface-container-low text-on-surface-variant text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
              <span>All responses remain client-side in your local session.</span>
            </div>
            <div className="flex items-center gap-1.5 text-secondary font-semibold uppercase tracking-wider tabular-nums">
              <Clock className="w-3.5 h-3.5" />
              <span>{def.durationLabel} total</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  currentIndex === 0
                    ? "bg-surface-container text-outline cursor-not-allowed"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={onSaveAndExit}
                className="text-on-surface-variant hover:text-primary text-xs font-semibold uppercase tracking-wider underline-offset-4 hover:underline transition-colors py-2"
              >
                Save &amp; Exit
              </button>
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={selectedValue === null}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-colors shadow-xs ${
                selectedValue === null
                  ? "bg-secondary/35 text-on-secondary cursor-not-allowed"
                  : "bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary cursor-pointer"
              }`}
            >
              <span>
                {isLastQuestion
                  ? "Complete & View Synthesis"
                  : "Next Question"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Answered Journey Ledger */}
        {answeredIndices.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-secondary" />
                <h3 className="font-serif text-xl font-medium text-on-surface">
                  Answered Journey
                </h3>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
                Tap any item to revise
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {answeredIndices.map((idx) => {
                const q = def.questions[idx];
                const ansVal = answers[idx] ?? 0;
                const opt = def.options.find((o) => o.value === ansVal);
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className="text-left p-4 rounded-xl bg-surface-container-low hover:bg-surface-container-high border border-on-surface/[0.06] transition-colors flex flex-col justify-between gap-2 group"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-secondary tabular-nums">
                        Item 0{q.number}
                      </span>
                      <Pencil className="w-3.5 h-3.5 text-secondary opacity-70 group-hover:opacity-100" />
                    </div>
                    <p className="text-sm font-semibold text-on-surface line-clamp-1">
                      {q.prompt}
                    </p>
                    <span className="text-xs text-on-surface-variant tabular-nums">
                      {opt?.label ?? ""} · {ansVal} pts
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Reflective Pause Sanctuary Card */}
        <div className="rounded-xl bg-surface-container-high p-6 flex flex-col md:flex-row items-stretch gap-6">
          <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-auto rounded-lg overflow-hidden relative min-h-[180px]">
            <MediaImage
              src={consultationLoungeImg}
              alt="Sunlit wellness lounge with terracotta armchairs and indoor fig plant"
              className="w-full h-full object-cover"
              fallbackTitle="Restorative Sanctuary"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/65 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-surface uppercase tracking-widest">
              Clinical Restorative Sanctuary
            </span>
          </div>

          <div className="w-full md:w-2/3 flex flex-col justify-center space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
              Reflective Pause
            </span>
            <h4 className="font-serif text-xl font-medium text-on-surface">
              {def.reflectiveNote.title}
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {def.reflectiveNote.body}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] font-semibold uppercase tracking-wider text-on-surface">
              <span>Validated Metric</span>
              <span aria-hidden="true">·</span>
              <span>{def.reflectiveNote.standardLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deterministic PHQ-9 Item 9 Safety Safeguard Modal */}
      {showSafetyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="safety-modal-title"
        >
          <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-error/20 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-error block">
                  Safety Safeguard Triggered
                </span>
                <h3
                  id="safety-modal-title"
                  className="font-serif text-2xl font-medium text-on-surface"
                >
                  You don&apos;t have to carry this alone.
                </h3>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed">
              Your answer indicates thoughts of self-harm or feeling better off dead. MoyoWell pauses automated scoring here so you can connect directly with a real, compassionate person right now.
            </p>

            <div className="p-4 rounded-lg bg-surface-container-low space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-on-surface">Befrienders Kenya (24/7)</span>
                <a href="tel:+254722178177" className="font-semibold text-primary hover:underline tabular-nums">
                  +254 722 178 177
                </a>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-on-surface">Kenya Red Cross (Toll-Free)</span>
                <a href="tel:1199" className="font-semibold text-secondary hover:underline tabular-nums">
                  1199
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowSafetyModal(false);
                  onNavigate("crisis");
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-error hover:bg-on-error-container text-on-error px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Go to Immediate Support</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSafetyModal(false);
                  onComplete();
                }}
                className="px-4 py-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-semibold transition-colors"
              >
                Save Summary &amp; Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
