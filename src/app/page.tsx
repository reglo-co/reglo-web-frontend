'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroTyped } from '@/components/ui/hero/hero-typed'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Footer } from '@/components/footer'
import { PricingSection } from '@/components/ui/pricing'
import { useRef } from 'react'
import { useSticky } from '@/hooks/use-sticky'
import { NavigationHome } from '@/components/ui/navigation/navigation-home'
import { BlurAnimation } from '@/components/ui/animation/blur-animation'

export default function Home() {
  const sentryRef = useRef<HTMLDivElement>(null)
  const sticky = useSticky(sentryRef)

  return (
    <div>
      <div className="relative gap-16">
        <main className="flex flex-col">
          <div ref={sentryRef} className="h-px" />
          <header
            data-sticky={sticky}
            className="sticky top-0 z-50 flex h-16 w-full justify-between px-6 data-[sticky=true]:bg-white/80 data-[sticky=true]:backdrop-blur supports-[backdrop-filter]:data-[sticky=true]:bg-white/60"
          >
            <div className="flex w-full items-center justify-between">
              <Link href="/">
                <Image
                  src="/brand/nodal-icon-letter-black.svg"
                  alt="Reglo"
                  width={80}
                  height={0}
                />
              </Link>
            </div>

            <NavigationHome />
            <div className="flex w-full items-center justify-end gap-4">
              <Button variant="outline" size="sm">
                <Link href="/entrar">Entrar</Link>
              </Button>
              <Button variant="default" size="sm">
                <Link href="/criar-conta" className="flex items-center gap-2">
                  Potencializar meu time
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </header>

          <div className="flex h-[calc(100vh-104px)] flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center gap-0 text-6xl font-semibold">
              <span className="flex w-full flex-col text-center">
                Potencialize seu time com
              </span>
              <span>
                <HeroTyped
                  words={[
                    'regras de negócio claras',
                    'refinamentos objetivos',
                    'histórico claro e confiável',
                    'decisões com contexto',
                  ]}
                />
              </span>
              <span className="text-muted-foreground mt-6 max-w-4xl text-center text-2xl font-normal">
                Organize as regras de negócio do seu projeto, refine ideias e
                dúvidas, versione mudanças, mantenha uma visão única do projeto
                e acelere suas entregas.
              </span>
            </div>
            <div className="flex w-full max-w-md justify-center">
              <Button className="w-full text-base" size="lg" asChild>
                <Link href="/signup" className="flex items-center gap-3">
                  Quero potencializar meu time
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </main>

        <BlurAnimation />
      </div>
      <PricingSection />
      <Footer />
    </div>
  )
}
