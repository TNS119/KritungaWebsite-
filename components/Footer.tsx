'use client';

import React, { useState } from 'react';
import { Flame, MapPin, Phone, Mail, Clock, ArrowRight, Instagram, Facebook, Youtube, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const OUTLETS = [
    { city: 'Hyderabad', areas: 'Madhapur, Gachibowli, Kukatpally, Banjara Hills, AS Rao Nagar' },
    { city: 'Bengaluru', areas: 'Koramangala, Marathahalli, HSR Layout, Whitefield, Indiranagar' },
    { city: 'Chennai', areas: 'Anna Nagar, T. Nagar, OMR, Velachery' },
    { city: 'Kurnool & Vijayawada', areas: 'Heritage Flagship Fort Road & MG Road' },
  ];

  return (
    <footer id="brand-footer" className="relative dark:bg-palegar-bg bg-palegar-lightBg dark:text-palegar-text text-palegar-lightText pt-20 pb-28 border-t dark:border-palegar-gold/20 border-palegar-lightGold/30 transition-colors duration-300 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 dark:bg-palegar-crimson/20 bg-palegar-lightGold/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Col 1 & 2: Brand Heritage Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border dark:border-palegar-gold/70 border-palegar-lightGold shadow-lg dark:shadow-palegar-crimson/40 shadow-palegar-lightGold/30 shrink-0">
                <img
                  src="/images/kritunga-logo.png"
                  alt="Kritunga Emblem"
                  className="w-full h-full object-cover block"
                />
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold tracking-widest dark:text-palegar-text text-palegar-lightText gold-glow">
                  KRITUNGA
                </span>
                <p className="text-[10px] tracking-widest uppercase dark:text-palegar-gold text-palegar-lightGold font-semibold">
                  The Palegar&apos;s Cuisine • Estd. 1999
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm dark:text-palegar-muted text-palegar-lightMuted leading-relaxed max-w-md">
              Born from the fiery kitchens of Rayalaseema, Kritunga honours the unyielding valour of the ancient Palegar warlords. Handcrafted in earthen pots, sealed with whole wheat dough, and fired over natural wood embers.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 flex items-center justify-center dark:text-palegar-gold text-palegar-lightGold hover:text-white hover:bg-palegar-crimson transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 flex items-center justify-center dark:text-palegar-gold text-palegar-lightGold hover:text-white hover:bg-palegar-crimson transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 flex items-center justify-center dark:text-palegar-gold text-palegar-lightGold hover:text-white hover:bg-palegar-crimson transition-colors shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Royal Outlets */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold tracking-wider dark:text-palegar-gold text-palegar-lightGold uppercase">
              Royal Strongholds
            </h4>
            <div className="space-y-3">
              {OUTLETS.map((o) => (
                <div key={o.city} className="text-xs">
                  <span className="font-bold dark:text-palegar-text text-palegar-lightText flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-palegar-chilli shrink-0" />
                    {o.city}
                  </span>
                  <span className="text-[11px] dark:text-palegar-muted text-palegar-lightMuted pl-4 block">{o.areas}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Dining Hours & Support */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold tracking-wider dark:text-palegar-gold text-palegar-lightGold uppercase">
              Royal Dining Hours
            </h4>
            <div className="space-y-2 text-xs dark:text-palegar-muted text-palegar-lightMuted">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 dark:text-palegar-gold text-palegar-lightGold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold dark:text-palegar-text text-palegar-lightText">Lunch Banquet</p>
                  <p className="text-[11px]">11:30 AM – 4:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-2">
                <Clock className="w-4 h-4 dark:text-palegar-gold text-palegar-lightGold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold dark:text-palegar-text text-palegar-lightText">Imperial Dinner</p>
                  <p className="text-[11px]">7:00 PM – 11:30 PM</p>
                </div>
              </div>
              <div className="pt-3">
                <div className="flex items-center gap-2 dark:text-palegar-gold text-palegar-lightGold">
                  <Phone className="w-3.5 h-3.5" />
                  <a href="tel:+918049652255" className="hover:underline font-mono">
                    +91 80 4965 2255
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 5: Palegar Gazette (Newsletter) */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold tracking-wider dark:text-palegar-gold text-palegar-lightGold uppercase">
              The Palegar Gazette
            </h4>
            <p className="text-xs dark:text-palegar-muted text-palegar-lightMuted leading-relaxed">
              Subscribe for secret festival feast menus, exclusive chef tastings, and royal discounts.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText placeholder:dark:text-palegar-muted/50 placeholder:text-palegar-lightMuted/50 focus:outline-none focus:border-palegar-gold shadow-sm"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-palegar-chilli to-palegar-crimson text-palegar-text font-bold text-xs uppercase tracking-wider border border-palegar-gold/40 hover:scale-[1.02] transition-transform flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Join Royal Table</span>
                  <ArrowRight className="w-3.5 h-3.5 text-palegar-gold" />
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-gold text-palegar-lightGold flex items-center gap-2 shadow-sm">
                <CheckCircle2 className="w-4 h-4 dark:text-palegar-gold text-palegar-lightGold shrink-0" />
                <span>Welcome to the Palegar Circle.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t dark:border-palegar-gold/15 border-palegar-lightGold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] dark:text-palegar-muted text-palegar-lightMuted">
          <p>© {new Date().getFullYear()} Kritunga Restaurants Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-palegar-gold dark:hover:text-palegar-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-palegar-gold dark:hover:text-palegar-gold transition-colors">
              Terms of Royal Service
            </a>
            <a href="#" className="hover:text-palegar-gold dark:hover:text-palegar-gold transition-colors">
              FSSAI Lic. #10019043002844
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
