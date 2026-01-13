'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Lock, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const supabase = createClient()

            // Normalize email
            const normalizedEmail = email.toLowerCase().trim()

            // Sign in with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: normalizedEmail,
                password,
            })

            if (authError) {
                console.error('Auth error:', authError)
                setError('Email atau password salah')
                setIsLoading(false)
                return
            }

            console.log('Auth successful for:', authData.user?.email)

            // Check if user is admin
            const { data: adminData, error: adminError } = await supabase
                .from('admin_users')
                .select('id, email')
                .eq('email', normalizedEmail)
                .single()

            console.log('Admin check result:', { adminData, adminError })

            if (adminError || !adminData) {
                console.error('Not an admin:', normalizedEmail)
                // Sign out if not admin
                await supabase.auth.signOut()
                setError(`Anda tidak memiliki akses admin. Email: ${normalizedEmail}`)
                setIsLoading(false)
                return
            }

            console.log('Login successful! Redirecting...')
            // Redirect to admin dashboard
            router.push('/admin')
            router.refresh()
        } catch (err) {
            console.error('Unexpected error:', err)
            setError('Terjadi kesalahan. Silakan coba lagi.')
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-6 md:p-8">
                <div className="text-center mb-8">
                    <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Admin Panel
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base">
                        SMP Terpadu Al-Ittihadiyah
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Admin
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-gray-900 font-medium text-base placeholder:text-gray-400"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none text-gray-900 font-medium text-base placeholder:text-gray-400"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Mohon tunggu...' : 'Masuk'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <a href="/" className="text-green-600 hover:text-green-700 font-medium">
                        ← Kembali ke Beranda
                    </a>
                </div>
            </Card>
        </div>
    )
}
