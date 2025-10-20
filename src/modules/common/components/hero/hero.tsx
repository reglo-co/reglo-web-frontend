import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { Logo } from '@common/components'
import { Badge } from '@common/components/ui/badge'
import { Button } from '@common/components/ui/button'
import Image from 'next/image'

interface HeroProps {
  badge?: string
  heading: string
  description: string
  buttons?: {
    primary?: {
      text: string
      url: string
    }
    secondary?: {
      text: string
      url: string
    }
  }
  image: {
    src: string
    alt: string
  }
}

export function Hero({
  badge = '✨ Your Website Builder',
  heading = 'Blocks Built With Shadcn & Tailwind',
  description = 'Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
  buttons = {
    primary: {
      text: 'Discover all components',
      url: 'https://www.shadcnblocks.com',
    },
    secondary: {
      text: 'View on GitHub',
      url: 'https://www.shadcnblocks.com',
    },
  },
  image = {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
    alt: 'Hero section demo image showing interface components',
  },
}: HeroProps) {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-28 py-24">
      <div className="rg-container-medium flex flex-col items-center justify-center text-center">
        {badge && (
          <Badge variant="outline">
            {badge}
            <ArrowUpRight className="ml-2 size-4" />
          </Badge>
        )}
        <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
          {heading}
        </h1>
        <p className="text-muted-foreground mt-4 mb-8 max-w-xl lg:text-xl">
          {description}
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          {buttons.primary && (
            <Button rounded asChild className="w-fit">
              <a href={buttons.primary.url}>{buttons.primary.text}</a>
            </Button>
          )}
          {buttons.secondary && (
            <Button rounded asChild size="lg" className="w-fit">
              <a href={buttons.secondary.url}>
                <Logo.symbol width={12} height={12} className="size-3.5" />
                {buttons.secondary.text}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
      <div className="relative w-full">
        <Image
          src={image.src}
          alt={image.alt}
          className="max-h-160 w-full rounded-t-md border object-cover object-top shadow-2xl grayscale"
          width={2526}
          height={1526}
        />
        <div className="absolute inset-0 z-10 rounded-md bg-gradient-to-t from-white to-transparent" />
      </div>
    </section>
  )
}
