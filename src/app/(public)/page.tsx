'use client'

import { Particles } from '@ui/shadcn-io/particles'
import { Logo } from '@core/ui'
import { Badge, Button } from '@ui/primitives'
import { CircleQuestionMark } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden rounded-lg border bg-[#0c0e21]">
      <header className="header-height w-full px-4 opacity-95 md:px-6">
        <div className="container-xl flex h-full items-center justify-between">
          <div className="group flex cursor-pointer items-center gap-2 text-white">
            <Logo.Symbol className="size-5 transition-transform duration-500 group-hover:rotate-90" />
            <span className="pt-0.25 text-xl">Reglo</span>
          </div>
          <Link
            href="/console"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = '/console'
            }}
          >
            <Button
              variant="outline"
              className="group hover: border-2 text-white"
            >
              <Logo.Symbol className="size-3.5 transition-transform duration-500 group-hover:rotate-90" />
              <span className="pt-0.5">Área logada</span>
            </Button>
          </Link>
        </div>
      </header>
      <div className="container-sm flex h-full flex-col items-center justify-center gap-9 md:-mt-(--header-height)">
        <Badge
          variant="outline"
          className="h-8 border-2 px-5 pt-1 text-white opacity-85"
        >
          Potencialize
        </Badge>
        <span className="pointer-events-none bg-linear-to-b from-gray-100 to-gray-300 bg-clip-text text-center text-3xl leading-14 font-semibold whitespace-pre-wrap text-transparent sm:text-4xl md:text-5xl">
          Gerencie, versione e valide <br /> as regras de negócio do seu time
          com eficiência!
        </span>
        <p className="text-md pointer-events-none bg-linear-to-r from-gray-300 to-gray-300 bg-clip-text text-center leading-7 font-semibold whitespace-pre-wrap text-transparent sm:text-lg md:text-xl">
          Tenha uma única fonte da verdade para guiar o seu time com clareza,
          consistência e total controle sobre cada decisão.
        </p>
        <div className="flex flex-col gap-3 pt-6 sm:flex-row md:gap-6">
          <Link
            href="/console"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = '/console'
            }}
          >
            <Button
              size="lg"
              className="group transition-base bg-white text-slate-900 hover:bg-white"
            >
              <Logo.Symbol className="size-3.5 transition-transform duration-500 group-hover:rotate-90" />
              <span className="pt-0.5">Começar agora!</span>
            </Button>
          </Link>
          <Link href="/">
            <Button
              size="lg"
              className="group transition-base bg-white text-slate-900 hover:bg-white"
            >
              <CircleQuestionMark strokeWidth={1.5} className="size-4" />
              <span className="pt-0.5">Como funciona?</span>
            </Button>
          </Link>
        </div>
      </div>

      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={90}
        color="#ffffff"
        refresh
      />
    </div>
  )

  return (
    <div className="app-container bg-constellation-svg">
      <header className="header-height bg-background/90 border-border/70 w-full border-b px-4 md:px-6">
        <div className="container-xl flex h-full items-center justify-between">
          <div className="group flex cursor-pointer items-center gap-2">
            <Logo.Symbol className="size-5 transition-transform duration-500 group-hover:rotate-90" />
            <span className="pt-0.25 text-xl">Reglo</span>
          </div>
          <Link
            href="/console"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = '/console'
            }}
          >
            <Button className="group">
              <Logo.Symbol className="size-3.5 transition-transform duration-500 group-hover:rotate-90" />
              <span className="pt-0.5">Área logada</span>
            </Button>
          </Link>
        </div>
      </header>
      <div className="page-without-header text- flex w-full flex-col items-center justify-center">
        <div className="container-sm flex flex-col items-center justify-center gap-8 md:-mt-(--header-height)">
          <h1 className="text-gradient text-center text-3xl font-bold sm:text-4xl md:text-5xl">
            Gerencie, versione e valide <br /> as regras de negócio do seu time
            com eficiência
          </h1>
          <p className="text-support text-md text-center sm:text-lg md:text-xl">
            Tenha uma única fonte da verdade para guiar o seu time com clareza,
            consistência e total controle sobre cada decisão.
          </p>
          <div className="flex flex-col gap-3 pt-6 sm:flex-row md:gap-6">
            <Link
              href="/console"
              onClick={(e) => {
                e.preventDefault()
                window.location.href = '/console'
              }}
            >
              <Button size="lg" className="group">
                <Logo.Symbol className="size-3.5 transition-transform duration-500 group-hover:rotate-90" />
                <span className="pt-0.5">Começar agora!</span>
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="group">
                <CircleQuestionMark strokeWidth={1.5} className="size-4" />
                <span className="pt-0.5">Como funciona?</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
