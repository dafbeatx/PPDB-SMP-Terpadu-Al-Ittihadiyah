import dynamic from 'next/dynamic'
import Hero from '@/components/landing/Hero'

const PrincipalWelcome = dynamic(() => import('@/components/landing/PrincipalWelcome'))
const Profile = dynamic(() => import('@/components/landing/Profile'))
const VisiMisi = dynamic(() => import('@/components/landing/VisiMisi'))
const Keunggulan = dynamic(() => import('@/components/landing/Keunggulan'))
const Testimoni = dynamic(() => import('@/components/landing/Testimoni'))
const AlurPPDB = dynamic(() => import('@/components/landing/AlurPPDB'))

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PrincipalWelcome />
      <Profile />
      <VisiMisi />
      <Keunggulan />
      <Testimoni />
      <AlurPPDB />
    </main>
  )
}
