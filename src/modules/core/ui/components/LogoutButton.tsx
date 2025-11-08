'use client'

import Link from 'next/link'

export default function LogoutButton() {
  return (
    <Link href="/auth/logout" className="button logout">
      Log Out
    </Link>
  )
}
