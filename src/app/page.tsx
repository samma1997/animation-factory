import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-screen bg-[var(--color-admin-bg)] text-[var(--color-admin-text)]">
      <div className="text-center max-w-lg px-6">
        {/* Logo mark */}
        <div className="mx-auto mb-8 w-16 h-16 rounded-2xl bg-[var(--color-admin-accent)] flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 24L16 8L24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.5 19H21.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        <h1
          className="text-4xl font-semibold tracking-tight mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Animation Factory
        </h1>
        <p className="text-[var(--color-admin-text-secondary)] text-lg mb-10 leading-relaxed">
          Piattaforma per la creazione di siti animati premium,
          riutilizzabili tra clienti e brand.
        </p>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-admin-accent)] text-white font-medium transition-opacity hover:opacity-90"
        >
          Apri Dashboard
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </main>
  );
}
