import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Approach from "@/components/Approach";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import VisitBeacon from "@/components/VisitBeacon";

export default function Home() {
  return (
    <main>
      <VisitBeacon />
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Approach />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
