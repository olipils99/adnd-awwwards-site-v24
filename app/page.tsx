import Hero from "../components/Hero";
import BloomSection from "../components/BloomSection";
import GrowthStory from "../components/GrowthStory";
import EcoDesign from "../components/EcoDesign";
import ParallaxSection from "../components/ParallaxSection";
import ServiceCards from "../components/ServiceCards";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import SocialsBar from "../components/SocialsBar";

export default function Page() {
  return (
    <main>
      <Hero />
      <BloomSection />
      <GrowthStory />
      <EcoDesign />

      <ParallaxSection />
      <ServiceCards />
      <Projects />
      <Testimonials />
      <SocialsBar />
      <Footer />
    </main>
  );
}
