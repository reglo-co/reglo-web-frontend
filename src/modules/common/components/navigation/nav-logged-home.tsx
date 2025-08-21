'use client'

import { NavUser } from '@/components/nav-user'
import { getUserMinimalAction } from '@/modules/user/actions/get-user-minimal'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { UserMinimalProps } from '@/modules/user/typings'

export function NavLoggedHome() {
  const [user, setUser] = useState<UserMinimalProps['user'] | null>(null)

  useEffect(() => {
    getUserMinimalAction().then(setUser)
  }, [])

  if (!user) {
    return null
  }

  return (
    <div className="sticky top-0 left-0 flex h-16 w-full items-center justify-between bg-transparent px-6">
      <Link href="/">
        <Image
          src="/brand/nodal-icon-letter-black.svg"
          alt="Reglo"
          width={80}
          height={0}
        />
      </Link>
      <div>
        <NavUser user={user} isMinimal />
      </div>
    </div>
  )
}
