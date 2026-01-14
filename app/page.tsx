import Hero from '@/components/landing/Hero'
import Profile from '@/components/landing/Profile'
import VisiMisi from '@/components/landing/VisiMisi'
import Keunggulan from '@/components/landing/Keunggulan'
import Testimoni from '@/components/landing/Testimoni'
import AlurPPDB from '@/components/landing/AlurPPDB'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Profile />
      <VisiMisi />
      <Keunggulan />
      <Testimoni />
      <AlurPPDB />
    </main>
  )
}
