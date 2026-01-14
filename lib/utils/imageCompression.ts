import imageCompression from 'browser-image-compression'

export interface CompressionOptions {
    maxSizeMB?: number
    maxWidthOrHeight?: number
    quality?: number
    onProgress?: (progress: number) => void
}

export interface CompressionResult {
    file: File
    originalSize: number
    compressedSize: number
    savedPercentage: number
}

/**
 * Compress image on client-side before upload
 * @param file - Original image file
 * @param options - Compression options
 * @returns Compressed file with statistics
 */
export async function compressImageClient(
    file: File,
    options: CompressionOptions = {}
): Promise<CompressionResult> {
    const originalSize = file.size

    const defaultOptions = {
        maxSizeMB: 1, // Target max size (will be further compressed on server)
        maxWidthOrHeight: 1920, // Max dimension
        quality: 0.8, // 80% quality
        useWebWorker: true, // Use web worker for better performance
        fileType: 'image/jpeg',
    }

    const compressionOptions = {
        ...defaultOptions,
        ...options,
        onProgress: options.onProgress,
    }

    try {
        const compressedFile = await imageCompression(file, compressionOptions)
        const compressedSize = compressedFile.size

        // If compression made file larger (rare), return original
        if (compressedSize >= originalSize) {
            return {
                file: file,
                originalSize,
                compressedSize: originalSize,
                savedPercentage: 0,
            }
        }

        return {
            file: compressedFile,
            originalSize,
            compressedSize,
            savedPercentage: parseFloat(
                (((originalSize - compressedSize) / originalSize) * 100).toFixed(1)
            ),
        }
    } catch (error) {
        console.error('Compression error:', error)
        // Return original file if compression fails
        return {
            file: file,
            originalSize,
            compressedSize: originalSize,
            savedPercentage: 0,
        }
    }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}
