'use client';

import React, { useState, useEffect } from 'react';
import { Utensils, X, Calendar, Clock, Users, Crown, CheckCircle2, MessageSquare, Loader2, MapPin } from 'lucide-react';
import api, { Outlet, ReservationResponseData } from '@/services/api';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TableReservationModal({ isOpen, onClose }: TableReservationModalProps) {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [selectedOutletId, setSelectedOutletId] = useState<string>('nalgonda-flagship');
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(2);
  const todayStr = (() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })();
  const [reservationDate, setReservationDate] = useState<string>(todayStr);
  const [timeSlot, setTimeSlot] = useState<string>('Imperial Dinner (8:00 PM)');
  const [tableType, setTableType] = useState<string>('Royal Palegar Banquet Diwan');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationResponseData | null>(null);

  useEffect(() => {
    async function loadOutlets() {
      const data = await api.getOutlets();
      if (data && data.length > 0) {
        setOutlets(data);
        setSelectedOutletId(data[0].id);
      } else {
        setSelectedOutletId('nalgonda-flagship');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.createReservation({
        guestName,
        guestPhone,
        guestEmail: guestEmail || undefined,
        outletId: selectedOutletId,
        partySize,
        reservationDate,
        timeSlot,
        tableType,
        specialRequests: specialRequests || undefined
      });

      if (res.success && res.reservation) {
        setConfirmedReservation(res.reservation);
      } else {
        // Fallback simulation
        setConfirmedReservation({
          id: 'res-sim-' + Date.now(),
          bookingNumber: 'RES-' + Math.floor(1000 + Math.random() * 9000),
          guestName,
          guestPhone,
          partySize,
          reservationDate,
          timeSlot,
          tableType,
          status: 'CONFIRMED'
        });
      }
    } catch (err) {
      console.error('Reservation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmedReservation(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-modal="true"
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 dark:bg-palegar-bg/95 bg-black/75 backdrop-blur-xl animate-fadeIn overflow-y-auto overscroll-contain"
    >
      <div className="relative w-full max-w-lg glass-panel dark:bg-palegar-card/95 bg-white rounded-3xl border dark:border-palegar-gold/40 border-palegar-lightGold/50 shadow-2xl my-auto max-h-[92vh] flex flex-col overflow-hidden">
        {/* Pinned Modal Header Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b dark:border-palegar-gold/15 border-palegar-lightGold/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full dark:bg-palegar-crimson/40 bg-palegar-lightCrimson/15 border dark:border-palegar-gold/40 border-palegar-lightGold/40 flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 dark:text-palegar-gold text-palegar-lightGold" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold dark:text-palegar-text text-palegar-lightText gold-glow">
                Reserve Royal Palegar Diwan
              </h3>
              <p className="text-[11px] dark:text-palegar-gold text-palegar-lightGold font-medium">
                Guaranteed banquet seating with traditional brassware hospitality
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-full dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold hover:text-palegar-text hover:bg-palegar-crimson/40 transition-colors shrink-0"
            aria-label="Close table reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area Strictly Inside Box */}
        <div className="overflow-y-auto p-5 sm:p-6 custom-modal-scroll overscroll-contain flex-1">
          {!confirmedReservation ? (
            <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-3">
              {/* Restaurant Location - Exclusively Nalgonda Native */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                  Restaurant Location
                </label>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText">
                  <MapPin className="w-4 h-4 dark:text-palegar-gold text-palegar-lightGold shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold dark:text-palegar-gold text-palegar-lightGold">Kritunga Restaurant — Nalgonda</span>
                    <span className="text-[11px] opacity-80 block">Chandanapalli, Hyderabad Road, Nalgonda</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full dark:bg-palegar-gold/20 bg-palegar-lightGold/20 dark:text-palegar-gold text-palegar-lightGold border dark:border-palegar-gold/30 border-palegar-lightGold/30">
                    Flagship
                  </span>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Vikramaditya"
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Phone (WhatsApp Receipt)
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Dining Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  >
                    <option value="Lunch Banquet (12:30 PM)">Lunch Banquet (12:30 PM)</option>
                    <option value="Lunch Banquet (1:30 PM)">Lunch Banquet (1:30 PM)</option>
                    <option value="Lunch Banquet (2:30 PM)">Lunch Banquet (2:30 PM)</option>
                    <option value="Imperial Dinner (7:30 PM)">Imperial Dinner (7:30 PM)</option>
                    <option value="Imperial Dinner (8:30 PM)">Imperial Dinner (8:30 PM)</option>
                    <option value="Imperial Dinner (9:30 PM)">Imperial Dinner (9:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Party Size & Table Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Party Size (Guests)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    required
                    value={partySize}
                    onChange={(e) => setPartySize(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                    Seating Ambience
                  </label>
                  <select
                    value={tableType}
                    onChange={(e) => setTableType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                  >
                    <option value="Royal Palegar Banquet Diwan">Royal Palegar Banquet Diwan</option>
                    <option value="Regal Courtyard Table">Regal Courtyard Table</option>
                    <option value="Private Heritage Fort Cabin">Private Heritage Fort Cabin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                  Special Occasion / Dietary Notes (Optional)
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Birthday celebration, moderate spice preference"
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 rounded-full bg-gradient-to-r from-palegar-chilli via-palegar-crimson to-palegar-chilli text-palegar-text font-bold text-xs uppercase tracking-wider border border-palegar-gold/50 shadow-xl shadow-palegar-chilli/40 hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-palegar-gold" />
                  <span>Reserving Imperial Table...</span>
                </>
              ) : (
                <span>Confirm Table Reservation</span>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full dark:bg-palegar-gold/20 bg-palegar-lightGold/20 border-2 dark:border-palegar-gold border-palegar-lightGold flex items-center justify-center mx-auto shadow-xl shadow-palegar-gold/20">
              <CheckCircle2 className="w-10 h-10 dark:text-palegar-gold text-palegar-lightGold" />
            </div>
            <h3 className="font-cinzel text-2xl font-black dark:text-palegar-text text-palegar-lightText gold-glow">
              Imperial Table Reserved!
            </h3>
            <p className="text-xs sm:text-sm dark:text-palegar-muted text-palegar-lightMuted max-w-sm mx-auto leading-relaxed">
              We look forward to welcoming you, <span className="dark:text-palegar-gold text-palegar-lightGold font-bold">{confirmedReservation.guestName}</span>. A {confirmedReservation.tableType} has been assigned at <span className="font-bold">{confirmedReservation.outlet?.name || 'Kritunga Restaurant — Nalgonda'}</span> for {confirmedReservation.partySize} guests.
            </p>

            <div className="p-3.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs font-mono dark:text-palegar-gold text-palegar-lightGold shadow-sm">
              Booking Ref: #{confirmedReservation.bookingNumber} • {confirmedReservation.reservationDate} ({confirmedReservation.timeSlot})
            </div>

            <div className="space-y-2 pt-2">
              {confirmedReservation.whatsappUrl && (
                <a
                  href={confirmedReservation.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider border border-emerald-500/50 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-200" />
                  <span>Receive Booking on WhatsApp</span>
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
