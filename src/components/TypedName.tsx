
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypedNameProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}

const TypedName = ({ 
  text, 
  className, 
  delay = 500, 
  speed = 100,
  onComplete 
}: TypedNameProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Delay before starting to type
    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    let index = 0;
    
    const typeNextChar = () => {
      if (index < text.length) {
        setDisplayText(text.substring(0, index + 1));
        index++;
        timer.current = setTimeout(typeNextChar, speed);
      } else {
        setIsTyping(false);
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    };

    timer.current = setTimeout(typeNextChar, speed);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [isTyping, text, speed, onComplete]);

  return (
    <span 
      className={cn(
        "inline-block",
        isComplete && "after:content-['|'] after:animate-[fadeInOut_1s_ease-in-out_infinite]",
        className
      )}
    >
      {displayText}
    </span>
  );
};

export default TypedName;
