'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    FileText,
    Users,
    LogOut,
    GraduationCap
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const menuItems = [
    {
        href: '/admin',
        label: 'Dashboard',
        icon: LayoutDashboard,
    },
    {
        href: '/admin/content',
        label: 'Edit Content',
        icon: FileText,
    },
    {
        href: '/admin/pendaftar',
        label: 'Daftar Pendaftar',
        icon: Users,
    },
]

export default function AdminSidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/admin/login')
        router.refresh()
    }

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
            <div className="p-6 border-b border-gray-800">
                <Link href="/" className="flex items-center gap-3">
                    <GraduationCap className="w-8 h-8" />
                    <div>
                        <div className="font-bold text-lg">Admin Panel</div>
                        <div className="text-sm text-gray-400">PPDB 2026/2027</div>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive
                                            ? 'bg-green-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }
                  `}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors w-full"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    )
}
