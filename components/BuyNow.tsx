'use client';

import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Check, Flame, Shield, Sparkles, X, Truck, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCT_PACKS, ProductPack } from '@/data/products';

interface BuyNowProps {
  modalOpen: boolean;
  onCloseModal: () => void;
  onOpenModal: () => void;
}

export default function BuyNow({ modalOpen, onCloseModal, onOpenModal }: BuyNowProps) {
  const [selectedPackId, setSelectedPackId] = useState<string>(PRODUCT_PACKS[0].id);
  const [quantity, setQuantity] = useState<number>(1);
  const [extraRagiMudda, setExtraRagiMudda] = useState<boolean>(false);
  const [extraDoubleKaMeetha, setExtraDoubleKaMeetha] = useState<boolean>(false);
  const [isOrdered, setIsOrdered] = useState<boolean>(false);

  // Form State for Checkout Simulator
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [spicePreference, setSpicePreference] = useState<string>('Authentic Palegar Fire (Default)');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  const selectedPack = PRODUCT_PACKS.find((p) => p.id === selectedPackId) || PRODUCT_PACKS[0];

  const basePrice = selectedPack.price * quantity;
  const addonCost = (extraRagiMudda ? 90 * quantity : 0) + (extraDoubleKaMeetha ? 120 * quantity : 0);
  const subtotal = basePrice + addonCost;
  const deliveryFee = subtotal > 1000 ? 0 : 49;
  const grandTotal = subtotal + deliveryFee;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D6301D', '#E5A93C', '#8C1824', '#F3C973'],
    });
  };

  const handleResetOrder = () => {
    setIsOrdered(false);
    onCloseModal();
  };

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
            <span>Royal Dining & Takeaway</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-tight dark:text-palegar-text text-palegar-lightText gold-glow mb-4">
            Choose Your Royal Feast Box
          </h2>
          <p className="dark:text-palegar-muted text-palegar-lightMuted text-sm sm:text-base leading-relaxed">
            Direct from our earthen handis to your dining room table. Hot, sealed, and infused with signature Palegar potli dum.
          </p>
        </div>

        {/* 4 Pack Selection Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {PRODUCT_PACKS.map((pack) => {
            const isSelected = pack.id === selectedPackId;
            return (
              <button
                key={pack.id}
                onClick={() => {
                  setSelectedPackId(pack.id);
                  setQuantity(1);
                }}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 relative border flex flex-col justify-between ${
                  isSelected
                    ? 'dark:bg-gradient-to-b dark:from-palegar-cardHover dark:to-palegar-card bg-gradient-to-b from-white to-palegar-lightCardHover border-palegar-gold dark:shadow-xl dark:shadow-palegar-crimson/30 shadow-lg shadow-palegar-lightGold/30 scale-[1.02]'
                    : 'glass-panel dark:border-palegar-gold/20 border-palegar-lightGold/30 dark:hover:border-palegar-gold/40 hover:border-palegar-lightGold dark:hover:bg-palegar-cardHover/60 hover:bg-palegar-lightCardHover/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full dark:bg-palegar-chilli/30 bg-palegar-lightCrimson/10 dark:text-palegar-goldLight text-palegar-lightCrimson border dark:border-palegar-chilli/40 border-palegar-lightCrimson/30">
                      {pack.tag}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-palegar-gold text-palegar-bg flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <h3 className="font-cinzel font-bold text-sm sm:text-base dark:text-palegar-text text-palegar-lightText line-clamp-2 mb-1">
                    {pack.name}
                  </h3>
                  <p className="text-[11px] dark:text-palegar-muted text-palegar-lightMuted line-clamp-1 mb-3">{pack.subtitle}</p>
                </div>

                <div className="flex items-baseline gap-2 pt-2 border-t dark:border-palegar-gold/10 border-palegar-lightGold/20">
                  <span className="font-mono text-lg sm:text-xl font-bold dark:text-palegar-gold text-palegar-lightGold">
                    ₹{pack.price}
                  </span>
                  <span className="font-mono text-xs dark:text-palegar-muted text-palegar-lightMuted line-through">
                    ₹{pack.originalPrice}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Product Detailed Customizer Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border dark:border-palegar-gold/30 border-palegar-lightGold/40 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Col: Specs & Badges */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold dark:text-palegar-gold text-palegar-lightGold dark:bg-palegar-crimson/40 bg-palegar-lightCrimson/10 px-3 py-1 rounded-full border dark:border-palegar-gold/30 border-palegar-lightGold/40 uppercase shadow-sm">
                  {selectedPack.portion}
                </span>
                <div className="flex items-center gap-1 dark:bg-palegar-card bg-palegar-lightCardHover px-3 py-1 rounded-full border dark:border-palegar-gold/20 border-palegar-lightGold/30 text-xs text-palegar-chilli font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Spice Level {selectedPack.spiceLevel}/5</span>
                </div>
              </div>

              <div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold dark:text-palegar-text text-palegar-lightText gold-glow mb-2">
                  {selectedPack.name}
                </h3>
                <p className="text-sm sm:text-base dark:text-palegar-muted text-palegar-lightMuted leading-relaxed">
                  {selectedPack.description}
                </p>
              </div>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedPack.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 text-xs sm:text-sm dark:text-palegar-text/90 text-palegar-lightText/90">
                    <CheckCircle2 className="w-4 h-4 text-palegar-gold shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t dark:border-palegar-gold/20 border-palegar-lightGold/20">
                <div className="p-3 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/15 border-palegar-lightGold/20 shadow-sm">
                  <span className="text-[10px] dark:text-palegar-muted text-palegar-lightMuted block uppercase">Dum Cooking</span>
                  <span className="text-xs font-bold dark:text-palegar-gold text-palegar-lightGold font-mono">{selectedPack.specs.dumHours}</span>
                </div>
                <div className="p-3 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/15 border-palegar-lightGold/20 shadow-sm">
                  <span className="text-[10px] dark:text-palegar-muted text-palegar-lightMuted block uppercase">Spice Secret</span>
                  <span className="text-xs font-bold dark:text-palegar-gold text-palegar-lightGold">{selectedPack.specs.spiceBlend}</span>
                </div>
                <div className="p-3 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/15 border-palegar-lightGold/20 shadow-sm">
                  <span className="text-[10px] dark:text-palegar-muted text-palegar-lightMuted block uppercase">Clarified Ghee</span>
                  <span className="text-xs font-bold dark:text-palegar-gold text-palegar-lightGold">{selectedPack.specs.oilGhee}</span>
                </div>
                <div className="p-3 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/15 border-palegar-lightGold/20 shadow-sm">
                  <span className="text-[10px] dark:text-palegar-muted text-palegar-lightMuted block uppercase">Bouquet</span>
                  <span className="text-xs font-bold dark:text-palegar-gold text-palegar-lightGold">{selectedPack.specs.aromaProfile}</span>
                </div>
              </div>
            </div>

            {/* Right Col: Price & Action Summary */}
            <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-2xl border dark:border-palegar-gold/30 border-palegar-lightGold/40 flex flex-col justify-between space-y-6 shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b dark:border-palegar-gold/20 border-palegar-lightGold/20">
                  <span className="text-xs font-mono uppercase tracking-widest dark:text-palegar-muted text-palegar-lightMuted">
                    Portion Quantity
                  </span>
                  <div className="flex items-center gap-3 dark:bg-palegar-card bg-palegar-lightCardHover px-3 py-1 rounded-full border dark:border-palegar-gold/30 border-palegar-lightGold/40 shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="dark:text-palegar-gold text-palegar-lightGold hover:text-palegar-text transition-colors p-1"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-sm font-bold dark:text-palegar-text text-palegar-lightText w-5 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="dark:text-palegar-gold text-palegar-lightGold hover:text-palegar-text transition-colors p-1"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Add-on toggles */}
                <div className="space-y-3 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold">
                    Royal Accompaniments
                  </span>

                  <label className="flex items-center justify-between p-2.5 rounded-xl dark:bg-palegar-card/60 bg-palegar-lightCardHover/80 border dark:border-palegar-gold/15 border-palegar-lightGold/20 cursor-pointer hover:bg-palegar-lightCardHover transition-colors shadow-sm">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={extraRagiMudda}
                        onChange={(e) => setExtraRagiMudda(e.target.checked)}
                        className="rounded border-palegar-gold text-palegar-crimson focus:ring-0"
                      />
                      <span className="text-xs dark:text-palegar-text text-palegar-lightText font-medium">Extra Ghee Ragi Mudda</span>
                    </div>
                    <span className="text-xs font-mono dark:text-palegar-gold text-palegar-lightGold font-bold">+₹90</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl dark:bg-palegar-card/60 bg-palegar-lightCardHover/80 border dark:border-palegar-gold/15 border-palegar-lightGold/20 cursor-pointer hover:bg-palegar-lightCardHover transition-colors shadow-sm">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={extraDoubleKaMeetha}
                        onChange={(e) => setExtraDoubleKaMeetha(e.target.checked)}
                        className="rounded border-palegar-gold text-palegar-crimson focus:ring-0"
                      />
                      <span className="text-xs dark:text-palegar-text text-palegar-lightText font-medium">Royal Double Ka Meetha</span>
                    </div>
                    <span className="text-xs font-mono dark:text-palegar-gold text-palegar-lightGold font-bold">+₹120</span>
                  </label>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="pt-4 border-t dark:border-palegar-gold/20 border-palegar-lightGold/20 space-y-2">
                <div className="flex justify-between text-xs dark:text-palegar-muted text-palegar-lightMuted">
                  <span>Base Price ({quantity}x)</span>
                  <span className="font-mono">₹{basePrice}</span>
                </div>
                {addonCost > 0 && (
                  <div className="flex justify-between text-xs dark:text-palegar-muted text-palegar-lightMuted">
                    <span>Accompaniments</span>
                    <span className="font-mono">+₹{addonCost}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs dark:text-palegar-muted text-palegar-lightMuted">
                  <span>Packaging & Delivery</span>
                  <span className="font-mono">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t dark:border-palegar-gold/20 border-palegar-lightGold/20">
                  <span className="font-cinzel text-base font-bold dark:text-palegar-text text-palegar-lightText">Grand Total</span>
                  <span className="font-mono text-2xl font-black dark:text-palegar-gold text-palegar-lightGold">₹{grandTotal}</span>
                </div>

                <button
                  onClick={onOpenModal}
                  className="w-full mt-4 py-3.5 px-6 rounded-full bg-gradient-to-r from-palegar-chilli via-palegar-crimson to-palegar-chilli text-palegar-text font-bold text-sm uppercase tracking-wider border border-palegar-gold/50 shadow-xl shadow-palegar-chilli/40 hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-palegar-goldLight" />
                  <span>Instant Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Simulator Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 dark:bg-palegar-bg/95 bg-black/60 backdrop-blur-xl animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-lg glass-panel dark:bg-palegar-card/95 bg-white p-6 sm:p-8 rounded-3xl border dark:border-palegar-gold/40 border-palegar-lightGold/50 shadow-2xl my-8">
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold hover:text-palegar-text hover:bg-palegar-crimson/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isOrdered ? (
              <form onSubmit={handleOrderSubmit} className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full dark:bg-palegar-crimson/40 bg-palegar-lightCrimson/15 border dark:border-palegar-gold/40 border-palegar-lightGold/40 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 dark:text-palegar-gold text-palegar-lightGold" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-xl font-bold dark:text-palegar-text text-palegar-lightText gold-glow">
                      Confirm Royal Feast
                    </h3>
                    <p className="text-xs dark:text-palegar-gold text-palegar-lightGold font-medium">Delivered hot directly from earthen handis</p>
                  </div>
                </div>

                {/* Selected Summary Card */}
                <div className="p-3.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/20 border-palegar-lightGold/30 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-xs font-bold dark:text-palegar-text text-palegar-lightText">{selectedPack.name} (x{quantity})</p>
                    <p className="text-[11px] dark:text-palegar-muted text-palegar-lightMuted">{selectedPack.portion}</p>
                  </div>
                  <span className="font-mono text-base font-bold dark:text-palegar-gold text-palegar-lightGold">₹{grandTotal}</span>
                </div>

                {/* Customer Details Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Maharajah Vikram"
                      className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText placeholder:dark:text-palegar-muted/50 placeholder:text-palegar-lightMuted/50 focus:outline-none focus:border-palegar-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                      Phone Number (For Royal Dispatch)
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText placeholder:dark:text-palegar-muted/50 placeholder:text-palegar-lightMuted/50 focus:outline-none focus:border-palegar-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                      Delivery Address
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Full street address, landmark, and pincode"
                      className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText placeholder:dark:text-palegar-muted/50 placeholder:text-palegar-lightMuted/50 focus:outline-none focus:border-palegar-gold resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-1">
                      Spice Level Preference
                    </label>
                    <select
                      value={spicePreference}
                      onChange={(e) => setSpicePreference(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs dark:text-palegar-text text-palegar-lightText focus:outline-none focus:border-palegar-gold"
                    >
                      <option value="Authentic Palegar Fire (Default)">Authentic Palegar Fire (Signature)</option>
                      <option value="Medium Royal Mild">Medium Royal Mild</option>
                      <option value="Extreme Guntur Inferno">Extreme Guntur Inferno (Warlord Grade)</option>
                    </select>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 rounded-xl text-center border text-xs font-bold transition-all ${
                        paymentMethod === 'upi'
                          ? 'dark:bg-palegar-crimson/50 bg-palegar-lightCrimson/15 dark:border-palegar-gold border-palegar-lightGold dark:text-palegar-goldLight text-palegar-lightCrimson'
                          : 'dark:bg-palegar-card bg-palegar-lightCardHover dark:border-palegar-gold/20 border-palegar-lightGold/30 dark:text-palegar-muted text-palegar-lightMuted'
                      }`}
                    >
                      UPI / GPay
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl text-center border text-xs font-bold transition-all ${
                        paymentMethod === 'card'
                          ? 'dark:bg-palegar-crimson/50 bg-palegar-lightCrimson/15 dark:border-palegar-gold border-palegar-lightGold dark:text-palegar-goldLight text-palegar-lightCrimson'
                          : 'dark:bg-palegar-card bg-palegar-lightCardHover dark:border-palegar-gold/20 border-palegar-lightGold/30 dark:text-palegar-muted text-palegar-lightMuted'
                      }`}
                    >
                      Credit/Debit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl text-center border text-xs font-bold transition-all ${
                        paymentMethod === 'cod'
                          ? 'dark:bg-palegar-crimson/50 bg-palegar-lightCrimson/15 dark:border-palegar-gold border-palegar-lightGold dark:text-palegar-goldLight text-palegar-lightCrimson'
                          : 'dark:bg-palegar-card bg-palegar-lightCardHover dark:border-palegar-gold/20 border-palegar-lightGold/30 dark:text-palegar-muted text-palegar-lightMuted'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-palegar-chilli via-palegar-crimson to-palegar-chilli text-palegar-text font-bold text-xs uppercase tracking-wider border border-palegar-gold/50 shadow-xl shadow-palegar-chilli/40 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Place Order • ₹{grandTotal}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full dark:bg-palegar-gold/20 bg-palegar-lightGold/20 border-2 dark:border-palegar-gold border-palegar-lightGold flex items-center justify-center mx-auto shadow-xl shadow-palegar-gold/20">
                  <CheckCircle2 className="w-10 h-10 dark:text-palegar-gold text-palegar-lightGold" />
                </div>
                <h3 className="font-cinzel text-2xl font-black dark:text-palegar-text text-palegar-lightText gold-glow">
                  Palegar Feast Dispatched!
                </h3>
                <p className="text-xs sm:text-sm dark:text-palegar-muted text-palegar-lightMuted max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="dark:text-palegar-gold text-palegar-lightGold font-bold">{customerName || 'Honored Guest'}</span>. Your feast is being packed live from clay handis. Delivery partner is on the way to {deliveryAddress || 'your palace'}.
                </p>
                <div className="p-4 rounded-xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs font-mono dark:text-palegar-gold text-palegar-lightGold shadow-sm">
                  Order ID: #KRIT-{Math.floor(100000 + Math.random() * 900000)} • Est. 35 mins
                </div>
                <button
                  onClick={handleResetOrder}
                  className="w-full py-3 rounded-full dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/40 border-palegar-lightGold/40 dark:text-palegar-gold text-palegar-lightGold hover:bg-palegar-gold/10 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Close & Return to Menu
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
