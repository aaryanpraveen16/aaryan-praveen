
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const toggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTheme(theme === 'light' ? 'dark' : 'light');
      setIsAnimating(false);
    }, 300);
  };
  
  return (
    <button
      onClick={toggleTheme}
      className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
        isAnimating ? 'scale-90' : 'scale-100'
      } ${
        theme === 'dark' ? 'bg-secondary text-secondary-foreground' : 'bg-secondary/50 text-secondary-foreground'
      } hover:bg-secondary/80`}
      aria-label="Toggle theme"
    >
      <span className={`absolute transition-all duration-300 ${theme === 'dark' ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}>
        <Sun className="w-5 h-5" />
      </span>
      <span className={`absolute transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
        <Moon className="w-5 h-5" />
      </span>
    </button>
  );
};

export default ThemeToggle;
