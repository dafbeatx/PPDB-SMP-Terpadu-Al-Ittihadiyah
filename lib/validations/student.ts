import { z } from 'zod'

export const studentSchema = z.object({
    full_name: z.string().min(3, 'Nama harus minimal 3 karakter'),
    nisn: z.string()
        .length(10, 'NISN harus 10 digit')
        .regex(/^\d+$/, 'NISN harus berupa angka'),
    birth_place: z.string().min(2, 'Tempat lahir harus diisi'),
    birth_date: z.string().min(1, 'Tanggal lahir harus diisi'),
    gender: z.enum(['Laki-laki', 'Perempuan'], {
        message: 'Jenis kelamin harus dipilih',
    }),
    address: z.string().min(10, 'Alamat harus minimal 10 karakter'),
    previous_school: z.string().min(3, 'Nama sekolah asal harus diisi'),
    phone_number: z.string()
        .regex(/^08\d{8,11}$/, 'Nomor HP harus format Indonesia (08xx) dan 10-13 digit')
        .optional()
        .or(z.literal('')),
})

export type StudentFormData = z.infer<typeof studentSchema>
