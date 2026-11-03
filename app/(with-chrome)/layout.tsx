import { SiteChrome } from "@/app/components/site-chrome";

export default function WithChromeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteChrome>{children}</SiteChrome>;
}
