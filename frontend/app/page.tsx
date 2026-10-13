'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import ProductDetails from '@/components/ProductDetails';
import CinematicIceSection from '@/components/CinematicIceSection';
import BuyNow from '@/components/BuyNow';
import ConventionBookingSection from '@/components/ConventionBookingSection';
import ConventionBookingModal from '@/components/ConventionBookingModal';
import TableReservationModal from '@/components/TableReservationModal';
import OrderPartnerModal from '@/components/OrderPartnerModal';
import SectionNav from '@/components/SectionNav';
import Footer from '@/components/Footer';

export default function Home() {
  const [orderPartnerModalOpen, setOrderPartnerModalOpen] = useState<boolean>(false);
  const [conventionModalOpen, setConventionModalOpen] = useState<boolean>(false);
  const [reservationModalOpen, setReservationModalOpen] = useState<boolean>(false);

  const handleOpenOrderModal = () => {
    setOrderPartnerModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setOrderPartnerModalOpen(false);
  };

  const handleOpenConventionModal = () => {
    setConventionModalOpen(true);
  };

  const handleCloseConventionModal = () => {
    setConventionModalOpen(false);
  };

  const handleOpenReservationModal = () => {
    setReservationModalOpen(true);
  };

  const handleCloseReservationModal = () => {
    setReservationModalOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-palegar-bg text-palegar-text selection:bg-palegar-crimson selection:text-palegar-gold">
      {/* 1. Brand Navbar with Mobile Drawer */}
      <Navbar
        onOpenOrderModal={handleOpenOrderModal}
        onOpenConventionModal={handleOpenConventionModal}
        onOpenReservationModal={handleOpenReservationModal}
      />

      {/* 2. Flagship In-Place Hero Canvas Scrubber Engine */}
      <ProductBottleScroll onOpenOrderModal={handleOpenOrderModal} />

      {/* 3. Sensory Physics & Culinary Anatomy Breakdown */}
      <ProductDetails />

      {/* 4. The Sensory Crucible (Interactive Physics & Spice Cards) */}
      <CinematicIceSection />

      {/* 5. Signature Palegar Feast Pack Customizer with Partner Navigation */}
      <BuyNow onOpenOrderModal={handleOpenOrderModal} />

      {/* 6. Grand Palace Convention & Banquet Halls Showcase */}
      <ConventionBookingSection onOpenConventionModal={handleOpenConventionModal} />

      {/* 7. Floating Capsule Navigation */}
      <SectionNav />

      {/* 8. Brand Editorial Footer */}
      <Footer />

      {/* Official Swiggy & Zomato Partner Delivery Navigation Modal */}
      <OrderPartnerModal
        isOpen={orderPartnerModalOpen}
        onClose={handleCloseOrderModal}
      />

      {/* Interactive Royal Convention & Banquet Booking Modal */}
      <ConventionBookingModal
        isOpen={conventionModalOpen}
        onClose={handleCloseConventionModal}
      />

      {/* Interactive Table Reservation Modal */}
      <TableReservationModal
        isOpen={reservationModalOpen}
        onClose={handleCloseReservationModal}
      />
    </main>
  );
}
