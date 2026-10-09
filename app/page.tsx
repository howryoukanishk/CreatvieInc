import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Brief, CreativeLab, Films, Footer, Hero, Insight, Research } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <a
        href="#brief"
        className="label sr-only z-[70] rounded bg-yellow px-3 py-2 text-forest focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Brief />
        <Research />
        <Insight />
        <CreativeLab />
        <Films />
      </main>
      <Footer />
    </>
  );
}
