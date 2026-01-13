export type Database = {
    public: {
        Tables: {
            registrations: {
                Row: {
                    id: string
                    registration_number: string
                    status: 'pending' | 'verified' | 'accepted' | 'rejected'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    registration_number?: string
                    status?: 'pending' | 'verified' | 'accepted' | 'rejected'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    registration_number?: string
                    status?: 'pending' | 'verified' | 'accepted' | 'rejected'
                    created_at?: string
                    updated_at?: string
                }
            }
            students: {
                Row: {
                    id: string
                    registration_id: string
                    full_name: string
                    nisn: string
                    birth_place: string
                    birth_date: string
                    gender: 'Laki-laki' | 'Perempuan'
                    address: string
                    previous_school: string
                    phone_number: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    registration_id: string
                    full_name: string
                    nisn: string
                    birth_place: string
                    birth_date: string
                    gender: 'Laki-laki' | 'Perempuan'
                    address: string
                    previous_school: string
                    phone_number?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    registration_id?: string
                    full_name?: string
                    nisn?: string
                    birth_place?: string
                    birth_date?: string
                    gender?: 'Laki-laki' | 'Perempuan'
                    address?: string
                    previous_school?: string
                    phone_number?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            parents: {
                Row: {
                    id: string
                    registration_id: string
                    father_name: string
                    mother_name: string
                    father_occupation: string | null
                    mother_occupation: string | null
                    phone_number: string
                    address: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    registration_id: string
                    father_name: string
                    mother_name: string
                    father_occupation?: string | null
                    mother_occupation?: string | null
                    phone_number: string
                    address?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    registration_id?: string
                    father_name?: string
                    mother_name?: string
                    father_occupation?: string | null
                    mother_occupation?: string | null
                    phone_number?: string
                    address?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            documents: {
                Row: {
                    id: string
                    registration_id: string
                    document_type: 'ktp' | 'kartu_keluarga' | 'ijazah'
                    file_path: string
                    file_name: string
                    file_size: number
                    uploaded_at: string
                }
                Insert: {
                    id?: string
                    registration_id: string
                    document_type: 'ktp' | 'kartu_keluarga' | 'ijazah'
                    file_path: string
                    file_name: string
                    file_size: number
                    uploaded_at?: string
                }
                Update: {
                    id?: string
                    registration_id?: string
                    document_type?: 'ktp' | 'kartu_keluarga' | 'ijazah'
                    file_path?: string
                    file_name?: string
                    file_size?: number
                    uploaded_at?: string
                }
            }
            admin_users: {
                Row: {
                    id: string
                    email: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    email: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    created_at?: string
                }
            }
        }
    }
}

// Helpful type exports
export type Registration = Database['public']['Tables']['registrations']['Row']
export type Student = Database['public']['Tables']['students']['Row']
export type Parent = Database['public']['Tables']['parents']['Row']
export type Document = Database['public']['Tables']['documents']['Row']
export type AdminUser = Database['public']['Tables']['admin_users']['Row']

export type RegistrationStatus = 'pending' | 'verified' | 'accepted' | 'rejected'
export type DocumentType = 'ktp' | 'kartu_keluarga' | 'ijazah'
export type Gender = 'Laki-laki' | 'Perempuan'

// Combined type for full registration data
export type FullRegistration = Registration & {
    student: Student
    parent: Parent
    documents: Document[]
}
