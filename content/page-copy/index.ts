import { aiCopy } from "./ai";
import { designCopy } from "./design";
import { developmentAppsCopy } from "./development-apps";
import { developmentCommerceCopy } from "./development-commerce";
import { developmentWebCopy } from "./development-web";
import { hubCopy } from "./hubs";
import { marketingMeasureCopy } from "./marketing-measure";
import { marketingPaidCopy } from "./marketing-paid";
import { marketingSeoCopy } from "./marketing-seo";
import type { ServicePageCopy } from "./types";

export type { ServicePageCopy } from "./types";

export const servicePageCopy: Record<string, ServicePageCopy> = {
  ...hubCopy,
  ...designCopy,
  ...developmentWebCopy,
  ...developmentCommerceCopy,
  ...developmentAppsCopy,
  ...aiCopy,
  ...marketingSeoCopy,
  ...marketingPaidCopy,
  ...marketingMeasureCopy,
};
