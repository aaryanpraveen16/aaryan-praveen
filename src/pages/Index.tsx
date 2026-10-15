
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNavbarLogo, setShowNavbarLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navbar showLogo={showNavbarLogo} />
      <main>
        <Hero onAnimationArrival={() => setShowNavbarLogo(true)} />
        <About />
        <Experience />
        <Education />
        <Achievements />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      
      <footer className="py-10 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
      
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-24 right-6 p-2.5 rounded-full bg-secondary/80 backdrop-blur border border-border text-foreground hover:bg-secondary shadow-lg transition-all duration-300 z-40",
          showScrollTop 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      <ChatbotWidget />
    </div>
  );
};

export default Index;
