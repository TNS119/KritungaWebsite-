'use client';

import React from 'react';
import { Flame, Award, ChefHat, Sparkles, ShieldCheck } from 'lucide-react';

const HERITAGE_PILLARS = [
  {
    title: "12-Hour Spice Potli Marinade",
    desc: "Tender cuts cured in stone-ground ginger, garlic, sour curd, and 21 toasted spices, infusing flavor deep to the bone.",
    image: "/images/traditions/spice-secret-potli.jpg",
    metric: "21 Secret Spices",
    tag: "Slow Cured"
  },
  {
    title: "Sealed Earthen Coal Dum",
    desc: "Hand-kneaded dough seals the heavy clay degchi, trapping live aromatic steam over smouldering wood embers.",
    image: "/images/traditions/clay-pot-dum.jpg",
    metric: "Clay Degchi",
    tag: "Wood Coal Embers"
  },
  {
    title: "Pure A2 Desi Bilona Ghee",
    desc: "Rich golden clarified butter with a high smoke point unlocks subtle saffron, mace, and star anise essential oils.",
    image: "/images/traditions/golden-desi-ghee.jpg",
    metric: "Pure Bilona Ghee",
    tag: "A2 Golden Cow Ghee"
  },
  {
    title: "100% Authentic Rayalaseema",
    desc: "Zero artificial colors, zero preservatives, and zero commercial MSG. Only pure fiery spice and ancestral craftsmanship.",
    image: "/images/traditions/guntur-red-spice.jpg",
    metric: "Guntur Sannam",
    tag: "Zero Preservatives"
  }
];

const QUALITY_STANDARDS = [
  {
    label: "Signature Chilli Heat",
    score: 96,
    desc: "Authentic Guntur & Byadgi chillies",
    image: "/images/traditions/guntur-red-spice.jpg",
    tag: "Guntur Chillies"
  },
  {
    label: "Fragrant Dum Aroma",
    score: 99,
    desc: "Saffron, Cardamom & Clove steam",
    image: "/images/traditions/clay-pot-dum.jpg",
    tag: "Clay Dum Steam"
  },
  {
    label: "Melt-In-Mouth Meat",
    score: 98,
    desc: "Slow-cured 12-hour spiced marinade",
    image: "/images/traditions/spice-secret-potli.jpg",
    tag: "21-Spice Potli"
  },
  {
    label: "Long-Grain Fluffy Rice",
    score: 95,
    desc: "Premium 2-year aged Basmati",
    image: "/images/dishes/palegar-dum-biryani.jpg",
    tag: "Aged Basmati"
  },
  {
    label: "Royal Taste Authenticity",
    score: 100,
    desc: "Centuries-old Palegar royal recipes",
    image: "/images/traditions/golden-desi-ghee.jpg",
    tag: "Ancestral Heritage"
  }
];

export default function ProductDetails() {
  return (
    <section id="palegar-anatomy" className="relative py-24 sm:py-32 dark:bg-palegar-bg bg-palegar-lightBg dark:text-palegar-text text-palegar-lightText transition-colors duration-300 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] dark:bg-palegar-crimson/15 bg-palegar-lightCrimson/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] dark:bg-palegar-gold/10 bg-palegar-lightGold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <ChefHat className="w-4 h-4 text-palegar-gold" />
            <span>Authentic Royal Heritage</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-tight dark:text-palegar-text text-palegar-lightText gold-glow mb-4">
            Royal Recipes of the Palegars
          </h2>
          <p className="dark:text-palegar-muted text-palegar-lightMuted text-sm sm:text-base leading-relaxed">
            Every pot of Kritunga Biryani and slow-cooked curry brings you the rich, fiery heritage of royal Rayalaseema traditions, handcrafted fresh every single day.
          </p>
        </div>

        {/* 2-Column Feature & Anatomy Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20 items-stretch">
          {/* Left Column: 4 Pillar Cards with Authentic Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {HERITAGE_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="group glass-panel rounded-2xl border dark:border-palegar-gold/20 border-palegar-lightGold/30 glass-panel-hover shadow-lg overflow-hidden flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-black/40">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-palegar-gold/30 text-[11px] font-mono font-bold text-palegar-goldLight">
                      {pillar.metric}
                    </div>
                    <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-palegar-crimson/80 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider">
                      {pillar.tag}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-cinzel text-base sm:text-lg font-bold dark:text-palegar-text text-palegar-lightText mb-2 group-hover:text-palegar-gold transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm dark:text-palegar-muted text-palegar-lightMuted leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: The Palegar Quality Promise (Enhanced with Authentic Visuals) */}
          <div className="glass-panel rounded-2xl border dark:border-palegar-gold/30 border-palegar-lightGold/40 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-palegar-chilli/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Featured Banner Visual Header */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden border-b dark:border-palegar-gold/20 border-palegar-lightGold/20">
                <img
                  src="/images/traditions/clay-pot-dum.jpg"
                  alt="Traditional Palegar Clay Pot Dum Cooking"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0203] via-[#0A0203]/70 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-palegar-goldLight px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-palegar-gold/40">
                      ROYAL TASTE STANDARDS
                    </span>
                    <div className="px-3 py-1 rounded-full bg-palegar-crimson/80 backdrop-blur-md border border-palegar-gold/40 text-[11px] font-bold text-white flex items-center gap-1 shadow-lg">
                      <Flame className="w-3.5 h-3.5 text-palegar-goldLight" />
                      <span>Fiery Grade</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white gold-glow">
                      The Palegar Quality Promise
                    </h3>
                    <p className="text-xs text-palegar-goldLight/90 mt-1">
                      Ancestral Rayalaseema formulation certified for royal authenticity
                    </p>
                  </div>
                </div>
              </div>

              {/* Quality Standards with Authentic Thumbnails */}
              <div className="p-6 sm:p-7 space-y-5">
                {QUALITY_STANDARDS.map((standard) => (
                  <div key={standard.label} className="flex items-center gap-4 group">
                    {/* Thumbnail Image */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border dark:border-palegar-gold/30 border-palegar-lightGold/40 shrink-0 shadow-md group-hover:border-palegar-gold transition-colors">
                      <img
                        src={standard.image}
                        alt={standard.label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Metric details & Progress Bar */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-bold dark:text-palegar-text text-palegar-lightText">
                            {standard.label}
                          </span>
                          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-medium dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/20 border-palegar-lightGold/30 text-palegar-gold">
                            {standard.tag}
                          </span>
                        </div>
                        <span className="font-mono font-bold dark:text-palegar-gold text-palegar-lightGold text-sm">
                          {standard.score}%
                        </span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-full h-2 dark:bg-palegar-card bg-palegar-lightCardHover rounded-full overflow-hidden border dark:border-palegar-gold/20 border-palegar-lightGold/30 p-0.5">
                        <div
                          className="h-full bg-gradient-to-r from-palegar-crimson via-palegar-chilli to-palegar-gold rounded-full transition-all duration-1000 shadow-sm"
                          style={{ width: `${standard.score}%` }}
                        />
                      </div>

                      <p className="text-[11px] dark:text-palegar-muted text-palegar-lightMuted truncate">
                        {standard.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Heritage Standard Seal */}
            <div className="p-6 sm:p-7 pt-4 border-t dark:border-palegar-gold/20 border-palegar-lightGold/20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 bg-black/10 dark:bg-black/20">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full border border-palegar-gold/40 p-1 dark:bg-palegar-card bg-white shadow-sm shrink-0 flex items-center justify-center">
                  <img
                    src="/images/kritunga-emblem.png"
                    alt="Kritunga Royal Emblem"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold dark:text-palegar-text text-palegar-lightText uppercase tracking-wider">
                    Certified Heritage Standard
                  </p>
                  <p className="text-[11px] dark:text-palegar-muted text-palegar-lightMuted">
                    Maintained at Nalgonda & Certified across all Royal Outlets
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-palegar-goldLight dark:bg-palegar-card bg-white px-3.5 py-1.5 rounded-lg border border-palegar-gold/40 shadow-sm shrink-0 whitespace-nowrap">
                GRADE A+
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

