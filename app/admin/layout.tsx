import { requireAuth } from '@/lib/auth'
import AdminSidebar from '@/components/admin/Sidebar'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Protect all admin routes
    await requireAuth()

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    )
}
