import Motion from "@/components/Motion";
import MotionToggle from "@/components/MotionToggle";
import Nav from "@/components/Nav";
import {
  Footer,
  Hero,
  Lives,
  Preloader,
  Signal,
  Story,
  Tracks,
  Vibe,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <Preloader />
      <main id="main" tabIndex={-1}>
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
      <MotionToggle />
      <Motion />
    </>
  );
}
