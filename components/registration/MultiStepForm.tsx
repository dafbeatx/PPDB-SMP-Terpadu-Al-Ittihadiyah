'use client'

import { useState } from 'react'
import StudentForm from './StudentForm'
import ParentForm from './ParentForm'
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
    const [parentData, setParentData] = useState<ParentFormData | null>(null)
    const [documents, setDocuments] = useState<DocumentData>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const totalSteps = 3

    const handleStudentSubmit = (data: StudentFormData) => {
        setStudentData(data)
        setCurrentStep(2)
    }

    const handleParentSubmit = (data: ParentFormData) => {
        setParentData(data)
        setCurrentStep(3)
    }

    const handleDocumentSubmit = async (docs: DocumentData) => {
        setDocuments(docs)
        setIsSubmitting(true)

        try {
            // First, create the registration
            const registrationResponse = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student: studentData,
                    parent: parentData,
                }),
            })

            if (!registrationResponse.ok) {
                throw new Error('Gagal menyimpan data pendaftaran')
            }

            const { registrationId } = await registrationResponse.json()

            // Upload documents
            for (const [type, file] of Object.entries(docs)) {
                if (file) {
                    const formData = new FormData()
                    formData.append('file', file)
                    formData.append('registrationId', registrationId)
                    formData.append('documentType', type)

                    const uploadResponse = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                    })

                    if (!uploadResponse.ok) {
                        throw new Error(`Gagal upload ${type}`)
                    }
                }
            }

            // Redirect to confirmation page
            window.location.href = `/daftar/konfirmasi?id=${registrationId}`
        } catch (error) {
            console.error('Error submitting registration:', error)
            alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.')
            setIsSubmitting(false)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
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
