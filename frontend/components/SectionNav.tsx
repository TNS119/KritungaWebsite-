'use client';

import React, { useState, useEffect } from 'react';
import { Crown, Sparkles, Utensils, ShoppingBag, MapPin } from 'lucide-react';

const SECTIONS = [
  { id: 'hero-experience', label: 'Veil', icon: Crown },
  { id: 'palegar-anatomy', label: 'Secrets', icon: Utensils },
  { id: 'sensory-crucible', label: 'Physics', icon: Sparkles },
  { id: 'royal-packs', label: 'Feast Box', icon: ShoppingBag },
  { id: 'brand-footer', label: 'Outlets', icon: MapPin },
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState<string>('hero-experience');
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroHeight = window.innerHeight;

      // Only show the floating navbar once scrolled past the hero/video section
      const isPastHero = scrollY > heroHeight * 0.5;
      setVisible(isPastHero);

      const scrollPosition = scrollY + window.innerHeight / 3;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <div className="glass-panel px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full border dark:border-palegar-gold/30 border-palegar-lightGold/40 shadow-2xl flex items-center gap-1 sm:gap-2 backdrop-blur-xl">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-palegar-chilli to-palegar-crimson text-palegar-text shadow-md shadow-palegar-chilli/40 border border-palegar-gold/40 scale-105'
                  : 'dark:text-palegar-text/70 text-palegar-lightText/70 hover:text-palegar-gold dark:hover:text-palegar-gold hover:bg-palegar-gold/10'
              }`}
              title={sec.label}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-palegar-goldLight' : 'dark:text-palegar-gold/70 text-palegar-lightGold'}`} />
              <span className="hidden sm:inline text-[11px] uppercase font-bold tracking-wider">
                {sec.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

