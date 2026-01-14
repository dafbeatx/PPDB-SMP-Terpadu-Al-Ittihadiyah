'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { FileDown, Search, Eye, Trash2, Users, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Registration {
    id: string
    registration_number: string
    status: string
    created_at: string
    students?: {
        full_name: string
        nisn: string
        phone_number: string
    }[]
    // Flattened fields for UI
    full_name?: string
    nisn?: string
}

export default function PendaftarPage() {
    const [registrations, setRegistrations] = useState<Registration[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState<string>('all')

    useEffect(() => {
        fetchRegistrations()
    }, [])

    const fetchRegistrations = async () => {
        try {
            const supabase = createClient()
            const { data, error } = await supabase
                .from('registrations')
                .select(`
                    *,
                    students (
                        full_name,
                        nisn,
                        phone_number
                    )
                `)
                .order('created_at', { ascending: false })

            if (error) throw error

            // Flatten data for easier use
            const flattened = (data || []).map(reg => ({
                ...reg,
                full_name: reg.students?.[0]?.full_name || 'Tanpa Nama',
                nisn: reg.students?.[0]?.nisn || '-'
            }))

            setRegistrations(flattened)
        } catch (error) {
            console.error('Error fetching registrations:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleExport = async () => {
        try {
            const response = await fetch('/api/export/registrations')
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `pendaftar-ppdb-${new Date().toISOString().split('T')[0]}.xlsx`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error exporting:', error)
            alert('Gagal export data. Silakan coba lagi.')
        }
    }

    const filteredRegistrations = registrations.filter(reg => {
        const search = searchTerm.toLowerCase()
        const fullName = (reg.full_name || '').toLowerCase()
        const regNum = (reg.registration_number || '').toLowerCase()
        const nisn = (reg.nisn || '')

        const matchesSearch =
            fullName.includes(search) ||
            regNum.includes(search) ||
            nisn.includes(search)

        const matchesStatus = filterStatus === 'all' || reg.status === filterStatus

        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-4 h-4" />
                        Diterima
                    </span>
                )
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        <XCircle className="w-4 h-4" />
                        Ditolak
                    </span>
                )
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-4 h-4" />
                        Menunggu
                    </span>
                )
        }
    }

    const stats = {
        total: registrations.length,
        pending: registrations.filter(r => r.status === 'pending').length,
        approved: registrations.filter(r => r.status === 'approved').length,
        rejected: registrations.filter(r => r.status === 'rejected').length,
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        )
    }

    return (
        <div className="p-4 lg:p-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Daftar Pendaftar</h1>
                <p className="text-gray-600 mt-1">Kelola data pendaftar PPDB 2026/2027</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Menunggu</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Diterima</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-100 rounded-lg">
                            <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Ditolak</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card className="p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    <div className="flex-1 w-full lg:w-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari nama, nomor pendaftaran, email, atau NISN..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
                        >
                            <option value="all">Semua Status</option>
                            <option value="pending">Menunggu</option>
                            <option value="approved">Diterima</option>
                            <option value="rejected">Ditolak</option>
                        </select>
                        <Button onClick={handleExport} className="gap-2">
                            <FileDown className="w-4 h-4" />
                            Export Excel
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">No. Pendaftaran</th>
                                <th className="text-left py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Nama Lengkap</th>
                                <th className="text-left py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base hidden lg:table-cell">NISN</th>
                                <th className="text-left py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Status</th>
                                <th className="text-left py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Tanggal</th>
                                <th className="text-left py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredRegistrations.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-gray-500">
                                        <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                        <p className="font-medium">Tidak ada data pendaftar</p>
                                        <p className="text-sm">Data akan muncul setelah ada pendaftar baru</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredRegistrations.map((reg) => (
                                    <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4 lg:px-6">
                                            <span className="font-mono text-sm font-medium text-green-700">
                                                {reg.registration_number}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 lg:px-6">
                                            <span className="font-medium text-gray-900">{reg.full_name}</span>
                                        </td>
                                        <td className="py-4 px-4 lg:px-6 hidden lg:table-cell text-gray-600">
                                            {reg.nisn}
                                        </td>
                                        <td className="py-4 px-4 lg:px-6">
                                            {getStatusBadge(reg.status)}
                                        </td>
                                        <td className="py-4 px-4 lg:px-6 text-gray-600 text-sm">
                                            {new Date(reg.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="py-4 px-4 lg:px-6">
                                            <div className="flex gap-2">
                                                <button
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Results Count */}
            {filteredRegistrations.length > 0 && (
                <p className="text-sm text-gray-600 text-center">
                    Menampilkan {filteredRegistrations.length} dari {registrations.length} pendaftar
                </p>
            )}
        </div>
    )
}
