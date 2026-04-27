import type { Metadata } from 'next'
import CareersPageClient from './CareersPageClient'

export const metadata: Metadata = {
  title: 'Careers | KMA Global Properties',
  description: 'Find your next role and grow your career with KMA.',
}

export default function CareersPage() {
  return <CareersPageClient />
}
