import Motion from "@/components/Motion";
import {
  Footer,
  Hero,
  Lives,
  Navigation,
  Preloader,
  Signal,
  Story,
  Tracks,
  Vibe,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Navigation />
      <Preloader />
      <main>
        <Hero />
        <Vibe />
        <Tracks />
        <Lives />
        <Story />
        <div className="mask">
          <Signal />
          <Footer />
        </div>
      </main>
      <Motion />
    </>
  );
}
