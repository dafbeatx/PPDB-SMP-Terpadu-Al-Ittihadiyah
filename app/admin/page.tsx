import { requireAuth } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import StatCard from '@/components/admin/StatCard'
import StorageWidget from '@/components/admin/StorageWidget'
import ExportButton from '@/components/admin/ExportButton'
import { Users, Clock, CheckCircle, XCircle, UserCheck } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default async function AdminDashboard() {
    await requireAuth()
    const supabase = await createClient()

    // Get statistics
    const { data: registrations } = await supabase
        .from('registrations')
        .select('*, students(full_name, created_at)')
        .order('created_at', { ascending: false })

    const total = registrations?.length || 0
    const pending = registrations?.filter(r => r.status === 'pending').length || 0
    const verified = registrations?.filter(r => r.status === 'verified').length || 0
    const accepted = registrations?.filter(r => r.status === 'accepted').length || 0
    const rejected = registrations?.filter(r => r.status === 'rejected').length || 0

    // Get latest 5 registrations
    const latestRegistrations = registrations?.slice(0, 5) || []

    return (
        <div className="space-y-8">
            {/* Header with Export Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
                    <p className="text-gray-600">Ringkasan data pendaftaran PPDB 2026/2027</p>
                </div>
                <ExportButton />
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <StatCard
                    title="Total Pendaftar"
                    value={total}
                    icon={Users}
                    color="blue"
                    description="Semua pendaftar"
                />
                <StatCard
                    title="Pending Review"
                    value={pending}
                    icon={Clock}
                    color="yellow"
                    description="Menunggu verifikasi"
                />
                <StatCard
                    title="Terverifikasi"
                    value={verified}
                    icon={UserCheck}
                    color="purple"
                    description="Sudah diverifikasi"
                />
                <StatCard
                    title="Diterima"
                    value={accepted}
                    icon={CheckCircle}
                    color="green"
                    description="Diterima di sekolah"
                />
                <StatCard
                    title="Ditolak"
                    value={rejected}
                    icon={XCircle}
                    color="red"
                    description="Tidak lolos seleksi"
                />
            </div>

            {/* Storage Widget */}
            <StorageWidget />

            {/* Status Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Distribusi Status</h2>
                <div className="space-y-4">
                    <StatusBar label="Pending" value={pending} total={total} color="bg-yellow-500" />
                    <StatusBar label="Verified" value={verified} total={total} color="bg-purple-500" />
                    <StatusBar label="Accepted" value={accepted} total={total} color="bg-green-500" />
                    <StatusBar label="Rejected" value={rejected} total={total} color="bg-red-500" />
                </div>
            </div>

            {/* Latest Registrations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Pendaftar Terbaru</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">No. Pendaftaran</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama Siswa</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestRegistrations.map((reg: any) => (
                                <tr key={reg.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium text-gray-900">{reg.registration_number}</td>
                                    <td className="py-3 px-4 text-gray-700">{reg.students?.full_name || '-'}</td>
                                    <td className="py-3 px-4">
                                        <StatusBadge status={reg.status} />
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 text-sm">{formatDate(reg.created_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {latestRegistrations.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            Belum ada pendaftar
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// Helper Components
function StatusBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
    const percentage = total > 0 ? (value / total) * 100 : 0

    return (
        <div>
            <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-semibold text-gray-900">{value} ({percentage.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                    className={`h-3 rounded-full ${color} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-800',
        verified: 'bg-purple-100 text-purple-800',
        accepted: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    }

    const labels = {
        pending: 'Pending',
        verified: 'Verified',
        accepted: 'Diterima',
        rejected: 'Ditolak',
    }

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles] || styles.pending}`}>
            {labels[status as keyof typeof labels] || status}
        </span>
    )
}
