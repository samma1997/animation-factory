"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGSAP, fadeUp, fadeIn } from "@/lib/animations";

export interface HeroCenterProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  backgroundStyle?: "gradient" | "solid" | "mesh";
  animated?: boolean;
}

export const heroCenterPreviewProps: HeroCenterProps = {
  eyebrow: "Nuova piattaforma",
  title: "Costruisci siti animati di livello premium",
  subtitle:
    "Animation Factory ti fornisce i blocchi e le animazioni per creare esperienze web indimenticabili in metà del tempo.",
  ctaLabel: "Inizia ora",
  ctaHref: "#",
  secondaryCtaLabel: "Scopri di più",
  secondaryCtaHref: "#",
  backgroundStyle: "gradient",
  animated: true,
};

export function HeroCenter({
  eyebrow,
  title,
  subtitle,
  ctaLabel = "Inizia ora",
  ctaHref = "#",
  secondaryCtaLabel,
  secondaryCtaHref = "#",
  backgroundStyle = "gradient",
  animated = true,
}: HeroCenterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (eyebrowRef.current) {
        tl.from(eyebrowRef.current, { opacity: 0, y: 20, duration: 0.6 }, 0);
      }
      if (titleRef.current) {
        tl.from(titleRef.current, { opacity: 0, y: 40, duration: 0.9 }, 0.15);
      }
      if (subtitleRef.current) {
        tl.from(subtitleRef.current, { opacity: 0, y: 30, duration: 0.7 }, 0.35);
      }
      if (ctasRef.current) {
        tl.from(ctasRef.current.children, { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 }, 0.5);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [animated]);

  const bgStyles: Record<string, React.CSSProperties> = {
    gradient: {
      background:
        "linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-alt) 50%, var(--color-surface) 100%)",
    },
    solid: { backgroundColor: "var(--color-bg)" },
    mesh: {
      background:
        "radial-gradient(ellipse at 20% 50%, var(--color-brand-light)15 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, var(--color-accent)10 0%, transparent 50%), var(--color-bg)",
    },
  };

  return (
    <section
      ref={containerRef}
      style={bgStyles[backgroundStyle]}
      className="relative overflow-hidden py-24 md:py-36 px-6"
    >
      <div className="max-w-3xl mx-auto text-center">
        {eyebrow && (
          <span
            ref={eyebrowRef}
            className="inline-block mb-4 text-sm font-semibold px-3 py-1 rounded-full"
            style={{
              color: "var(--color-brand)",
              backgroundColor: "var(--color-brand)15",
              border: "1px solid var(--color-brand)30",
            }}
          >
            {eyebrow}
          </span>
        )}

        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-semibold tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-text)",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {subtitle}
          </p>
        )}

        <div ref={ctasRef} className="flex flex-wrap gap-4 justify-center">
          <a
            href={ctaHref}
            className="inline-flex items-center px-7 py-3.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-brand)" }}
          >
            {ctaLabel}
          </a>
          {secondaryCtaLabel && (
            <a
              href={secondaryCtaHref}
              className="inline-flex items-center px-7 py-3.5 rounded-lg font-semibold transition-colors"
              style={{
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
                backgroundColor: "transparent",
              }}
            >
              {secondaryCtaLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
