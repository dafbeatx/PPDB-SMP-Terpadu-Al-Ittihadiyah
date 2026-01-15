import { z } from 'zod'

export const studentSchema = z.object({
    full_name: z.string().min(3, 'Nama harus minimal 3 karakter'),
    nik_siswa: z.string()
        .length(16, 'NIK harus 16 digit')
        .regex(/^\d+$/, 'NIK harus berupa angka'),
    nisn: z.string()
        .length(10, 'NISN harus 10 digit')
        .regex(/^\d+$/, 'NISN harus berupa angka'),
    birth_place: z.string().min(2, 'Tempat lahir harus diisi'),
    birth_date: z.string().min(1, 'Tanggal lahir harus diisi'),
    gender: z.enum(['Laki-laki', 'Perempuan'], {
        message: 'Jenis kelamin harus dipilih',
    }),
    agama: z.string().min(1, 'Agama harus dipilih'),
    anak_ke: z.preprocess((val) => Number(val), z.number().min(1, 'Anak ke harus minimal 1')),
    address: z.string().min(10, 'Alamat harus minimal 10 karakter'),
    desa: z.string().min(2, 'Kelurahan/Desa harus diisi'),
    kecamatan: z.string().min(2, 'Kecamatan harus diisi'),
    kabupaten: z.string().min(2, 'Kota/Kabupaten harus diisi'),
    previous_school: z.string().min(3, 'Nama sekolah asal harus diisi'),
    tahun_lulus: z.string()
        .length(4, 'Tahun lulus harus 4 digit')
        .regex(/^\d+$/, 'Tahun lulus harus berupa angka'),
    phone_number: z.string()
        .regex(/^08\d{8,11}$/, 'Nomor HP harus format Indonesia (08xx) dan 10-13 digit')
        .optional()
        .or(z.literal('')),
    prestasi: z.string().optional().or(z.literal('')),
    hafalan_quran: z.string().optional().or(z.literal('')),
    tinggal_dengan: z.string().min(1, 'Status tinggal harus diisi'),
})

export type StudentFormData = z.infer<typeof studentSchema>
