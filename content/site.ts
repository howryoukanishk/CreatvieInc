// Narrative content for the case study. Fields set to null are awaiting real
// material and render as a visible "pending" slot — never as invented copy.

export const site = {
  title: "Vāyas Life — From Insight to Impact",
  description:
    "An interactive case study: competitive creative research on calcium-supplement Meta ads and three original video-ad concepts for Vāyas Life.",
  author: "Kanishk Prabhat",
  productUrl:
    "https://vayas.life/products/vayas-calcium-tablets-for-women-bone-support-india?variant=43015046791233",
};

export const sections = [
  { id: "brief", index: "01", label: "The Brief" },
  { id: "research", index: "02", label: "Research" },
  { id: "insight", index: "03", label: "The Insight" },
  { id: "creative-lab", index: "04", label: "Creative Lab" },
  { id: "films", index: "05", label: "The Films" },
  { id: "next-steps", index: "06", label: "Next Steps" },
] as const;

export const brief = {
  // The hiring team's assignment, lightly condensed. Contact details are left out on purpose.
  from: "Vāyas Life hiring team",
  timeline: "2 days",
  assignments: [
    {
      index: "01",
      title: "Meta Ads competition search",
      tasks: [
        "Go through the Meta Ad Library.",
        "Share the 5 top static ads from brands selling calcium supplements for women, and rate why they are the best.",
        "Share the 5 best competitor video ads, with reasoning for why they are the best.",
        "Put each set slide by slide in a PPT, with links to the ads.",
      ],
    },
    {
      index: "02",
      title: "Video ad concept",
      tasks: [
        "Create one strong video ad concept for Vāyas Life Calcium for Women.",
        "Generate the video with Google Flow and share one ad sample.",
      ],
    },
  ],
  product: {
    name: "Calcium Tablets for Women 30+",
    detail:
      "The product page lists calcium citrate, vitamin D2, magnesium, zinc and soy isoflavones.",
  },
  question:
    "How can Vāyas make bone-health support feel personally relevant to women 30+ while keeping the proposition focused and defensible?",
  interpretation: [
    {
      title: "“Top” means creative strength",
      body: "The Ad Library shows no performance data, so each ad is scored on five creative criteria and labelled a subjective assessment, not a ranking of results.",
    },
    {
      title: "Three routes, not one",
      body: "The brief asked for one concept and one sample. I developed three routes (cinematic, social-native and emotional) so the team can compare approaches to the same idea.",
    },
    {
      title: "Claims stay defensible",
      body: "The rule I worked to: no implied treatment, prevention, symptom relief or guaranteed outcomes without appropriate evidence.",
    },
  ],
};

export const insight = {
  headline: "The opportunity is not to copy the category. It’s to make a clearer choice.",
  bridge:
    "Move from “what is inside the bottle?” to “why does this matter to her?”—without claiming to treat symptoms or prevent disease.",
  patterns: [
    { title: "Life-stage relevance", note: "Earthful names a recognisable stage instead of speaking to every buyer." },
    { title: "Formulation clarity", note: "Origins Nutra leads with one rational, legible formulation story." },
    { title: "A memorable, focused proposition", note: "Zanskar’s “1 tablet” shorthand shows the power of one idea." },
    { title: "Emotional relevance without benefit overload", note: "SwissLife Forever’s line works; its stacked claims don’t." },
    { title: "Premium presentation with a specific reason to choose", note: "Swisse proves trust cues help — but can’t replace focus." },
  ],
  hypothesis:
    "For Vāyas, explore women-specific context, one clear product promise, and a simple explanation of the formulation.",
};

export type Concept = {
  slug: string;
  index: string;
  route: string;
  title: string;
  summary: string;
  audience: string | null;
  insight: string | null;
  hook: string | null;
  narrative: string | null;
  rationale: string | null;
};

export const concepts: Concept[] = [
  {
    slug: "cinematic",
    index: "01",
    route: "Cinematic",
    title: "Your Body Changes. Your Nutrition Should Too.",
    summary: "A life-stage-led story about how routines and priorities evolve.",
    audience: null,
    insight: null,
    hook: null,
    narrative: null,
    rationale: null,
  },
  {
    slug: "social-native",
    index: "02",
    route: "Social-native",
    title: "The 30+ Checklist",
    summary: "A fast, text-driven creative built around the priorities that compete for attention after 30.",
    audience: null,
    insight: null,
    hook: null,
    narrative: null,
    rationale: null,
  },
  {
    slug: "emotional",
    index: "03",
    route: "Emotional",
    title: "Take Care of What Carries You.",
    summary:
      "A movement-led story connecting everyday responsibilities with the idea of daily nutritional support.",
    audience: null,
    insight: null,
    hook: null,
    narrative: null,
    rationale: null,
  },
];

export type Film = {
  slug: string;
  conceptSlug: string;
  // Real video files — pending upload. Expected paths:
  //   /films/<slug>.mp4, /films/<slug>-poster.jpg, /films/<slug>.vtt
  video: { src: string; poster: string; captions?: string; aspect: "9/16" | "16/9" | "4/5" | "1/1" } | null;
  breakdown: string | null;
};

export const films: Film[] = [
  { slug: "cinematic", conceptSlug: "cinematic", video: null, breakdown: null },
  { slug: "social-native", conceptSlug: "social-native", video: null, breakdown: null },
  { slug: "emotional", conceptSlug: "emotional", video: null, breakdown: null },
];

export const nextSteps = {
  // Testing hypotheses — pending.
  hypotheses: null as { title: string; body: string }[] | null,
};

export type Deliverable = {
  title: string;
  kind: "PPTX" | "PDF" | "MP4";
  href: string | null;
  note?: string;
};

export const deliverables: Deliverable[] = [
  {
    title: "Static Ads — Competitive Analysis",
    kind: "PPTX",
    href: "/downloads/Vayas_Static_Ads_Competitive_Analysis.pptx",
  },
  {
    title: "Static Ads — Competitive Analysis",
    kind: "PDF",
    href: null,
  },
  {
    title: "Video Ads — Competitive Analysis",
    kind: "PPTX",
    href: "/downloads/Vayas_Video_Ads_Competitive_Analysis.pptx",
  },
  {
    title: "Video Ads — Competitive Analysis",
    kind: "PDF",
    href: null,
  },
];
