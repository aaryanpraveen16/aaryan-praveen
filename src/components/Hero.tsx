
import { useParallax } from '@/lib/animations';
import { ArrowDown } from 'lucide-react';
import { useRef, useEffect } from 'react';

const Hero = () => {
  const parallaxOffset = useParallax(0.05);
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Animation for hero elements on load
    const timers: NodeJS.Timeout[] = [];
    
    const elements = heroRef.current?.querySelectorAll('.animate-on-load');
    elements?.forEach((el, index) => {
      const timer = setTimeout(() => {
        el.classList.add('animate-fade-in');
        el.classList.remove('opacity-0');
      }, 100 * (index + 1));
      
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 filter blur-3xl"
          style={{ transform: `translateY(${parallaxOffset * 2}px)` }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/5 dark:bg-primary/10 filter blur-3xl"
          style={{ transform: `translateY(${parallaxOffset * 1.5}px)` }}
        />
      </div>
      
      <div className="container mx-auto px-6 flex flex-col items-center text-center z-10">
        <span className="animate-on-load opacity-0 inline-block px-4 py-1.5 mb-6 text-sm rounded-full bg-secondary/80 text-secondary-foreground backdrop-blur-sm">
          Frontend Developer & UI Designer
        </span>
        
        <h1 className="animate-on-load opacity-0 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
          Creating <span className="relative inline-block">
            digital
            <span className="absolute bottom-0 left-0 right-0 h-3 bg-primary/10 -z-10 translate-y-2"></span>
          </span> experiences that <span className="relative inline-block">
            matter
            <span className="absolute bottom-0 left-0 right-0 h-3 bg-primary/10 -z-10 translate-y-2"></span>
          </span>
        </h1>
        
        <p className="animate-on-load opacity-0 text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
          I build sleek, intuitive interfaces and experiences that help businesses
          connect with their users in meaningful ways.
        </p>
        
        <div className="animate-on-load opacity-0 flex flex-col sm:flex-row items-center gap-4">
          <a 
            href="#projects" 
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
          >
            View Projects
          </a>
          <a 
            href="#contact" 
            className="px-6 py-3 rounded-lg bg-secondary/80 backdrop-blur-sm text-secondary-foreground font-medium transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
          >
            Contact Me
          </a>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="text-sm mb-2">Scroll Down</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
