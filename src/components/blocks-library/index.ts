/**
 * Animation Factory — Block Catalog
 * Central registry of all available blocks with metadata for the admin UI.
 */

export { HeroCenter } from "./HeroCenter";
export type { HeroCenterProps } from "./HeroCenter";
export { heroCenterPreviewProps } from "./HeroCenter";

export { PillarCards } from "./PillarCards";
export type { PillarCardsProps, PillarCard } from "./PillarCards";
export { pillarCardsPreviewProps } from "./PillarCards";

export { CTADivider } from "./CTADivider";
export type { CTADividerProps } from "./CTADivider";
export { ctaDividerPreviewProps } from "./CTADivider";

export { ChecklistSection } from "./ChecklistSection";
export type { ChecklistSectionProps } from "./ChecklistSection";
export { checklistSectionPreviewProps } from "./ChecklistSection";

export { FooterMinimal } from "./FooterMinimal";
export type { FooterMinimalProps, FooterLink } from "./FooterMinimal";
export { footerMinimalPreviewProps } from "./FooterMinimal";

// ─── Block Catalog Entry Type ──────────────────────────────────────────────────

export interface BlockCatalogEntry {
  id: string;
  name: string;
  category: string;
  description: string;
  /** List of key prop names shown in the admin card */
  previewProps: string[];
  /** Component identifier for dynamic rendering */
  componentKey: string;
}

// ─── Block Catalog ─────────────────────────────────────────────────────────────

export const BLOCK_CATALOG: BlockCatalogEntry[] = [
  {
    id: "hero-center",
    name: "HeroCenter",
    category: "Hero",
    description:
      "Hero centrato con eyebrow, titolo, sottotitolo e CTA. Supporta varianti di sfondo gradient, solid e mesh. Animato con GSAP timeline.",
    previewProps: ["eyebrow", "title", "subtitle", "ctaLabel", "backgroundStyle", "animated"],
    componentKey: "HeroCenter",
  },
  {
    id: "pillar-cards",
    name: "PillarCards",
    category: "Feature",
    description:
      "Griglia di card con icona, titolo e descrizione. Supporta 2, 3 o 4 colonne. Animazione scroll stagger su ogni card.",
    previewProps: ["eyebrow", "title", "cards[]", "columns", "animated"],
    componentKey: "PillarCards",
  },
  {
    id: "cta-divider",
    name: "CTADivider",
    category: "CTA",
    description:
      "Sezione divisore con titolo, sottotitolo e CTA. Varianti brand (gradiente blu), dark (sfondo scuro) e light.",
    previewProps: ["title", "subtitle", "ctaLabel", "variant", "animated"],
    componentKey: "CTADivider",
  },
  {
    id: "checklist-section",
    name: "ChecklistSection",
    category: "Contenuto",
    description:
      "Griglia di checklist con checkmark SVG colorati. Supporta 1, 2 o 3 colonne. Animazione scroll slide-in per ogni voce.",
    previewProps: ["title", "items[]", "columns", "checkColor", "animated"],
    componentKey: "ChecklistSection",
  },
  {
    id: "footer-minimal",
    name: "FooterMinimal",
    category: "Footer",
    description:
      "Footer minimale con brand, tagline, link di navigazione e copyright. Varianti light e dark.",
    previewProps: ["brand", "tagline", "links[]", "copyright", "variant"],
    componentKey: "FooterMinimal",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Find a block catalog entry by its ID.
 */
export function getBlockById(id: string): BlockCatalogEntry | undefined {
  return BLOCK_CATALOG.find((b) => b.id === id);
}

/**
 * Get all blocks belonging to a specific category.
 */
export function getBlocksByCategory(category: string): BlockCatalogEntry[] {
  return BLOCK_CATALOG.filter((b) => b.category === category);
}

/**
 * Get all unique block categories.
 */
export function getAllBlockCategories(): string[] {
  return Array.from(new Set(BLOCK_CATALOG.map((b) => b.category)));
}
