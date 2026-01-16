import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = 'PPDB Al-Ittihadiyah <onboarding@resend.dev>' // Default Resend domain or verified domain

export async function sendConfirmationEmail(
    email: string,
    studentName: string,
    registrationNumber: string
) {
    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [email],
            subject: `Pendaftaran Berhasil - ${studentName} (${registrationNumber})`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; rounded: 8px;">
                    <h2 style="color: #15803d; text-align: center;">Pendaftaran Berhasil!</h2>
                    <p>Yth. Orang Tua/Wali dari <strong>${studentName}</strong>,</p>
                    <p>Terima kasih telah melakukan pendaftaran di SMP Terpadu Al-Ittihadiyah. Pendaftaran Anda telah kami terima dengan detail sebagai berikut:</p>
                    
                    <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Nomor Pendaftaran:</strong> ${registrationNumber}</p>
                        <p style="margin: 5px 0;"><strong>Nama Siswa:</strong> ${studentName}</p>
                        <p style="margin: 5px 0;"><strong>Status:</strong> Menunggu Verifikasi</p>
                    </div>

                    <p>Tim admin kami akan segera melakukan verifikasi terhadap berkas yang Anda unggah. Anda dapat memantau status pendaftaran secara berkala melalui tautan di bawah ini:</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cek-status?nomor=${registrationNumber}" 
                           style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                           Cek Status Pendaftaran
                        </a>
                    </div>

                    <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
                        Email ini dikirim secara otomatis oleh sistem PPDB SMP Terpadu Al-Ittihadiyah. Mohon tidak membalas email ini.
                    </p>
                </div>
            `,
        })

        if (error) {
            console.error('Error sending confirmation email:', error)
            return { success: false, error }
        }

        return { success: true, data }
    } catch (err) {
        console.error('Unexpected error in sendConfirmationEmail:', err)
        return { success: false, error: err }
    }
}

export async function sendStatusUpdateEmail(
    email: string,
    studentName: string,
    registrationNumber: string,
    status: 'accepted' | 'rejected'
) {
    const isAccepted = status === 'accepted'
    const statusText = isAccepted ? 'DITERIMA' : 'DITOLAK'
    const color = isAccepted ? '#15803d' : '#dc2626'

    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [email],
            subject: `Update Status PPDB - ${studentName} (${statusText})`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; rounded: 8px;">
                    <h2 style="color: ${color}; text-align: center;">Update Status Pendaftaran</h2>
                    <p>Yth. Orang Tua/Wali dari <strong>${studentName}</strong>,</p>
                    <p>Kami ingin menginformasikan hasil verifikasi pendaftaran putra/putri Anda dengan Nomor Pendaftaran <strong>${registrationNumber}</strong>.</p>
                    
                    <div style="background-color: ${isAccepted ? '#f0fdf4' : '#fef2f2'}; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                        <h3 style="margin: 0; color: ${color};">STATUS: ${statusText}</h3>
                    </div>

                    ${isAccepted
                    ? `<p>Selamat! Putra/Putri Anda telah <strong>DITERIMA</strong> di SMP Terpadu Al-Ittihadiyah. Silakan lakukan pendaftaran ulang sesuai dengan instruksi yang tertera di halaman status pendaftaran.</p>`
                    : `<p>Mohon maaf, berdasarkan hasil verifikasi kami, pendaftaran Putra/Putri Anda masih <strong>BELUM DAPAT DITERIMA</strong> pada tahap ini. Tetap semangat dan terima kasih atas kepercayaannya.</p>`
                }

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cek-status?nomor=${registrationNumber}" 
                           style="background-color: ${color}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                           Lihat Detail & Instruksi
                        </a>
                    </div>

                    <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
                        Email ini dikirim secara otomatis oleh sistem PPDB SMP Terpadu Al-Ittihadiyah.
                    </p>
                </div>
            `,
        })

        if (error) {
            console.error('Error sending status update email:', error)
            return { success: false, error }
        }

        return { success: true, data }
    } catch (err) {
        console.error('Unexpected error in sendStatusUpdateEmail:', err)
        return { success: false, error: err }
    }
}
