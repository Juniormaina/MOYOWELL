import teaJournalImg from "@/src/assets/images/tea_journal_still_life_1794762544818.webp";
import sanctuaryPalmImg from "@/src/assets/images/sanctuary_pottery_palm_1794762544492.webp";
import botanicalFernsImg from "@/src/assets/images/botanical_ferns_courtyard_1794762545318.webp";
import consultationLoungeImg from "@/src/assets/images/calm_consultation_lounge_1794762545595.webp";

export interface CrisisHotline {
  id: string;
  badge: string;
  badgeTone: "secondary" | "error" | "tertiary";
  name: string;
  description: string;
  availabilityLabel: string;
  phoneDisplay: string;
  telHref: string;
  ctaLabel: string;
  ctaTone: "primary" | "secondary";
}

export interface GroundingStep {
  count: number;
  title: string;
  hint: string;
  accent: "primary" | "secondary" | "tertiary";
}

export interface ResourceArticle {
  id: string;
  title: string;
  summary: string;
  category: "Mood & Sleep" | "Anxiety & Somatic" | "CBT & Reflection" | "Clinical Prep";
  formatLabel: string;
  image: string;
  imageAlt: string;
  readTime: string;
  sections: Array<{ heading: string; body: string }>;
  keyTakeaway: string;
}

export interface CareProvider {
  id: string;
  name: string;
  credentials: string;
  specialty: string[];
  modality: string;
  location: string;
  feeNote: string;
  contactLabel: string;
}

export const CRISIS_HOTLINES: CrisisHotline[] = [
  {
    id: "befrienders-kenya",
    badge: "Primary Crisis Line",
    badgeTone: "secondary",
    name: "Befrienders Kenya",
    description:
      "Dedicated emotional support, acute distress intervention, and suicide prevention listening sanctuary. Free, confidential, and empathetic.",
    availabilityLabel: "24/7 Available",
    phoneDisplay: "+254 722 178 177",
    telHref: "tel:+254722178177",
    ctaLabel: "Call +254 722 178 177 Now",
    ctaTone: "primary",
  },
  {
    id: "kenya-red-cross",
    badge: "Medical & Psychological",
    badgeTone: "error",
    name: "Kenya Red Cross Society",
    description:
      "Immediate national emergency dispatch, trauma support, tele-counseling, and coordinated medical transport nationwide.",
    availabilityLabel: "Toll-Free Nationwide",
    phoneDisplay: "1199",
    telHref: "tel:1199",
    ctaLabel: "Call 1199 (Toll Free)",
    ctaTone: "secondary",
  },
  {
    id: "chiromo-hospital",
    badge: "Specialist Triage",
    badgeTone: "tertiary",
    name: "Chiromo Hospital Group",
    description:
      "Continuous specialized psychiatric crisis triage, clinical mental health counselors, and immediate inpatient admission navigation.",
    availabilityLabel: "Toll-Free Helpline",
    phoneDisplay: "0800 220 000",
    telHref: "tel:0800220000",
    ctaLabel: "Call 0800 220 000",
    ctaTone: "primary",
  },
];

export const GROUNDING_STEPS: GroundingStep[] = [
  {
    count: 5,
    title: "Acknowledge 5 things you can see",
    hint: "A spot on the wall, light from a window, fabric weave, tree outside.",
    accent: "primary",
  },
  {
    count: 4,
    title: "Acknowledge 4 things you can feel",
    hint: "The texture of your seat, your feet firm on the floor, cool air on skin.",
    accent: "secondary",
  },
  {
    count: 3,
    title: "Acknowledge 3 things you can hear",
    hint: "Distant birds, passing breeze, ticking watch, your steady breath.",
    accent: "tertiary",
  },
  {
    count: 2,
    title: "Acknowledge 2 things you can smell",
    hint: "Fresh rain, clean cotton, tea leaves, or ambient wood.",
    accent: "secondary",
  },
  {
    count: 1,
    title: "Acknowledge 1 thing you can taste",
    hint: "Sip cool water, a leaf of mint, or simply your mouth's resting state.",
    accent: "primary",
  },
];

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    id: "circadian-entrainment",
    title: "Circadian Entrainment for Lethargy",
    summary:
      "How early daylight exposure resets dopamine and melatonin synthesis pathways for steadier morning vitality.",
    category: "Mood & Sleep",
    formatLabel: "Guide · 6 min",
    readTime: "6 min read",
    image: teaJournalImg,
    imageAlt: "Warm chamomile tea in ceramic mug beside linen journal and eucalyptus leaves",
    keyTakeaway:
      "10–20 minutes of outdoor morning light within an hour of waking anchors evening melatonin release 14–16 hours later.",
    sections: [
      {
        heading: "Why morning light regulates mood energy",
        body: "Low mood frequently alters circadian timing, leaving mornings heavy and evenings restless. Natural outdoor light (even under cloud cover) delivers 5,000–25,000 lux to retinal photoreceptors, signaling the hypothalamus to suppress residual melatonin and initiate daytime alertness.",
      },
      {
        heading: "A gentle 3-anchor sleep protocol",
        body: "1. Wake within the same 30-minute window daily. 2. Step outside or sit beside an open window for 15 minutes before checking messages. 3. Dim overhead warm lights 90 minutes before sleep and keep screens out of reach of the pillow.",
      },
    ],
  },
  {
    id: "thought-record-cbt",
    title: "Thought-Record Diary (CBT)",
    summary:
      "Gentle structured prompts for noticing automatic self-criticism and testing balanced alternatives.",
    category: "CBT & Reflection",
    formatLabel: "Worksheet · Interactive",
    readTime: "5 min practice",
    image: sanctuaryPalmImg,
    imageAlt: "Calm sunlit interior with terracotta pottery and raw linen cushions",
    keyTakeaway:
      "Separating an observable situation from the mind's automatic interpretation creates space for calmer choice.",
    sections: [
      {
        heading: "Catching automatic distortions gently",
        body: "During moderate stress or low mood, thoughts often compress into all-or-nothing judgments ('Nothing I do works'). Writing the exact thought on paper moves it from an unexamined feeling into an observable sentence.",
      },
      {
        heading: "Three grounding questions",
        body: "Ask yourself: What concrete evidence supports this thought? What evidence suggests a fuller picture? If a close friend shared this exact situation with me, what steady words would I offer them?",
      },
    ],
  },
  {
    id: "vagus-nerve-grounding",
    title: "Vagus Nerve Grounding Practice",
    summary:
      "Guided physiological sigh and 4-4-4 box breathing to down-regulate internal dread and somatic tension.",
    category: "Anxiety & Somatic",
    formatLabel: "Practice · 4 min",
    readTime: "4 min practice",
    image: botanicalFernsImg,
    imageAlt: "Serene botanical stone pathway lined with lush green ferns and terracotta tiles",
    keyTakeaway:
      "Extending the exhale slightly longer than the inhale activates parasympathetic vagal braking within 3 to 5 breath cycles.",
    sections: [
      {
        heading: "The physiological sigh",
        body: "Take two nasal inhales back-to-back (one deep breath, followed by a quick top-up sip of air to re-inflate lung alveoli), then release a slow, unhurried exhale through softly parted lips for 6 seconds.",
      },
      {
        heading: "When to use somatic pacing",
        body: "Practice 4 cycles before difficult conversations, during midday overwhelm, or when lying awake with racing thoughts. Pair breathing with feeling both feet flat against the floor.",
      },
    ],
  },
  {
    id: "first-therapy-visit",
    title: "Preparing for Your First Therapy Visit",
    summary:
      "Questions to ask, how to share your PHQ-9 or GAD-7 summary, and finding warm therapeutic alignment.",
    category: "Clinical Prep",
    formatLabel: "Checklist · 4 min",
    readTime: "4 min read",
    image: consultationLoungeImg,
    imageAlt: "Minimalist sunlit wellness lounge with warm terracotta armchairs and indoor plants",
    keyTakeaway:
      "Bringing a printed or saved 14-day screening snapshot lets your clinician understand symptom patterns right away without repeating everything from scratch.",
    sections: [
      {
        heading: "What to bring to your initial intake",
        body: "Bring your latest PHQ-9, GAD-7, or WHO-5 score summary, a brief note on sleep and appetite changes over the past month, and any current medications or supplements.",
      },
      {
        heading: "Questions to ask a prospective counselor",
        body: "Consider asking: What modalities do you draw from (such as CBT, ACT, or trauma-informed care)? How do we measure progress every 4–6 sessions? What does session cadence and fee structure look like?",
      },
    ],
  },
];

export const CARE_PROVIDERS: CareProvider[] = [
  {
    id: "amani-wellness-nairobi",
    name: "Amani Counseling & Psychological Centre",
    credentials: "Accredited Counseling Psychologists · KCPA",
    specialty: ["CBT", "Depression & Mood", "Grief & Burnout"],
    modality: "In-person (Nairobi) & Encrypted Telehealth",
    location: "Kilimani, Nairobi",
    feeNote: "Sliding scale & NHIF/SHA partner options",
    contactLabel: "+254 718 220 410",
  },
  {
    id: "nairobi-mind-collective",
    name: "Nairobi Mind & Somatic Collective",
    credentials: "Clinical Psychologists & Somatic Practitioners",
    specialty: ["Anxiety Disorders", "ACT", "Sleep & Stress"],
    modality: "In-person & Video Sessions",
    location: "Westlands, Nairobi",
    feeNote: "Private & corporate EAP accepted",
    contactLabel: "+254 733 512 890",
  },
  {
    id: "chiromo-outpatient",
    name: "Chiromo Outpatient & Psychiatric Triage",
    credentials: "Consultant Psychiatrists & Clinical Team",
    specialty: ["Clinical Evaluation", "Medication Review", "Crisis Care"],
    modality: "24/7 Helpline & Outpatient Clinics",
    location: "Braeside / Westlands / Bustani",
    feeNote: "Toll-free initial triage: 0800 220 000",
    contactLabel: "0800 220 000",
  },
  {
    id: "knh-youth-community",
    name: "Community Peer & Wellness Circles",
    credentials: "Facilitated Peer Support & Psychoeducation",
    specialty: ["Peer Support", "Preventive Care", "Young Adults"],
    modality: "Weekly Virtual & Community Hubs",
    location: "Nationwide Virtual Access",
    feeNote: "Free / Community supported",
    contactLabel: "hello@moyowell.demo",
  },
];

export const ACTION_PATHWAY_HABITS = [
  {
    id: "sleep-window",
    title: "Consistent 30-Minute Wake Window",
    pillar: "Daily Grounding",
    description: "Anchor wake time and get 15 minutes of outdoor morning daylight.",
  },
  {
    id: "blue-light-winddown",
    title: "90-Minute Screen Wind-Down",
    pillar: "Sleep Protocol",
    description: "Transition from bright screens to warm lighting, tea, or light reading.",
  },
  {
    id: "box-breathing",
    title: "4-4-4 Controlled Box Breathing",
    pillar: "Somatic Reset",
    description: "Complete 4 calm breathing cycles during afternoon tension.",
  },
  {
    id: "provider-shortlist",
    title: "Shortlist 1–2 Accredited Counselors",
    pillar: "Clinical Care",
    description: "Review network providers and export your PHQ-9/GAD-7 summary.",
  },
  {
    id: "rescreen-14d",
    title: "Schedule 14-Day Re-Screen",
    pillar: "Trajectory Check",
    description: "Repeat the same instrument in two weeks to observe trend shifts.",
  },
];
