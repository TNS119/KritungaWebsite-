'use client';

import React, { useState, useEffect } from 'react';
import { Flame, UtensilsCrossed, PhoneCall, Sparkles, Menu, X, ShoppingBag, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface NavbarProps {
  onOpenOrderModal: () => void;
}

export default function Navbar({ onOpenOrderModal }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'dark:bg-palegar-bg/95 bg-white/95 backdrop-blur-md py-3 border-b dark:border-palegar-gold/20 border-palegar-lightGold/30 shadow-2xl dark:shadow-palegar-bg shadow-black/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Crest & Title */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group text-left shrink-0"
          id="nav-logo-btn"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border dark:border-palegar-gold/70 border-palegar-lightGold shadow-lg dark:shadow-palegar-crimson/40 shadow-palegar-lightGold/30 group-hover:scale-105 group-hover:border-palegar-gold transition-all duration-300 shrink-0">
            <img
              src="/images/kritunga-logo.png"
              alt="Kritunga Royal Emblem"
              className="w-full h-full object-cover block"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 leading-none">
              <span className={`font-cinzel text-lg sm:text-xl font-bold tracking-widest ${
                scrolled
                  ? 'dark:text-palegar-text text-palegar-lightText'
                  : 'text-palegar-text drop-shadow-md'
              } group-hover:text-palegar-gold transition-colors`}>
                KRITUNGA
              </span>
            </div>
            <p className={`text-[9px] sm:text-[10px] tracking-widest ${
              scrolled
                ? 'dark:text-palegar-gold/80 text-palegar-lightGold'
                : 'text-palegar-goldLight'
            } font-semibold uppercase mt-0.5`}>
              The Palegar&apos;s Cuisine
            </p>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center mx-6 xl:mx-10 gap-6 xl:gap-8 text-xs sm:text-sm font-medium tracking-wide">
          <button
            onClick={() => scrollTo('hero-experience')}
            className={`${
              scrolled
                ? 'dark:text-palegar-text/80 text-palegar-lightText/80 hover:text-palegar-gold dark:hover:text-palegar-gold'
                : 'text-palegar-text/90 hover:text-palegar-goldLight drop-shadow'
            } transition-colors inline-flex items-center gap-1.5 whitespace-nowrap group`}
          >
            <span>Royal Veil</span>
          </button>
          <button
            onClick={() => scrollTo('palegar-anatomy')}
            className={`${
              scrolled
                ? 'dark:text-palegar-text/80 text-palegar-lightText/80 hover:text-palegar-gold dark:hover:text-palegar-gold'
                : 'text-palegar-text/90 hover:text-palegar-goldLight drop-shadow'
            } transition-colors inline-flex items-center gap-1.5 whitespace-nowrap group`}
          >
            <span>Culinary Secrets</span>
          </button>
          <button
            onClick={() => scrollTo('sensory-crucible')}
            className={`${
              scrolled
                ? 'dark:text-palegar-text/80 text-palegar-lightText/80 hover:text-palegar-gold dark:hover:text-palegar-gold'
                : 'text-palegar-text/90 hover:text-palegar-goldLight drop-shadow'
            } transition-colors whitespace-nowrap`}
          >
            Sensory Physics
          </button>
          <button
            onClick={() => scrollTo('royal-packs')}
            className={`${
              scrolled
                ? 'dark:text-palegar-text/80 text-palegar-lightText/80 hover:text-palegar-gold dark:hover:text-palegar-gold'
                : 'text-palegar-text/90 hover:text-palegar-goldLight drop-shadow'
            } transition-colors whitespace-nowrap`}
          >
            Palegar Feast Box
          </button>
          <button
            onClick={() => scrollTo('brand-footer')}
            className={`${
              scrolled
                ? 'dark:text-palegar-text/80 text-palegar-lightText/80 hover:text-palegar-gold dark:hover:text-palegar-gold'
                : 'text-palegar-text/90 hover:text-palegar-goldLight drop-shadow'
            } transition-colors whitespace-nowrap`}
          >
            Royal Outlets
          </button>
        </nav>

        {/* Action CTAs & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Luxury Sun / Moon Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`relative p-2.5 rounded-full border ${
              scrolled
                ? 'dark:border-palegar-gold/40 border-palegar-lightGold/50 dark:bg-palegar-card/80 bg-white shadow-sm'
                : 'border-palegar-gold/60 bg-black/40 backdrop-blur-md'
            } hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center`}
            title={`Switch to ${theme === 'dark' ? 'Light Palace' : 'Dark Obsidian'} theme`}
            id="nav-theme-toggle"
            aria-label="Toggle Dark and Light theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-palegar-gold animate-spin-slow group-hover:text-palegar-goldLight transition-colors" />
            ) : (
              <Moon className="w-4 h-4 text-palegar-goldLight group-hover:text-palegar-lightCrimson transition-colors" />
            )}
          </button>

          <a
            href="tel:+918049652255"
            className={`px-4 py-2 rounded-full border ${
              scrolled
                ? 'dark:border-palegar-gold/40 border-palegar-lightGold/50 dark:text-palegar-gold text-palegar-lightGold dark:hover:bg-palegar-gold/15 hover:bg-palegar-lightGold/10'
                : 'border-palegar-gold/60 text-palegar-goldLight hover:bg-palegar-gold/20 bg-black/30 backdrop-blur-sm'
            } text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 whitespace-nowrap shadow-sm`}
            id="nav-call-btn"
          >
            <PhoneCall className="w-3.5 h-3.5 text-palegar-gold shrink-0" />
            <span>Table Booking</span>
          </a>
          <button
            onClick={onOpenOrderModal}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-palegar-chilli via-palegar-crimson to-palegar-chilli text-palegar-text font-bold text-xs tracking-wider uppercase shadow-lg shadow-palegar-chilli/40 hover:shadow-palegar-chilli/70 hover:scale-105 active:scale-95 transition-all duration-300 border border-palegar-gold/50 flex items-center gap-2 whitespace-nowrap"
            id="nav-order-btn"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-palegar-goldLight shrink-0" />
            <span>Order</span>
          </button>
        </div>

        {/* Mobile Action Area: Theme Toggle & Menu Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border dark:border-palegar-gold/40 border-palegar-lightGold/50 dark:bg-palegar-card/80 bg-white text-palegar-gold"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-palegar-gold" /> : <Moon className="w-4 h-4 text-palegar-lightGold" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 dark:text-palegar-gold text-palegar-lightGold hover:text-palegar-gold focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden dark:bg-palegar-bg/98 bg-palegar-lightBg/98 backdrop-blur-xl border-b dark:border-palegar-gold/20 border-palegar-lightGold/30 px-6 py-6 flex flex-col gap-4 animate-fadeIn">
          <button
            onClick={() => scrollTo('hero-experience')}
            className="text-left text-base font-medium dark:text-palegar-text text-palegar-lightText hover:text-palegar-gold py-2 border-b dark:border-palegar-gold/10 border-palegar-lightGold/15"
          >
            Royal Veil Experience
          </button>
          <button
            onClick={() => scrollTo('palegar-anatomy')}
            className="text-left text-base font-medium dark:text-palegar-text text-palegar-lightText hover:text-palegar-gold py-2 border-b dark:border-palegar-gold/10 border-palegar-lightGold/15"
          >
            Palegar Culinary Anatomy
          </button>
          <button
            onClick={() => scrollTo('sensory-crucible')}
            className="text-left text-base font-medium dark:text-palegar-text text-palegar-lightText hover:text-palegar-gold py-2 border-b dark:border-palegar-gold/10 border-palegar-lightGold/15"
          >
            Sensory Physics
          </button>
          <button
            onClick={() => scrollTo('royal-packs')}
            className="text-left text-base font-medium dark:text-palegar-text text-palegar-lightText hover:text-palegar-gold py-2 border-b dark:border-palegar-gold/10 border-palegar-lightGold/15"
          >
            Signature Feast Packs
          </button>
          <button
            onClick={() => scrollTo('brand-footer')}
            className="text-left text-base font-medium dark:text-palegar-text text-palegar-lightText hover:text-palegar-gold py-2 border-b dark:border-palegar-gold/10 border-palegar-lightGold/15"
          >
            Royal Outlets & Story
          </button>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-palegar-chilli to-palegar-crimson text-palegar-text font-bold text-center tracking-wider uppercase border border-palegar-gold/40 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-palegar-gold" />
              Order Royal Feast
            </button>
            <a
              href="tel:+918049652255"
              className="w-full py-2.5 rounded-full border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold text-center text-xs font-semibold tracking-wider uppercase"
            >
              Reserve A Table
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
