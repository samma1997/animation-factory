"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Blocks,
  Eye,
  Menu,
  X,
  Plus,
  ExternalLink,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Zap,
  Layout,
  Layers,
  TrendingUp,
} from "lucide-react";
import { clsx } from "clsx";
import { BLOCK_CATALOG } from "@/components/blocks-library";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "dashboard" | "pagine" | "blocchi";

type PageStatus = "live" | "bozza" | "archiviata";

interface PageEntry {
  id: string;
  name: string;
  status: PageStatus;
  category: string;
  date: string;
  route: string;
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

const PAGES: PageEntry[] = [
  {
    id: "1",
    name: "Homepage Agenzia",
    status: "live",
    category: "Landing",
    date: "2026-03-10",
    route: "/",
  },
  {
    id: "2",
    name: "Servizi SaaS",
    status: "live",
    category: "Prodotto",
    date: "2026-03-12",
    route: "/servizi",
  },
  {
    id: "3",
    name: "About Brand",
    status: "bozza",
    category: "Istituzionale",
    date: "2026-03-15",
    route: "/about",
  },
  {
    id: "4",
    name: "Pricing Page",
    status: "bozza",
    category: "Prodotto",
    date: "2026-03-18",
    route: "/pricing",
  },
  {
    id: "5",
    name: "Case Study — Cliente A",
    status: "archiviata",
    category: "Portfolio",
    date: "2026-02-28",
    route: "/case-study/cliente-a",
  },
];

const BLOCK_CATEGORIES = ["Tutti", "Hero", "Feature", "CTA", "Contenuto", "Footer"];

// ─── Sub-components ────────────────────────────────────────────────────────────

function NavItem({
  icon: Icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative",
        active
          ? "text-white"
          : "text-[var(--color-admin-text-secondary)] hover:text-[var(--color-admin-text)] hover:bg-[var(--color-admin-hover)]"
      )}
      style={
        active
          ? {
              backgroundColor: "var(--color-admin-elevated)",
              borderLeft: "2px solid var(--color-admin-accent)",
              paddingLeft: "10px",
            }
          : {}
      }
    >
      <Icon size={16} />
      <span className="flex-1 text-left">{label}</span>
      {badge !== undefined && (
        <span
          className="text-xs px-1.5 py-0.5 rounded font-medium"
          style={{
            backgroundColor: active
              ? "var(--color-admin-accent-glow)"
              : "var(--color-admin-border)",
            color: active
              ? "var(--color-admin-accent)"
              : "var(--color-admin-text-muted)",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      className="rounded-xl p-5 flex items-start gap-4"
      style={{
        backgroundColor: "var(--color-admin-surface)",
        border: "1px solid var(--color-admin-border)",
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: color + "20", color }}
      >
        <Icon size={18} />
      </div>
      <div>
        <p
          className="text-xs font-medium uppercase tracking-wide mb-1"
          style={{ color: "var(--color-admin-text-muted)" }}
        >
          {label}
        </p>
        <p className="text-2xl font-semibold" style={{ color: "var(--color-admin-text)" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: PageStatus }) {
  const config: Record<PageStatus, { label: string; icon: React.ElementType; color: string; bg: string }> = {
    live: { label: "Live", icon: CheckCircle2, color: "#10B981", bg: "#10B98120" },
    bozza: { label: "Bozza", icon: Clock, color: "#F59E0B", bg: "#F59E0B20" },
    archiviata: { label: "Archiviata", icon: AlertCircle, color: "#6B7280", bg: "#6B728020" },
  };
  const { label, icon: Icon, color, bg } = config[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ color, backgroundColor: bg }}
    >
      <Icon size={11} />
      {label}
    </span>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150",
        active
          ? "text-white"
          : "text-[var(--color-admin-text-secondary)] hover:text-[var(--color-admin-text)]"
      )}
      style={
        active
          ? { backgroundColor: "var(--color-admin-accent)" }
          : { backgroundColor: "var(--color-admin-surface)", border: "1px solid var(--color-admin-border)" }
      }
    >
      {label}
    </button>
  );
}

function BlockCard({
  name,
  category,
  description,
  props,
}: {
  name: string;
  category: string;
  description: string;
  props: string[];
}) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3 hover:border-[var(--color-admin-border-strong)] transition-colors duration-150"
      style={{
        backgroundColor: "var(--color-admin-surface)",
        border: "1px solid var(--color-admin-border)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold" style={{ color: "var(--color-admin-text)" }}>
          {name}
        </h3>
        <span
          className="text-xs px-2 py-0.5 rounded font-medium flex-shrink-0"
          style={{
            backgroundColor: "var(--color-admin-accent-glow)",
            color: "var(--color-admin-accent)",
          }}
        >
          {category}
        </span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "var(--color-admin-text-muted)" }}>
        {description}
      </p>
      {props.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2" style={{ borderTop: "1px solid var(--color-admin-border)" }}>
          {props.map((p) => (
            <span
              key={p}
              className="text-xs px-2 py-0.5 rounded font-mono"
              style={{
                backgroundColor: "var(--color-admin-elevated)",
                color: "var(--color-admin-text-secondary)",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Tab Panels ────────────────────────────────────────────────────────────────

function DashboardTab() {
  const liveCount = PAGES.filter((p) => p.status === "live").length;
  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-semibold mb-1"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-admin-text)" }}
        >
          Dashboard
        </h1>
        <p className="text-sm" style={{ color: "var(--color-admin-text-secondary)" }}>
          Panoramica del sistema Animation Factory
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Pagine Live" value={liveCount} color="#10B981" />
        <StatCard icon={FileText} label="Pagine Totali" value={PAGES.length} color="#3B82F6" />
        <StatCard icon={Blocks} label="Blocchi Disponibili" value={BLOCK_CATALOG.length} color="#7C3AED" />
        <StatCard icon={Zap} label="Animazioni Disponibili" value={12} color="#EC4899" />
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--color-admin-border)" }}
      >
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{
            backgroundColor: "var(--color-admin-surface)",
            borderBottom: "1px solid var(--color-admin-border)",
          }}
        >
          <h2 className="text-sm font-semibold" style={{ color: "var(--color-admin-text)" }}>
            Pagine Recenti
          </h2>
          <button
            className="text-xs font-medium flex items-center gap-1 transition-opacity hover:opacity-70"
            style={{ color: "var(--color-admin-accent)" }}
          >
            Vedi tutte <ChevronRight size={12} />
          </button>
        </div>
        <div style={{ backgroundColor: "var(--color-admin-surface)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-admin-border)" }}>
                {["Pagina", "Stato", "Categoria", "Data", "Route"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide"
                    style={{ color: "var(--color-admin-text-muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAGES.slice(0, 4).map((page, i) => (
                <tr
                  key={page.id}
                  style={{
                    borderBottom: i < 3 ? "1px solid var(--color-admin-border)" : undefined,
                  }}
                  className="hover:bg-[var(--color-admin-hover)] transition-colors duration-100"
                >
                  <td className="px-5 py-3.5 font-medium" style={{ color: "var(--color-admin-text)" }}>
                    {page.name}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={page.status} />
                  </td>
                  <td className="px-5 py-3.5" style={{ color: "var(--color-admin-text-secondary)" }}>
                    {page.category}
                  </td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--color-admin-text-muted)" }}>
                    {page.date}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs" style={{ color: "var(--color-admin-text-secondary)" }}>
                    {page.route}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PagineTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-semibold mb-1"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-admin-text)" }}
          >
            Pagine
          </h1>
          <p className="text-sm" style={{ color: "var(--color-admin-text-secondary)" }}>
            Gestisci le pagine del sistema
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 flex-shrink-0"
          style={{ backgroundColor: "var(--color-admin-accent)" }}
        >
          <Plus size={15} />
          Nuova Pagina
        </button>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--color-admin-border)" }}
      >
        <div style={{ backgroundColor: "var(--color-admin-surface)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-admin-border)" }}>
                {["Pagina", "Stato", "Categoria", "Data", "Route", "Azioni"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide"
                    style={{ color: "var(--color-admin-text-muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAGES.map((page, i) => (
                <tr
                  key={page.id}
                  style={{
                    borderBottom: i < PAGES.length - 1 ? "1px solid var(--color-admin-border)" : undefined,
                  }}
                  className="hover:bg-[var(--color-admin-hover)] transition-colors duration-100"
                >
                  <td className="px-5 py-3.5 font-medium" style={{ color: "var(--color-admin-text)" }}>
                    {page.name}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={page.status} />
                  </td>
                  <td className="px-5 py-3.5" style={{ color: "var(--color-admin-text-secondary)" }}>
                    {page.category}
                  </td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: "var(--color-admin-text-muted)" }}>
                    {page.date}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs" style={{ color: "var(--color-admin-text-secondary)" }}>
                    {page.route}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 rounded-md transition-colors hover:bg-[var(--color-admin-elevated)]"
                        style={{ color: "var(--color-admin-text-secondary)" }}
                        title="Anteprima"
                      >
                        <ExternalLink size={13} />
                      </button>
                      <button
                        className="p-1.5 rounded-md transition-colors hover:bg-[var(--color-admin-elevated)]"
                        style={{ color: "var(--color-admin-text-secondary)" }}
                        title="Modifica"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        className="p-1.5 rounded-md transition-colors hover:bg-red-500/10"
                        style={{ color: "var(--color-admin-text-muted)" }}
                        title="Elimina"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BlocchiTab() {
  const [activeCategory, setActiveCategory] = useState("Tutti");

  const filtered =
    activeCategory === "Tutti"
      ? BLOCK_CATALOG
      : BLOCK_CATALOG.filter((b) => b.category === activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-semibold mb-1"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-admin-text)" }}
        >
          Blocchi
        </h1>
        <p className="text-sm" style={{ color: "var(--color-admin-text-secondary)" }}>
          Catalogo dei blocchi riutilizzabili disponibili
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {BLOCK_CATEGORIES.map((cat) => (
          <FilterPill
            key={cat}
            label={cat}
            active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div
          className="rounded-xl p-12 text-center"
          style={{
            backgroundColor: "var(--color-admin-surface)",
            border: "1px solid var(--color-admin-border)",
          }}
        >
          <p className="text-sm" style={{ color: "var(--color-admin-text-muted)" }}>
            Nessun blocco trovato per questa categoria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((block) => (
            <BlockCard
              key={block.id}
              name={block.name}
              category={block.category}
              description={block.description}
              props={block.previewProps}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navGroups = [
    {
      label: "GESTIONE",
      items: [
        { id: "dashboard" as Tab, icon: LayoutDashboard, label: "Dashboard" },
        { id: "pagine" as Tab, icon: FileText, label: "Pagine", badge: PAGES.length },
      ],
    },
    {
      label: "DESIGN SYSTEM",
      items: [
        { id: "blocchi" as Tab, icon: Blocks, label: "Blocchi", badge: BLOCK_CATALOG.length },
      ],
    },
    {
      label: "STRUMENTI",
      items: [
        { id: "preview" as Tab, icon: Eye, label: "Preview" },
      ],
    },
  ];

  const handleNav = (tab: Tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--color-admin-bg)" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full z-30 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          width: "260px",
          backgroundColor: "var(--color-admin-bg)",
          borderRight: "1px solid var(--color-admin-border)",
          flexShrink: 0,
        }}
      >
        {/* Brand */}
        <div
          className="px-5 py-5 flex items-center gap-3"
          style={{ borderBottom: "1px solid var(--color-admin-border)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "var(--color-admin-accent)" }}
          >
            <Layers size={16} color="white" />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--color-admin-text)" }}>
              Animation Factory
            </p>
            <p className="text-xs" style={{ color: "var(--color-admin-text-muted)" }}>
              Admin Dashboard
            </p>
          </div>
          {/* Close btn mobile */}
          <button
            className="ml-auto lg:hidden p-1 rounded"
            style={{ color: "var(--color-admin-text-secondary)" }}
            onClick={() => setSidebarOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto admin-scroll">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p
                className="px-3 mb-2 text-xs font-medium uppercase tracking-widest"
                style={{ color: "var(--color-admin-text-muted)" }}
              >
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    badge={item.badge}
                    active={activeTab === item.id}
                    onClick={() => handleNav(item.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="px-4 py-4"
          style={{ borderTop: "1px solid var(--color-admin-border)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
              style={{
                backgroundColor: "var(--color-admin-accent-glow)",
                color: "var(--color-admin-accent)",
              }}
            >
              AF
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: "var(--color-admin-text)" }}>
                Admin
              </p>
              <p className="text-xs" style={{ color: "var(--color-admin-text-muted)" }}>
                animation-factory
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="sticky top-0 z-10 px-5 py-3.5 flex items-center gap-4"
          style={{
            backgroundColor: "var(--color-admin-bg)",
            borderBottom: "1px solid var(--color-admin-border)",
          }}
        >
          <button
            className="lg:hidden p-1.5 rounded-lg transition-colors hover:bg-[var(--color-admin-hover)]"
            style={{ color: "var(--color-admin-text-secondary)" }}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={18} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm">
            <Layout size={14} style={{ color: "var(--color-admin-text-muted)" }} />
            <span style={{ color: "var(--color-admin-text-muted)" }}>Admin</span>
            <ChevronRight size={12} style={{ color: "var(--color-admin-text-muted)" }} />
            <span className="font-medium" style={{ color: "var(--color-admin-text)" }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "#10B98120",
                color: "#10B981",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              Sistema Operativo
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "pagine" && <PagineTab />}
          {activeTab === "blocchi" && <BlocchiTab />}
          {activeTab === ("preview" as Tab) && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Eye size={40} style={{ color: "var(--color-admin-text-muted)" }} />
              <p className="text-sm" style={{ color: "var(--color-admin-text-secondary)" }}>
                La funzione Preview sarà disponibile a breve.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
