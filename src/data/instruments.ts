export type InstrumentId = "phq9" | "gad7" | "who5";
export type InstrumentCategory = "mood" | "anxiety" | "wellbeing";

export interface ResponseOption {
  value: number;
  label: string;
  sublabel: string;
}

export interface InstrumentQuestion {
  id: string;
  number: number;
  prompt: string;
  cluster: string;
  isSafetyItem?: boolean;
}

export interface SeverityBand {
  id: string;
  label: string;
  rangeLabel: string;
  min: number;
  max: number;
  tone: "sage" | "mint" | "ochre" | "terracotta" | "crimson";
  careTier: string;
  summary: string;
}

export interface InstrumentDefinition {
  id: InstrumentId;
  code: string;
  name: string;
  shortTitle: string;
  category: InstrumentCategory;
  categoryLabel: string;
  durationLabel: string;
  itemCount: number;
  scoreRangeLabel: string;
  maxScore: number;
  lookback: string;
  citation: string;
  timeframePrompt: string;
  description: string;
  safetyNotice?: string;
  options: ResponseOption[];
  questions: InstrumentQuestion[];
  bands: SeverityBand[];
  reflectiveNote: {
    title: string;
    body: string;
    standardLabel: string;
  };
}

export interface CompletedAssessment {
  id: string;
  refCode: string;
  instrumentId: InstrumentId;
  completedAt: string;
  answers: number[];
  score: number;
  maxScore: number;
  band: SeverityBand;
  safetyTriggered: boolean;
  pinned?: boolean;
  aiParagraphs?: string[];
}

export const PHQ9_GAD7_OPTIONS: ResponseOption[] = [
  { value: 0, label: "Not at all", sublabel: "0 days in the past 2 weeks" },
  { value: 1, label: "Several days", sublabel: "Occasional days (1–6 days)" },
  { value: 2, label: "More than half the days", sublabel: "Consistent presence (7–11 days)" },
  { value: 3, label: "Nearly every day", sublabel: "Persistent pattern (12–14 days)" },
];

export const WHO5_OPTIONS: ResponseOption[] = [
  { value: 0, label: "At no time", sublabel: "0% of the time" },
  { value: 1, label: "Some of the time", sublabel: "Rarely over 2 weeks" },
  { value: 2, label: "Less than half of the time", sublabel: "Under half of the days" },
  { value: 3, label: "More than half of the time", sublabel: "Over half of the days" },
  { value: 4, label: "Most of the time", sublabel: "Consistently present" },
  { value: 5, label: "All of the time", sublabel: "Continuous vitality" },
];

export const INSTRUMENTS: Record<InstrumentId, InstrumentDefinition> = {
  phq9: {
    id: "phq9",
    code: "PHQ-9",
    name: "Patient Health Questionnaire (PHQ-9)",
    shortTitle: "Mood & Affect Scale",
    category: "mood",
    categoryLabel: "Mood",
    durationLabel: "4–6 Minutes",
    itemCount: 9,
    scoreRangeLabel: "0 – 27 Index",
    maxScore: 27,
    lookback: "Past 14 Days",
    citation: "Validated by Kroenke et al. (2001)",
    timeframePrompt:
      "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
    description:
      "Identifies minimal, mild, moderate, moderately severe, and severe depressive symptoms. Built with an automated clinical safeguard protocol actively monitoring for affirmative responses on item 9.",
    safetyNotice:
      "Active Safety Safeguard: Immediate crisis support routing upon affirmative Item 9 response.",
    options: PHQ9_GAD7_OPTIONS,
    questions: [
      {
        id: "phq9-1",
        number: 1,
        prompt: "Little interest or pleasure in doing things",
        cluster: "Energy & Motivation",
      },
      {
        id: "phq9-2",
        number: 2,
        prompt: "Feeling down, depressed, or hopeless",
        cluster: "Self-Perception & Mood",
      },
      {
        id: "phq9-3",
        number: 3,
        prompt: "Trouble falling or staying asleep, or sleeping too much",
        cluster: "Sleep Quality",
      },
      {
        id: "phq9-4",
        number: 4,
        prompt: "Feeling tired or having little energy",
        cluster: "Energy & Motivation",
      },
      {
        id: "phq9-5",
        number: 5,
        prompt: "Poor appetite or overeating",
        cluster: "Appetite & Concentration",
      },
      {
        id: "phq9-6",
        number: 6,
        prompt:
          "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
        cluster: "Self-Perception & Mood",
      },
      {
        id: "phq9-7",
        number: 7,
        prompt:
          "Trouble concentrating on things, such as reading the newspaper or watching television",
        cluster: "Appetite & Concentration",
      },
      {
        id: "phq9-8",
        number: 8,
        prompt:
          "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
        cluster: "Psychomotor Rhythm",
      },
      {
        id: "phq9-9",
        number: 9,
        prompt:
          "Thoughts that you would be better off dead, or of hurting yourself in some way",
        cluster: "Safety Indicator",
        isSafetyItem: true,
      },
    ],
    bands: [
      {
        id: "minimal",
        label: "Minimal Depressive Symptoms",
        rangeLabel: "0 – 4",
        min: 0,
        max: 4,
        tone: "mint",
        careTier: "Preventive Self-Care · Routine Reflection",
        summary:
          "Sub-clinical symptom presence over the past two weeks. Maintaining steady sleep, sunlight, and social rhythms supports ongoing resilience.",
      },
      {
        id: "mild",
        label: "Mild Depressive Symptoms",
        rangeLabel: "5 – 9",
        min: 5,
        max: 9,
        tone: "sage",
        careTier: "Guided Self-Care · 14-Day Re-Screen",
        summary:
          "Mild emotional strain or lowered energy. Structured daily routines, circadian alignment, and peer connection often help restore equilibrium.",
      },
      {
        id: "moderate",
        label: "Moderate Depressive Symptoms",
        rangeLabel: "10 – 14",
        min: 10,
        max: 14,
        tone: "terracotta",
        careTier: "Routine Professional Support · Guided Coping",
        summary:
          "Noticeable functional friction in energy, sleep, or focus over the past 14 days. Speaking with a licensed counselor alongside daily somatic care is recommended.",
      },
      {
        id: "moderately-severe",
        label: "Moderately Severe Symptoms",
        rangeLabel: "15 – 19",
        min: 15,
        max: 19,
        tone: "terracotta",
        careTier: "Active Clinical Consultation · Structured Care",
        summary:
          "Substantial symptom burden affecting daily momentum. Prompt evaluation with a licensed clinician or primary care physician is recommended.",
      },
      {
        id: "severe",
        label: "Severe Depressive Symptoms",
        rangeLabel: "20 – 27",
        min: 20,
        max: 27,
        tone: "crimson",
        careTier: "Priority Clinical Care · Direct Support",
        summary:
          "High symptom intensity over the past two weeks. Connecting promptly with a mental health specialist or trusted support person is strongly encouraged.",
      },
    ],
    reflectiveNote: {
      title: "Energy balance & nervous system recovery",
      body: "Fatigue and low mood often stem from prolonged cognitive pressure, sleep debt, or accumulated emotional strain. Responses in this module contextualize sleep regularity and vitality markers in your navigation brief.",
      standardLabel: "DSM-5 Symptom Alignment",
    },
  },
  gad7: {
    id: "gad7",
    code: "GAD-7",
    name: "Generalized Anxiety Disorder Scale (GAD-7)",
    shortTitle: "Anxiety & Somatic Worry",
    category: "anxiety",
    categoryLabel: "Anxiety",
    durationLabel: "3–5 Minutes",
    itemCount: 7,
    scoreRangeLabel: "0 – 21 Index",
    maxScore: 21,
    lookback: "Past 14 Days",
    citation: "Validated by Spitzer et al. (2006)",
    timeframePrompt:
      "Over the last 2 weeks, how often have you been bothered by the following problems?",
    description:
      "Assesses generalized anxiety symptoms, restlessness, nervousness, and uncontrolled apprehension. Evaluates how emotional tension impacts occupational and daily executive functioning.",
    options: PHQ9_GAD7_OPTIONS,
    questions: [
      {
        id: "gad7-1",
        number: 1,
        prompt: "Feeling nervous, anxious, or on edge",
        cluster: "Nervous Arousal",
      },
      {
        id: "gad7-2",
        number: 2,
        prompt: "Not being able to stop or control worrying",
        cluster: "Cognitive Worry",
      },
      {
        id: "gad7-3",
        number: 3,
        prompt: "Worrying too much about different things",
        cluster: "Cognitive Worry",
      },
      {
        id: "gad7-4",
        number: 4,
        prompt: "Trouble relaxing",
        cluster: "Somatic Tension",
      },
      {
        id: "gad7-5",
        number: 5,
        prompt: "Being so restless that it is hard to sit still",
        cluster: "Somatic Tension",
      },
      {
        id: "gad7-6",
        number: 6,
        prompt: "Becoming easily annoyed or irritable",
        cluster: "Emotional Reactivity",
      },
      {
        id: "gad7-7",
        number: 7,
        prompt: "Feeling afraid, as if something awful might happen",
        cluster: "Apprehension",
      },
    ],
    bands: [
      {
        id: "minimal",
        label: "Minimal Anxiety",
        rangeLabel: "0 – 4",
        min: 0,
        max: 4,
        tone: "mint",
        careTier: "Preventive Grounding · Baseline Steady",
        summary:
          "Low anxiety burden across the past two weeks. Breathwork and mindful transitions help preserve nervous system steadiness.",
      },
      {
        id: "mild",
        label: "Mild Anxiety",
        rangeLabel: "5 – 9",
        min: 5,
        max: 9,
        tone: "sage",
        careTier: "Somatic Self-Care · Worry Hygiene",
        summary:
          "Occasional worry or difficulty unwinding. Controlled breathing, vagus nerve grounding, and caffeine timing often ease symptoms.",
      },
      {
        id: "moderate",
        label: "Moderate Anxiety",
        rangeLabel: "10 – 14",
        min: 10,
        max: 14,
        tone: "ochre",
        careTier: "Routine Counseling · CBT Worry Tools",
        summary:
          "Consistent cognitive worry and somatic tension. Structured Cognitive Behavioral Therapy (CBT) and therapist matching are recommended.",
      },
      {
        id: "severe",
        label: "Severe Anxiety",
        rangeLabel: "15 – 21",
        min: 15,
        max: 21,
        tone: "crimson",
        careTier: "Priority Clinical Evaluation · Support",
        summary:
          "Elevated hyper-arousal and persistent worry. Reaching out to a licensed clinician or healthcare provider for tailored care is recommended.",
      },
    ],
    reflectiveNote: {
      title: "Nervous system tone & apprehension loops",
      body: "Persistent worry keeps the sympathetic nervous system on high alert, creating physical restlessness and muscle fatigue. Identifying key triggers helps target grounding practices effectively.",
      standardLabel: "Spitzer et al. Calibration",
    },
  },
  who5: {
    id: "who5",
    code: "WHO-5",
    name: "WHO-5 Subjective Wellbeing Index",
    shortTitle: "Positive Vitality & Fulfillment",
    category: "wellbeing",
    categoryLabel: "General Wellbeing",
    durationLabel: "2–3 Minutes",
    itemCount: 5,
    scoreRangeLabel: "0 – 100% Index",
    maxScore: 100,
    lookback: "Past 14 Days",
    citation: "World Health Organization (1998)",
    timeframePrompt:
      "Please indicate for each of the five statements which is closest to how you have been feeling over the last two weeks.",
    description:
      "Measures positive psychological vitality, restorative sleep, calm vigor, and genuine everyday interest. Rather than assessing pathology, this index illuminates affirmative holistic resilience.",
    options: WHO5_OPTIONS,
    questions: [
      {
        id: "who5-1",
        number: 1,
        prompt: "I have felt cheerful and in good spirits",
        cluster: "Positive Affect",
      },
      {
        id: "who5-2",
        number: 2,
        prompt: "I have felt calm and relaxed",
        cluster: "Autonomic Calm",
      },
      {
        id: "who5-3",
        number: 3,
        prompt: "I have felt active and vigorous",
        cluster: "Physical Vitality",
      },
      {
        id: "who5-4",
        number: 4,
        prompt: "I woke up feeling fresh and rested",
        cluster: "Restorative Sleep",
      },
      {
        id: "who5-5",
        number: 5,
        prompt: "My daily life has been filled with things that interest me",
        cluster: "Meaning & Engagement",
      },
    ],
    bands: [
      {
        id: "low",
        label: "Low Vitality Indicator",
        rangeLabel: "0 – 28%",
        min: 0,
        max: 28,
        tone: "crimson",
        careTier: "Further Screening Recommended · Clinical Check-In",
        summary:
          "WHO-5 scores at or below 28% suggest markedly depleted vitality and warrant follow-up with the PHQ-9 or a healthcare clinician.",
      },
      {
        id: "reduced",
        label: "Reduced Wellbeing Baseline",
        rangeLabel: "29 – 50%",
        min: 29,
        max: 50,
        tone: "ochre",
        careTier: "Restorative Routine · Gentle Support",
        summary:
          "Vitality and restorative rest have dipped below the 50% threshold. Prioritizing sleep recovery, nourishing boundaries, and supportive conversation can rebuild reserves.",
      },
      {
        id: "optimal",
        label: "Optimal Vitality Baseline",
        rangeLabel: "51 – 100%",
        min: 51,
        max: 100,
        tone: "mint",
        careTier: "Affirmative Resilience · Preventive Maintenance",
        summary:
          "Positive emotional vitality and restorative engagement above the 50% benchmark. Continue anchoring protective habits and periodic check-ins.",
      },
    ],
    reflectiveNote: {
      title: "Measuring presence, vitality, and restoration",
      body: "Unlike symptom inventories, the WHO-5 focuses on positive resilience—cheerfulness, calm, vigor, and restorative rest—offering a balanced view of overall psychological flourishing.",
      standardLabel: "WHO Psychiatric Research",
    },
  },
};

export function scoreAssessment(
  instrumentId: InstrumentId,
  answers: number[]
): {
  score: number;
  band: SeverityBand;
  safetyTriggered: boolean;
} {
  const def = INSTRUMENTS[instrumentId];
  const rawSum = answers.reduce((acc, val) => acc + (Number.isFinite(val) ? val : 0), 0);
  const score = instrumentId === "who5" ? rawSum * 4 : rawSum;
  const safetyTriggered =
    instrumentId === "phq9" && typeof answers[8] === "number" && answers[8] > 0;

  const band =
    def.bands.find((b) => score >= b.min && score <= b.max) ??
    def.bands[def.bands.length - 1];

  return { score, band, safetyTriggered };
}

export function buildDeterministicExplanation(
  instrumentId: InstrumentId,
  answers: number[],
  score: number,
  band: SeverityBand
): string[] {
  const def = INSTRUMENTS[instrumentId];
  if (instrumentId === "who5") {
    return [
      `Your WHO-5 index of ${score}% (${band.label}) summarizes five positive indicators of mood, calm, physical vigor, morning restfulness, and daily engagement over the last 14 days.`,
      `${band.summary} This score serves as a structured reflection benchmark rather than a medical diagnosis, and can be paired with mood or anxiety screening whenever you want deeper context.`,
    ];
  }

  const elevated = def.questions
    .filter((_, idx) => (answers[idx] ?? 0) >= 2)
    .map((q) => q.cluster);
  const uniqueClusters = Array.from(new Set(elevated));
  const focusClause =
    uniqueClusters.length > 0
      ? `The most frequent friction appeared around ${uniqueClusters.slice(0, 3).join(", ").toLowerCase()}.`
      : "Most individual items remained occasional across the past two weeks.";

  const safetyNote =
    instrumentId === "phq9"
      ? ` Deterministic Safety Audit: Question 9 ("thoughts of being better off dead or hurting yourself") was answered as Not at all (0), so standard preventive navigation applies.`
      : "";

  return [
    `Your score of ${score} out of ${def.maxScore} places your responses within the ${band.label} band (${band.rangeLabel}). ${focusClause}`,
    `Crucially, this measurement acts as a 14-day mirror rather than a permanent label. ${band.summary}${safetyNote}`,
  ];
}

// Pre-seeded synthetic demo assessments matching the design showcase
export const INITIAL_DEMO_ASSESSMENTS: CompletedAssessment[] = [
  {
    id: "demo-phq9-baseline",
    refCode: "MW-SYN-7492",
    instrumentId: "phq9",
    completedAt: "Today, 09:42 AM",
    answers: [2, 1, 3, 2, 1, 1, 1, 0, 0],
    score: 11,
    maxScore: 27,
    band: INSTRUMENTS.phq9.bands[2],
    safetyTriggered: false,
    pinned: true,
  },
  {
    id: "demo-who5-baseline",
    refCode: "MW-SYN-6814",
    instrumentId: "who5",
    completedAt: "14 days ago",
    answers: [4, 3, 3, 3, 4],
    score: 68,
    maxScore: 100,
    band: INSTRUMENTS.who5.bands[2],
    safetyTriggered: false,
    pinned: false,
  },
];
