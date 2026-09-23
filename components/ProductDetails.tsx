'use client';

import React from 'react';
import { Flame, ShieldCheck, Clock, Award, Sparkles, Utensils, HeartHandshake, ChefHat } from 'lucide-react';
import { INTENSITY_METRICS } from '@/data/products';

export default function ProductDetails() {
  return (
    <section id="palegar-anatomy" className="relative py-24 sm:py-32 dark:bg-palegar-bg bg-palegar-lightBg dark:text-palegar-text text-palegar-lightText transition-colors duration-300 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] dark:bg-palegar-crimson/15 bg-palegar-lightCrimson/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] dark:bg-palegar-gold/10 bg-palegar-lightGold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <ChefHat className="w-4 h-4 text-palegar-gold" />
            <span>The Sacred Palegar Heritage</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-tight dark:text-palegar-text text-palegar-lightText gold-glow mb-4">
            Culinary Alchemy of the Warlords
          </h2>
          <p className="dark:text-palegar-muted text-palegar-lightMuted text-sm sm:text-base leading-relaxed">
            Every grain of Kritunga Biryani and every ladle of slow-braised curry carries the uncompromising legacy of the 16th-century Palegar rulers of Rayalaseema.
          </p>
        </div>

        {/* 2-Column Feature & Anatomy Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {/* Left Column: 4 Pillar Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="glass-panel p-6 rounded-2xl border dark:border-palegar-gold/20 border-palegar-lightGold/30 glass-panel-hover shadow-lg">
              <div className="w-12 h-12 rounded-xl dark:bg-palegar-crimson/30 bg-palegar-lightCrimson/10 border dark:border-palegar-gold/30 border-palegar-lightGold/30 flex items-center justify-center mb-4 text-palegar-gold">
                <Clock className="w-6 h-6 dark:text-palegar-goldLight text-palegar-lightGold" />
              </div>
              <h3 className="font-cinzel text-lg font-bold dark:text-palegar-text text-palegar-lightText mb-2">
                12-Hour Spice Potli Marinade
              </h3>
              <p className="text-xs sm:text-sm dark:text-palegar-muted text-palegar-lightMuted leading-relaxed">
                Tender cuts are cured in stone-ground ginger, garlic, sour curd, and 21 toasted spices, infusing flavor deep to the bone.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border dark:border-palegar-gold/20 border-palegar-lightGold/30 glass-panel-hover shadow-lg">
              <div className="w-12 h-12 rounded-xl dark:bg-palegar-crimson/30 bg-palegar-lightCrimson/10 border dark:border-palegar-gold/30 border-palegar-lightGold/30 flex items-center justify-center mb-4 text-palegar-chilli">
                <Flame className="w-6 h-6 dark:text-palegar-chilli text-palegar-lightChilli" />
              </div>
              <h3 className="font-cinzel text-lg font-bold dark:text-palegar-text text-palegar-lightText mb-2">
                Sealed Earthen Coal Dum
              </h3>
              <p className="text-xs sm:text-sm dark:text-palegar-muted text-palegar-lightMuted leading-relaxed">
                Hand-kneaded whole wheat dough seals the heavy clay degchi, trapping live aromatic steam over smouldering wood embers.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border dark:border-palegar-gold/20 border-palegar-lightGold/30 glass-panel-hover shadow-lg">
              <div className="w-12 h-12 rounded-xl dark:bg-palegar-crimson/30 bg-palegar-lightCrimson/10 border dark:border-palegar-gold/30 border-palegar-lightGold/30 flex items-center justify-center mb-4 text-palegar-gold">
                <Sparkles className="w-6 h-6 dark:text-palegar-gold text-palegar-lightGold" />
              </div>
              <h3 className="font-cinzel text-lg font-bold dark:text-palegar-text text-palegar-lightText mb-2">
                Pure A2 Desi Bilona Ghee
              </h3>
              <p className="text-xs sm:text-sm dark:text-palegar-muted text-palegar-lightMuted leading-relaxed">
                Rich golden clarified butter with a high smoke point unlocks subtle saffron, mace, and star anise essential oils.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border dark:border-palegar-gold/20 border-palegar-lightGold/30 glass-panel-hover shadow-lg">
              <div className="w-12 h-12 rounded-xl dark:bg-palegar-crimson/30 bg-palegar-lightCrimson/10 border dark:border-palegar-gold/30 border-palegar-lightGold/30 flex items-center justify-center mb-4 text-palegar-copper">
                <ShieldCheck className="w-6 h-6 dark:text-palegar-brass text-palegar-lightGold" />
              </div>
              <h3 className="font-cinzel text-lg font-bold dark:text-palegar-text text-palegar-lightText mb-2">
                100% Authentic Rayalaseema
              </h3>
              <p className="text-xs sm:text-sm dark:text-palegar-muted text-palegar-lightMuted leading-relaxed">
                Zero artificial colors, zero preservatives, and zero commercial MSG. Only pure fiery spice and ancestral craftsmanship.
              </p>
            </div>
          </div>

          {/* Right Column: Animated Intensity Matrix */}
          <div className="glass-panel p-8 rounded-2xl border dark:border-palegar-gold/30 border-palegar-lightGold/40 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-palegar-chilli/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase font-bold dark:text-palegar-gold text-palegar-lightGold">
                    SENSORY CALIBRATION
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold dark:text-palegar-text text-palegar-lightText gold-glow">
                    Palegar Intensity Matrix
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full dark:bg-palegar-crimson/40 bg-palegar-lightCrimson/10 border dark:border-palegar-gold/40 border-palegar-lightGold/30 text-[11px] font-bold dark:text-palegar-goldLight text-palegar-lightCrimson flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 dark:text-palegar-chilli text-palegar-lightChilli" />
                  <span>Fiery Grade</span>
                </div>
              </div>

              <div className="space-y-6">
                {INTENSITY_METRICS.map((metric) => (
                  <div key={metric.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="font-medium dark:text-palegar-text text-palegar-lightText">{metric.label}</span>
                      <span className="font-mono font-bold dark:text-palegar-gold text-palegar-lightGold">{metric.score}%</span>
                    </div>
                    <div className="w-full h-2.5 dark:bg-palegar-card bg-palegar-lightCardHover rounded-full overflow-hidden border dark:border-palegar-gold/20 border-palegar-lightGold/30 p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-palegar-crimson via-palegar-chilli to-palegar-gold rounded-full transition-all duration-1000"
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                    <p className="text-[11px] dark:text-palegar-muted text-palegar-lightMuted">{metric.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t dark:border-palegar-gold/20 border-palegar-lightGold/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 dark:text-palegar-gold text-palegar-lightGold" />
                <div>
                  <p className="text-xs font-bold dark:text-palegar-text text-palegar-lightText uppercase">Certified Heritage Standard</p>
                  <p className="text-[11px] dark:text-palegar-muted text-palegar-lightMuted">Maintained across all 45+ outlets since 1999</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold dark:text-palegar-goldLight text-palegar-lightGold dark:bg-palegar-card bg-palegar-lightCardHover px-3 py-1.5 rounded-lg border dark:border-palegar-gold/30 border-palegar-lightGold/40 shadow-sm">
                GRADE A+
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
