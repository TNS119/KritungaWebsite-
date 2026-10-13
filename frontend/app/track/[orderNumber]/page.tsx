'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Flame, CheckCircle2, Truck, MessageSquare, Phone, MapPin, RefreshCw, ChefHat } from 'lucide-react';
import api, { TrackingData } from '@/services/api';

interface TrackPageProps {
  params: {
    orderNumber: string;
  };
}

export default function TrackOrderPage({ params }: TrackPageProps) {
  const { orderNumber } = params;
  const [data, setData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadTracking = async () => {
    try {
      setIsRefreshing(true);
      const res = await api.trackOrder(orderNumber);
      if (res && res.order) {
        setData(res);
        setError(null);
      } else {
        setError(`Order #${orderNumber} could not be found.`);
      }
    } catch (err: any) {
      setError('Unable to fetch live tracking details.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadTracking();
    const interval = setInterval(loadTracking, 12000); // 12s auto-refresh
    return () => clearInterval(interval);
  }, [orderNumber]);

  return (
    <main className="min-h-screen dark:bg-palegar-bg bg-palegar-lightBg dark:text-palegar-text text-palegar-lightText py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute top-10 right-10 w-96 h-96 dark:bg-palegar-crimson/15 bg-palegar-lightCrimson/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 dark:bg-palegar-gold/10 bg-palegar-lightGold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-8 border-b dark:border-palegar-gold/20 border-palegar-lightGold/30 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold hover:text-palegar-crimson transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Palace Menu</span>
          </Link>

          <button
            onClick={loadTracking}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-palegar-card bg-white border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-xs font-semibold dark:text-palegar-text text-palegar-lightText shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-palegar-gold' : ''}`} />
            <span>Refresh Status</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-24 space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-palegar-gold/30 border-t-palegar-gold animate-spin mx-auto" />
            <p className="font-cinzel text-sm dark:text-palegar-gold text-palegar-lightGold uppercase tracking-widest">
              Connecting to Palegar Earthen Handi Kitchen...
            </p>
          </div>
        ) : error || !data ? (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-center max-w-lg mx-auto space-y-4 shadow-xl">
            <h3 className="font-cinzel text-xl font-bold text-palegar-chilli">Order Inactive</h3>
            <p className="text-xs dark:text-palegar-muted text-palegar-lightMuted leading-relaxed">
              {error || `Order #${orderNumber} is not active in the royal kitchen dispatch.`}
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-palegar-chilli to-palegar-crimson text-palegar-text font-bold text-xs uppercase tracking-wider shadow-md"
            >
              Order Royal Feast
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Status Hero Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-10 border dark:border-palegar-gold/30 border-palegar-lightGold/40 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b dark:border-palegar-gold/20 border-palegar-lightGold/30">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/30 border-palegar-lightGold/40 text-[11px] font-mono font-bold dark:text-palegar-gold text-palegar-lightGold mb-2">
                    <ChefHat className="w-3.5 h-3.5 text-palegar-gold" />
                    <span>Order #{data.order.orderNumber}</span>
                  </div>
                  <h1 className="font-cinzel text-2xl sm:text-3xl font-black dark:text-palegar-text text-palegar-lightText gold-glow">
                    {data.tracking.currentStage.label}
                  </h1>
                  <p className="text-xs sm:text-sm dark:text-palegar-muted text-palegar-lightMuted mt-1">
                    {data.tracking.currentStage.desc}
                  </p>
                </div>

                <div className="flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto p-3.5 rounded-2xl dark:bg-palegar-card bg-palegar-lightCardHover border dark:border-palegar-gold/20 border-palegar-lightGold/30">
                  <span className="text-[10px] uppercase font-bold tracking-wider dark:text-palegar-muted text-palegar-lightMuted">
                    Estimated Time
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-black dark:text-palegar-gold text-palegar-lightGold">
                    ~{data.tracking.remainingMinutes} mins
                  </span>
                </div>
              </div>

              {/* Progress Bar & Stage Stepper */}
              <div className="pt-8">
                {/* Progress track */}
                <div className="w-full h-3 rounded-full dark:bg-palegar-card bg-palegar-lightCardHover overflow-hidden border dark:border-palegar-gold/20 border-palegar-lightGold/30 p-0.5 mb-8">
                  <div
                    className="h-full bg-gradient-to-r from-palegar-crimson via-palegar-chilli to-palegar-gold rounded-full transition-all duration-700"
                    style={{ width: `${data.tracking.currentStage.percent}%` }}
                  />
                </div>

                {/* 4 Stages Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.tracking.stages.map((stage) => {
                    const isDone = stage.step <= data.tracking.currentStage.step;
                    const isCurrent = stage.step === data.tracking.currentStage.step;
                    return (
                      <div
                        key={stage.key}
                        className={`p-4 rounded-2xl border transition-all ${
                          isCurrent
                            ? 'dark:bg-palegar-card dark:border-palegar-gold border-palegar-lightGold shadow-lg scale-105'
                            : isDone
                            ? 'dark:bg-palegar-card/60 bg-palegar-lightCardHover/60 dark:border-palegar-gold/20 border-palegar-lightGold/30'
                            : 'opacity-40 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isDone
                              ? 'bg-palegar-gold text-palegar-bg'
                              : 'dark:bg-palegar-card bg-palegar-lightCardHover dark:text-palegar-muted text-palegar-lightMuted'
                          }`}>
                            {isDone ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : stage.step}
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider dark:text-palegar-gold text-palegar-lightGold">
                            Step 0{stage.step}
                          </span>
                        </div>
                        <h4 className="font-cinzel text-xs font-bold dark:text-palegar-text text-palegar-lightText">
                          {stage.label}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Split Details: Outlets & Order Contents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Branch & Delivery Info */}
              <div className="glass-panel p-6 rounded-2xl border dark:border-palegar-gold/30 border-palegar-lightGold/40 space-y-4 shadow-lg">
                <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold">
                  Royal Dispatch Logistics
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="dark:text-palegar-muted text-palegar-lightMuted block text-[10px] uppercase">
                      Kitchen Citadel
                    </span>
                    <span className="font-bold dark:text-palegar-text text-palegar-lightText">
                      {data.order.outlet?.name || 'Kritunga Citadel'}
                    </span>
                    <p className="text-[11px] dark:text-palegar-muted text-palegar-lightMuted mt-0.5">
                      {data.order.outlet?.address || 'Central Fort Kitchen'}
                    </p>
                  </div>

                  <div>
                    <span className="dark:text-palegar-muted text-palegar-lightMuted block text-[10px] uppercase">
                      Delivery Destination
                    </span>
                    <span className="dark:text-palegar-text text-palegar-lightText font-medium">
                      {data.order.deliveryAddress}
                    </span>
                  </div>

                  <div>
                    <span className="dark:text-palegar-muted text-palegar-lightMuted block text-[10px] uppercase">
                      Spice Grade
                    </span>
                    <span className="font-bold text-palegar-chilli">
                      {data.order.spicePreference}
                    </span>
                  </div>
                </div>

                {/* WhatsApp Update CTA */}
                {data.tracking.whatsappUrl && (
                  <a
                    href={data.tracking.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-4 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider border border-emerald-500/50 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-200" />
                    <span>Chat with Kitchen on WhatsApp</span>
                  </a>
                )}
              </div>

              {/* Order Items Summary */}
              <div className="glass-panel p-6 rounded-2xl border dark:border-palegar-gold/30 border-palegar-lightGold/40 space-y-4 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider dark:text-palegar-gold text-palegar-lightGold mb-4">
                    Palegar Feast Items
                  </h3>

                  <div className="space-y-2.5">
                    {data.order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs pb-2 border-b dark:border-palegar-gold/10 border-palegar-lightGold/20">
                        <div>
                          <span className="font-bold dark:text-palegar-text text-palegar-lightText">{item.name}</span>
                          <span className="dark:text-palegar-gold text-palegar-lightGold ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-mono font-bold dark:text-palegar-gold text-palegar-lightGold">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t dark:border-palegar-gold/20 border-palegar-lightGold/20 flex justify-between items-baseline">
                  <span className="font-cinzel text-sm font-bold dark:text-palegar-text text-palegar-lightText">
                    Grand Total Paid ({data.order.paymentMethod.toUpperCase()})
                  </span>
                  <span className="font-mono text-xl font-black dark:text-palegar-gold text-palegar-lightGold">
                    ₹{data.order.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
