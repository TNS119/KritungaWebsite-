import React from 'react';
import Link from 'next/link';
import { Flame, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-palegar-bg flex flex-col items-center justify-center p-6 text-center text-palegar-text">
      <div className="w-16 h-16 rounded-full bg-palegar-crimson/30 border border-palegar-gold/50 flex items-center justify-center mb-6">
        <Flame className="w-8 h-8 text-palegar-gold" />
      </div>
      <h1 className="font-cinzel text-5xl sm:text-7xl font-black text-palegar-gold mb-2 gold-glow">
        404
      </h1>
      <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-palegar-text mb-4">
        Royal Feast Not Found
      </h2>
      <p className="text-sm sm:text-base text-palegar-muted max-w-md mb-8 leading-relaxed">
        The royal chamber or dish you seek has wandered into the Rayalaseema mists. Return to the grand imperial banquet hall.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-gradient-to-r from-palegar-chilli via-palegar-crimson to-palegar-chilli text-palegar-text font-bold text-xs uppercase tracking-wider border border-palegar-gold/50 shadow-xl shadow-palegar-chilli/40 flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <Home className="w-4 h-4 text-palegar-goldLight" />
        <span>Return to Feast</span>
      </Link>
    </div>
  );
}
