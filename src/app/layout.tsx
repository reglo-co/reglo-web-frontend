import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Auth0Provider } from '@auth0/nextjs-auth0'
import { Providers } from '@providers/index'
import '@styles/globals.css'
import type { Metadata } from 'next'
import { ABeeZee } from 'next/font/google'
import type { PropsWithChildren } from 'react'

const abeeZee = ABeeZee({
  variable: '--font-abee-zee',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
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
    <html suppressHydrationWarning lang="pt-BR">
      <body
        suppressHydrationWarning
        className={`${abeeZee.variable} text-label tracking-wide antialiased`}
      >
        <ErrorBoundary>
          <Auth0Provider>
            <Providers>{children}</Providers>
          </Auth0Provider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
