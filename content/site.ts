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
  // null = still to be supplied; a field left out entirely does not apply to this concept.
  audience: string | null;
  insight: string | null;
  hook?: string | null;
  narrative?: string | null;
  rationale: string | null;
  direction?: string;
  // Bonus concepts sit outside the three core routes and have no finished film yet.
  bonus?: {
    label: string;
    tagline: string;
    intro: string;
    format: string;
    storyboard: { title: string; description: string; image?: { src: string; alt: string } }[];
    closing: { lines: string[]; cta: string };
  };
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
    hook:
      "Everyday moments (tying shoes, picking up a bag) under the line “Your life changes in your 30s.”",
    narrative:
      "“Your routine changes. Your priorities change. So why should your nutrition stay the same?” builds over daily scenes and resolves on “Your nutrition should too.” The pack follows, with its ingredients (calcium citrate, vitamin D2, magnesium, zinc, soy isoflavones) before the end card.",
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
    hook:
      "A hand writes “Your 30+ checklist” in a notebook, setting up a list format familiar from social feeds.",
    narrative:
      "Items tick off as she moves through her day (balanced meals, regular movement, time for yourself) until an empty box asks “Bone health: on your list?”. “Meet Vāyas” introduces the pack, ingredient tags appear one by one, and it closes on “Check in with your health.”",
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
    hook:
      "Bare feet meet the floor, then shoes go on, under “Every day, your body carries you.”",
    narrative:
      "“Every step. Every responsibility. Every moment that matters.” runs over stairs, groceries, a stretch and carrying a child, landing on “You ask a lot from it.” She takes her tablet with a meal (“Daily nutritional support”), the ingredients appear, and the end card completes the line: “Take care of what carries you.”",
    rationale: null,
  },
  {
    slug: "more-moments",
    index: "04",
    route: "Animated brand film",
    title: "For More Moments Like These",
    summary:
      "A fully animated family story that connects bone health to the everyday moments worth holding on to.",
    audience:
      "Women aged 30+ who value family relationships, personal independence, and the everyday moments they want to continue enjoying as they grow older.",
    insight:
      "Health matters not only as a long-term goal, but because it is connected to the everyday experiences and relationships that make life meaningful.",
    rationale:
      "A fully animated, emotionally driven story follows an elderly grandmother through moments of discomfort and reflection before shifting toward the simple joy of gardening and family life. The familiar, expressive animation style creates an emotional connection and helps the brand stand out from conventional supplement advertising. The story concludes with Vāyas as part of a broader bone-health and wellness routine, without implying that the product cures pain or restores mobility.",
    direction:
      "Fully animated, stylized 3D with expressive characters, warm cinematic lighting, soft textures, a muted sage-green and ivory palette, and emotional family-film storytelling.",
    bonus: {
      label: "Bonus concept",
      tagline: "For More Moments Like These.",
      intro:
        "Where the first three routes are lifestyle-led, this one is an animated brand film. It tells a grandmother’s story through small, familiar moments, so the case for bone health comes from what she wants to keep doing rather than from a list of benefits.",
      format: "20-second animated film · storyboard stage",
      storyboard: [
        { title: "The Strong Beginning", description: "Grandmother shares a warm moment with her granddaughter." },
        { title: "A Small Discomfort", description: "She experiences discomfort while standing." },
        { title: "Everyday Becomes Harder", description: "Climbing stairs requires more effort." },
        { title: "It Slows You Down", description: "She reflects on her limitations." },
        {
          title: "Two Possible Tomorrows",
          description: "The emotional idea of preserving independence and everyday experiences, with no promised health outcome.",
        },
        { title: "More Good Days", description: "Gentle gardening and other meaningful everyday moments." },
        { title: "Keep Doing What You Love", description: "The emotional message is reinforced." },
        { title: "Meet Vāyas", description: "The product pack is introduced." },
        {
          title: "Thoughtful Nutrition",
          description: "Ingredient information, shown only as listed on the approved packaging.",
        },
        { title: "A Brighter Tomorrow", description: "A return to the emotional motivation." },
        { title: "Final Frame", description: "Product hero, brand message and call to action." },
      ],
      closing: {
        lines: ["For more moments like these.", "Make bone health part of your wellness routine."],
        cta: "Shop now",
      },
    },
  },
];

export type Film = {
  slug: string;
  conceptSlug: string;
  // The three finished concept films. Paths:
  //   /films/<slug>.mp4, /films/<slug>-poster.jpg, optional /films/<slug>.vtt
  video: {
    src: string;
    poster: string;
    captions?: string;
    aspect: "9/16" | "16/9" | "4/5" | "1/1";
    duration: string;
  } | null;
  breakdown: string | null;
};

export const films: Film[] = [
  {
    slug: "cinematic",
    conceptSlug: "cinematic",
    video: { src: "/films/cinematic.mp4", poster: "/films/cinematic-poster.jpg", aspect: "9/16", duration: "30s" },
    breakdown:
      "A three-part structure: a life-stage observation, the question it raises, then the product as the answer. Warm, natural-light interiors and a muted green-and-cream palette carry through to the end card, “Your body changes. Your nutrition should too.”",
  },
  {
    slug: "social-native",
    conceptSlug: "social-native",
    video: { src: "/films/social-native.mp4", poster: "/films/social-native-poster.jpg", aspect: "9/16", duration: "30s" },
    breakdown:
      "The on-screen checklist carries the story, so it reads with the sound off. The unticked box beside bone health is the turn, and the product arrives as the answer to it.",
  },
  {
    slug: "emotional",
    conceptSlug: "emotional",
    video: { src: "/films/emotional.mp4", poster: "/films/emotional-poster.jpg", aspect: "9/16", duration: "25s" },
    breakdown:
      "A rhythm of short, repeated lines, each paired with an everyday movement. The film stays on what the body does each day rather than on symptoms, and the product enters as daily support before the end card.",
  },
];
