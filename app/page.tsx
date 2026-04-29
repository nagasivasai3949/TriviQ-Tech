import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CaseStudy from "@/components/CaseStudy";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Approach from "@/components/Approach";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
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
      <CaseStudy />
      <Marquee />
      <Services />
      <Approach />
      <Projects />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
