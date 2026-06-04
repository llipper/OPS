import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function PlanejamentoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
