'use client'

import { useModal } from '@core/stores/modal.store'
import { Button } from '@ui/primitives'
import { Loader2, Plus, RefreshCcw, RotateCcw } from 'lucide-react'

import { useFakeLoading } from '@core/hooks/use-fake-loading.hook'
import { Logo } from '@core/ui'
import { useListMyPendingInvites, useRespondInvite } from '@invite/hooks'
import { useListMyAvailablesOrganizations } from '@organizations/hooks'
import { ListOrganizationItem } from '@organizations/ui'
import { useQueryClient } from '@tanstack/react-query'
import { Check, X } from 'lucide-react'

export function ListOrganizations() {
  const { list, isFetching, isLoading } = useListMyAvailablesOrganizations()
  const invites = useListMyPendingInvites()
  const { accept, reject } = useRespondInvite()
  const { open } = useModal()
  const queryClient = useQueryClient()
  const isFetchingDelayed = useFakeLoading(isFetching || isLoading)
  const isAcceptingDelayed = useFakeLoading(accept.isPending)
  const isRejectingDelayed = useFakeLoading(reject.isPending)

  function refetch() {
    queryClient.invalidateQueries({
      queryKey: ['list-my-organizations-availables'],
    })
    queryClient.invalidateQueries({
      queryKey: ['list-my-pending-invites'],
    })
  }

  return (
    <div className="container-xs flex w-full flex-col gap-6 pt-32">
      <div className="flex items-center justify-between">
        <h1 className="type-h3">Organizações</h1>

        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" onClick={refetch}>
            {isFetchingDelayed ? (
              <RefreshCcw className="size-3.5 animate-spin" />
            ) : (
              <RotateCcw className="size-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => open('create-organization')}
          >
            <Plus className="size-5" />
          </Button>
        </div>
      </div>
      <div className="flex max-h-[calc(100vh-200px)] flex-col gap-6 overflow-auto pr-2">
        {invites.total > 0 && (
          <div
            data-fetching={isFetchingDelayed}
            className="transition-base-medium flex flex-col gap-3 rounded-lg border p-4 data-[fetching=true]:opacity-50"
          >
            <h2 className="text-sm font-medium">Convites pendentes</h2>
            <div className="flex flex-col gap-2">
              {invites.list.map((invite) => (
                <div
                  key={invite.id}
                  className="bg-muted/30 flex items-center justify-between rounded-md border px-3 py-2"
                >
                  <div className="flex flex-row items-center gap-2">
                    <Logo.Symbol className="size-4" />
                    <span className="pt-0.25 text-sm font-medium">
                      {invite.orgName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => reject.mutate(invite.id)}
                      disabled={isRejectingDelayed || isAcceptingDelayed}
                    >
                      {isRejectingDelayed ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <X className="size-3.5" />
                      )}
                      Rejeitar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => accept.mutate(invite.id)}
                      disabled={isAcceptingDelayed || isRejectingDelayed}
                    >
                      {isAcceptingDelayed ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Check className="size-3.5" />
                      )}
                      Aceitar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          data-fetching={isFetchingDelayed}
          className="transition-base-medium flex flex-col gap-3 data-[fetching=true]:opacity-50"
        >
          {list.map((organization) => (
            <ListOrganizationItem
              key={organization.id}
              name={organization.name}
              slug={organization.slug}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
