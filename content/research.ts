// Research content transcribed from the two competitive-analysis decks.
// Scores are subjective creative assessments (5 criteria × 5 points), not performance data.

export const SCORE_DISCLAIMER =
  "Subjective creative assessment — not CTR, conversions, sales, ROAS or proof that an ad performed well.";

export const criteria = [
  { id: "01", title: "Hook & attention", question: "Does the opening create a reason to stop and look?" },
  { id: "02", title: "Audience relevance", question: "Is the intended audience or need recognisable?" },
  { id: "03", title: "Story + product", question: "Does the product fit naturally into the creative?" },
  { id: "04", title: "Message clarity", question: "Is the main proposition focused and differentiated?" },
  { id: "05", title: "Structure + action", question: "Does the ad progress logically and give a next step?" },
];

export type StaticAd = {
  slug: string;
  brand: string;
  score: number;
  territory: string;
  angle: string;
  headline: string;
  image: { src: string; width: number; height: number; alt: string };
  works: string[];
  fallsShort: string[];
  takeaway: string;
  source: string;
};

export const staticAds: StaticAd[] = [
  {
    slug: "earthful",
    brand: "Earthful",
    score: 19,
    territory: "Life-stage relevance",
    angle: "Life-stage + combo offer",
    headline: "“Multivitamin for Menopause + Calcium for Knee Pain”",
    image: {
      src: "/research/static/earthful-static-ad.png",
      width: 338,
      height: 600,
      alt: "Earthful Meta ad pairing a menopause multivitamin with a calcium product as a bundle offer",
    },
    works: [
      "Names a recognisable life stage instead of speaking to every supplement buyer.",
      "Combines two products into a contextual bundle and makes the ₹200 offer visible.",
      "The product and offer can be understood quickly in a feed.",
    ],
    fallsShort: [
      "The menopause and knee-pain message risks implying a simple causal relationship.",
      "Two products and multiple concerns compete for one clear promise.",
      "The visual is conventional product-led ecommerce rather than a distinctive story.",
    ],
    takeaway:
      "Keep the life-stage specificity, but make the product role and one substantiated benefit unmistakable.",
    source: "https://www.facebook.com/ads/library/?id=884005577869266",
  },
  {
    slug: "origins-nutra",
    brand: "Origins Nutra",
    score: 18,
    territory: "Formulation clarity",
    angle: "Absorption + formulation",
    headline: "“Stronger bones start with better calcium absorption.”",
    image: {
      src: "/research/static/origins-nutra-static-ad.png",
      width: 600,
      height: 600,
      alt: "Origins Nutra Meta ad showing a hand-held calcium, D3 and K2 pack with three supporting points",
    },
    works: [
      "One dominant proposition gives the viewer a clear reason to look.",
      "Calcium + D3 + K2 and the three short supporting points create a simple information hierarchy.",
      "The hand-held pack makes the product tangible and legible.",
    ],
    fallsShort: [
      "The audience is broad, not specifically women.",
      "“Clinically backed” and absorption-related claims need evidence and careful qualification.",
      "The rational layout offers limited emotional or life-stage relevance.",
    ],
    takeaway:
      "Use one clear formulation story—not a long ingredient list—and substantiate any superiority claim.",
    source: "https://www.facebook.com/ads/library/?id=1066740682988543",
  },
  {
    slug: "zanskar",
    brand: "Zanskar",
    score: 17,
    territory: "All-in-one proposition",
    angle: "Complete bone nutrition",
    headline: "“1 tablet — total bone nutrition.”",
    image: {
      src: "/research/static/zanskar-static-ad.png",
      width: 600,
      height: 600,
      alt: "Zanskar Meta ad with a central pack and nutrient list under the line ‘1 tablet — total bone nutrition’",
    },
    works: [
      "The headline gives an immediate shorthand for the product proposition.",
      "The pack sits at the visual centre and the nutrient set supports the all-in-one idea.",
      "The creative gives several entry points into bone-health concerns.",
    ],
    fallsShort: [
      "Ingredients, concerns and benefits compete for attention.",
      "The “70% Indians = Calcium Deficient” statistic needs independent verification.",
      "The message is not strongly tailored to women.",
    ],
    takeaway: "Completeness can differentiate, but simplify the hierarchy and avoid unverified statistics.",
    source: "https://www.facebook.com/ads/library/?id=993168736682315",
  },
  {
    slug: "swisslife-forever",
    brand: "SwissLife Forever",
    score: 17,
    territory: "Emotional benefit",
    angle: "Bone health + broader wellness",
    headline: "“Strong bones. Stronger you.”",
    image: {
      src: "/research/static/swisslife-forever-static-ad.png",
      width: 504,
      height: 600,
      alt: "SwissLife Forever Meta ad combining bone imagery, botanical cues, pack, price and delivery details",
    },
    works: [
      "The line turns a functional benefit into a broader emotional promise.",
      "Bone imagery, botanical cues and an active-wellness aesthetic feel coherent.",
      "Pack size, price and delivery details make the offer concrete.",
    ],
    fallsShort: [
      "Bone health, immunity, neural support, muscles, ingredients and price compete for attention.",
      "The creative is not women-specific.",
      "The breadth of benefit claims requires substantiation.",
    ],
    takeaway:
      "Keep one lead benefit; let supporting claims sit lower in the hierarchy instead of competing equally.",
    source: "https://www.facebook.com/ads/library/?id=2718309235206360",
  },
  {
    slug: "swisse",
    brand: "Swisse",
    score: 16,
    territory: "Premium trust",
    angle: "Premium brand trust",
    headline: "“Stronger bones, better recovery, superior health.”",
    image: {
      src: "/research/static/swisse-static-ad.png",
      width: 600,
      height: 600,
      alt: "Swisse Meta ad with prominent calcium and magnesium packs and premium brand presentation",
    },
    works: [
      "Established brand codes and Australian-origin cues can act as trust signals.",
      "Calcium + magnesium creates a broader formulation story.",
      "The packs are prominent and the presentation feels premium.",
    ],
    fallsShort: [
      "The promise expands into recovery, sleep, tiredness and cramps.",
      "It is not built around a specific women’s need.",
      "Multiple functional claims dilute the main message and require substantiation.",
    ],
    takeaway:
      "Brand familiarity can support trust, but it cannot replace a focused, audience-relevant proposition.",
    source: "https://www.facebook.com/ads/library/?id=952562043302311",
  },
];

export type VideoAd = {
  slug: string;
  brand: string;
  product: string;
  score: number;
  mechanism: string;
  angle: string;
  adjacent?: boolean;
  hook: string;
  narrative: string;
  productIntegration: string;
  works: string[];
  weakness: string[];
  learning: string;
  source: string;
  // Original ad file downloaded from the Meta Ad Library, plus a frame from it as the poster.
  // Leave null until the asset exists.
  media: { video: string; poster: string; label: string } | null;
};

export const videoAds: VideoAd[] = [
  {
    slug: "zanskar",
    brand: "Zanskar",
    product: "Advanced Bone Health",
    score: 19,
    mechanism: "3D bone biology",
    angle: "3D bone biology / age-related contrast",
    hook: "Opens with a visual question/contrast — “25 or 65” — before moving inside the body.",
    narrative:
      "A stylised internal view of bone activity, with osteoclast/osteoblast-style characters and rebuilding imagery turning bone remodelling into a visual story.",
    productIntegration: "The product arrives after the educational setup, with a formulation-led end frame.",
    works: [
      "The 3D bone world is a distinctive visual break from talking-head supplement ads.",
      "Osteoclast/osteoblast-style characters and rebuilding imagery turn bone remodelling into a visual narrative.",
      "The product arrives after the educational setup, with a formulation-led end frame.",
    ],
    weakness: [
      "The animation is visually memorable but the scientific story may be hard to retain without a simpler verbal takeaway.",
      "The product appears to include several nutrients; women-specific relevance is limited.",
    ],
    learning:
      "If Vāyas uses education, build the story around one accurate, memorable visual idea—and ensure the spoken explanation matches the science.",
    source: "https://www.facebook.com/ads/library/?id=2319141408905145",
    media: {
      video: "/research/video/zanskar-video-ad.mp4",
      poster: "/research/video/zanskar-poster.jpg",
      label: "Zanskar video ad: 3D animation of bone cells rebuilding bone",
    },
  },
  {
    slug: "earthful",
    brand: "Earthful",
    product: "Multivitamin 40+ / Menopause support",
    score: 20,
    mechanism: "Family story + menopause",
    angle: "Family observation / women’s life stage",
    hook: "A phone search about a mother’s behaviour and symptoms — a recognisable family moment, not a pack shot.",
    narrative:
      "The search leads into a “MENOPAUSE” title, then scenes of knee pain and daily life at home make the problem concrete.",
    productIntegration:
      "The product (Multivitamin 40+) appears only after the human context is established — it is not a calcium-only ad.",
    works: [
      "The story starts with a recognisable family situation rather than a product pack.",
      "The menopause title makes the intended life stage explicit.",
      "Everyday home scenes make the problem concrete before the product appears.",
    ],
    weakness: [
      "The video moves between mood/menopause, knee discomfort and a multivitamin product, which can blur the central promise.",
      "Symptom-relief implications need substantiation and careful wording.",
    ],
    learning:
      "Use a specific life-stage insight, but keep the need, product role and supportable claim aligned. Don’t imply one supplement addresses every symptom.",
    source: "https://www.facebook.com/ads/library/?id=2702285403506986",
    media: {
      video: "/research/video/earthful-video-ad.mp4",
      poster: "/research/video/earthful-poster.jpg",
      label: "Earthful video ad: a son searching on his phone why his mother is always tired",
    },
  },
  {
    slug: "restore-joint",
    brand: "Elegance-O / Restore Joint",
    product: "Restore Joint",
    score: 19,
    mechanism: "Direct-to-camera explanation",
    angle: "Creator explanation / daily calcium concern",
    hook: "A woman speaks directly to camera about joint concerns and taking calcium daily.",
    narrative: "The concern is stated in plain, conversational language before any packshot appears.",
    productIntegration: "Shows the Restore Joint bottle and the supplement being taken with water.",
    works: [
      "A person speaking directly to camera gives the ad a conversational, creator-led feel.",
      "The concern is stated in plain language before the packshot.",
      "Product demonstration makes the format and usage tangible.",
    ],
    weakness: [
      "The relationship between calcium, joint concerns and digestion is not explained with enough nuance.",
      "The reason to choose it needs a clearer, substantiated differentiator than a general joint-health promise.",
    ],
    learning:
      "A formulation-led creator ad should explain one credible difference clearly, rather than implying broad cause-and-effect between calcium and joint symptoms.",
    source: "https://www.facebook.com/ads/library/?id=940577628698244",
    media: {
      video: "/research/video/restore-joint-video-ad.mp4",
      poster: "/research/video/restore-joint-poster.jpg",
      label: "Restore Joint video ad: a woman speaking to camera about daily calcium and joint pain",
    },
  },
  {
    slug: "lightyears-move-easy",
    brand: "LightYears Health",
    product: "Move Easy joint-health supplement",
    score: 19,
    mechanism: "Movement problem + science cues",
    angle: "Everyday pain point / science cues",
    adjacent: true,
    hook: "People walking or struggling with movement, then a woman bending with knee discomfort.",
    narrative:
      "Moves into cartilage visuals, mechanism cues and a study screenshot, with Hindi/Hinglish captions throughout.",
    productIntegration: "Product and testimonial segment follow the science explanation.",
    works: [
      "Visible everyday movement difficulties make the problem immediately legible.",
      "The Hindi/Hinglish captions feel native to the intended audience.",
      "Mechanism/science cues and a study screenshot support its story.",
    ],
    weakness: [
      "Primarily a joint-mobility/Boswellia-led adjacent-category ad, not a direct calcium-for-women competitor.",
      "Stacks ingredients, mechanism, study, time-to-result and format benefits, which risks overload.",
    ],
    learning:
      "Treat this as an adjacent-category reference for problem-led storytelling—not proof of how calcium ads perform. Keep the problem and product category tightly matched.",
    source: "https://www.facebook.com/ads/library/?id=1023247943880206",
    media: {
      video: "/research/video/lightyears-move-easy-video-ad.mp4",
      poster: "/research/video/lightyears-move-easy-poster.jpg",
      label: "LightYears Move Easy video ad: people walking with visible knee discomfort",
    },
  },
  {
    slug: "the-body-reserve",
    brand: "The Body Reserve",
    product: "Multi-nutrient bone / joint support",
    score: 18,
    mechanism: "Customer label + all-in-one",
    angle: "Real-customer label / all-in-one convenience",
    hook: "A hand-held bottle under “REAL CUSTOMER REAL EXPERIENCES”.",
    narrative: "Names calcium, magnesium, zinc, D3 and K2, then cuts to gym lifting footage.",
    productIntegration:
      "Product and ingredient set shown early; “You don’t need to take multiple supplements” carries the convenience argument.",
    works: [
      "The “real customer experiences” label signals testimonial-style social proof quickly.",
      "The product and ingredient set are shown early, so the basic proposition is clear.",
      "“You don’t need to take multiple supplements” is the clearest convenience argument.",
    ],
    weakness: [
      "Largely product close-up and gym b-roll, with little personal narrative to substantiate the “experience” framing.",
      "The gym setting signals an active lifestyle, but does not establish a women-30+ context.",
    ],
    learning:
      "If using an all-in-one claim, make convenience the single lead idea and support it with a credible, relevant user story.",
    source: "https://www.facebook.com/ads/library/?id=2055520835070847",
    media: {
      video: "/research/video/the-body-reserve-video-ad.mp4",
      poster: "/research/video/the-body-reserve-poster.jpg",
      label: "The Body Reserve video ad: hand-held bottle under a “Real customer, real experiences” label",
    },
  },
];
