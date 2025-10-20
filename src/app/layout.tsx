import { ptBR } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import '@common/styles/globals.css'
import type { Metadata } from 'next'
import { ABeeZee } from 'next/font/google'
import type { PropsWithChildren } from 'react'

const abeeZee = ABeeZee({
  variable: '--font-abee-zee',
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Reglo',
  description: 'Gerencie suas regras de forma fácil e eficiente',
  icons: [
    {
      rel: 'icon',
      url: '/favicon/light.svg',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      url: '/favicon/dark.svg',
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'icon',
      url: '/favicon/light.svg',
    },
  ],
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider localization={ptBR} waitlistUrl="/waitlist">
      <html lang="pt-BR">
        <body className={`${abeeZee.variable} tracking-wide antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
