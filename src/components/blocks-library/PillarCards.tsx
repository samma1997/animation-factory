"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGSAP } from "@/lib/animations";

export interface PillarCard {
  icon: string;
  title: string;
  description: string;
}

export interface PillarCardsProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cards: PillarCard[];
  columns?: 2 | 3 | 4;
  animated?: boolean;
}

export const pillarCardsPreviewProps: PillarCardsProps = {
  eyebrow: "Funzionalità",
  title: "Tutto ciò di cui hai bisogno",
  subtitle: "Blocchi riutilizzabili, animazioni GSAP e un sistema di design basato su CSS variables.",
  columns: 3,
  animated: true,
  cards: [
    {
      icon: "⚡",
      title: "Animazioni GSAP",
      description: "Animazioni performanti e fluide con GSAP ScrollTrigger, pronte all'uso in ogni blocco.",
    },
    {
      icon: "🎨",
      title: "Brand Tokens",
      description: "Sistema di colori basato su CSS variables. Cambia brand modificando un solo file.",
    },
    {
      icon: "📦",
      title: "Blocchi Riutilizzabili",
      description: "Catalogo di blocchi UI componibili, ognuno con props tipizzate e preview admin.",
    },
  ],
};

export function PillarCards({
  eyebrow,
  title,
  subtitle,
  cards,
  columns = 3,
  animated = true,
}: PillarCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated || !cardsRef.current) return;
    registerGSAP();

    const ctx = gsap.context(() => {
      const cardEls = cardsRef.current!.querySelectorAll(".pillar-card");
      gsap.from(cardEls, {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animated]);

  const colClass: Record<number, string> = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  };

  return (
    <section
      ref={containerRef}
      className="py-20 px-6"
      style={{ backgroundColor: "var(--color-bg-alt)" }}
    >
      <div className="max-w-5xl mx-auto">
        {(eyebrow || title || subtitle) && (
          <div className="text-center mb-12">
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
                className="text-lg max-w-2xl mx-auto leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div ref={cardsRef} className={`grid gap-6 ${colClass[columns]}`}>
          {cards.map((card, i) => (
            <div
              key={i}
              className="pillar-card rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
              style={{
                backgroundColor: "var(--color-bg)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center text-xl"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                {card.icon}
              </div>
              <div>
                <h3
                  className="text-base font-semibold mb-1.5"
                  style={{ color: "var(--color-text)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
