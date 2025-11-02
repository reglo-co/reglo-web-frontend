'use client'

import { ThemeSwitcher } from '@ui/index'
import Link from 'next/link'

export default function Home() {
  return (
    <div id="start" className="flex flex-col items-center gap-10 p-10">
      <Link href="/console">Area logada</Link>
      <ThemeSwitcher />
    </div>
  )
}
