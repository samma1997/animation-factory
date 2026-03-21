"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGSAP } from "@/lib/animations";

export interface ChecklistSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: string[];
  columns?: 1 | 2 | 3;
  checkColor?: "brand" | "success" | "accent";
  animated?: boolean;
}

export const checklistSectionPreviewProps: ChecklistSectionProps = {
  eyebrow: "Perché sceglierci",
  title: "Tutto incluso, zero compromessi",
  subtitle: "Ogni blocco include animazioni, tipografia, responsiveness e supporto per brand token.",
  columns: 2,
  checkColor: "brand",
  animated: true,
  items: [
    "Animazioni GSAP incluse in ogni blocco",
    "CSS variables per brand switching rapido",
    "TypeScript strict su tutti i componenti",
    "Mobile-first e fully responsive",
    "Ottimizzazione Core Web Vitals",
    "Admin dashboard integrato",
    "Sistema di pagine registrabili",
    "Smooth scroll con Lenis + GSAP",
  ],
};

export function ChecklistSection({
  eyebrow,
  title,
  subtitle,
  items,
  columns = 2,
  checkColor = "brand",
  animated = true,
}: ChecklistSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!animated || !listRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const items = listRef.current!.querySelectorAll(".checklist-item");
      gsap.from(items, {
        opacity: 0,
        x: -20,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animated]);

  const checkColors: Record<string, string> = {
    brand: "var(--color-brand)",
    success: "var(--color-success)",
    accent: "var(--color-accent)",
  };

  const colClass: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <section
      ref={containerRef}
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-4xl mx-auto">
        {(eyebrow || title || subtitle) && (
          <div className="mb-10">
            {eyebrow && (
              <span
                className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-brand)" }}
              >
                {eyebrow}
              </span>
            )}
            {title && (
              <h2
                className="text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)" }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="text-lg leading-relaxed max-w-2xl"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <ul ref={listRef} className={`grid gap-x-8 gap-y-4 ${colClass[columns]}`}>
          {items.map((item, i) => (
            <li key={i} className="checklist-item flex items-start gap-3">
              <svg
                className="flex-shrink-0 mt-0.5"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="9" cy="9" r="9" fill={checkColors[checkColor]} fillOpacity="0.12" />
                <path
                  d="M5.5 9L7.5 11L12.5 6.5"
                  stroke={checkColors[checkColor]}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
