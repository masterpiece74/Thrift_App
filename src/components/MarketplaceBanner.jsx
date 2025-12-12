import React, { useRef, useEffect, useState } from 'react';
import { FaPause, FaPlay, FaPlus, FaMinus } from 'react-icons/fa';

export default function MarketplaceBanner({ banners }) {
  const items = banners || [
    { id: 'b1', name: 'Airtel', tag: 'Up to 50% off', bg: 'bg-red-600', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Airtel_Africa_logo.svg/200px-Airtel_Africa_logo.svg.png' },
    { id: 'b2', name: 'MTN', tag: 'Save up to 40%', bg: 'bg-yellow-500', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/MTN_logo_%282022%29.svg/200px-MTN_logo_%282022%29.svg.png' },
    { id: 'b3', name: 'Wakocode', tag: 'Dev tools 30% off', bg: 'bg-blue-700', logo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=200&auto=format&fit=crop' },
    { id: 'b4', name: 'Saphire Cleaning', tag: 'Cleaning deals 50% off', bg: 'bg-slate-600', logo: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=200&auto=format&fit=crop' },
    { id: 'b5', name: 'Ektit MSME', tag: 'SME offers 25% off', bg: 'bg-emerald-700', logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=200&auto=format&fit=crop' },
  ];

  const containerRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(80); // pixels per second

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect user preference for reduced motion
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId = null;
    let last = performance.now();

    function step(now) {
      const dt = Math.min(48, now - last); // clamp delta to avoid huge jumps
      last = now;
      if (!paused) {
        const px = (speed * dt) / 1000; // pixels to move this frame
        el.scrollLeft += px;
        // loop: when at end, wrap to start (smoothly)
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          // wrap by subtracting the width of one set (items length duplicated)
          el.scrollLeft = el.scrollLeft - (el.scrollWidth / 2);
        }
      }
      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, [paused, speed]);

  // Pause on hover / focus
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onEnter = () => setPaused(true);
    const onLeave = () => setPaused(false);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('focusin', onEnter);
    el.addEventListener('focusout', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('focusin', onEnter);
      el.removeEventListener('focusout', onLeave);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="relative">
        {/* Left/right fade masks for polished look */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/95 to-transparent dark:from-slate-900/95" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/95 to-transparent dark:from-slate-900/95" />

        <div
          ref={containerRef}
          className="overflow-x-auto no-scrollbar"
          role="region"
          aria-label="Marketplace promotions carousel"
          tabIndex={0}
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="flex gap-4 items-stretch min-w-max">
            {items.concat(items).map((b, idx) => (
              <div key={`${b.id}-${idx}`} className={`min-w-[220px] flex-shrink-0 rounded-lg p-4 text-white ${b.bg} shadow-lg`}>
                <div className="flex items-center gap-3">
                  <img src={b.logo} alt={b.name} className="w-16 h-16 object-contain bg-white/20 rounded p-2" />
                  <div>
                    <div className="text-lg font-bold">{b.name}</div>
                    <div className="text-sm opacity-90">{b.tag}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button
            onClick={() => setSpeed(s => Math.max(20, s - 20))}
            aria-label="Decrease speed"
            className="p-2 bg-white/90 text-slate-800 rounded-lg shadow hover:bg-white"
          >
            <FaMinus />
          </button>
          <button
            onClick={() => setPaused(p => !p)}
            aria-pressed={paused}
            aria-label={paused ? 'Play promotions' : 'Pause promotions'}
            className="p-2 bg-white/90 text-slate-800 rounded-lg shadow hover:bg-white"
          >
            {paused ? <FaPlay /> : <FaPause />}
          </button>
          <button
            onClick={() => setSpeed(s => Math.min(300, s + 20))}
            aria-label="Increase speed"
            className="p-2 bg-white/90 text-slate-800 rounded-lg shadow hover:bg-white"
          >
            <FaPlus />
          </button>
        </div>

        {/* Small status */}
        <div className="absolute left-4 top-2 text-xs text-slate-600">{paused ? 'Paused' : `${speed} px/s`}</div>
      </div>
    </div>
  );
}
