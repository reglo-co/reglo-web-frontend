'use client'

import { useFeatureFlag } from '@core/feature-flags'
import { Container } from '@core/ui'
import { Separator } from '@core/ui/primitives'
import { useCurrentOrganization } from '@organizations/hooks/use-current-organization'
import { useListUpdates } from '@updates'
import { CalendarClock, GitBranch, UserMinus, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Page() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const organization = useCurrentOrganization()
  const orgSlug = organization?.slug
  const isEnabled = useFeatureFlag('updates', { orgSlug })
  const { updates, isLoading } = useListUpdates(orgSlug)

  if (!isEnabled) return null
  if (!mounted) {
    return (
      <Container className="pt-10">
        <div className="container-lg flex flex-col gap-12">
          <div className="flex w-full justify-between gap-4">
            <div className="type-h4 font-bold tracking-wide">Atualizações</div>
          </div>
          <div className="text-muted-foreground">Carregando...</div>
        </div>
      </Container>
    )
  }

  function formatDate(value: string) {
    try {
      const d = new Date(value)
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'UTC',
      }).format(d)
    } catch {
      return value
    }
  }

  return (
    <Container className="pt-10">
      <div className="container-lg flex flex-col gap-12">
        <div className="flex w-full justify-between gap-4">
          <div className="type-h4 font-bold tracking-wide">Atualizações</div>
        </div>
        <div className="flex w-full flex-col gap-6">
          {isLoading ? (
            <div className="text-muted-foreground">Carregando...</div>
          ) : updates.length === 0 ? (
            <div className="text-muted-foreground">
              Nenhuma atualização até o momento.
            </div>
          ) : (
            <div className="flex flex-col">
              {updates.map((item, idx) => {
                const isLast = idx === updates.length - 1
                const Icon =
                  item.type === 'organization_created'
                    ? CalendarClock
                    : item.type === 'member_added'
                      ? UserPlus
                      : item.type === 'member_removed'
                        ? UserMinus
                        : GitBranch

                return (
                  <div key={item.id} className="flex flex-col">
                    <div className="flex items-start gap-3 py-4">
                      <div className="rounded-full border p-2">
                        <Icon className="size-4" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="text-sm">{item.message}</div>
                        <div
                          className="text-muted-foreground text-xs"
                          suppressHydrationWarning
                        >
                          {formatDate(item.createdAt)}
                        </div>
                      </div>
                    </div>
                    {!isLast && <Separator />}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
