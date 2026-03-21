"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGSAP } from "@/lib/animations";

export interface CTADividerProps {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref?: string;
  variant?: "brand" | "dark" | "light";
  animated?: boolean;
}

export const ctaDividerPreviewProps: CTADividerProps = {
  title: "Pronto a costruire il tuo prossimo sito animato?",
  subtitle: "Inizia oggi con Animation Factory e consegna esperienze web premium.",
  ctaLabel: "Comincia gratis",
  ctaHref: "#",
  variant: "brand",
  animated: true,
};

export function CTADivider({
  title,
  subtitle,
  ctaLabel,
  ctaHref = "#",
  variant = "brand",
  animated = true,
}: CTADividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated || !containerRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current!.children, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animated]);

  const styles: Record<string, React.CSSProperties> = {
    brand: {
      background:
        "linear-gradient(135deg, var(--color-brand-dark) 0%, var(--color-brand) 100%)",
      color: "white",
    },
    dark: {
      backgroundColor: "var(--color-surface-dark)",
      color: "var(--color-text-inverted)",
    },
    light: {
      backgroundColor: "var(--color-surface)",
      color: "var(--color-text)",
    },
  };

  const ctaStyles: Record<string, React.CSSProperties> = {
    brand: { backgroundColor: "white", color: "var(--color-brand-dark)" },
    dark: { backgroundColor: "var(--color-brand)", color: "white" },
    light: { backgroundColor: "var(--color-brand)", color: "white" },
  };

  return (
    <section style={{ ...styles[variant], padding: "80px 24px" }}>
      <div ref={containerRef} className="max-w-3xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-semibold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className="text-lg mb-8 leading-relaxed opacity-80"
            style={{ maxWidth: "600px", margin: "0 auto 2rem" }}
          >
            {subtitle}
          </p>
        )}

        <a
          href={ctaHref}
          className="inline-flex items-center px-8 py-4 rounded-lg font-semibold text-base transition-opacity hover:opacity-90"
          style={ctaStyles[variant]}
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
