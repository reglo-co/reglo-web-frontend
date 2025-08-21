/**
 * v0 by Vercel.
 * @see https://v0.app/t/FhHJTdJDd5T
 * Documentation: https://v0.app/docs#integrating-generated-code-into-your-nextjs-app
 */
import { BlurAnimation } from '@/components/ui/animation/blur-animation'
import Link from 'next/link'

export default function Component() {
  return (
    <div className="relative flex min-h-screen items-center overflow-hidden">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="pb-4 text-4xl font-bold tracking-tighter text-zinc-700 sm:text-5xl dark:text-zinc-50">
            Acesso negado!
          </h1>
          <p className="text-gray-500">
            Parece que você não tem acesso a este portal mágico
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Voltar para uma área segura
        </Link>
      </div>
      <BlurAnimation />
    </div>
  )
}
