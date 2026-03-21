/**
 * Animation Factory — Animation Library
 * GSAP-based animation utilities for building premium animated websites.
 * All animations use CSS variables for brand consistency.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins — call this once at app entry or in each component
export function registerGSAP() {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
}

// ─── Context ───────────────────────────────────────────────────────────────────

/**
 * Create a GSAP context scoped to a container ref.
 * Always call ctx.revert() in a cleanup function.
 */
export function createAnimContext(container: Element | null) {
  return gsap.context(() => {}, container ?? undefined);
}

// ─── Entrance Animations ──────────────────────────────────────────────────────

export interface FadeUpOptions {
  duration?: number;
  delay?: number;
  y?: number;
  ease?: string;
}

export function fadeUp(
  target: gsap.TweenTarget,
  options: FadeUpOptions = {}
): gsap.core.Tween {
  const { duration = 0.8, delay = 0, y = 40, ease = "power3.out" } = options;
  return gsap.from(target, {
    opacity: 0,
    y,
    duration,
    delay,
    ease,
  });
}

export function fadeIn(
  target: gsap.TweenTarget,
  options: { duration?: number; delay?: number } = {}
): gsap.core.Tween {
  const { duration = 0.6, delay = 0 } = options;
  return gsap.from(target, {
    opacity: 0,
    duration,
    delay,
    ease: "power2.out",
  });
}

export function slideInLeft(
  target: gsap.TweenTarget,
  options: { duration?: number; delay?: number; x?: number } = {}
): gsap.core.Tween {
  const { duration = 0.8, delay = 0, x = -60 } = options;
  return gsap.from(target, {
    opacity: 0,
    x,
    duration,
    delay,
    ease: "power3.out",
  });
}

export function slideInRight(
  target: gsap.TweenTarget,
  options: { duration?: number; delay?: number; x?: number } = {}
): gsap.core.Tween {
  const { duration = 0.8, delay = 0, x = 60 } = options;
  return gsap.from(target, {
    opacity: 0,
    x,
    duration,
    delay,
    ease: "power3.out",
  });
}

export function scaleUp(
  target: gsap.TweenTarget,
  options: { duration?: number; delay?: number; scale?: number } = {}
): gsap.core.Tween {
  const { duration = 0.7, delay = 0, scale = 0.85 } = options;
  return gsap.from(target, {
    opacity: 0,
    scale,
    duration,
    delay,
    ease: "back.out(1.4)",
  });
}

export function clipReveal(
  target: gsap.TweenTarget,
  options: { duration?: number; delay?: number; direction?: "up" | "down" | "left" | "right" } = {}
): gsap.core.Tween {
  const { duration = 0.9, delay = 0, direction = "up" } = options;

  const clipMap = {
    up: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
    down: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
    left: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
    right: ["inset(0 0 0 100%)", "inset(0 0 0 0%)"],
  };

  const [from, to] = clipMap[direction];

  return gsap.fromTo(
    target,
    { clipPath: from, opacity: 1 },
    { clipPath: to, duration, delay, ease: "power4.out" }
  );
}

// ─── Scroll Animations ────────────────────────────────────────────────────────

export interface ScrollAnimOptions {
  start?: string;
  end?: string;
  markers?: boolean;
}

export function scrollFadeUp(
  target: gsap.TweenTarget,
  options: FadeUpOptions & ScrollAnimOptions = {}
) {
  const {
    duration = 0.9,
    y = 50,
    ease = "power3.out",
    start = "top 85%",
    markers = false,
  } = options;

  return gsap.from(target, {
    opacity: 0,
    y,
    duration,
    ease,
    scrollTrigger: {
      trigger: target as Element,
      start,
      markers,
      toggleActions: "play none none none",
    },
  });
}

export function scrollStagger(
  targets: gsap.TweenTarget,
  options: {
    stagger?: number;
    duration?: number;
    y?: number;
    ease?: string;
    start?: string;
    markers?: boolean;
  } = {}
) {
  const {
    stagger = 0.12,
    duration = 0.7,
    y = 30,
    ease = "power3.out",
    start = "top 85%",
    markers = false,
  } = options;

  return gsap.from(targets, {
    opacity: 0,
    y,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger: (targets as Element[])[0] ?? (targets as Element),
      start,
      markers,
      toggleActions: "play none none none",
    },
  });
}

export function scrollCounter(
  target: Element,
  options: {
    end: number;
    duration?: number;
    start?: string;
    prefix?: string;
    suffix?: string;
  }
) {
  const { end, duration = 2, start = "top 80%", prefix = "", suffix = "" } = options;

  const obj = { value: 0 };

  return gsap.to(obj, {
    value: end,
    duration,
    ease: "power2.out",
    scrollTrigger: {
      trigger: target,
      start,
      toggleActions: "play none none none",
    },
    onUpdate() {
      target.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
    },
  });
}

// ─── Interactive Animations ───────────────────────────────────────────────────

export function magneticHover(
  element: HTMLElement,
  options: { strength?: number } = {}
): () => void {
  const { strength = 0.3 } = options;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
}

export function buttonHoverFill(
  button: HTMLElement,
  options: { fillColor?: string } = {}
): () => void {
  const { fillColor = "var(--color-brand-dark)" } = options;

  const handleEnter = () => {
    gsap.to(button, {
      backgroundColor: fillColor,
      scale: 1.03,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(button, {
      backgroundColor: "",
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  button.addEventListener("mouseenter", handleEnter);
  button.addEventListener("mouseleave", handleLeave);

  return () => {
    button.removeEventListener("mouseenter", handleEnter);
    button.removeEventListener("mouseleave", handleLeave);
  };
}

// ─── Text Animations ──────────────────────────────────────────────────────────

/**
 * Splits a heading element into lines and animates each in with a stagger.
 * Requires the element to have a fixed width (or be in a constrained container).
 */
export function textRevealLines(
  element: HTMLElement,
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    useScrollTrigger?: boolean;
    start?: string;
  } = {}
): gsap.core.Timeline {
  const {
    duration = 0.9,
    stagger = 0.08,
    delay = 0,
    useScrollTrigger = false,
    start = "top 80%",
  } = options;

  const text = element.textContent ?? "";
  const words = text.split(" ");

  // Wrap each word in a span
  element.innerHTML = words
    .map(
      (word) =>
        `<span style="overflow:hidden;display:inline-block;"><span class="word" style="display:inline-block;">${word}&nbsp;</span></span>`
    )
    .join("");

  const wordEls = element.querySelectorAll(".word");

  const tl = gsap.timeline({
    delay,
    scrollTrigger: useScrollTrigger
      ? {
          trigger: element,
          start,
          toggleActions: "play none none none",
        }
      : undefined,
  });

  tl.from(wordEls, {
    y: "110%",
    opacity: 0,
    duration,
    stagger,
    ease: "power4.out",
  });

  return tl;
}

export function typewriter(
  element: HTMLElement,
  options: {
    text?: string;
    speed?: number;
    delay?: number;
    cursor?: boolean;
  } = {}
): gsap.core.Timeline {
  const {
    text = element.textContent ?? "",
    speed = 0.04,
    delay = 0,
    cursor = true,
  } = options;

  element.textContent = "";

  if (cursor) {
    element.style.borderRight = "2px solid var(--color-brand)";
  }

  const tl = gsap.timeline({ delay });
  const chars = text.split("");

  chars.forEach((char, i) => {
    tl.add(() => {
      element.textContent = text.slice(0, i + 1);
    }, i * speed);
  });

  if (cursor) {
    tl.add(() => {
      element.style.borderRight = "none";
    });
  }

  return tl;
}

// ─── Advanced Scroll Animations ───────────────────────────────────────────────

export function scrollMarquee(
  track: HTMLElement,
  options: {
    speed?: number;
    direction?: "left" | "right";
  } = {}
) {
  const { speed = 30, direction = "left" } = options;
  const trackWidth = track.scrollWidth / 2;

  return gsap.to(track, {
    x: direction === "left" ? -trackWidth : trackWidth,
    duration: trackWidth / speed,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: (x: string) => {
        const parsed = parseFloat(x);
        if (direction === "left") {
          return `${parsed % trackWidth}px`;
        }
        return `${((parsed % trackWidth) + trackWidth) % trackWidth}px`;
      },
    },
  });
}

export function horizontalScrollPin(
  container: HTMLElement,
  panels: HTMLElement[]
) {
  const totalWidth = panels.length * 100;

  return gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: `+=${totalWidth}%`,
    },
  });
}
