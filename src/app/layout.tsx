import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { ABeeZee } from 'next/font/google';
import '@/modules/common/styles/globals.css';

const abeeZee = ABeeZee({
  variable: '--font-abee-zee',
  weight: '400',
  subsets: ['latin'],
});

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
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='pt-BR'>
      <body className={`${abeeZee.variable} antialiased`}>{children}</body>
    </html>
  );
}
