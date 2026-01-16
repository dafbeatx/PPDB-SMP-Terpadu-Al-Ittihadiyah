'use client'

import { useState, useEffect, useRef } from 'react'
import StudentForm from './StudentForm'
import ParentForm from './ParentForm'
import AdditionalDataForm from './AdditionalDataForm'
import DocumentUpload from './DocumentUpload'
import StepIndicator from './StepIndicator'
import AutosaveIndicator from './AutosaveIndicator'
import { Save } from 'lucide-react'
import type { StudentFormData } from '@/lib/validations/student'
import type { ParentFormData } from '@/lib/validations/parent'

export interface DocumentData {
    ktp?: File
    kartu_keluarga?: File
    ijazah?: File
}

const STORAGE_KEY = 'ppdb_form_draft'

export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const [studentData, setStudentData] = useState<StudentFormData>({
        full_name: '',
        nik_siswa: '',
        nisn: '',
        birth_place: '',
        birth_date: '',
        gender: 'Laki-laki',
        agama: '',
        anak_ke: 1,
        address: '',
        desa: '',
        kecamatan: '',
        kabupaten: '',
        previous_school: '',
        tahun_lulus: '',
        phone_number: '',
        prestasi: '',
        hafalan_quran: '',
        tinggal_dengan: '',
    })
    const [parentData, setParentData] = useState<ParentFormData>({
        father_name: '',
        father_occupation: '',
        pendidikan_ayah: '',
        mother_name: '',
        mother_occupation: '',
        pendidikan_ibu: '',
        phone_number: '',
        email: '',
        address: '',
        nama_wali: '',
        hubungan_wali: '',
    })
    const [documents, setDocuments] = useState<DocumentData>({})
    const [registrationId, setRegistrationId] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY)
        if (savedData) {
            try {
                const { step, student, parent } = JSON.parse(savedData)
                if (step) setCurrentStep(step)
                if (student) setStudentData(student)
                if (parent) setParentData(parent)
            } catch (error) {
                console.error('Failed to load form draft:', error)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save data to localStorage whenever it changes
    useEffect(() => {
        if (!isLoaded) return

        setIsSaving(true)
        const timer = setTimeout(() => {
            const dataToSave = {
                step: currentStep,
                student: studentData,
                parent: parentData,
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
            setIsSaving(false)
        }, 800) // Debounce for visual feedback

        return () => clearTimeout(timer)
    }, [currentStep, studentData, parentData, isLoaded])

    // Auto scroll to top on step change
    useEffect(() => {
        if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
        }

        const timer = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })

            const title = containerRef.current?.querySelector('h2')
            if (title instanceof HTMLElement) {
                title.tabIndex = -1
                title.focus({ preventScroll: true })
            }
        }, 100)

        return () => clearTimeout(timer)
    }, [currentStep])

    const totalSteps = 4

    const saveToDb = async (student?: StudentFormData, parent?: ParentFormData) => {
        setIsSaving(true)
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student: student || studentData,
                    parent: parent || parentData,
                    registrationId: registrationId,
                }),
            })

            if (!response.ok) throw new Error('Gagal autosave ke database')

            const result = await response.json()
            if (result.registrationId && !registrationId) {
                setRegistrationId(result.registrationId)
            }
        } catch (error) {
            console.error('Autosave error:', error)
        } finally {
            // Keep the "Tersimpan" state visible for a moment
            setTimeout(() => setIsSaving(false), 500)
        }
    }

    const handleStudentSubmit = async (data: StudentFormData) => {
        setStudentData(data)
        await saveToDb(data, undefined)
        setCurrentStep(2)
    }

    const handleParentSubmit = async (data: ParentFormData) => {
        setParentData(data)
        await saveToDb(undefined, data)
        setCurrentStep(3)
    }

    const handleAdditionalDataSubmit = async (data: Partial<StudentFormData>) => {
        const updatedStudent = { ...studentData, ...data }
        setStudentData(updatedStudent)
        await saveToDb(updatedStudent, undefined)
        setCurrentStep(4)
    }

    const handleDocumentSubmit = async (docs: DocumentData) => {
        setDocuments(docs)
        setIsSubmitting(true)

        try {
            let currentRegId = registrationId

            if (!currentRegId) {
                const registrationResponse = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        student: studentData,
                        parent: parentData,
                    }),
                })

                if (!registrationResponse.ok) {
                    const errorData = await registrationResponse.json()
                    throw new Error(errorData.details || errorData.error || 'Gagal menyimpan data pendaftaran')
                }

                const result = await registrationResponse.json()
                currentRegId = result.registrationId
                setRegistrationId(currentRegId)
            }

            for (const [type, file] of Object.entries(docs)) {
                if (file) {
                    const formData = new FormData()
                    formData.append('file', file)
                    formData.append('registrationId', currentRegId as string)
                    formData.append('documentType', type)

                    const uploadResponse = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                    })

                    if (!uploadResponse.ok) {
                        const errorData = await uploadResponse.json()
                        throw new Error(`Gagal upload ${type}: ${errorData.details || errorData.error}`)
                    }
                }
            }

            // Clear local storage on success
            localStorage.removeItem(STORAGE_KEY)
            window.location.href = `/daftar/konfirmasi?id=${currentRegId}`
        } catch (error: any) {
            console.error('Error submitting registration:', error)
            const errorMsg = error.message || 'Terjadi kesalahan saat mendaftar.'
            alert(`${errorMsg}\n\nSilakan coba lagi atau hubungi admin jika masalah berlanjut.`)
            setIsSubmitting(false)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto" ref={containerRef}>
            <div className="mb-10 md:mb-12">
                <StepIndicator currentStep={currentStep} totalSteps={totalSteps} className="mb-0" />
            </div>

            <div className="mt-8 relative">
                {/* Autosave Indicator - Moved to avoid overlap with stepper */}
                <div className="flex justify-end mb-2 px-1 h-6">
                    <AutosaveIndicator isSaving={isSaving} />
                </div>

                {currentStep === 1 && (
                    <StudentForm
                        onSubmit={handleStudentSubmit}
                        initialData={studentData}
                        onUpdate={(data: Partial<StudentFormData>) => setStudentData(prev => ({ ...prev, ...data }))}
                    />
                )}

                {currentStep === 2 && (
                    <ParentForm
                        onSubmit={handleParentSubmit}
                        onBack={handleBack}
                        initialData={parentData}
                        onUpdate={(data: Partial<ParentFormData>) => setParentData(prev => ({ ...prev, ...data }))}
                    />
                )}

                {currentStep === 3 && (
                    <AdditionalDataForm
                        onSubmit={handleAdditionalDataSubmit}
                        onBack={handleBack}
                        initialData={studentData}
                        onUpdate={(data: Partial<StudentFormData>) => setStudentData(prev => ({ ...prev, ...data }))}
                    />
                )}

                {currentStep === 4 && (
                    <DocumentUpload
                        onSubmit={handleDocumentSubmit}
                        onBack={handleBack}
                        initialDocuments={documents}
                        isSubmitting={isSubmitting}
                    />
                )}
            </div>
        </div>
    )
}
