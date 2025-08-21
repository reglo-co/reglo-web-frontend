import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { PropsWithChildren } from 'react'

import './globals.css'
import { GlobalLoading } from '@/modules/common/components/global-loading/'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Reglo',
  description: 'Reglo',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden scroll-smooth antialiased`}
      >
        {children}
        <GlobalLoading />
      </body>
    </html>
  )
}
