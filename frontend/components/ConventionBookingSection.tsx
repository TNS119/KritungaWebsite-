'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import api, { Outlet, ConventionResponseData } from '@/services/api';
import CustomDropdown from '@/components/CustomDropdown';

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

const BANQUET_GALLERY = [
  {
    id: 'grand-hall',
    title: 'Grand Hall (100 Seater)',
    tag: '2nd Floor Aisle & Seating',
    desc: 'Symmetrical golden-champagne silk diwan seating, crystal chandelier coves, and polished Italian marble on 2nd Floor.',
    src: '/images/conventions/palegar-banquet-hall.jpg',
    events: ['Family Gathering / Milestone', 'Birthday & Anniversary']
  },
  {
    id: 'stage-mandap',
    title: 'Floral Mandap & Stage',
    tag: 'Decorated Dais',
    desc: 'Lavish traditional floral mandap arch with fresh yellow marigold & jasmine garlands and warm brass diya lighting.',
    src: '/images/conventions/palegar-banquet-stage.jpg',
    events: ['Engagement Ceremony']
  },
  {
    id: 'dining-buffet',
    title: 'Royal Dining Buffet',
    tag: 'Claypot Catering',
    desc: 'Live Rayalaseema dum counters, steaming copper & brass handis, and long banquet dining tables.',
    src: '/images/conventions/palegar-banquet-dining.jpg',
    events: ['Private Royal Feast']
  },
  {
    id: 'corporate-setup',
    title: 'Corporate Conference',
    tag: 'Seminar & AV Ready',
    desc: 'Executive seminar layout with digital presentation screen, podium, and high-fidelity sound system.',
    src: '/images/conventions/palegar-banquet-corporate.jpg',
    events: ['Corporate Dinner & Meeting']
  }
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

  // Dynamic Image Gallery State & Continuous Slideshow
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Continuously cycle through banquet photos every 3.8s unless temporarily paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % BANQUET_GALLERY.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Pause for 5 seconds when manual navigation is clicked, then resume continuous slideshow
  const pauseFor5SecondsThenResume = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      pauseTimeoutRef.current = null;
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + BANQUET_GALLERY.length) % BANQUET_GALLERY.length);
    pauseFor5SecondsThenResume();
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % BANQUET_GALLERY.length);
    pauseFor5SecondsThenResume();
  };

  const handleSelectSlide = (idx: number) => {
    setActiveImageIndex(idx);
    pauseFor5SecondsThenResume();
  };

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
            { id: 'nalgonda-main', name: 'Kritunga Nalgonda', city: 'Nalgonda', address: '[Chandanapalli / Landmark], Hyderabad Road, Nalgonda, Telangana - 508001', phone: '+91 87XXXXX001', isActive: true },
          ];
          setOutlets(fallbackOutlets);
          setSelectedOutletId(fallbackOutlets[0].id);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleEventTypeChange = (newType: string) => {
    setEventType(newType);
    const matchedIndex = BANQUET_GALLERY.findIndex((g) => g.events.includes(newType));
    if (matchedIndex !== -1) {
      setActiveImageIndex(matchedIndex);
    }
  };

  const handleCateringChange = (style: string) => {
    setCateringPreference(style);
    if (style.includes('Buffet') || style.includes('Counters')) {
      setActiveImageIndex(2); // Dining buffet view
    }
  };

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) => {
      const isAdding = !prev.includes(addon);
      if (isAdding) {
        if (addon.includes('Flower')) {
          setActiveImageIndex(1); // Stage & Mandap decor
        } else if (addon.includes('Audio-Visual')) {
          setActiveImageIndex(3); // Corporate / AV stage
        } else if (addon.includes('Cooking Counter')) {
          setActiveImageIndex(2); // Buffet dining
        }
      }
      return prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon];
    });
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

  const currentGalleryItem = BANQUET_GALLERY[activeImageIndex] || BANQUET_GALLERY[0];

  return (
    <section
      id="conventions"
      className="relative py-20 sm:py-28 dark:bg-palegar-bg bg-palegar-lightBg dark:text-palegar-text text-palegar-lightText transition-colors duration-300 border-t dark:border-palegar-gold/15 border-palegar-lightGold/20 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] dark:bg-palegar-crimson/10 bg-palegar-lightCrimson/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] dark:bg-palegar-gold/10 bg-palegar-lightGold/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-palegar-gold" />
            <span>2nd Floor Royal Convention Suite</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-tight dark:text-palegar-text text-palegar-lightText gold-glow mb-3">
            Palace Banquet Hall (100 Capacity)
          </h2>
          <p className="dark:text-palegar-muted text-palegar-lightMuted text-xs sm:text-base leading-relaxed">
            Reserve our exclusive 2nd-floor celebratory hall for engagements, family milestones, and corporate banquets paired with authentic Rayalaseema claypot catering.
          </p>
        </div>

        {/* 2-Column Split: Left Booking Form & Right Highly-Visible Image Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column (lg:col-span-6): Interactive Reservation Form */}
          <div className="lg:col-span-6">
            <div id="booking-form" className="glass-panel rounded-3xl p-6 sm:p-9 border dark:border-palegar-gold/30 border-palegar-lightGold/40 shadow-2xl">
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
                      <span className="font-semibold">{confirmationData.hallPreference} (2nd Floor)</span>
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
                  <div className="border-b dark:border-palegar-gold/15 border-palegar-lightGold/20 pb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold dark:text-palegar-text text-palegar-lightText">
                        Banquet Reservation
                      </h3>
                      <p className="text-xs dark:text-palegar-muted text-palegar-lightMuted mt-0.5">
                        Configure your celebration setup. Visuals on the right update automatically.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full dark:bg-palegar-card bg-slate-100 border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-palegar-gold font-bold shrink-0">
                      2nd Floor
                    </span>
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
                      <div className="h-[54px] p-2.5 rounded-xl dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm flex items-center gap-2">
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold dark:text-palegar-gold text-palegar-lightGold block truncate">
                            Kritunga Restaurant — Nalgonda
                          </span>
                          <span className="text-[11px] opacity-75 block truncate">
                            [Chandanapalli / Landmark], Hyderabad Road (2nd Floor)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1.5 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Event Occasion
                      </label>
                      <CustomDropdown
                        value={eventType}
                        onChange={handleEventTypeChange}
                        options={EVENT_TYPES}
                        heightClass="h-[54px]"
                        subtitle="Celebration Setup"
                      />
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
                        className="w-full h-[46px] p-2.5 rounded-xl dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm focus:outline-none focus:border-palegar-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Session Time
                      </label>
                      <CustomDropdown
                        value={timeSlot}
                        onChange={setTimeSlot}
                        options={TIME_SLOTS}
                        heightClass="h-[46px]"
                      />
                    </div>
                  </div>

                  {/* 3. Expected Guests Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> Expected Guests (Max 100)
                      </label>
                      <span className="font-mono text-sm font-bold dark:text-palegar-gold text-palegar-lightGold px-2.5 py-0.5 rounded-full dark:bg-palegar-card bg-slate-100 border dark:border-palegar-gold/30 border-palegar-lightGold/40">
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
                              ? 'bg-palegar-gold text-palegar-bg border-palegar-gold shadow-sm'
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
                            onClick={() => handleCateringChange(style)}
                            className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                              isSelected
                                ? 'border-palegar-gold bg-palegar-gold/15 dark:text-palegar-text text-palegar-lightText font-semibold shadow-sm'
                                : 'dark:border-palegar-gold/20 border-palegar-lightGold/30 dark:text-palegar-muted text-palegar-lightMuted hover:border-palegar-gold/40'
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
                      <Gift className="w-3.5 h-3.5" /> Event Add-ons (Click to preview setup)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ADDONS.map((addon) => {
                        const isChecked = selectedAddons.includes(addon);
                        return (
                          <label
                            key={addon}
                            className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center gap-2.5 transition-colors ${
                              isChecked
                                ? 'border-palegar-gold bg-palegar-gold/10 dark:text-palegar-text text-palegar-lightText font-medium shadow-sm'
                                : 'dark:border-palegar-gold/20 border-palegar-lightGold/30 dark:text-palegar-muted text-palegar-lightMuted hover:border-palegar-gold/40'
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t dark:border-palegar-gold/15 border-palegar-lightGold/20">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. [Organizer Full Name]"
                        value={organizerName}
                        onChange={(e) => setOrganizerName(e.target.value)}
                        required
                        className="w-full p-2.5 rounded-xl dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm focus:outline-none focus:border-palegar-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1 flex items-center gap-1">
                        <PhoneCall className="w-3 h-3" /> Mobile Number *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-2.5 rounded-l-xl border-r-0 dark:bg-palegar-card bg-slate-100 border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs font-mono text-palegar-muted">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="87XXXXXXX"
                          value={organizerPhone}
                          onChange={(e) => setOrganizerPhone(e.target.value)}
                          required
                          className="w-full p-2.5 rounded-r-xl dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm focus:outline-none focus:border-palegar-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. [name@domain.com]"
                        value={organizerEmail}
                        onChange={(e) => setOrganizerEmail(e.target.value)}
                        className="w-full p-2.5 rounded-xl dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm focus:outline-none focus:border-palegar-gold"
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
                      placeholder="e.g. [Stage Floral Preferences / AV Setup / Custom Menu Notes]"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full p-2.5 rounded-xl dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-text text-palegar-lightText text-xs shadow-sm focus:outline-none focus:border-palegar-gold"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] dark:text-palegar-muted text-palegar-lightMuted flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-palegar-gold" /> Dedicated WhatsApp Concierge
                    </span>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-palegar-chilli via-palegar-crimson to-palegar-chilli text-palegar-text font-bold text-xs uppercase tracking-wider border border-palegar-gold/50 shadow-lg shadow-palegar-chilli/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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

          {/* Right Column (lg:col-span-6): Sticky, Majestic Grand Image Showcase */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <div className="glass-panel rounded-3xl border dark:border-palegar-gold/40 border-palegar-lightGold/50 shadow-2xl overflow-hidden">
              {/* Grand High-Res Continuous Cross-Fade Slideshow Display */}
              <div
                className="relative h-[420px] sm:h-[480px] md:h-[540px] lg:h-[600px] w-full overflow-hidden bg-black/90 group"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => {
                  if (!pauseTimeoutRef.current) {
                    setIsPaused(false);
                  }
                }}
              >
                {/* Stacked Images for Buttery-Smooth Cross-Fade */}
                {BANQUET_GALLERY.map((item, idx) => {
                  const isActive = activeImageIndex === idx;
                  return (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />
                    </div>
                  );
                })}

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-palegar-gold/50 text-palegar-goldLight shadow-lg flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-palegar-gold" />
                    2nd Floor Banquet
                  </span>

                  <span className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full bg-palegar-crimson/90 backdrop-blur-md text-white shadow-lg border border-white/20 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Max 100 Guests
                  </span>
                </div>

                {/* Left & Right Chevron Controls (Appear on Hover) */}
                <div className="absolute inset-y-0 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous hall photo"
                    className="pointer-events-auto p-2.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-palegar-gold/40 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5 text-palegar-goldLight" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next hall photo"
                    className="pointer-events-auto p-2.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-palegar-gold/40 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5 text-palegar-goldLight" />
                  </button>
                </div>

                {/* Bottom Overlay Info with Nav Slides Positioned Below Text */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-palegar-goldLight">
                    {currentGalleryItem.tag}
                  </span>
                  <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white drop-shadow-md mt-0.5">
                    {currentGalleryItem.title}
                  </h4>
                  <p className="text-xs text-neutral-200 line-clamp-2 mt-1 leading-relaxed drop-shadow">
                    {currentGalleryItem.desc}
                  </p>

                  {/* Visual Nav Slide Bars (Positioned Below Text as Requested) */}
                  <div className="flex items-center gap-2 mt-3.5 pt-1">
                    {BANQUET_GALLERY.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectSlide(idx)}
                        className="h-1.5 flex-1 rounded-full overflow-hidden bg-white/25 backdrop-blur-sm transition-all hover:bg-white/45"
                        title={`Perspective ${idx + 1}: ${item.title}`}
                      >
                        <div
                          className={`h-full bg-gradient-to-r from-palegar-gold to-palegar-goldLight transition-all duration-500 ${
                            activeImageIndex === idx ? 'w-full shadow-sm' : 'w-0'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Form Summary Pill Card */}
              <div className="p-4 sm:p-5 border-t dark:border-palegar-gold/20 border-palegar-lightGold/20 space-y-3 bg-white/40 dark:bg-black/20 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold dark:text-palegar-text text-palegar-lightText uppercase text-[11px] tracking-wide">
                    Live Booking Setup
                  </span>
                  <span className="font-mono text-[10px] font-bold text-palegar-goldLight px-2 py-0.5 rounded-full dark:bg-palegar-card bg-white border border-palegar-gold/30">
                    Kritunga Nalgonda
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between items-center py-1 border-b dark:border-palegar-gold/10 border-palegar-lightGold/15">
                    <span className="dark:text-palegar-muted text-palegar-lightMuted">Occasion:</span>
                    <span className="font-semibold text-right dark:text-palegar-gold text-palegar-lightGold">{eventType}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b dark:border-palegar-gold/10 border-palegar-lightGold/15">
                    <span className="dark:text-palegar-muted text-palegar-lightMuted">Seating Capacity:</span>
                    <span className="font-semibold text-right font-mono">{expectedGuests} of 100 Members</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b dark:border-palegar-gold/10 border-palegar-lightGold/15">
                    <span className="dark:text-palegar-muted text-palegar-lightMuted">Selected Date:</span>
                    <span className="font-semibold text-right font-mono">{eventDate}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="dark:text-palegar-muted text-palegar-lightMuted">Catering Plan:</span>
                    <span className="font-semibold text-right truncate max-w-[200px]">{cateringPreference}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-semibold text-emerald-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 2nd Floor Lift & Escalator Access
                  </span>
                  <span className="text-[10px] font-mono text-palegar-gold">AC Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
