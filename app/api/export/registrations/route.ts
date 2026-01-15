import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as XLSX from 'xlsx'

export async function GET(request: Request) {
    try {
        const supabase = await createClient()

        // Get current user - verify admin
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check admin status
        const { data: adminData, error: adminError } = await supabase
            .from('admin_users')
            .select('id')
            .eq('email', user.email)
            .single()

        if (adminError || !adminData) {
            return NextResponse.json({ error: 'Not an admin' }, { status: 403 })
        }

        // Fetch all registrations with related data
        const { data: registrations, error: fetchError } = await supabase
            .from('registrations')
            .select(`
        *,
        students (*),
        parents (*),
        documents (*)
      `)
            .order('created_at', { ascending: false })

        if (fetchError) {
            console.error('Fetch error:', fetchError)
            return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
        }

        // Prepare data for Excel
        const excelData = registrations.map((reg: any) => {
            const student = reg.students || {}
            const parent = reg.parents || {}
            const docs = reg.documents || []

            // Get file paths
            const ktpDoc = docs.find((d: any) => d.document_type === 'ktp')
            const kkDoc = docs.find((d: any) => d.document_type === 'kartu_keluarga')
            const ijazahDoc = docs.find((d: any) => d.document_type === 'ijazah')

            return {
                'No. Pendaftaran': reg.registration_number,
                'Status': reg.status,
                'Tanggal Daftar': new Date(reg.created_at).toLocaleDateString('id-ID'),

                // Student data
                'Nama Lengkap': student.full_name || '-',
                'NIK': student.nik_siswa || '-',
                'NISN': student.nisn || '-',
                'Tempat Lahir': student.birth_place || '-',
                'Tanggal Lahir': student.birth_date ? new Date(student.birth_date).toLocaleDateString('id-ID') : '-',
                'Jenis Kelamin': student.gender || '-',
                'Agama': student.agama || '-',
                'Anak Ke': student.anak_ke || '-',
                'Alamat': student.address || '-',
                'Desa': student.desa || '-',
                'Kecamatan': student.kecamatan || '-',
                'Kabupaten': student.kabupaten || '-',
                'Asal Sekolah': student.previous_school || '-',
                'Tahun Lulus': student.tahun_lulus || '-',
                'Telepon Siswa': student.phone_number || '-',
                'Tinggal Dengan': student.tinggal_dengan || '-',
                'Prestasi': student.prestasi || '-',
                'Hafalan Quran': student.hafalan_quran || '-',

                // Parent data
                'Nama Ayah': parent.father_name || '-',
                'Pendidikan Ayah': parent.pendidikan_ayah || '-',
                'Pekerjaan Ayah': parent.father_occupation || '-',
                'Nama Ibu': parent.mother_name || '-',
                'Pendidikan Ibu': parent.pendidikan_ibu || '-',
                'Pekerjaan Ibu': parent.mother_occupation || '-',
                'Telepon Orang Tua': parent.phone_number || '-',
                'Alamat Orang Tua': parent.address || '-',
                'Nama Wali': parent.nama_wali || '-',
                'Hubungan Wali': parent.hubungan_wali || '-',

                // Documents
                'File KTP': ktpDoc?.file_path || '-',
                'File KK': kkDoc?.file_path || '-',
                'File Ijazah': ijazahDoc?.file_path || '-',
            }
        })

        // Create worksheet from data
        const ws = XLSX.utils.json_to_sheet(excelData)

        // Set column widths for better readability
        const colWidths = [
            { wch: 18 }, // No. Pendaftaran
            { wch: 12 }, // Status
            { wch: 15 }, // Tanggal Daftar
            { wch: 25 }, // Nama Lengkap
            { wch: 12 }, // NISN
            { wch: 15 }, // Tempat Lahir
            { wch: 15 }, // Tanggal Lahir
            { wch: 12 }, // Jenis Kelamin
            { wch: 30 }, // Alamat
            { wch: 25 }, // Asal Sekolah
            { wch: 15 }, // Telepon Siswa
            { wch: 25 }, // Nama Ayah
            { wch: 20 }, // Pekerjaan Ayah
            { wch: 25 }, // Nama Ibu
            { wch: 20 }, // Pekerjaan Ibu
            { wch: 15 }, // Telepon Orang Tua
            { wch: 30 }, // Alamat Orang Tua
            { wch: 40 }, // File KTP
            { wch: 40 }, // File KK
            { wch: 40 }, // File Ijazah
        ]
        ws['!cols'] = colWidths

        // Create workbook
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Data Pendaftar')

        // Generate Excel file buffer
        const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

        // Create filename with timestamp
        const timestamp = new Date().toISOString().split('T')[0]
        const filename = `PPDB-Data-${timestamp}.xlsx`

        // Return as downloadable file
        return new NextResponse(excelBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        })
    } catch (error) {
        console.error('Export error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
