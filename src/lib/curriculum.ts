export type Section = "quantitative" | "logical" | "verbal";

export const SECTION_LABEL: Record<Section, string> = {
  quantitative: "Quantitative Aptitude",
  logical: "Logical Reasoning",
  verbal: "Verbal Ability",
};

export const CURRICULUM: Record<Section, string[]> = {
  quantitative: [
    "Number System", "HCF and LCM", "Decimal Fractions", "Simplification", "Percentages",
    "Profit, Loss and Discounts", "Simple and Compound Interest", "Ratios, Proportions and Variations",
    "Partnership", "Ages", "Averages", "Alligations and Mixtures", "Time and Work",
    "Time, Speed and Distance", "Trains, Boats and Streams, Races", "Permutation and Combination",
    "Probability", "Data Interpretation", "Mensuration",
  ],
  logical: [
    "Blood Relations", "Direction Sense Test", "Series", "Coding and Decoding", "Analogy",
    "Seating Arrangement", "Data Arrangement", "Clocks", "Calendars", "Syllogisms",
    "Data Sufficiency", "Cubes", "Visual Reasoning", "Cryptarithmetic",
  ],
  verbal: [
    "Articles and Prepositions", "Tenses and Subject-Verb Agreement", "Change of Voice and Speech",
    "Error Spotting and Sentence Correction", "Synonyms, Antonyms, and Verbal Analogy",
    "Sentence Completion and One-Word Substitution", "Para Jumbles and Cloze Test",
    "Reading Comprehension", "Critical Reasoning",
  ],
};

export const ALL_MODULES = (Object.keys(CURRICULUM) as Section[]).flatMap((s) =>
  CURRICULUM[s].map((m) => ({ section: s, module: m }))
);

export const moduleSection = (module: string): Section | undefined =>
  ALL_MODULES.find((m) => m.module === module)?.section;

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const BLUEPRINTS: Record<number, Record<Section, number>> = {
  30: { quantitative: 10, logical: 10, verbal: 10 },
  60: { quantitative: 20, logical: 20, verbal: 20 },
  90: { quantitative: 30, logical: 30, verbal: 30 },
  120: { quantitative: 40, logical: 40, verbal: 40 },
};
