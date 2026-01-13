import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(d)
}

export function formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '')

    // Format: 0812-3456-7890
    if (cleaned.length >= 10) {
        return cleaned.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')
    }

    return phone
}

export function validatePhoneNumber(phone: string): boolean {
    // Indonesian phone number: starts with 08, 10-13 digits
    const cleaned = phone.replace(/\D/g, '')
    return /^08\d{8,11}$/.test(cleaned)
}

export function getStatusColor(status: string): string {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800'
        case 'verified':
            return 'bg-blue-100 text-blue-800'
        case 'accepted':
            return 'bg-green-100 text-green-800'
        case 'rejected':
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

export function getStatusLabel(status: string): string {
    switch (status) {
        case 'pending':
            return 'Menunggu Verifikasi'
        case 'verified':
            return 'Terverifikasi'
        case 'accepted':
            return 'Diterima'
        case 'rejected':
            return 'Ditolak'
        default:
            return status
    }
}

export function getDocumentTypeLabel(type: string): string {
    switch (type) {
        case 'ktp':
            return 'KTP Orang Tua'
        case 'kartu_keluarga':
            return 'Kartu Keluarga'
        case 'ijazah':
            return 'Ijazah / Surat Keterangan Lulus'
        default:
            return type
    }
}
