"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScrollProvider
 *
 * Wraps children with Lenis smooth scrolling synced to GSAP ScrollTrigger.
 * Place this as high as possible in the component tree (typically in layout.tsx).
 *
 * Usage:
 *   <SmoothScrollProvider>
 *     {children}
 *   </SmoothScrollProvider>
 */
export function SmoothScrollProvider({
  children,
  options,
}: {
  children: React.ReactNode;
  options?: ConstructorParameters<typeof Lenis>[0];
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      ...options,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Tick function — drives Lenis on every GSAP frame
    const ticker = gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP from using its own lag smoothing (Lenis handles this)
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  return <>{children}</>;
}
