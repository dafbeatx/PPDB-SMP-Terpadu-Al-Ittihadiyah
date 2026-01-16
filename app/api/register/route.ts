import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendConfirmationEmail } from '@/lib/mail'

export async function POST(request: Request) {
    try {
        const { student, parent, registrationId } = await request.json()

        const supabase = await createClient()

        let currentRegistrationId = registrationId

        // 1. Create registration IF NOT EXISTS
        if (!currentRegistrationId) {
            const { data: registration, error: regError } = await supabase
                .from('registrations')
                .insert({ registration_number: '', status: 'pending' })
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
            currentRegistrationId = registration.id
        }

        // Fetch current registration data (especially registration_number)
        const { data: regInfo } = await supabase
            .from('registrations')
            .select('registration_number')
            .eq('id', currentRegistrationId)
            .single()

        // 2. Upsert student data if provided
        if (student) {
            const { error: studentError } = await supabase
                .from('students')
                .upsert({
                    registration_id: currentRegistrationId,
                    ...student,
                }, { onConflict: 'registration_id' })

            if (studentError) {
                console.error('Student upsert error:', studentError)
                return NextResponse.json(
                    { error: 'Gagal menyimpan data siswa', details: studentError.message },
                    { status: 500 }
                )
            }
        }

        // 3. Upsert parent data if provided
        if (parent) {
            const { error: parentError } = await supabase
                .from('parents')
                .upsert({
                    registration_id: currentRegistrationId,
                    ...parent,
                }, { onConflict: 'registration_id' })

            if (parentError) {
                console.error('Parent upsert error:', parentError)
                return NextResponse.json(
                    { error: 'Gagal menyimpan data orang tua', details: parentError.message },
                    { status: 500 }
                )
            }
        }

        // 4. Send Confirmation Email (Integration)
        // Only send if this is a "complete" submission (Step 3 to 4) 
        // OR as requested by user on successful registration.
        // We trigger it when the registration is first created or when specific fields are final.
        // For simplicity, let's trigger it when student AND parent names are present if not already sent.
        // But the user specifically asked for "Saat pendaftaran berhasil: kirim email otomatis".
        // This is usually at the end of the form. 
        // The MultiStepForm will handle the "Final Submit" logic.

        return NextResponse.json({
            success: true,
            registrationId: currentRegistrationId,
            registrationNumber: regInfo?.registration_number,
        })
    } catch (error: any) {
        console.error('Unexpected error in /api/register:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan server', details: error.message },
            { status: 500 }
        )
    }
}
