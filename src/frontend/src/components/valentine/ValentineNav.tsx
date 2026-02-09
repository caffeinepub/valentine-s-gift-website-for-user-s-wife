import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export function ValentineNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-card/80 backdrop-blur-md shadow-romantic' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Heart className="h-6 w-6 fill-current" />
            <span className="font-display text-xl hidden sm:inline">Our Love Story</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-6 text-sm">
            <button
              onClick={() => scrollToSection('love-letter')}
              className="hover:text-primary transition-colors"
            >
              Letter
            </button>
            <button
              onClick={() => scrollToSection('reasons')}
              className="hover:text-primary transition-colors"
            >
              Reasons
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="hover:text-primary transition-colors"
            >
              Story
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="hover:text-primary transition-colors"
            >
              Gallery
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
