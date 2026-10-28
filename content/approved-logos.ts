export type ApprovedLogo = {
  name: string;
  image: string;
  destination?: string;
  relationship: "client" | "technology" | "platform" | "brand";
};

// Add logos here only after the relationship and publication permission are verified.
// An empty registry intentionally keeps the production marquee hidden.
export const approvedAgencyLogos: ApprovedLogo[] = [];

// Safe local fixtures for component development; never used on production pages.
export const logoMarqueePreviewItems: ApprovedLogo[] = [
  { name: "Serptrix", image: "/Serptrix-header.svg", relationship: "brand" },
  { name: "Serptrix light", image: "/serptrix_footer.svg", relationship: "brand" },
];
