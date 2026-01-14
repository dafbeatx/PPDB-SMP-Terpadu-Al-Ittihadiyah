import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
    try {
        const { student, parent } = await request.json()

        const supabase = await createClient()

        // Start a transaction-like operation
        // 1. Create registration with empty registration_number so trigger can populate it
        const { data: registration, error: regError } = await supabase
            .from('registrations')
            .insert({ registration_number: '' })
            .select('id, registration_number')
            .single()

        if (regError || !registration) {
            console.error('Registration error:', regError)
            return NextResponse.json(
                { error: 'Gagal membuat pendaftaran' },
                { status: 500 }
            )
        }

        // 2. Insert student data
        const { error: studentError } = await supabase
            .from('students')
            .insert({
                registration_id: registration.id,
                ...student,
            })

        if (studentError) {
            console.error('Student error:', studentError)
            // Rollback by deleting registration
            await supabase.from('registrations').delete().eq('id', registration.id)
            return NextResponse.json(
                { error: 'Gagal menyimpan data siswa' },
                { status: 500 }
            )
        }

        // 3. Insert parent data
        const { error: parentError } = await supabase
            .from('parents')
            .insert({
                registration_id: registration.id,
                ...parent,
            })

        if (parentError) {
            console.error('Parent error:', parentError)
            // Rollback
            await supabase.from('students').delete().eq('registration_id', registration.id)
            await supabase.from('registrations').delete().eq('id', registration.id)
            return NextResponse.json(
                { error: 'Gagal menyimpan data orang tua' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            registrationId: registration.id,
            registrationNumber: registration.registration_number,
        })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan server' },
            { status: 500 }
        )
    }
}
