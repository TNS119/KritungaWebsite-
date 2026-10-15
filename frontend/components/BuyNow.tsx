'use client';

import React from 'react';
import { ShoppingBag, Flame, ExternalLink } from 'lucide-react';
import { PRODUCT_PACKS } from '@/data/products';

interface BuyNowProps {
  onOpenOrderModal: () => void;
}

export default function BuyNow({ onOpenOrderModal }: BuyNowProps) {
  return (
    <section id="royal-packs" className="relative py-24 sm:py-32 dark:bg-palegar-bg bg-palegar-lightBg dark:text-palegar-text text-palegar-lightText transition-colors duration-300 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] dark:bg-palegar-crimson/15 bg-palegar-lightCrimson/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] dark:bg-palegar-gold/10 bg-palegar-lightGold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <ShoppingBag className="w-4 h-4 text-palegar-gold" />
            <span>Royal Dining & Online Delivery</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-tight dark:text-palegar-text text-palegar-lightText gold-glow mb-4">
            Our Four Signature Royal Feasts
          </h2>
          <p className="dark:text-palegar-muted text-palegar-lightMuted text-sm sm:text-base leading-relaxed">
            Prepared fresh in traditional earthen handis over wood embers and delivered directly to your doorstep via official delivery partners Swiggy & Zomato.
          </p>
        </div>

        {/* 4 Available Dishes Grid with Direct Order Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PRODUCT_PACKS.map((dish) => (
            <div
              key={dish.id}
              className="glass-panel dark:bg-palegar-card/85 bg-white/95 rounded-3xl p-5 sm:p-7 border dark:border-palegar-gold/30 border-palegar-lightGold/40 shadow-xl flex flex-col justify-between hover:border-palegar-gold dark:hover:shadow-palegar-crimson/20 transition-all duration-300 group"
            >
              <div>
                {/* Dish Photography */}
                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-5 border dark:border-palegar-gold/20 border-palegar-lightGold/30 shadow-md">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-palegar-goldLight bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-palegar-gold/40 uppercase shadow">
                      {dish.portion}
                    </span>
                    <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-palegar-gold/30 text-xs text-palegar-chilli font-bold shadow">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Spice Level {dish.spiceLevel}/5</span>
                    </div>
                  </div>

                  {/* Category Tag */}
                  <span className="absolute bottom-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-palegar-chilli/90 text-white shadow border border-white/20">
                    {dish.tag}
                  </span>
                </div>

                {/* Dish Title & Subtitle */}
                <div className="mb-3">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold dark:text-palegar-text text-palegar-lightText group-hover:text-palegar-gold transition-colors">
                      {dish.name}
                    </h3>
                  </div>
                  <p className="text-xs dark:text-palegar-gold text-palegar-lightGold font-semibold">
                    {dish.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm dark:text-palegar-muted text-palegar-lightMuted leading-relaxed">
                  {dish.description}
                </p>
              </div>

              {/* Price & Action Row */}
              <div className="pt-4 border-t dark:border-palegar-gold/20 border-palegar-lightGold/20 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-black dark:text-palegar-gold text-palegar-lightGold">
                      ₹{dish.price}
                    </span>
                    <span className="font-mono text-xs dark:text-palegar-muted text-palegar-lightMuted line-through">
                      ₹{dish.originalPrice}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider dark:text-palegar-muted text-palegar-lightMuted">
                    Clay Handi Fresh
                  </span>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={onOpenOrderModal}
                    className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-palegar-chilli via-palegar-crimson to-palegar-chilli text-palegar-text font-bold text-xs uppercase tracking-wider border border-palegar-gold/50 shadow-lg shadow-palegar-chilli/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-palegar-goldLight" />
                    <span>Order Now</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://www.swiggy.com/city/nalgonda/kritunga-restaurant-chandanapalli-rest1223831?source=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-full bg-[#FC8019]/15 hover:bg-[#FC8019] text-[#FC8019] hover:text-white border border-[#FC8019]/50 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow-sm group/btn"
                    >
                      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                        <path d="M12.034 24c-.376-.411-2.075-2.584-3.95-5.513-.547-.916-.901-1.63-.833-1.814.178-.48 3.355-.743 4.333-.308.298.132.29.307.29.409 0 .44-.022 1.619-.022 1.619a.441.441 0 1 0 .883-.002l-.005-2.939c0-.255-.278-.319-.331-.329-.511-.002-1.548-.006-2.661-.006-2.457 0-3.006.101-3.423-.172-.904-.591-2.383-4.577-2.417-6.819C3.849 4.964 5.723 2.225 8.362.868A8.13 8.13 0 0 1 12.026 0c4.177 0 7.617 3.153 8.075 7.209l.001.011c.084.981-5.321 1.189-6.39.904-.164-.044-.206-.212-.206-.284L13.5 4.996a.442.442 0 0 0-.884.002l.009 3.866a.33.33 0 0 0 .268.32l3.354-.001c1.79 0 2.542.207 3.042.588.333.254.461.739.349 1.37C18.633 16.755 12.273 23.71 12.034 24z" />
                      </svg>
                      <span>Swiggy</span>
                      <ExternalLink className="w-3 h-3 opacity-70 group-hover/btn:opacity-100" />
                    </a>
                    <a
                      href="https://www.zomato.com/nalgonda/kritunga-nalgonda-locality/order"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-full bg-[#E23744]/15 hover:bg-[#E23744] text-[#E23744] hover:text-white border border-[#E23744]/50 text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow-sm group/btn"
                    >
                      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                        <path d="M19.615 9.45l-1.258.473-.167.71-.446.021-.115.978h.408l-.211 1.51c-.131.939.036 1.381.865 1.381.488 0 .91-.175 1.135-.297l.145-.9c-.167.083-.436.19-.618.19-.247 0-.276-.13-.225-.488l.189-1.396h.843c.03-.206.131-.877.16-1h-.865zm-3.779 1.002c-.115.002-.236.01-.361.026a3.592 3.592 0 0 0-1.347.432l.26.789c.269-.15.615-.28.978-.326.538-.066.757.1.79.375.014.109.004.199-.005.289l-.014.056a3.46 3.46 0 0 0-1.097-.036c-.518.063-.943.273-1.204.6a1.324 1.324 0 0 0-.225 1.034c.127.583.553.84 1.199.76.45-.055.812-.27 1.076-.63a2.665 2.665 0 0 1-.03.304 1.74 1.74 0 0 1-.072.29l1.244.001a3.657 3.657 0 0 1-.001-.365c.036-.459.118-1.143.247-2.051a2.397 2.397 0 0 0-.002-.59c-.08-.644-.628-.969-1.436-.958zm6.536.063c-1.194 0-2.107 1.067-2.107 2.342 0 .959.552 1.693 1.628 1.693 1.2 0 2.107-1.067 2.107-2.35 0-.95-.538-1.685-1.628-1.685zm-11.777.041c-.538 0-1.12.465-1.52 1.236.102-.504.08-1.076.051-1.198a8.964 8.964 0 0 1-1.287.122 6.9 6.9 0 0 1-.073 1.243l-.167 1.145c-.066.45-.138.969-.211 1.297h1.353c.007-.199.058-.511.094-.786l.116-.786c.095-.511.502-1.114.815-1.114.182 0 .175.176.124.504l-.131.885c-.066.45-.138.969-.211 1.297h1.367c.008-.199.051-.512.088-.786l.116-.786c.094-.512.502-1.114.814-1.114.182 0 .175.168.146.396l-.327 2.29H13l.438-2.609c.095-.649.044-1.236-.676-1.236-.523 0-1.09.443-1.49 1.182.087-.61.036-1.182-.677-1.182zm-4.88.008c-1.177 0-2.08 1.053-2.08 2.312 0 .946.546 1.67 1.608 1.67 1.185 0 2.08-1.052 2.08-2.319 0-.938-.531-1.663-1.607-1.663zm-5.126.091c-.05.39-.102.778-.175 1.13.328-.008.619-.016 1.411-.016l-1.81 1.96-.015.703c.444-.03.997-.039 1.63-.039.566 0 1.134.008 1.497.039.065-.458.13-.763.21-1.137-.275.015-.755.023-1.512.023l1.81-1.969.023-.694c-.437.023-.83.03-1.52.03-.749 0-.975-.007-1.549-.03zm4.988.927c.255 0 .408.228.408.701 0 .687-.276 1.251-.626 1.251-.261 0-.414-.236-.414-.702 0-.694.283-1.25.632-1.25zm16.629 0c.254 0 .407.228.407.701 0 .687-.276 1.251-.625 1.251-.262 0-.415-.236-.415-.702 0-.694.284-1.25.633-1.25zM15.51 12.64c.206-.003.403.024.55.058l-.013.118c-.075.44-.39.881-.848.938-.31.037-.578-.148-.608-.39a.538.538 0 0 1 .114-.41c.117-.159.336-.268.599-.3.069-.009.138-.013.206-.014Z" />
                      </svg>
                      <span>Zomato</span>
                      <ExternalLink className="w-3 h-3 opacity-70 group-hover/btn:opacity-100" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
