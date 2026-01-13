import { z } from 'zod'

export const parentSchema = z.object({
    father_name: z.string().min(3, 'Nama ayah harus minimal 3 karakter'),
    mother_name: z.string().min(3, 'Nama ibu harus minimal 3 karakter'),
    father_occupation: z.string().min(2, 'Pekerjaan ayah harus diisi'),
    mother_occupation: z.string().min(2, 'Pekerjaan ibu harus diisi'),
    phone_number: z.string()
        .regex(/^08\d{8,11}$/, 'Nomor HP harus format Indonesia (08xx) dan 10-13 digit'),
    address: z.string().optional(),
})

export type ParentFormData = z.infer<typeof parentSchema>
