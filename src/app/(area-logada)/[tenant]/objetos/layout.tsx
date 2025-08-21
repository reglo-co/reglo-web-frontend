import { ElementosProvider } from '@/lib/elementos-context'
import type { PropsWithChildren } from 'react'

export default function ElementosLayout({ children }: PropsWithChildren) {
  return <ElementosProvider>{children}</ElementosProvider>
}
