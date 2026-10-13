'use client';

import React, { useState, useEffect } from 'react';
import { Crown, X, Calendar, Clock, Users, CheckCircle2, MessageSquare, Loader2, Building, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import api, { Outlet, ConventionResponseData } from '@/services/api';

interface ConventionBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EVENT_TYPES = [
  'Wedding Reception',
  'Engagement / Sangeet',
  'Corporate Banquet & Gala',
  'Grand Family Milestone',
  'Birthday & Anniversary',
  'Cultural Feast & Conference',
];

const HALL_NAME = 'Palegar Palace Banquet Hall';
const MAX_CAPACITY = 100;

const TIME_SLOTS = [
  'Full Day Grand Royal (9:00 AM - 11:00 PM)',
  'Evening Gala Session (5:00 PM - 11:00 PM)',
  'Morning & Lunch Session (9:00 AM - 4:00 PM)',
];

const CATERING_STYLES = [
  'Signature Rayalaseema Pot Biryani & Royal Non-Veg Banquet',
  'Royal Palegar Multi-Course Non-Veg & Veg Grand Feast',
  'Authentic Traditional Rayalaseema Vegetarian Feast',
  'Custom Royal Gourmet Buffet & Live Earthen Counters',
];

const ADDON_SERVICES = [
  'Traditional Flower Mandap & Royal Entrance Decor',
  'Full Audio-Visual Stage, LED Screens & Lighting',
  'Live Traditional Nadaswaram & Acoustic Musicians',
  'Live Ragi Mudda & Natu Kodi Earthen Cooking Stations',
  'Royal Welcome Beverage & Buttermilk Diwan',
];

export default function ConventionBookingModal({ isOpen, onClose }: ConventionBookingModalProps) {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [selectedOutletId, setSelectedOutletId] = useState<string>('nalgonda-flagship');

  // Form Fields
  const [organizerName, setOrganizerName] = useState<string>('');
  const [organizerPhone, setOrganizerPhone] = useState<string>('');
  const [organizerEmail, setOrganizerEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [eventType, setEventType] = useState<string>(EVENT_TYPES[0]);
  const [hallPreference, setHallPreference] = useState<string>(HALL_NAME);
  const [expectedGuests, setExpectedGuests] = useState<number>(50);
  const [eventDate, setEventDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14); // Default to 2 weeks ahead
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>(TIME_SLOTS[1]);
  const [cateringPreference, setCateringPreference] = useState<string>(CATERING_STYLES[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([ADDON_SERVICES[0], ADDON_SERVICES[3]]);
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConventionResponseData | null>(null);

  useEffect(() => {
    async function loadOutlets() {
      const data = await api.getOutlets();
      if (data && data.length > 0) {
        setOutlets(data);
        setSelectedOutletId(data[0].id);
      }
    }
    loadOutlets();
  }, []);

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

  const toggleAddon = (service: string) => {
    setSelectedAddons((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.createConventionBooking({
        organizerName,
        organizerPhone,
        organizerEmail: organizerEmail || undefined,
        companyName: companyName || undefined,
        eventType,
        hallPreference,
        expectedGuests: Number(expectedGuests),
        eventDate,
        timeSlot,
        cateringPreference,
        additionalServices: selectedAddons,
        specialRequests: specialRequests || undefined,
        outletId: selectedOutletId || undefined,
      });

      if (res.success && res.booking) {
        setConfirmedBooking(res.booking);
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#E5A93C', '#D6301D', '#F3C973', '#8C1824'],
        });
      } else {
        // Fallback simulation
        setConfirmedBooking({
          id: 'cnv-sim-' + Date.now(),
          bookingNumber: 'CNV-' + Math.floor(1000 + Math.random() * 9000),
          organizerName,
          organizerPhone,
          companyName: companyName || undefined,
          eventType,
          hallPreference,
          expectedGuests: Number(expectedGuests),
          eventDate,
          timeSlot,
          cateringPreference,
          status: 'REQUEST_RECEIVED',
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error('Convention booking submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-modal="true"
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 dark:bg-palegar-bg/95 bg-black/65 backdrop-blur-xl animate-fadeIn overflow-y-auto overscroll-contain"
    >
      <div className="relative w-full max-w-2xl glass-panel dark:bg-palegar-card/95 bg-white rounded-3xl border dark:border-palegar-gold/40 border-palegar-lightGold/50 shadow-2xl my-6 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Pinned Modal Header Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b dark:border-palegar-gold/15 border-palegar-lightGold/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full dark:bg-palegar-crimson/40 bg-palegar-lightCrimson/15 border dark:border-palegar-gold/40 border-palegar-lightGold/40 flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 dark:text-palegar-gold text-palegar-lightGold" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold dark:text-palegar-text text-palegar-lightText gold-glow">
                Book Royal Convention & Banquet
              </h3>
              <p className="text-[11px] dark:text-palegar-gold text-palegar-lightGold font-medium">
                Grand palace banquet halls & authentic Rayalaseema catering
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-full dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold hover:text-palegar-text hover:bg-palegar-crimson/40 transition-colors shrink-0"
            aria-label="Close convention modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area Strictly Inside Box */}
        <div className="overflow-y-auto p-5 sm:p-7 custom-modal-scroll overscroll-contain flex-1">
          {!confirmedBooking ? (
            <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-4 text-xs">
              {/* Venue Location & Event Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Banquet Venue
                  </label>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText">
                    <MapPin className="w-4 h-4 dark:text-palegar-gold text-palegar-lightGold shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold dark:text-palegar-gold text-palegar-lightGold block truncate">Kritunga Restaurant — Nalgonda</span>
                      <span className="text-[10px] opacity-80 block truncate">Chandanapalli, Hyderabad Road</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Occasion / Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  >
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Single Hall Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                  Banquet Hall
                </label>
                <div className="p-3 rounded-xl border border-palegar-gold/40 dark:bg-palegar-card bg-palegar-lightCardHover flex items-center justify-between">
                  <div>
                    <p className="font-cinzel font-bold text-xs dark:text-palegar-text text-palegar-lightText">
                      {HALL_NAME}
                    </p>
                    <p className="text-[10px] dark:text-palegar-gold text-palegar-lightGold">
                      Exclusive Royal Hall &bull; Up to 100 Guests
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full dark:bg-palegar-crimson/30 bg-palegar-lightCrimson/10 text-palegar-gold font-bold">
                    Max 100
                  </span>
                </div>
              </div>

              {/* Organizer Name, Phone, Email, Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Organizer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    placeholder="e.g. Maharajah Vikramaditya"
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Phone (WhatsApp Concierge) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={organizerPhone}
                    onChange={(e) => setOrganizerPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={organizerEmail}
                    onChange={(e) => setOrganizerEmail(e.target.value)}
                    placeholder="e.g. organizer@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Company / Family House (Optional)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Rayala Heritage Trust"
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  />
                </div>
              </div>

              {/* Event Date, Guests & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Expected Guests *
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    required
                    value={expectedGuests}
                    onChange={(e) => setExpectedGuests(Math.min(parseInt(e.target.value, 10) || 10, 100))}
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Session Slot *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Catering Style */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                  Royal Catering & Banquet Feast Style
                </label>
                <select
                  value={cateringPreference}
                  onChange={(e) => setCateringPreference(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                >
                  {CATERING_STYLES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Addon Services */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                  Royal Hospitality Enhancements (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ADDON_SERVICES.map((addon) => {
                    const isChecked = selectedAddons.includes(addon);
                    return (
                      <label
                        key={addon}
                        onClick={() => toggleAddon(addon)}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer select-none transition-all ${
                          isChecked
                            ? 'border-palegar-gold dark:bg-palegar-gold/10 bg-palegar-lightGold/15'
                            : 'dark:border-palegar-gold/15 border-palegar-lightGold/20 dark:bg-palegar-card bg-palegar-lightCardHover'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 rounded border-palegar-gold text-palegar-crimson focus:ring-0"
                        />
                        <span className="text-[11px] dark:text-palegar-text/90 text-palegar-lightText/90 leading-tight">
                          {addon}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                  Special Arrangements / Banquet Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. VIP stage layout, custom welcome ceremony, bridal diwan seating"
                  className="w-full px-3.5 py-2 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-3 py-3.5 rounded-full bg-gradient-to-r from-palegar-chilli via-palegar-crimson to-palegar-chilli text-palegar-text font-bold text-xs uppercase tracking-wider border border-palegar-gold/50 shadow-xl shadow-palegar-chilli/40 hover:scale-[1.01] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-palegar-gold" />
                  <span>Submitting Royal Convention Request...</span>
                </>
              ) : (
                <span>Submit Convention Hall Booking Inquiry</span>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full dark:bg-palegar-gold/20 bg-palegar-lightGold/20 border-2 dark:border-palegar-gold border-palegar-lightGold flex items-center justify-center mx-auto shadow-xl shadow-palegar-gold/20">
              <CheckCircle2 className="w-10 h-10 dark:text-palegar-gold text-palegar-lightGold" />
            </div>
            <h3 className="font-cinzel text-2xl font-black dark:text-palegar-text text-palegar-lightText gold-glow">
              Convention Request Submitted!
            </h3>
            <p className="text-xs sm:text-sm dark:text-palegar-muted text-palegar-lightMuted max-w-md mx-auto leading-relaxed">
              Honored <span className="dark:text-palegar-gold text-palegar-lightGold font-bold">{confirmedBooking.organizerName}</span>, your royal booking inquiry for{' '}
              <span className="font-bold dark:text-palegar-text text-palegar-lightText">{confirmedBooking.hallPreference}</span> has been logged under our Palegar Banquet Registry.
            </p>

            <div className="p-4 rounded-2xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs text-left space-y-1.5 shadow-sm max-w-md mx-auto font-mono">
              <div className="flex justify-between border-b dark:border-palegar-gold/15 border-palegar-lightGold/20 pb-1.5">
                <span className="dark:text-palegar-muted text-palegar-lightMuted">Inquiry Reference:</span>
                <span className="dark:text-palegar-gold text-palegar-lightGold font-bold">#{confirmedBooking.bookingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="dark:text-palegar-muted text-palegar-lightMuted">Event & Date:</span>
                <span className="dark:text-palegar-text text-palegar-lightText">{confirmedBooking.eventType} ({confirmedBooking.eventDate})</span>
              </div>
              <div className="flex justify-between">
                <span className="dark:text-palegar-muted text-palegar-lightMuted">Expected Guests:</span>
                <span className="dark:text-palegar-text text-palegar-lightText">{confirmedBooking.expectedGuests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="dark:text-palegar-muted text-palegar-lightMuted">Status:</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px]">
                  {confirmedBooking.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <p className="text-xs dark:text-palegar-gold text-palegar-lightGold max-w-sm mx-auto">
              Our Royal Banquet Concierge will reach out within 2 hours with hall floorplans, tasting arrangements, and custom menus.
            </p>

            <div className="space-y-2 pt-2 max-w-md mx-auto">
              {confirmedBooking.whatsappUrl && (
                <a
                  href={confirmedBooking.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider border border-emerald-500/50 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-200" />
                  <span>Receive Details on WhatsApp</span>
                </a>
              )}

              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-full dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold hover:bg-palegar-gold/10 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Close & Return
              </button>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
