'use client'

import { useFakeLoading } from '@core/hooks/use-fake-loading.hook'
import { Logo } from '@core/ui'
import { useInviteMembers } from '@invite/hooks'
import { useOrganizationBySlug } from '@organizations/hooks/use-organization-by-slug.hook'
import { PLANS } from '@plans/config/plans.config'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@ui/primitives/button'
import { COLUMNS_LIST_MEMBERS } from '@users/const'
import { OrganizationMember } from '@users/types'
import { Loader2, Plus, RefreshCcw, RotateCcw, Send, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { z } from 'zod'

import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Badge,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/primitives'

type UserTableListProps = {
  list: OrganizationMember[]
  isFetching: boolean
  organization: string
}

export function UserTableList({
  list,
  isFetching,
  organization,
}: UserTableListProps) {
  const isFetchingDelayed = useFakeLoading(isFetching)
  const queryClient = useQueryClient()
  const { organization: org } = useOrganizationBySlug(organization)
  const invite = useInviteMembers(organization)
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'name',
      desc: false,
    },
  ])
  const [showInvite, setShowInvite] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [emails, setEmails] = useState<string[]>([])

  const table = useReactTable({
    data: list,
    columns: COLUMNS_LIST_MEMBERS(organization),
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  function refetch() {
    queryClient.invalidateQueries({
      queryKey: ['list-organization-members', organization],
    })
  }

  const maxCollaborators = useMemo(() => {
    if (!org) return 0
    const plan = PLANS.find((p) => p.id === org.plan)
    return plan?.features.maxCollaborators ?? 0
  }, [org])

  const activeCount = useMemo(
    () => list.filter((m) => m.status !== 'pending').length,
    [list]
  )

  const EMAIL_SEPARATOR = ','
  const SUBMIT_KEYS = ['Enter', ',']

  const availableInviteSlots = Math.max(maxCollaborators - activeCount, 0)
  const canAddMoreEmails = emails.length < availableInviteSlots

  function parseEmailsFromInput(rawInput: string): string[] {
    return rawInput
      .split(EMAIL_SEPARATOR)
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  }

  function isValidEmail(email: string): boolean {
    const emailSchema = z.string().email()
    return emailSchema.safeParse(email).success
  }

  function isEmailAlreadyAdded(
    email: string,
    existingEmails: string[],
    newEmails: string[]
  ): boolean {
    return existingEmails.includes(email) || newEmails.includes(email)
  }

  function hasReachedInviteLimit(
    currentEmailCount: number,
    newEmailCount: number
  ): boolean {
    return currentEmailCount + newEmailCount >= availableInviteSlots
  }

  function extractValidUniqueEmails(rawInput: string): string[] {
    const parsedEmails = parseEmailsFromInput(rawInput)
    const validUniqueEmails: string[] = []

    for (const email of parsedEmails) {
      if (hasReachedInviteLimit(emails.length, validUniqueEmails.length)) {
        break
      }

      if (
        isValidEmail(email) &&
        !isEmailAlreadyAdded(email, emails, validUniqueEmails)
      ) {
        validUniqueEmails.push(email)
      }
    }

    return validUniqueEmails
  }

  function addEmailsFromInput(rawInput: string) {
    const validEmails = extractValidUniqueEmails(rawInput)

    if (validEmails.length > 0) {
      setEmails((previousEmails) =>
        [...previousEmails, ...validEmails].slice(0, availableInviteSlots)
      )
    }
  }

  function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const currentValue = event.target.value

    if (currentValue.includes(EMAIL_SEPARATOR)) {
      addEmailsFromInput(currentValue)
      const lastSegment = currentValue.split(EMAIL_SEPARATOR).at(-1) ?? ''
      setInputValue(canAddMoreEmails ? lastSegment : '')
    } else {
      setInputValue(currentValue)
    }
  }

  function handleTextareaKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    const shouldSubmitEmail = SUBMIT_KEYS.includes(event.key) && inputValue

    if (shouldSubmitEmail) {
      event.preventDefault()
      addEmailsFromInput(inputValue + EMAIL_SEPARATOR)
      setInputValue('')
    }
  }

  function removeEmailFromList(emailToRemove: string) {
    setEmails((previousEmails) =>
      previousEmails.filter((email) => email !== emailToRemove)
    )
  }

  function onSubmitInvites() {
    if (!emails.length) return
    invite.mutate(emails, {
      onSuccess: () => {
        setEmails([])
        setInputValue('')
        setShowInvite(false)
      },
    })
  }

  return (
    <div className="container-lg flex flex-col gap-12">
      <div className="flex w-full items-center justify-between">
        <h2 className="type-h4 pl-4 font-bold tracking-wide">Pessoas</h2>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" onClick={refetch}>
            {isFetchingDelayed ? (
              <RefreshCcw className="size-3.5 animate-spin" />
            ) : (
              <RotateCcw className="size-3.5" />
            )}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowInvite((v) => !v)}
          >
            <Plus className="size-3.5" />
            <span className="pt-0.5 text-sm font-medium">Convidar</span>
          </Button>
        </div>
      </div>
      <Dialog open={showInvite} onOpenChange={setShowInvite}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Logo.Symbol className="size-5" />
              <span className="type-h4! pt-0.25 leading-none">
                Novo usuário
              </span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div className="flex w-full flex-col gap-3">
              <div className="text-muted-foreground text-sm">
                Convite ({emails.length}/{availableInviteSlots})
              </div>
              <div className="relative">
                <textarea
                  value={inputValue}
                  onChange={handleTextareaChange}
                  onKeyDown={handleTextareaKeyDown}
                  placeholder={
                    canAddMoreEmails || inputValue
                      ? `Digite o e-mail do usuário...`
                      : 'Limite de convites atingido'
                  }
                  disabled={!canAddMoreEmails && !inputValue}
                  className="focus:ring-ring min-h-24 w-full resize-none rounded-md border p-3 outline-none focus:ring-2"
                />
                {inputValue.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="text-support absolute right-2 bottom-4 text-[10px]!"
                  >
                    Aperte Enter
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {emails.map((email) => (
                  <span key={email} className="inline-flex items-center gap-2">
                    <Badge variant="secondary" className="gap-2 pl-3">
                      {email}
                      <button
                        aria-label="remove"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => removeEmailFromList(email)}
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-10">
                <span className="text-muted-foreground text-sm">
                  Convites disponíveis: {availableInviteSlots}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setInputValue('')
                      setEmails([])
                      setShowInvite(false)
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={onSubmitInvites}
                    disabled={!emails.length || invite.isPending}
                  >
                    {invite.isPending ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Send className="size-3.5" />
                    )}
                    Enviar convites
                  </Button>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <Table
        data-fetching={isFetchingDelayed}
        className="transition-base-medium data-[fetching=true]:pointer-events-none data-[fetching=true]:opacity-25"
      >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow hover={false} key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow hover={false}>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="text-muted-foreground py-10 text-center"
              >
                Nenhum usuário encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
