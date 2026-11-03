import AboutPage from "@/app/components/about/about-page";

export const metadata = {
  title: "About",
  description:
    "Serptrix connects design, development, AI, and digital marketing around clear business problems and practical delivery.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return <AboutPage />;
}
