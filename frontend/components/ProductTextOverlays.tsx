'use client';

import React from 'react';
import { ArrowRight, ShoppingBag, ChevronDown } from 'lucide-react';

interface ProductTextOverlaysProps {
  progress: number;
  onSeek: (targetP: number) => void;
  onOpenOrderModal: () => void;
}

export default function ProductTextOverlays({
  progress,
  onSeek,
  onOpenOrderModal,
}: ProductTextOverlaysProps) {
  // Hero opening action buttons dissolve quickly as user begins scrolling (progress 0.00 to 0.15)
  const buttonsOpacity = Math.max(0, 1 - progress * 7);
  const buttonsBlur = progress * 10;
  const areButtonsHidden = buttonsOpacity <= 0.01;

  // 'Scroll To Unveil' indicator remains present throughout the entire frame sequence (0.00 to 0.95)
  // Only fades out smoothly upon completing the video frames sequence
  const scrollIndicatorOpacity =
    progress >= 0.95 ? Math.max(0, (1 - progress) / 0.05) : 1;
  const isScrollIndicatorHidden = scrollIndicatorOpacity <= 0.01;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-8 lg:p-10 z-20 overflow-hidden">
      {/* Top spacer */}
      <div className="pt-20 sm:pt-24 md:pt-28 flex justify-center w-full" />

      {/* 1. Bottom Action Buttons Bar (Dissolves upon scroll start) */}
      <div
        className="w-full flex items-center justify-between gap-3 sm:gap-4 pb-8 sm:pb-2 transition-all duration-75"
        style={{
          opacity: buttonsOpacity,
          transform: `translateY(${progress * 20}px)`,
          filter: `blur(${buttonsBlur}px)`,
          display: areButtonsHidden ? 'none' : 'flex',
        }}
      >
        {/* Left / Mobile Action Buttons */}
        <div className="flex items-center justify-between sm:justify-start gap-2.5 w-full sm:w-auto pointer-events-auto max-w-sm sm:max-w-none">
          {/* Unveil Feast Button */}
          <button
            onClick={() => {
              if (progress >= 0.88) {
                onSeek(0.0);
              } else {
                onSeek(1.0);
              }
            }}
            className="flex-1 sm:flex-initial px-4 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-palegar-chilli via-palegar-crimson to-palegar-chilli text-palegar-text font-bold text-xs sm:text-sm tracking-wider uppercase border border-palegar-gold/60 shadow-2xl shadow-palegar-chilli/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <span>{progress >= 0.88 ? 'Replay Feast' : 'Unveil Feast'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-palegar-gold shrink-0" />
          </button>

          {/* Mobile Order Button */}
          <button
            onClick={onOpenOrderModal}
            className="sm:hidden flex-1 px-4 py-2.5 rounded-full bg-palegar-card/90 backdrop-blur-md border border-palegar-gold/60 text-palegar-gold font-bold text-xs tracking-wider uppercase hover:bg-palegar-gold/20 hover:border-palegar-gold shadow-2xl shadow-palegar-card transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-palegar-goldLight shrink-0" />
            <span>Order Feast</span>
          </button>
        </div>

        {/* Desktop Right Corner: Order Royal Feast Button */}
        <div className="hidden sm:block pointer-events-auto">
          <button
            onClick={onOpenOrderModal}
            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-palegar-card/90 backdrop-blur-md border border-palegar-gold/60 text-palegar-gold font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-palegar-gold/20 hover:border-palegar-gold shadow-2xl shadow-palegar-card transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 text-palegar-goldLight shrink-0" />
            <span>Order Royal Feast</span>
          </button>
        </div>
      </div>

      {/* 2. Floating 'Scroll to Unveil' Label - Dynamic Theme Colors */}
      <div
        className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-1 text-center select-none z-30 transition-opacity duration-150"
        style={{
          opacity: scrollIndicatorOpacity,
          display: isScrollIndicatorHidden ? 'none' : 'flex',
        }}
      >
        <span className="text-xs sm:text-sm uppercase font-extrabold tracking-[0.25em] font-mono flex items-center gap-2 px-3 py-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] animate-bounce">
          <ChevronDown className="w-4 h-4 dark:text-palegar-goldLight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] animate-bounce" />
          <span className="dark:text-palegar-goldLight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">Scroll To Unveil</span>
          <ChevronDown className="w-4 h-4 dark:text-palegar-goldLight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] animate-bounce" />
        </span>
      </div>
    </div>
  );
}
