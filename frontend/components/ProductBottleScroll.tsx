'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import ProductTextOverlays from './ProductTextOverlays';

interface ProductBottleScrollProps {
  onOpenOrderModal: () => void;
}

const TOTAL_FRAMES = 240;

export default function ProductBottleScroll({ onOpenOrderModal }: ProductBottleScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [progress, setProgress] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState<boolean>(false);

  // References for animation state
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFlagsRef = useRef<boolean[]>([]);
  const currentProgressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const lastRenderedFrameRef = useRef<number>(-1);
  const touchStartYRef = useRef<number>(0);
  const isAutoPlayingRef = useRef<boolean>(false);

  // Preload frames with prioritized batching
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    const loadedFlags: boolean[] = new Array(TOTAL_FRAMES).fill(false);
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/images/kritunga/${i}.webp`;

      const handleLoad = () => {
        loadedFlags[i - 1] = true;
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount >= 20 && !isFullyLoaded) {
          // Render initial preview frame immediately
          renderFrame(currentProgressRef.current);
        }
        if (loadedCount >= TOTAL_FRAMES) {
          setIsFullyLoaded(true);
        }
      };

      img.onload = handleLoad;
      img.onerror = () => {
        // Fallback flag
        loadedFlags[i - 1] = false;
      };

      images.push(img);
    }

    imagesRef.current = images;
    loadedFlagsRef.current = loadedFlags;

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // Find nearest loaded frame index (0-indexed)
  const getNearestLoadedIndex = useCallback((targetIndex: number): number => {
    const flags = loadedFlagsRef.current;
    if (flags[targetIndex]) return targetIndex;

    // Search outwards in both directions
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const left = targetIndex - offset;
      const right = targetIndex + offset;
      if (left >= 0 && flags[left]) return left;
      if (right < TOTAL_FRAMES && flags[right]) return right;
    }
    return targetIndex;
  }, []);

  // Render canvas frame based on progress (0 to 1)
  const renderFrame = useCallback(
    (currentProg: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const displayWidth = Math.ceil(rect.width || window.innerWidth);
      const displayHeight = Math.ceil(rect.height || window.innerHeight);

      const targetCanvasWidth = Math.ceil(displayWidth * dpr);
      const targetCanvasHeight = Math.ceil(displayHeight * dpr);

      if (canvas.width !== targetCanvasWidth || canvas.height !== targetCanvasHeight) {
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
      }

      // Compute frame index (1 to TOTAL_FRAMES)
      const clampedProg = Math.max(0, Math.min(1, currentProg));
      const rawIndex = Math.floor(clampedProg * (TOTAL_FRAMES - 1));
      const bestIndex = getNearestLoadedIndex(rawIndex);
      const image = imagesRef.current[bestIndex];

      // Solid background fill to eliminate transparent / flicker gaps
      ctx.fillStyle = '#0A0203';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (image && image.complete && image.naturalWidth > 0) {
        lastRenderedFrameRef.current = bestIndex;

        // Guaranteed cover-fit scale calculation
        const scale = Math.max(
          canvas.width / image.naturalWidth,
          canvas.height / image.naturalHeight
        );

        const drawWidth = Math.ceil(image.naturalWidth * scale);
        const drawHeight = Math.ceil(image.naturalHeight * scale);

        // Focal point calculation: center the emblem (x = 925/1920 = 0.4818) horizontally,
        // strictly clamped so the image covers [0, canvas.width] edge-to-edge with ZERO black gaps
        const focalXRatio = 925 / 1920;
        const desiredOffsetX = Math.round(canvas.width * 0.5 - drawWidth * focalXRatio);
        const minOffsetX = canvas.width - drawWidth; // <= 0
        const maxOffsetX = 0;
        const offsetX = Math.min(maxOffsetX, Math.max(minOffsetX, desiredOffsetX));

        // Center vertically with zero gaps
        const offsetY = Math.round((canvas.height - drawHeight) / 2);

        ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      }
    },
    [getNearestLoadedIndex]
  );

  // Smooth interpolation loop
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00008) {
        if (isAutoPlayingRef.current) {
          // Slow cinematic unveiling when clicking "Unveil Feast" (~32 fps so video frames are actively visible)
          const step = Math.sign(diff) * Math.min(Math.abs(diff * 0.035), 0.0022);
          currentProgressRef.current += step;
          if (Math.abs(targetProgressRef.current - currentProgressRef.current) < 0.001) {
            isAutoPlayingRef.current = false;
          }
        } else {
          // Reverted back to exact previous speed & fluid damping for normal scrolling
          currentProgressRef.current += diff * 0.14;
        }

        setProgress(currentProgressRef.current);
        renderFrame(currentProgressRef.current);
      } else {
        isAutoPlayingRef.current = false;
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [renderFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      renderFrame(currentProgressRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // In-place hero non-passive wheel & touch event interception
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY || window.pageYOffset;
      const isAtTop = scrollY <= 2;
      const current = targetProgressRef.current;

      // Yield auto-unveil immediately upon manual scroll interaction
      isAutoPlayingRef.current = false;

      // Reverted back to exact previous normal wheel sensitivity
      const delta = e.deltaY * 0.00065;

      if (isAtTop) {
        if (delta > 0 && current < 1) {
          // Scrolling down inside hero scrubber
          e.preventDefault();
          targetProgressRef.current = Math.min(1, current + delta);
        } else if (delta < 0 && current > 0) {
          // Scrolling up inside hero scrubber
          e.preventDefault();
          targetProgressRef.current = Math.max(0, current + delta);
        }
      } else if (scrollY > 2 && current < 1) {
        // Scrolled down previously but user is scrolling near hero
        if (delta < 0 && isAtTop) {
          targetProgressRef.current = Math.max(0, current + delta);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      isAutoPlayingRef.current = false;
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const scrollY = window.scrollY || window.pageYOffset;
      const isAtTop = scrollY <= 2;
      if (e.touches.length === 0) return;

      isAutoPlayingRef.current = false;
      const touchY = e.touches[0].clientY;
      // Reverted back to exact previous normal touch sensitivity
      const deltaY = (touchStartYRef.current - touchY) * 0.002;
      touchStartYRef.current = touchY;
      const current = targetProgressRef.current;

      if (isAtTop) {
        if (deltaY > 0 && current < 1) {
          e.preventDefault();
          targetProgressRef.current = Math.min(1, current + deltaY);
        } else if (deltaY < 0 && current > 0) {
          e.preventDefault();
          targetProgressRef.current = Math.max(0, current + deltaY);
        }
      }
    };

    // Non-passive listeners for tight event interception
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleTimelineSeek = (targetP: number) => {
    isAutoPlayingRef.current = true;
    targetProgressRef.current = targetP;
  };

  const loadingPercentage = Math.min(100, Math.floor((imagesLoaded / TOTAL_FRAMES) * 100));

  return (
    <section
      id="hero-experience"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-palegar-bg select-none"
    >
      {/* HTML5 Canvas Frame Sequence Display */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* Dark Theme Ambient Vignette & Obsidian Flame Overlays (Rich, dramatic dark mode atmosphere) */}
      <div className="hidden dark:block absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-palegar-bg/25 to-palegar-bg/90" />
      <div className="hidden dark:block absolute inset-0 pointer-events-none bg-gradient-to-t from-palegar-bg via-transparent to-palegar-bg/60" />

      {/* Top Navbar Legibility Gradient */}
      <div className="absolute top-0 inset-x-0 h-28 pointer-events-none bg-gradient-to-b from-black/60 via-black/20 to-transparent" />

      {/* Light Theme: Minimal bottom edge connector (zero white haze over video) */}
      <div className="dark:hidden absolute bottom-0 inset-x-0 h-8 pointer-events-none bg-gradient-to-t from-palegar-lightBg/25 to-transparent" />

      {/* Loading Bar Overlay for First Frame Ingestion */}
      {imagesLoaded < 25 && (
        <div className="absolute inset-0 dark:bg-palegar-bg bg-palegar-card flex flex-col items-center justify-center z-40 transition-opacity duration-500">
          <div className="w-14 h-14 rounded-full border-2 border-palegar-gold/30 border-t-palegar-gold animate-spin mb-4" />
          <p className="font-cinzel text-palegar-gold font-bold tracking-widest text-sm uppercase mb-2">
            Unveiling Royal Palegar Heritage
          </p>
          <div className="w-48 h-1 bg-palegar-card rounded-full overflow-hidden border border-palegar-gold/20">
            <div
              className="h-full bg-gradient-to-r from-palegar-crimson via-palegar-chilli to-palegar-gold transition-all duration-200"
              style={{ width: `${loadingPercentage}%` }}
            />
          </div>
          <span className="text-[11px] text-palegar-muted mt-2 font-mono">{loadingPercentage}%</span>
        </div>
      )}

      {/* Dynamic Scrollytelling Text & Timeline Overlays */}
      <ProductTextOverlays
        progress={progress}
        onSeek={handleTimelineSeek}
        onOpenOrderModal={onOpenOrderModal}
      />
    </section>
  );
}
