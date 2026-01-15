'use client'

import { useState, useEffect, useRef } from 'react'
import StudentForm from './StudentForm'
import ParentForm from './ParentForm'
import AdditionalDataForm from './AdditionalDataForm'
import DocumentUpload from './DocumentUpload'
import StepIndicator from './StepIndicator'
import type { StudentFormData } from '@/lib/validations/student'
import type { ParentFormData } from '@/lib/validations/parent'

export interface DocumentData {
    ktp?: File
    kartu_keluarga?: File
    ijazah?: File
}

export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const [studentData, setStudentData] = useState<StudentFormData | null>(null)
    const [additionalData, setAdditionalData] = useState<Partial<StudentFormData> | null>(null)
    const [parentData, setParentData] = useState<ParentFormData | null>(null)
    const [documents, setDocuments] = useState<DocumentData>({})
    const [registrationId, setRegistrationId] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

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

    const handleStudentSubmit = (data: StudentFormData) => {
        setStudentData(data)
        setCurrentStep(2)
    }

    const handleParentSubmit = (data: ParentFormData) => {
        setParentData(data)
        setCurrentStep(3)
    }

    const handleAdditionalDataSubmit = (data: Partial<StudentFormData>) => {
        setAdditionalData(data)
        setCurrentStep(4)
    }

    const handleDocumentSubmit = async (docs: DocumentData) => {
        setDocuments(docs)
        setIsSubmitting(true)

        try {
            let currentRegId = registrationId

            if (!currentRegId) {
                // Merge student data and additional data
                const fullStudentData = {
                    ...studentData,
                    ...additionalData
                }

                const registrationResponse = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        student: fullStudentData,
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

    return (
        <div className="max-w-4xl mx-auto" ref={containerRef}>
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

            <div className="mt-8">
                {currentStep === 1 && (
                    <StudentForm
                        onSubmit={handleStudentSubmit}
                        initialData={studentData}
                    />
                )}

                {currentStep === 2 && (
                    <ParentForm
                        onSubmit={handleParentSubmit}
                        onBack={handleBack}
                        initialData={parentData}
                    />
                )}

                {currentStep === 3 && (
                    <AdditionalDataForm
                        onSubmit={handleAdditionalDataSubmit}
                        onBack={handleBack}
                        initialData={additionalData}
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
