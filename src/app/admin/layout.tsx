import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — SAMMA Factory Factory',
  description: 'SAMMA Factory — Dashboard admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0f1117]">
      {children}
    </div>
  )
}
