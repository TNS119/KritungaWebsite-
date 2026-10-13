'use client';

import React, { useState } from 'react';
import { Flame, Droplets, Zap, ChevronRight, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import SpiceIcon from './SpiceIcon';
import { SENSORY_PHYSICS } from '@/data/products';

export default function CinematicIceSection() {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Spice':
        return <SpiceIcon className="w-5 h-5 text-palegar-gold" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-palegar-chilli" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-amber-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-rose-500" />;
      default:
        return <SpiceIcon className="w-5 h-5 text-palegar-gold" />;
    }
  };

  return (
    <section id="sensory-crucible" className="relative py-24 sm:py-32 dark:bg-palegar-bg bg-palegar-lightBg dark:text-palegar-text text-palegar-lightText transition-colors duration-300 overflow-hidden">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 dark:bg-royal-gradient bg-gradient-to-b from-palegar-lightBg via-palegar-lightCardHover/50 to-palegar-lightBg pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-96 h-96 dark:bg-palegar-chilli/10 bg-palegar-lightCrimson/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 dark:bg-palegar-gold/10 bg-palegar-lightGold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <SpiceIcon className="w-4 h-4 text-palegar-gold" />
            <span>Rayalaseema Spice Alchemy</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-tight dark:text-palegar-text text-palegar-lightText gold-glow mb-4">
            The Secret of Rayalaseema Flavors
          </h2>
          <p className="dark:text-palegar-muted text-palegar-lightMuted text-sm sm:text-base leading-relaxed">
            Ancestral cooking crafts, slow earthen dum, and pure country spices behind every royal Kritunga feast.
          </p>
        </div>

        {/* 4 Interactive Sensory Cards Grid with High-Res Culinary Photos & Crisp Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SENSORY_PHYSICS.map((item, index) => (
            <div
              key={item.title}
              className={`group glass-panel rounded-2xl p-4 sm:p-5 border dark:border-palegar-gold/20 border-palegar-lightGold/30 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:hover:border-palegar-gold/50 hover:border-palegar-lightGold/70 flex flex-col justify-between`}
            >
              {/* Radial gradient hover accent */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Culinary Dish / Tradition Photography */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 border dark:border-palegar-gold/20 border-palegar-lightGold/30 shadow-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-palegar-gold/40 flex items-center justify-center shadow">
                    {getIcon(item.icon)}
                  </div>
                  
                  {/* Tagline */}
                  <span className="absolute top-2.5 right-2.5 text-[9px] font-mono tracking-widest uppercase font-bold text-palegar-goldLight px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-palegar-gold/30">
                    {item.tagline}
                  </span>

                  {/* Stat Over Image */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-baseline justify-between">
                    <div>
                      <span className="text-xl font-black font-mono text-white drop-shadow">
                        {item.metric}
                      </span>
                      <span className="text-[10px] text-zinc-300 block font-medium leading-none">
                        {item.metricUnit}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="font-cinzel text-base font-bold dark:text-palegar-text text-palegar-lightText mb-1 group-hover:text-palegar-gold transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs dark:text-palegar-muted text-palegar-lightMuted leading-relaxed mb-4">
                  {item.shortNote}
                </p>
              </div>

              <button
                onClick={() => setActiveModal(index)}
                className="relative z-10 w-full py-2 px-3 rounded-xl dark:bg-palegar-card/80 bg-palegar-lightCardHover hover:bg-palegar-gold/20 dark:hover:bg-palegar-gold/20 border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-[11px] font-bold dark:text-palegar-gold text-palegar-lightGold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 group/btn shadow-sm"
              >
                <span>View Tradition</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal for Deep Sensory Science */}
      {activeModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 dark:bg-palegar-bg/90 bg-black/60 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-xl glass-panel p-6 sm:p-8 rounded-2xl border dark:border-palegar-gold/40 border-palegar-lightGold/50 shadow-2xl overflow-hidden">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold hover:text-palegar-text hover:bg-palegar-crimson/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl dark:bg-palegar-crimson/40 bg-palegar-lightCrimson/10 border dark:border-palegar-gold/40 border-palegar-lightGold/40 flex items-center justify-center">
                {getIcon(SENSORY_PHYSICS[activeModal].icon)}
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest dark:text-palegar-gold text-palegar-lightGold uppercase font-bold">
                  {SENSORY_PHYSICS[activeModal].tagline}
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold dark:text-palegar-text text-palegar-lightText gold-glow">
                  {SENSORY_PHYSICS[activeModal].title}
                </h3>
              </div>
            </div>

            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 border dark:border-palegar-gold/30 border-palegar-lightGold/40 shadow-lg">
              <img
                src={SENSORY_PHYSICS[activeModal].image}
                alt={SENSORY_PHYSICS[activeModal].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-2xl font-black font-mono text-white drop-shadow">
                  {SENSORY_PHYSICS[activeModal].metric}
                </span>
                <span className="text-xs text-zinc-300 ml-2 font-medium">
                  {SENSORY_PHYSICS[activeModal].metricUnit}
                </span>
              </div>
            </div>

            <p className="text-sm dark:text-palegar-text/90 text-palegar-lightText/90 leading-relaxed mb-6">
              {SENSORY_PHYSICS[activeModal].description}
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs dark:text-palegar-muted text-palegar-lightMuted">
                <CheckCircle2 className="w-4 h-4 text-palegar-gold" />
                <span>Zero artificial tenderizers or synthetic extracts</span>
              </div>
              <div className="flex items-center gap-2 text-xs dark:text-palegar-muted text-palegar-lightMuted">
                <CheckCircle2 className="w-4 h-4 text-palegar-gold" />
                <span>Prepared under master chef supervision in authentic clay vessels</span>
              </div>
              <div className="flex items-center gap-2 text-xs dark:text-palegar-muted text-palegar-lightMuted">
                <CheckCircle2 className="w-4 h-4 text-palegar-gold" />
                <span>Delivered in tamper-proof thermal packaging to retain hot dum aroma</span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-palegar-chilli to-palegar-crimson text-palegar-text font-bold text-xs uppercase tracking-wider border border-palegar-gold/40 shadow-lg shadow-palegar-chilli/30 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Back to Heritage Flavors
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
