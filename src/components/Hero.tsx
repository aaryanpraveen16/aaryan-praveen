import { useParallax } from '@/lib/animations';
import { ArrowDown } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import ScrambleText from './ScrambleText';

interface HeroProps {
  onAnimationArrival?: () => void;
  skipIntro?: boolean;
}

const Hero = ({ onAnimationArrival, skipIntro = false }: HeroProps) => {
  const parallaxOffset = useParallax(0.05);
  const heroRef = useRef<HTMLElement>(null);
  const flyingTextRef = useRef<HTMLDivElement>(null);
  
  // Stages: 'scrambling' | 'moving' | 'done'
  const [animStage, setAnimStage] = useState<'scrambling' | 'moving' | 'done'>(
    skipIntro ? 'done' : 'scrambling'
  );
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});
  const [contentVisible, setContentVisible] = useState(skipIntro);

  useEffect(() => {
    if (contentVisible) {
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
    }
  }, [contentVisible]);

  const handleScrambleComplete = () => {
    // Brief pause after decoding before gliding into position
    setTimeout(() => {
      setAnimStage('moving');

      const heroEl = flyingTextRef.current;
      const targetEl = document.getElementById('navbar-logo');

      if (heroEl && targetEl) {
        const heroRect = heroEl.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();

        // Calculate delta translation to the target's center/top-left
        const deltaX = targetRect.left - heroRect.left;
        const deltaY = targetRect.top - heroRect.top;
        
        // Calculate scale ratio between target font size and initial font size
        const scale = (targetRect.height && heroRect.height) 
          ? Math.min(Math.max(targetRect.height / heroRect.height, 0.18), 0.35)
          : 0.25;

        setFlyStyle({
          transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})`,
          transformOrigin: 'top left',
          transition: 'transform 950ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease 750ms',
          opacity: 0,
        });
      } else {
        // Fallback calculation towards top-left
        setFlyStyle({
          transform: `translate3d(calc(-50vw + 4rem), calc(-50vh + 2rem), 0) scale(0.25)`,
          transformOrigin: 'top left',
          transition: 'transform 950ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease 750ms',
          opacity: 0,
        });
      }

      // When the decoded text arrives at the navbar logo position
      setTimeout(() => {
        setAnimStage('done');
        if (onAnimationArrival) {
          onAnimationArrival();
        }
        setContentVisible(true);
      }, 950);
    }, 450);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/[0.04] dark:bg-primary/[0.07] rounded-full blur-3xl"
          style={{ transform: `translate(-50%, ${parallaxOffset * 1.2}px)` }}
        />
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center text-center z-10">
        {animStage !== 'done' && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
            <div
              ref={flyingTextRef}
              style={flyStyle}
              className="inline-block will-change-transform"
            >
              <ScrambleText
                text="Aaryan"
                className="text-6xl md:text-8xl font-bold font-display"
                duration={1100}
                delay={200}
                onComplete={handleScrambleComplete}
              />
            </div>
          </div>
        )}

        {(animStage === 'moving' || animStage === 'done') && (
          <>
            <div className={`animate-on-load opacity-0 inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full border border-border/80 bg-background/60 backdrop-blur-sm text-xs font-mono text-muted-foreground ${contentVisible ? '' : 'hidden'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Mumbai</span>
              <span className="text-border">/</span>
              <span>Northeastern grad</span>
            </div>

            <h1 className={`animate-on-load opacity-0 font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-3xl text-foreground ${contentVisible ? '' : 'hidden'}`}>
              Hey, I’m Aaryan. I build software.
            </h1>

            <p className={`animate-on-load opacity-0 text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-xl font-normal leading-relaxed ${contentVisible ? '' : 'hidden'}`}>
              Lately I’ve been making a traffic simulator and tinkering with RAG search and voice agents.
            </p>

            <div className={`animate-on-load opacity-0 flex flex-col sm:flex-row items-center gap-4 ${contentVisible ? '' : 'hidden'}`}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                View Resume
              </a>
              <a
                href="#projects"
                className="px-6 py-3 rounded-lg bg-secondary/80 backdrop-blur-sm text-secondary-foreground font-medium transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                View Projects
              </a>
            </div>
          </>
        )}
      </div>

      <a
        href="#about"
        className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors ${contentVisible ? '' : 'hidden'}`}
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
