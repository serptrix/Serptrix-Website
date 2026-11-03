import ServicesPage from "@/app/components/services-overview/services-page";

export const metadata = {
  title: "Services",
  description:
    "Design, development, AI and digital marketing services from Serptrix—explained plainly so you can pick where to start.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Serptrix Services",
    description: "Design, development, AI and marketing, explained plainly.",
    url: "/services",
  },
};

export default function Services() {
  return <ServicesPage />;
}
