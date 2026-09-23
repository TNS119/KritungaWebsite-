'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import ProductDetails from '@/components/ProductDetails';
import CinematicIceSection from '@/components/CinematicIceSection';
import BuyNow from '@/components/BuyNow';
import SectionNav from '@/components/SectionNav';
import Footer from '@/components/Footer';

export default function Home() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenOrderModal = () => {
    setModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setModalOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-palegar-bg text-palegar-text selection:bg-palegar-crimson selection:text-palegar-gold">
      {/* 1. Brand Navbar with Mobile Drawer */}
      <Navbar onOpenOrderModal={handleOpenOrderModal} />

      {/* 2. Flagship In-Place Hero Canvas Scrubber Engine */}
      <ProductBottleScroll onOpenOrderModal={handleOpenOrderModal} />

      {/* 3. Sensory Physics & Culinary Anatomy Breakdown */}
      <ProductDetails />

      {/* 4. The Sensory Crucible (Interactive Physics & Spice Cards) */}
      <CinematicIceSection />

      {/* 5. Signature Palegar Feast Pack Customizer & Instant Checkout Modal */}
      <BuyNow
        modalOpen={modalOpen}
        onOpenModal={handleOpenOrderModal}
        onCloseModal={handleCloseOrderModal}
      />

      {/* 6. Floating Capsule Navigation */}
      <SectionNav />

      {/* 7. Brand Editorial Footer */}
      <Footer />
    </main>
  );
}
