import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export const dynamic = "force-dynamic"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
