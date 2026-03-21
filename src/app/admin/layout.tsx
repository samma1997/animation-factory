import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Animation Factory",
  description: "Dashboard di gestione Animation Factory",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="admin-layout min-h-screen"
      style={{ backgroundColor: "var(--color-admin-bg)", color: "var(--color-admin-text)" }}
    >
      {children}
    </div>
  );
}
