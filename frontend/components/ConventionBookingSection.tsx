'use client';

import React, { useState, useEffect } from 'react';
import {
  Crown,
  Users,
  Calendar,
  Clock,
  PhoneCall,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Loader2,
  UtensilsCrossed,
  Gift,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import api, { Outlet, ConventionResponseData } from '@/services/api';

interface ConventionBookingSectionProps {
  onOpenConventionModal: () => void;
}

const HALL_NAME = 'Palegar Palace Banquet Hall';
const MAX_CAPACITY = 100;

const EVENT_TYPES = [
  'Family Gathering / Milestone',
  'Engagement Ceremony',
  'Birthday & Anniversary',
  'Corporate Dinner & Meeting',
  'Private Royal Feast',
];

const TIME_SLOTS = [
  'Lunch Session (11:30 AM – 3:30 PM)',
  'Dinner Session (6:30 PM – 11:00 PM)',
  'Full Day Session (11:00 AM – 10:00 PM)',
];

const CATERING_STYLES = [
  'Signature Rayalaseema Pot Biryani Banquet',
  'Royal Palegar Multi-Course Feast',
  'Traditional Rayalaseema Vegetarian Feast',
  'Custom Buffet with Live Counters',
];

const ADDONS = [
  'Traditional Flower Entrance Decor',
  'Audio-Visual Setup & Sound System',
  'Live Ragi Mudda & Natu Kodi Cooking Counter',
  'Welcome Drinks & Spiced Buttermilk Station',
];

export default function ConventionBookingSection({ onOpenConventionModal }: ConventionBookingSectionProps) {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [selectedOutletId, setSelectedOutletId] = useState<string>('nalgonda-flagship');

  // Form State
  const [organizerName, setOrganizerName] = useState<string>('');
  const [organizerPhone, setOrganizerPhone] = useState<string>('');
  const [organizerEmail, setOrganizerEmail] = useState<string>('');
  const [eventType, setEventType] = useState<string>(EVENT_TYPES[0]);
  const [expectedGuests, setExpectedGuests] = useState<number>(50);
  const [eventDate, setEventDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>(TIME_SLOTS[1]);
  const [cateringPreference, setCateringPreference] = useState<string>(CATERING_STYLES[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Submission State
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmationData, setConfirmationData] = useState<ConventionResponseData | null>(null);

  useEffect(() => {
    let isMounted = true;
    api
      .getOutlets()
      .then((data) => {
        if (isMounted && data.length > 0) {
          setOutlets(data);
          setSelectedOutletId(data[0].id);
        }
      })
      .catch(() => {
        if (isMounted) {
          const fallbackOutlets: Outlet[] = [
            { id: 'nalgonda-main', name: 'Kritunga Nalgonda Flagship', city: 'Nalgonda', address: 'Hyderabad Road, Nalgonda, Telangana', phone: '+91 91234 56789', isActive: true },
          ];
          setOutlets(fallbackOutlets);
          setSelectedOutletId(fallbackOutlets[0].id);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!organizerName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    const cleanedPhone = organizerPhone.replace(/\D/g, '');
    if (cleanedPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!eventDate) {
      setErrorMsg('Please select your event date');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        organizerName: organizerName.trim(),
        organizerPhone: cleanedPhone,
        organizerEmail: organizerEmail.trim() || undefined,
        eventType,
        hallPreference: HALL_NAME,
        expectedGuests: Math.min(Number(expectedGuests), MAX_CAPACITY),
        eventDate,
        timeSlot,
        cateringPreference,
        additionalServices: selectedAddons,
        specialRequests: specialRequests.trim() || undefined,
        outletId: selectedOutletId || undefined,
      };

      const res = await api.createConventionBooking(payload);

      if (res.success && res.booking) {
        setConfirmationData(res.booking);
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#E5A93C', '#D6301D', '#F3C973'],
          });
        } catch {
          // Confetti fallback
        }
      } else {
        setErrorMsg(res.message || 'Unable to submit booking. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setConfirmationData(null);
    setOrganizerName('');
    setOrganizerPhone('');
    setOrganizerEmail('');
    setSpecialRequests('');
    setSelectedAddons([]);
  };

  return (
    <section
      id="conventions"
      className="relative py-20 sm:py-28 dark:bg-palegar-bg bg-palegar-lightBg dark:text-palegar-text text-palegar-lightText transition-colors duration-300 border-t dark:border-palegar-gold/15 border-palegar-lightGold/20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-palegar-gold" />
            <span>Banquet & Celebrations</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-black tracking-tight dark:text-palegar-text text-palegar-lightText gold-glow mb-2">
            Palace Banquet Hall
          </h2>
          <p className="dark:text-palegar-muted text-palegar-lightMuted text-xs sm:text-sm leading-relaxed">
            Host your private gatherings, family celebrations, and meetings with our signature Rayalaseema culinary feasts.
          </p>
        </div>

        {/* Single Hall Overview Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border dark:border-palegar-gold/30 border-palegar-lightGold/40 shadow-xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full dark:bg-palegar-crimson/30 bg-palegar-lightCrimson/10 dark:text-palegar-gold text-palegar-lightCrimson border dark:border-palegar-gold/30 border-palegar-lightCrimson/30">
                Exclusive Hall
              </span>
              <span className="text-xs font-mono font-bold dark:text-palegar-gold text-palegar-lightGold flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                Max 100 Guests
              </span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold dark:text-palegar-text text-palegar-lightText">
              {HALL_NAME}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs dark:text-palegar-muted text-palegar-lightMuted pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-palegar-gold" /> Diwan & Banquet Seating
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-palegar-gold" /> Fresh Claypot Catering
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-palegar-gold" /> Audio & Screen Ready
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-palegar-gold" /> Dedicated Staff
              </span>
            </div>
          </div>

          <a
            href="#booking-form"
            className="self-start md:self-auto px-6 py-3 rounded-full bg-palegar-gold text-palegar-bg font-bold text-xs uppercase tracking-wider hover:bg-palegar-goldLight transition-colors shadow-md whitespace-nowrap"
          >
            Book This Hall
          </a>
        </div>

        {/* Booking Form Card */}
        <div id="booking-form" className="glass-panel rounded-2xl p-6 sm:p-10 border dark:border-palegar-gold/30 border-palegar-lightGold/40 shadow-xl scroll-mt-20">
          {confirmationData ? (
            /* Confirmation State */
            <div className="text-center max-w-lg mx-auto py-6 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-wider font-bold dark:text-palegar-gold text-palegar-lightGold">
                  Booking Request Received
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-black dark:text-palegar-text text-palegar-lightText mt-1">
                  Thank You, {confirmationData.organizerName}
                </h3>
                <p className="text-xs dark:text-palegar-muted text-palegar-lightMuted mt-1">
                  Reference: <strong className="font-mono dark:text-palegar-gold text-palegar-lightGold">#{confirmationData.bookingNumber}</strong>
                </p>
              </div>

              <div className="p-4 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/20 border-palegar-lightGold/30 text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-palegar-muted">Hall</span>
                  <span className="font-semibold">{confirmationData.hallPreference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-palegar-muted">Date & Session</span>
                  <span className="font-semibold">{confirmationData.eventDate} ({confirmationData.timeSlot})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-palegar-muted">Guests</span>
                  <span className="font-semibold">{confirmationData.expectedGuests} Guests</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {confirmationData.whatsappUrl && (
                  <a
                    href={confirmationData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Concierge</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={resetForm}
                  className="py-3 px-5 rounded-full border dark:border-palegar-gold/40 border-palegar-lightGold/50 text-xs font-bold uppercase tracking-wider hover:bg-palegar-gold/10 transition-colors"
                >
                  New Booking
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b dark:border-palegar-gold/15 border-palegar-lightGold/20 pb-4">
                <h3 className="font-cinzel text-xl font-bold dark:text-palegar-text text-palegar-lightText">
                  Reservation Form
                </h3>
                <p className="text-xs dark:text-palegar-muted text-palegar-lightMuted mt-0.5">
                  Complete your celebration details below for quick confirmation.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/40 text-red-300 text-xs">
                  {errorMsg}
                </div>
              )}

              {/* 1. Venue Location & Event Occasion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> Venue Location
                  </label>
                  <div className="p-2.5 rounded-lg dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm flex items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold dark:text-palegar-gold text-palegar-lightGold block truncate">
                        Kritunga Restaurant — Nalgonda
                      </span>
                      <span className="text-[11px] opacity-75 block truncate">
                        Chandanapalli, Hyderabad Road
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Event Occasion
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full p-2.5 rounded-lg dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm focus:outline-none focus:border-palegar-gold"
                  >
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 2. Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-lg dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm focus:outline-none focus:border-palegar-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Session Time
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 rounded-lg dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm focus:outline-none focus:border-palegar-gold"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. Expected Guests (Max 100) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Guests (Max 100)
                  </label>
                  <span className="font-mono text-sm font-bold dark:text-palegar-gold text-palegar-lightGold">
                    {expectedGuests} Guests
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={expectedGuests}
                  onChange={(e) => setExpectedGuests(Number(e.target.value))}
                  className="w-full accent-palegar-gold h-2 rounded-lg cursor-pointer mb-2"
                />

                <div className="flex gap-2">
                  {[25, 50, 75, 100].map((count) => (
                    <button
                      type="button"
                      key={count}
                      onClick={() => setExpectedGuests(count)}
                      className={`flex-1 py-1 rounded-md text-xs font-semibold border transition-all ${
                        expectedGuests === count
                          ? 'bg-palegar-gold text-palegar-bg border-palegar-gold'
                          : 'dark:bg-palegar-card bg-white dark:border-palegar-gold/20 border-palegar-lightGold/30 dark:text-palegar-muted text-palegar-lightMuted hover:border-palegar-gold/50'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Catering Style */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-2 flex items-center gap-1">
                  <UtensilsCrossed className="w-3.5 h-3.5" /> Catering Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CATERING_STYLES.map((style) => {
                    const isSelected = cateringPreference === style;
                    return (
                      <button
                        type="button"
                        key={style}
                        onClick={() => setCateringPreference(style)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center gap-2 ${
                          isSelected
                            ? 'border-palegar-gold bg-palegar-gold/10 dark:text-palegar-text text-palegar-lightText font-semibold'
                            : 'dark:border-palegar-gold/20 border-palegar-lightGold/30 dark:text-palegar-muted text-palegar-lightMuted'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full shrink-0 border flex items-center justify-center ${
                            isSelected ? 'border-palegar-gold bg-palegar-gold' : 'border-palegar-muted'
                          }`}
                        >
                          {isSelected && <div className="w-1 h-1 rounded-full bg-palegar-bg" />}
                        </div>
                        <span className="truncate">{style}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Add-ons */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-2 flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5" /> Event Add-ons (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ADDONS.map((addon) => {
                    const isChecked = selectedAddons.includes(addon);
                    return (
                      <label
                        key={addon}
                        className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center gap-2.5 transition-colors ${
                          isChecked
                            ? 'border-palegar-gold bg-palegar-gold/10 dark:text-palegar-text text-palegar-lightText font-medium'
                            : 'dark:border-palegar-gold/20 border-palegar-lightGold/30 dark:text-palegar-muted text-palegar-lightMuted'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon)}
                          className="accent-palegar-gold rounded"
                        />
                        <span className="truncate">{addon}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 6. Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t dark:border-palegar-gold/15 border-palegar-lightGold/20">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-lg dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm focus:outline-none focus:border-palegar-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1 flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> Mobile Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-lg border-r-0 dark:bg-palegar-card bg-slate-100 border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs font-mono text-palegar-muted">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="98765 43210"
                      value={organizerPhone}
                      onChange={(e) => setOrganizerPhone(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-r-lg dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm focus:outline-none focus:border-palegar-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={organizerEmail}
                    onChange={(e) => setOrganizerEmail(e.target.value)}
                    className="w-full p-2.5 rounded-lg dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm focus:outline-none focus:border-palegar-gold"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                  Special Requests (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Dietary preferences, seating requests, or celebration notes..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full p-2.5 rounded-lg dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm focus:outline-none focus:border-palegar-gold"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] dark:text-palegar-muted text-palegar-lightMuted flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-palegar-gold" /> Quick response via WhatsApp Concierge
                </span>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-palegar-chilli via-palegar-crimson to-palegar-chilli text-palegar-text font-bold text-xs uppercase tracking-wider border border-palegar-gold/50 shadow-lg shadow-palegar-chilli/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-3.5 h-3.5 text-palegar-goldLight" />
                      <span>Reserve Banquet Hall</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
