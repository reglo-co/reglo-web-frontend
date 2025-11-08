'use client'

import { Logo } from '@core/ui'
import { Button } from '@ui/primitives/button'
import { ArrowLeft, Coffee, Home } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <div className="container-sm flex h-screen flex-col items-center justify-center gap-16">
      <div className="flex items-center justify-center gap-10">
        <Coffee strokeWidth={1.5} className="size-16" />

        <div className="flex flex-col justify-center gap-4">
          <span className="text-support type-h5">404</span>
          <h1 className="type-h2">Página não encontrada!</h1>
          <span className="type-h6 text-support">
            mas já que você está por aqui, aceita um café?
          </span>
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={router.back}
          className="flex items-center gap-3"
        >
          <ArrowLeft strokeWidth={1.5} className="size-4" />
          <span className="pt-0.5">Última página</span>
        </Button>

        <Button variant="outline" className="flex items-center gap-3">
          <Logo.Symbol className="size-4" />
          <Link href="/console" className="pt-0.5">
            Área logada
          </Link>
        </Button>

        <Button variant="outline" className="flex items-center gap-3">
          <Home strokeWidth={1.5} className="size-4" />
          <Link href="/" className="pt-0.5">
            Página inicial
          </Link>
        </Button>
      </div>
    </div>
  )
}
