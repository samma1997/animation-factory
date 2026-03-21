"use client";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterMinimalProps {
  brand: string;
  tagline?: string;
  links?: FooterLink[];
  copyright?: string;
  variant?: "light" | "dark";
}

export const footerMinimalPreviewProps: FooterMinimalProps = {
  brand: "Animation Factory",
  tagline: "Costruisci siti animati premium.",
  links: [
    { label: "Home", href: "/" },
    { label: "Blocchi", href: "/blocchi" },
    { label: "Admin", href: "/admin" },
    { label: "Docs", href: "/docs" },
  ],
  copyright: "© 2026 Animation Factory. Tutti i diritti riservati.",
  variant: "light",
};

export function FooterMinimal({
  brand,
  tagline,
  links = [],
  copyright,
  variant = "light",
}: FooterMinimalProps) {
  const isDark = variant === "dark";

  return (
    <footer
      style={{
        backgroundColor: isDark ? "var(--color-surface-dark)" : "var(--color-bg-alt)",
        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "var(--color-border)"}`,
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <p
              className="font-semibold text-base"
              style={{
                fontFamily: "var(--font-heading)",
                color: isDark ? "var(--color-text-inverted)" : "var(--color-text)",
              }}
            >
              {brand}
            </p>
            {tagline && (
              <p
                className="text-sm mt-0.5"
                style={{
                  color: isDark ? "rgba(248,250,252,0.5)" : "var(--color-text-muted)",
                }}
              >
                {tagline}
              </p>
            )}
          </div>

          {/* Links */}
          {links.length > 0 && (
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm transition-colors hover:opacity-100"
                  style={{
                    color: isDark ? "rgba(248,250,252,0.55)" : "var(--color-text-secondary)",
                    opacity: 0.85,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        {copyright && (
          <p
            className="mt-8 text-xs"
            style={{
              color: isDark ? "rgba(248,250,252,0.3)" : "var(--color-text-muted)",
              borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "var(--color-border)"}`,
              paddingTop: "1.5rem",
            }}
          >
            {copyright}
          </p>
        )}
      </div>
    </footer>
  );
}
