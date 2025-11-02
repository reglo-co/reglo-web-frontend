'use client'

import { Logo } from '@/modules/common/ui'
import { useClerk } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function Page() {
  const { signOut } = useClerk()

  useEffect(() => {
    signOut({ redirectUrl: '/sign-in' })
  }, [signOut])

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Logo.Symbol className="animate-spin-zoom size-12" />
    </div>
  )
}
