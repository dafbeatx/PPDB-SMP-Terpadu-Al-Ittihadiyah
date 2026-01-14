const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB (client-side compression will reduce to ~1-2MB)
const MIN_WIDTH = 800
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg']

export interface FileValidationResult {
    valid: boolean
    error?: string
}

export async function validateFile(file: File): Promise<FileValidationResult> {
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: 'File harus berformat JPG/JPEG. PNG, PDF, dan format lain tidak diperbolehkan.',
        }
    }

    // Check file extension
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !['jpg', 'jpeg'].includes(extension)) {
        return {
            valid: false,
            error: 'File harus memiliki ekstensi .jpg atau .jpeg',
        }
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        return {
            valid: false,
            error: `Ukuran file terlalu besar. Maksimal ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        }
    }

    // Check image dimensions
    try {
        const dimensions = await getImageDimensions(file)
        if (dimensions.width < MIN_WIDTH) {
            return {
                valid: false,
                error: `Gambar terlalu kecil atau tidak jelas. Lebar minimal ${MIN_WIDTH}px`,
            }
        }
    } catch (error) {
        return {
            valid: false,
            error: 'File tidak dapat dibaca. Pastikan file adalah gambar yang valid.',
        }
    }

    return { valid: true }
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const url = URL.createObjectURL(file)

        img.onload = () => {
            URL.revokeObjectURL(url)
            resolve({
                width: img.width,
                height: img.height,
            })
        }

        img.onerror = () => {
            URL.revokeObjectURL(url)
            reject(new Error('Failed to load image'))
        }

        img.src = url
    })
}

export function generateSafeFileName(registrationId: string, documentType: string, originalName: string): string {
    const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg'
    const timestamp = Date.now()
    return `${registrationId}_${documentType}_${timestamp}.${extension}`
}

export const DOCUMENT_TYPES = [
    { value: 'ktp', label: 'KTP Orang Tua' },
    { value: 'kartu_keluarga', label: 'Kartu Keluarga' },
    { value: 'ijazah', label: 'Ijazah / Surat Keterangan Lulus' },
] as const
