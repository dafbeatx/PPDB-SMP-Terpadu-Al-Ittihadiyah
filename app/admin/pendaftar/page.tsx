'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { FileDown, Search, Eye, Trash2, Users, CheckCircle, XCircle, Clock, Check, X, Download } from 'lucide-react'

interface Registration {
    id: string
    registration_number: string
    status: string
    created_at: string
    students?: any[]
    parents?: any[]
    documents?: any[]
    // Flattened fields for UI
    full_name?: string
    nisn?: string
}

export default function PendaftarPage() {
    const [registrations, setRegistrations] = useState<Registration[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState<string>('all')
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [selectedReg, setSelectedReg] = useState<Registration | null>(null)
    const [showModal, setShowModal] = useState(false)

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
                    students (*),
                    parents (*),
                    documents (*)
                `)
                .order('created_at', { ascending: false })

            if (error) throw error

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

    const handleViewDetails = (reg: Registration) => {
        setSelectedReg(reg)
        setShowModal(true)
    }

    const handleExport = async () => {
        try {
            const response = await fetch('/api/export/registrations')
            if (!response.ok) throw new Error('Gagal export data')
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

    const handleDownloadZip = async (id: string, studentName: string, regNum: string) => {
        try {
            const response = await fetch(`/api/admin/registrations/${id}/zip`)
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Gagal download dokumen')
            }

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${studentName.replace(/\s+/g, '_')}-${regNum}.zip`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        } catch (error: any) {
            console.error('ZIP Download error:', error)
            alert(error.message)
        }
    }

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        setUpdatingId(id)
        try {
            const response = await fetch(`/api/admin/registrations/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Gagal update status')
            }

            // Update local state
            setRegistrations(prev => prev.map(reg =>
                reg.id === id ? { ...reg, status: newStatus } : reg
            ))
        } catch (error: any) {
            console.error('Error updating status:', error)
            alert(`Gagal memperbarui status: ${error.message}`)
        } finally {
            setUpdatingId(null)
        }
    }

    const handleDelete = async (id: string, regNum: string) => {
        if (!confirm(`Apakah Anda yakin ingin menghapus pendaftaran ${regNum}?\nData siswa, orang tua, dan dokumen terkait akan dihapus permanen.`)) {
            return
        }

        try {
            const response = await fetch(`/api/admin/registrations/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Gagal menghapus data')

            // Update local state
            setRegistrations(prev => prev.filter(reg => reg.id !== id))
            alert('Data pendaftaran berhasil dihapus.')
        } catch (error) {
            console.error('Error deleting registration:', error)
            alert('Gagal menghapus data. Silakan coba lagi.')
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
            case 'accepted':
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
        approved: registrations.filter(r => r.status === 'accepted').length,
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
                            <option value="accepted">Diterima</option>
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
                                <th className="text-left py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Dokumen</th>
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
                                            <div className="flex flex-col gap-2">
                                                {reg.documents && reg.documents.length > 0 ? (
                                                    <button
                                                        onClick={() => handleDownloadZip(reg.id, reg.full_name || "Siswa", reg.registration_number)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm w-full"
                                                    >
                                                        <Download className="w-3 h-3" />
                                                        ZIP Dokumen
                                                    </button>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">Belum upload</span>
                                                )}
                                                {reg.parents?.[0]?.phone_number && (
                                                    <a
                                                        href={`https://wa.me/${reg.parents[0].phone_number.replace(/^0/, '62')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-100 text-[10px] font-bold hover:bg-green-600 hover:text-white transition-all shadow-sm w-full"
                                                    >
                                                        <Users className="w-3 h-3" />
                                                        WhatsApp Ortu
                                                    </a>
                                                )}
                                            </div>
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
                                            <div className="flex gap-1 lg:gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(reg)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <div className="w-px h-6 bg-gray-200 mx-1" />
                                                <button
                                                    onClick={() => handleStatusUpdate(reg.id, 'accepted')}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200 disabled:opacity-50"
                                                    title="Terima Pendaftaran"
                                                    disabled={reg.status === 'accepted' || updatingId === reg.id}
                                                >
                                                    {updatingId === reg.id ? <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(reg.id, 'rejected')}
                                                    className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border border-transparent hover:border-orange-200 disabled:opacity-50"
                                                    title="Tolak Pendaftaran"
                                                    disabled={reg.status === 'rejected' || updatingId === reg.id}
                                                >
                                                    {updatingId === reg.id ? <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" /> : <X className="w-4 h-4" />}
                                                </button>
                                                <div className="w-px h-6 bg-gray-200 mx-1 hidden lg:block" />
                                                <button
                                                    onClick={() => handleDelete(reg.id, reg.registration_number)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                                                    title="Hapus Pendaftaran"
                                                >
                                                    <Trash2 className="w-4 h-4" />
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

            {/* Detail Modal */}
            {showModal && selectedReg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Detail Pendaftar</h2>
                                <p className="text-sm font-mono text-green-700 font-medium">{selectedReg.registration_number}</p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Data Siswa */}
                            <section>
                                <h3 className="text-lg font-bold text-green-800 border-b border-green-100 pb-2 mb-4">Data Siswa</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <DetailField label="Nama Lengkap" value={selectedReg.students?.[0]?.full_name} />
                                    <DetailField label="NIK" value={selectedReg.students?.[0]?.nik_siswa} />
                                    <DetailField label="NISN" value={selectedReg.students?.[0]?.nisn} />
                                    <DetailField label="Tempat Lahir" value={selectedReg.students?.[0]?.birth_place} />
                                    <DetailField label="Tanggal Lahir" value={selectedReg.students?.[0]?.birth_date} />
                                    <DetailField label="Jenis Kelamin" value={selectedReg.students?.[0]?.gender} />
                                    <DetailField label="Agama" value={selectedReg.students?.[0]?.agama} />
                                    <DetailField label="Anak Ke" value={selectedReg.students?.[0]?.anak_ke} />
                                    <DetailField label="Tinggal Dengan" value={selectedReg.students?.[0]?.tinggal_dengan} />
                                    <DetailField label="Asal Sekolah" value={selectedReg.students?.[0]?.previous_school} />
                                    <DetailField label="Tahun Lulus" value={selectedReg.students?.[0]?.tahun_lulus} />
                                    <DetailField label="Nomor HP" value={selectedReg.students?.[0]?.phone_number} />
                                    <div className="md:col-span-3">
                                        <DetailField
                                            label="Alamat"
                                            value={`${selectedReg.students?.[0]?.address || '-'}${selectedReg.students?.[0]?.desa ? ` (Desa: ${selectedReg.students[0].desa})` : ''}${selectedReg.students?.[0]?.kecamatan ? ` (Kec: ${selectedReg.students[0].kecamatan})` : ''}${selectedReg.students?.[0]?.kabupaten ? ` (Kab: ${selectedReg.students[0].kabupaten})` : ''}`}
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <DetailField label="Prestasi" value={selectedReg.students?.[0]?.prestasi} />
                                    </div>
                                    <div className="md:col-span-3">
                                        <DetailField label="Hafalan Quran" value={selectedReg.students?.[0]?.hafalan_quran} />
                                    </div>
                                </div>
                            </section>

                            {/* Data Orang Tua */}
                            <section>
                                <h3 className="text-lg font-bold text-green-800 border-b border-green-100 pb-2 mb-4">Data Orang Tua / Wali</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <DetailField label="Nama Ayah" value={selectedReg.parents?.[0]?.father_name} />
                                    <DetailField label="Pendidikan Ayah" value={selectedReg.parents?.[0]?.pendidikan_ayah} />
                                    <DetailField label="Pekerjaan Ayah" value={selectedReg.parents?.[0]?.father_occupation} />
                                    <div className="hidden md:block"></div>
                                    <DetailField label="Nama Ibu" value={selectedReg.parents?.[0]?.mother_name} />
                                    <DetailField label="Pendidikan Ibu" value={selectedReg.parents?.[0]?.pendidikan_ibu} />
                                    <DetailField label="Pekerjaan Ibu" value={selectedReg.parents?.[0]?.mother_occupation} />
                                    <div className="hidden md:block"></div>
                                    <DetailField label="Nomor HP Orang Tua" value={selectedReg.parents?.[0]?.phone_number} />
                                    {selectedReg.parents?.[0]?.phone_number && (
                                        <div className="pt-2">
                                            <a
                                                href={`https://wa.me/${selectedReg.parents[0].phone_number.replace(/^0/, '62')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-all"
                                            >
                                                <Users className="w-4 h-4" />
                                                Chat WhatsApp Orang Tua
                                            </a>
                                        </div>
                                    )}
                                    <DetailField label="Nama Wali" value={selectedReg.parents?.[0]?.nama_wali} />
                                    <DetailField label="Hubungan Wali" value={selectedReg.parents?.[0]?.hubungan_wali} />
                                    <div className="md:col-span-2">
                                        <DetailField label="Alamat Orang Tua" value={selectedReg.parents?.[0]?.address || 'Sama dengan alamat siswa'} />
                                    </div>
                                </div>
                            </section>

                            {/* Dokumen */}
                            <section>
                                <h3 className="text-lg font-bold text-green-800 border-b border-green-100 pb-2 mb-4">Dokumen</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {['ktp', 'kartu_keluarga', 'ijazah'].map((type) => {
                                        const doc = selectedReg.documents?.find(d => d.document_type === type)
                                        return (
                                            <div key={type} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                                                    {type.replace('_', ' ')}
                                                </p>
                                                {doc ? (
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                                            <Check className="w-4 h-4" /> Tersedia
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400 italic">Belum diupload</span>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>
                        </div>

                        <div className="p-6 border-t bg-gray-50 flex flex-wrap justify-end gap-3">
                            <Button variant="outline" onClick={() => setShowModal(false)}>
                                Tutup
                            </Button>
                            {selectedReg.documents && selectedReg.documents.length > 0 && (
                                <Button
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700 border-blue-200"
                                    onClick={() => handleDownloadZip(selectedReg.id, selectedReg.full_name || "Siswa", selectedReg.registration_number)}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download ZIP Dokumen
                                </Button>
                            )}
                            {selectedReg.status === 'pending' && (
                                <>
                                    <Button
                                        variant="outline"
                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                        onClick={() => {
                                            handleStatusUpdate(selectedReg.id, 'rejected')
                                            setShowModal(false)
                                        }}
                                    >
                                        Tolak
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleStatusUpdate(selectedReg.id, 'accepted')
                                            setShowModal(false)
                                        }}
                                    >
                                        Terima Pendaftaran
                                    </Button>
                                </>
                            )}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}

function DetailField({ label, value }: { label: string, value: any }) {
    return (
        <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-gray-900 font-medium">{value || '-'}</p>
        </div>
    )
}
