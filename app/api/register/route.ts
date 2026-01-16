import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendConfirmationEmail } from '@/lib/mail'

export async function POST(request: Request) {
    try {
        const { student, parent } = await request.json()

        const supabase = await createClient()

        // 1. Create registration with empty registration_number so trigger can populate it
        const { data: registration, error: regError } = await supabase
            .from('registrations')
            .insert({ registration_number: '' })
            .select('id, registration_number')
            .single()

        if (regError || !registration) {
            console.error('Registration error details:', regError)
            return NextResponse.json(
                {
                    error: 'Gagal membuat pendaftaran',
                    details: regError?.message || 'No registration returned'
                },
                { status: 500 }
            )
        }

        // 2. Insert student data
        console.log('Inserting student data for registration:', registration.id)
        const { error: studentError } = await supabase
            .from('students')
            .insert({
                registration_id: registration.id,
                ...student,
            })

        if (studentError) {
            console.error('Student error details:', studentError)
            // Rollback by deleting registration
            await supabase.from('registrations').delete().eq('id', registration.id)
            return NextResponse.json(
                { error: 'Gagal menyimpan data siswa', details: studentError.message },
                { status: 500 }
            )
        }

        // 3. Insert parent data
        console.log('Inserting parent data for registration:', registration.id)
        const { error: parentError } = await supabase
            .from('parents')
            .insert({
                registration_id: registration.id,
                ...parent,
            })

        if (parentError) {
            console.error('Parent error details:', parentError)
            // Rollback
            await supabase.from('students').delete().eq('registration_id', registration.id)
            await supabase.from('registrations').delete().eq('id', registration.id)
            return NextResponse.json(
                { error: 'Gagal menyimpan data orang tua', details: parentError.message },
                { status: 500 }
            )
        }

        // 4. Send Confirmation Email (Async - don't block response)
        if (parent.email) {
            sendConfirmationEmail(
                parent.email,
                student.full_name,
                registration.registration_number
            ).catch(err => console.error('Failed to send confirmation email async:', err))
        }

        return NextResponse.json({
            success: true,
            registrationId: registration.id,
            registrationNumber: registration.registration_number,
        })
    } catch (error: any) {
        console.error('Unexpected error in /api/register:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan server', details: error.message },
            { status: 500 }
        )
    }
}
