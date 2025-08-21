'use client'

import { BlurAnimation } from '@/components/ui/animation/blur-animation'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Component() {
  const router = useRouter()

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="animate-bounce text-4xl font-bold tracking-tighter text-zinc-700 sm:text-5xl dark:text-zinc-50">
            404
          </h1>
          <p className="text-gray-500">
            Parece que você encontrou um portal desconhecido
          </p>
        </div>
        <Button onClick={router.back}>Voltar para uma área segura</Button>
      </div>
      <BlurAnimation />
    </div>
  )
}
