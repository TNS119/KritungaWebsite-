'use client';

import React, { useEffect } from 'react';
import { X, ExternalLink, MapPin, ShoppingBag } from 'lucide-react';

interface OrderPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NALGONDA_PARTNERS = {
  outletName: 'Kritunga Restaurant — Nalgonda',
  location: '[Chandanapalli / Landmark], Hyderabad Road, Nalgonda, Telangana - 508001',
  swiggyUrl: 'https://www.swiggy.com/city/nalgonda/kritunga-restaurant-chandanapalli-rest1223831?source=sharing',
  zomatoUrl: 'https://www.zomato.com/nalgonda/kritunga-nalgonda-locality/order',
};

// Official Brand Vector Icons
function SwiggyIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
      <title>Swiggy</title>
      <path d="M12.034 24c-.376-.411-2.075-2.584-3.95-5.513-.547-.916-.901-1.63-.833-1.814.178-.48 3.355-.743 4.333-.308.298.132.29.307.29.409 0 .44-.022 1.619-.022 1.619a.441.441 0 1 0 .883-.002l-.005-2.939c0-.255-.278-.319-.331-.329-.511-.002-1.548-.006-2.661-.006-2.457 0-3.006.101-3.423-.172-.904-.591-2.383-4.577-2.417-6.819C3.849 4.964 5.723 2.225 8.362.868A8.13 8.13 0 0 1 12.026 0c4.177 0 7.617 3.153 8.075 7.209l.001.011c.084.981-5.321 1.189-6.39.904-.164-.044-.206-.212-.206-.284L13.5 4.996a.442.442 0 0 0-.884.002l.009 3.866a.33.33 0 0 0 .268.32l3.354-.001c1.79 0 2.542.207 3.042.588.333.254.461.739.349 1.37C18.633 16.755 12.273 23.71 12.034 24z" />
    </svg>
  );
}

function ZomatoIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor">
      <title>Zomato</title>
      <path d="M19.615 9.45l-1.258.473-.167.71-.446.021-.115.978h.408l-.211 1.51c-.131.939.036 1.381.865 1.381.488 0 .91-.175 1.135-.297l.145-.9c-.167.083-.436.19-.618.19-.247 0-.276-.13-.225-.488l.189-1.396h.843c.03-.206.131-.877.16-1h-.865zm-3.779 1.002c-.115.002-.236.01-.361.026a3.592 3.592 0 0 0-1.347.432l.26.789c.269-.15.615-.28.978-.326.538-.066.757.1.79.375.014.109.004.199-.005.289l-.014.056a3.46 3.46 0 0 0-1.097-.036c-.518.063-.943.273-1.204.6a1.324 1.324 0 0 0-.225 1.034c.127.583.553.84 1.199.76.45-.055.812-.27 1.076-.63a2.665 2.665 0 0 1-.03.304 1.74 1.74 0 0 1-.072.29l1.244.001a3.657 3.657 0 0 1-.001-.365c.036-.459.118-1.143.247-2.051a2.397 2.397 0 0 0-.002-.59c-.08-.644-.628-.969-1.436-.958zm6.536.063c-1.194 0-2.107 1.067-2.107 2.342 0 .959.552 1.693 1.628 1.693 1.2 0 2.107-1.067 2.107-2.35 0-.95-.538-1.685-1.628-1.685zm-11.777.041c-.538 0-1.12.465-1.52 1.236.102-.504.08-1.076.051-1.198a8.964 8.964 0 0 1-1.287.122 6.9 6.9 0 0 1-.073 1.243l-.167 1.145c-.066.45-.138.969-.211 1.297h1.353c.007-.199.058-.511.094-.786l.116-.786c.095-.511.502-1.114.815-1.114.182 0 .175.176.124.504l-.131.885c-.066.45-.138.969-.211 1.297h1.367c.008-.199.051-.512.088-.786l.116-.786c.094-.512.502-1.114.814-1.114.182 0 .175.168.146.396l-.327 2.29H13l.438-2.609c.095-.649.044-1.236-.676-1.236-.523 0-1.09.443-1.49 1.182.087-.61.036-1.182-.677-1.182zm-4.88.008c-1.177 0-2.08 1.053-2.08 2.312 0 .946.546 1.67 1.608 1.67 1.185 0 2.08-1.052 2.08-2.319 0-.938-.531-1.663-1.607-1.663zm-5.126.091c-.05.39-.102.778-.175 1.13.328-.008.619-.016 1.411-.016l-1.81 1.96-.015.703c.444-.03.997-.039 1.63-.039.566 0 1.134.008 1.497.039.065-.458.13-.763.21-1.137-.275.015-.755.023-1.512.023l1.81-1.969.023-.694c-.437.023-.83.03-1.52.03-.749 0-.975-.007-1.549-.03zm4.988.927c.255 0 .408.228.408.701 0 .687-.276 1.251-.626 1.251-.261 0-.414-.236-.414-.702 0-.694.283-1.25.632-1.25zm16.629 0c.254 0 .407.228.407.701 0 .687-.276 1.251-.625 1.251-.262 0-.415-.236-.415-.702 0-.694.284-1.25.633-1.25zM15.51 12.64c.206-.003.403.024.55.058l-.013.118c-.075.44-.39.881-.848.938-.31.037-.578-.148-.608-.39a.538.538 0 0 1 .114-.41c.117-.159.336-.268.599-.3.069-.009.138-.013.206-.014Z" />
    </svg>
  );
}

export default function OrderPartnerModal({ isOpen, onClose }: OrderPartnerModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-modal="true"
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 dark:bg-palegar-bg/95 bg-black/60 backdrop-blur-xl animate-fadeIn overflow-y-auto overscroll-contain"
    >
      <div className="relative w-full max-w-lg glass-panel dark:bg-palegar-card/95 bg-white p-6 sm:p-8 rounded-3xl border dark:border-palegar-gold/40 border-palegar-lightGold/50 shadow-2xl my-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold hover:text-palegar-text hover:bg-palegar-crimson/40 transition-colors"
          aria-label="Close delivery partner dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-full dark:bg-palegar-crimson/40 bg-palegar-lightCrimson/15 border dark:border-palegar-gold/40 border-palegar-lightGold/40 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5 dark:text-palegar-gold text-palegar-lightGold" />
          </div>
          <div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold dark:text-palegar-text text-palegar-lightText gold-glow">
              Order Online Via Partners
            </h3>
            <p className="text-xs dark:text-palegar-gold text-palegar-lightGold font-medium">
              Authentic Palegar feasts dispatched directly to your doorstep
            </p>
          </div>
        </div>

        {/* Nalgonda Outlet Location Indicator (Replaces multi-city selector) */}
        <div className="mb-6 p-4 rounded-2xl dark:bg-palegar-bg/60 bg-palegar-lightCardHover/80 border dark:border-palegar-gold/30 border-palegar-lightGold/40 flex items-center gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-palegar-chilli/15 border border-palegar-chilli/30 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-palegar-chilli" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-cinzel font-bold dark:text-palegar-text text-palegar-lightText">
                {NALGONDA_PARTNERS.outletName}
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-palegar-gold/20 text-palegar-gold border border-palegar-gold/30 shrink-0">
                Official
              </span>
            </div>
            <p className="text-xs dark:text-palegar-muted text-palegar-lightMuted truncate mt-0.5">
              {NALGONDA_PARTNERS.location}
            </p>
          </div>
        </div>

        {/* Delivery Partner Action Cards */}
        <div className="space-y-3 mb-6">
          {/* Swiggy Card */}
          <a
            href={NALGONDA_PARTNERS.swiggyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FC8019]/10 via-[#FC8019]/5 to-transparent border border-[#FC8019]/40 hover:border-[#FC8019] hover:bg-[#FC8019]/15 transition-all duration-300 shadow-lg shadow-[#FC8019]/5 hover:shadow-[#FC8019]/20 hover:scale-[1.01]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#FC8019] text-white flex items-center justify-center p-2.5 shadow-md shadow-[#FC8019]/30 shrink-0 group-hover:scale-105 transition-transform">
                  <SwiggyIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-cinzel text-base font-bold dark:text-palegar-text text-palegar-lightText group-hover:text-[#FC8019] transition-colors">
                    Order on Swiggy
                  </h4>
                  <p className="text-xs dark:text-palegar-muted text-palegar-lightMuted">
                    Fast live delivery &bull; Hot earthen handis &bull; Offers available
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-full dark:bg-palegar-card bg-white border border-[#FC8019]/40 text-[#FC8019] group-hover:bg-[#FC8019] group-hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* Zomato Card */}
          <a
            href={NALGONDA_PARTNERS.zomatoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#E23744]/10 via-[#E23744]/5 to-transparent border border-[#E23744]/40 hover:border-[#E23744] hover:bg-[#E23744]/15 transition-all duration-300 shadow-lg shadow-[#E23744]/5 hover:shadow-[#E23744]/20 hover:scale-[1.01]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#E23744] text-white flex items-center justify-center p-2 shadow-md shadow-[#E23744]/30 shrink-0 group-hover:scale-105 transition-transform">
                  <ZomatoIcon className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h4 className="font-cinzel text-base font-bold dark:text-palegar-text text-palegar-lightText group-hover:text-[#E23744] transition-colors">
                    Order on Zomato
                  </h4>
                  <p className="text-xs dark:text-palegar-muted text-palegar-lightMuted">
                    Instant fleet dispatch &bull; Signature pot biryanis &bull; Gold perks
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-full dark:bg-palegar-card bg-white border border-[#E23744]/40 text-[#E23744] group-hover:bg-[#E23744] group-hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </a>
        </div>

        {/* Footer info notice */}
        <div className="p-3.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/20 border-palegar-lightGold/30 text-center">
          <p className="text-[11px] dark:text-palegar-muted text-palegar-lightMuted leading-relaxed">
            Need banquet or private diwan seating instead? Use our direct{' '}
            <span className="font-bold dark:text-palegar-gold text-palegar-lightGold">Table Booking</span> or{' '}
            <span className="font-bold dark:text-palegar-gold text-palegar-lightGold">Convention Booking</span> services below.
          </p>
        </div>
      </div>
    </div>
  );
}

