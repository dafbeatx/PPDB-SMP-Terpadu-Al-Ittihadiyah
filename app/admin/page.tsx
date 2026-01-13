import { requireAuth } from '@/lib/auth'
import Card from '@/components/ui/Card'
import { createClient } from '@/lib/supabase/server'
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react'

export default async function AdminDashboard() {
    const { admin } = await requireAuth()
    const supabase = await createClient()

    // Get statistics
    const { count: totalCount } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })

    const { count: pendingCount } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

    const { count: acceptedCount } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'accepted')

    const { count: rejectedCount } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'rejected')

    // Get recent registrations
    const { data: recentRegistrations } = await supabase
        .from('registrations')
        .select(`
      id,
      registration_number,
      status,
      created_at,
      students (full_name, nisn)
    `)
        .order('created_at', { ascending: false })
        .limit(5)

    const stats = [
        {
            label: 'Total Pendaftar',
            value: totalCount || 0,
            icon: Users,
            color: 'bg-blue-500',
        },
        {
            label: 'Menunggu Verifikasi',
            value: pendingCount || 0,
            icon: Clock,
            color: 'bg-yellow-500',
        },
        {
            label: 'Diterima',
            value: acceptedCount || 0,
            icon: CheckCircle,
            color: 'bg-green-500',
        },
        {
            label: 'Ditolak',
            value: rejectedCount || 0,
            icon: XCircle,
            color: 'bg-red-500',
        },
    ]

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Dashboard Admin
                </h1>
                <p className="text-gray-600">
                    Selamat datang, {admin.email}
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <Card key={index} className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>

            {/* Recent Registrations */}
            <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Pendaftar Terbaru
                </h2>

                {recentRegistrations && recentRegistrations.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                        No. Pendaftaran
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                        Nama Siswa
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                        NISN
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                        Status
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRegistrations.map((reg: any) => (
                                    <tr key={reg.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm">
                                            <span className="font-mono font-semibold text-blue-600">
                                                {reg.registration_number}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                            {reg.students?.full_name}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600">
                                            {reg.students?.nisn}
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${reg.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    reg.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {reg.status === 'pending' ? 'Menunggu' :
                                                    reg.status === 'accepted' ? 'Diterima' : 'Ditolak'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600">
                                            {new Date(reg.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600 text-center py-8">
                        Belum ada pendaftar
                    </p>
                )}
            </Card>
        </div>
    )
}
