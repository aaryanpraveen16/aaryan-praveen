
import { navLinks } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/lib/animations';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const scrollY = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call it initially
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Show the logo after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 3000); // Total time of typing animation + delay before minimizing
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 lg:px-20',
        scrollY > 10
          ? 'py-4 backdrop-blur-md bg-background/70 border-b border-border/50'
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a 
          href="#home" 
          className={cn(
            "text-xl font-medium transition-all duration-500 relative",
            showLogo 
              ? "opacity-100 transform translate-y-0" 
              : "opacity-0 transform -translate-y-4"
          )}
        >
          Aaryan
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                'relative text-sm transition-all hover:text-primary after:content-[""] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300',
                activeSection === link.href.substring(1) 
                  ? 'after:scale-x-100 after:origin-bottom-left text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4 z-50">
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 bg-background/95 backdrop-blur-md z-40 transition-transform duration-300 md:hidden h-screen',
          isMenuOpen ? 'translate-x-0 bottom-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                'text-xl transition-colors hover:text-primary',
                activeSection === link.href.substring(1) 
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
