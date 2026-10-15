import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  onComplete?: () => void;
}

const GLYPHS = '01#@%&*<>{}[]/\\_+=~^!?';

export const ScrambleText = ({
  text,
  className,
  delay = 200,
  duration = 1200,
  onComplete,
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    let startTimer: NodeJS.Timeout;

    startTimer = setTimeout(() => {
      const startTime = performance.now();
      const length = text.length;

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Characters unlocked based on progress curve
        const revealedCount = Math.floor(progress * length);

        let result = '';
        for (let i = 0; i < length; i++) {
          if (i < revealedCount) {
            result += text[i];
          } else {
            // Random glitch glyph
            const randomChar = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            result += randomChar;
          }
        }

        setDisplayText(result);

        if (progress < 1) {
          animRef.current = requestAnimationFrame(update);
        } else {
          setDisplayText(text);
          setIsDone(true);
          if (onComplete) {
            onComplete();
          }
        }
      };

      animRef.current = requestAnimationFrame(update);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [text, delay, duration, onComplete]);

  return (
    <span
      className={cn(
        'font-mono tracking-wider inline-block select-none font-bold',
        !isDone && 'text-primary/90 drop-shadow-[0_0_12px_hsl(var(--primary)/0.4)]',
        isDone && 'font-display tracking-tight text-foreground transition-all duration-300',
        className
      )}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;
