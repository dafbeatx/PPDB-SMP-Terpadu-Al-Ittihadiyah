import AdminSidebar from '@/components/admin/Sidebar'
import { requireAuth } from '@/lib/auth'

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
            <main className="flex-1 w-full lg:w-auto overflow-auto">
                <div className="p-4 lg:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
