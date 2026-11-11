export type CopyCard = { title: string; items: string[] };
export type CopyStep = { n: string; title: string; copy: string };
export type CopyMetric = { title: string; copy: string };
export type CopyFaq = { q: string; a: string };

export type ServicePageCopy = {
  metaTitle: string;
  metaDescription: string;
  h1?: string;
  lede?: string;
  overview?: string;
  fitHeading?: string;
  fitTitle?: string;
  fitGood?: string[];
  fitNot?: string[];
  scopeHeading?: string;
  deliverables?: CopyCard[];
  processHeading?: string;
  stages?: CopyStep[];
  evidenceTitle?: string;
  metrics?: CopyMetric[];
  noPromise?: string;
  pricingNote?: string;
  faqs?: CopyFaq[];
};

export function entry(
  metaTitle: string,
  metaDescription: string,
  h1: string,
  lede: string,
  overview: string,
  fitHeading: string,
  fitTitle: string,
  fitGood: string[],
  fitNot: string[],
  scopeHeading: string,
  cards: [string, string, string, string][],
  processHeading: string,
  stages: [string, string][],
  evidenceTitle: string,
  metrics: [string, string][],
  noPromise: string,
  pricingNote: string,
  faqs: [string, string][],
): ServicePageCopy {
  return {
    metaTitle,
    metaDescription,
    h1,
    lede,
    overview,
    fitHeading,
    fitTitle,
    fitGood,
    fitNot,
    scopeHeading,
    deliverables: cards.map(([title, a, b, c]) => ({ title, items: [a, b, c] })),
    processHeading,
    stages: stages.map(([title, copy], index) => ({ n: String(index + 1), title, copy })),
    evidenceTitle,
    metrics: metrics.map(([title, copy]) => ({ title, copy })),
    noPromise,
    pricingNote,
    faqs: faqs.map(([q, a]) => ({ q, a })),
  };
}
