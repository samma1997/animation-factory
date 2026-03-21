/**
 * Animation Factory — Page Registry
 * Types and helpers for managing the page/block registry system.
 */

import registryData from "@/content/pages/registry.json";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PageStatus = "live" | "bozza" | "archiviata";

export interface BlockInstance {
  /** ID matching a BlockCatalogEntry */
  blockId: string;
  /** Render order (ascending) */
  order: number;
  /** Serialized props passed to the block component */
  props: Record<string, unknown>;
}

export interface RegisteredPage {
  id: string;
  name: string;
  /** URL-friendly slug */
  slug: string;
  /** Deployed route */
  route: string;
  status: PageStatus;
  category: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  blocks: BlockInstance[];
}

// ─── Loaded Registry ──────────────────────────────────────────────────────────

export const PAGE_REGISTRY: RegisteredPage[] = registryData as RegisteredPage[];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Find a registered page by its ID.
 */
export function getPageById(id: string): RegisteredPage | undefined {
  return PAGE_REGISTRY.find((p) => p.id === id);
}

/**
 * Find a registered page by its slug.
 */
export function getPageBySlug(slug: string): RegisteredPage | undefined {
  return PAGE_REGISTRY.find((p) => p.slug === slug);
}

/**
 * Get all pages with a specific status.
 */
export function getPagesByStatus(status: PageStatus): RegisteredPage[] {
  return PAGE_REGISTRY.filter((p) => p.status === status);
}

/**
 * Get all live pages (useful for sitemap generation).
 */
export function getLivePages(): RegisteredPage[] {
  return getPagesByStatus("live");
}

/**
 * Get all unique categories from the registry.
 */
export function getAllPageCategories(): string[] {
  return Array.from(new Set(PAGE_REGISTRY.map((p) => p.category)));
}

/**
 * Get blocks from a page sorted by render order.
 */
export function getPageBlocks(pageId: string): BlockInstance[] {
  const page = getPageById(pageId);
  if (!page) return [];
  return [...page.blocks].sort((a, b) => a.order - b.order);
}
