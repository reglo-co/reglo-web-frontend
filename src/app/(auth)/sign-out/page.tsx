'use client'

import { useClerk } from '@clerk/nextjs'
import { LogoRegloSymbol } from '@common/components'
import { useEffect } from 'react'

export default function Page() {
  const { signOut } = useClerk()

  useEffect(() => {
    signOut({ redirectUrl: '/sign-in' })
  }, [signOut])

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LogoRegloSymbol className="animate-spin-zoom size-12" />
    </div>
  )
}
