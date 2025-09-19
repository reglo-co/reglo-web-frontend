'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ContextMenuBarRule, ContextMenuRule } from '../components'
import SortableList from '@/modules/common/components/drag-and-drop/sortable'
import { GripAndHover } from '@/modules/common/components/drag-and-drop'

import {
  Box,
  Boxes,
  FolderPlus,
  MessageCircle,
  MoreHorizontal,
  PackagePlus,
} from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'

type RulePrimitive = {
  type: 'rule' | 'folder'
  title: string
  id: string
}

type RuleProps = RulePrimitive & {
  description: string
  isFirst?: boolean
}

function RuleWrapper({
  children,
  isFirst = false,
}: {
  children: React.ReactNode
  isFirst?: boolean
}) {
  return (
    <div
      data-has-border={!isFirst}
      className="flex w-full cursor-pointer items-stretch gap-4 border-zinc-50 hover:bg-zinc-50 data-[has-border=true]:border-t"
    >
      {children}
    </div>
  )
}

function Rule({ title, description, id, isFirst = false }: RuleProps) {
  const solidId = id.replace('#', '')

  return (
    <ContextMenuRule>
      <Link href={`/rules/${solidId}`} data-component="rule" className="w-full">
        <RuleWrapper isFirst={isFirst}>
          <div className="flex w-full flex-col justify-between gap-2 px-4 py-4 md:flex-row">
            <div className="flex flex-col gap-3 md:flex-row">
              <div>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-xss flex h-6 w-fit cursor-default items-center justify-center rounded-md border px-2 text-zinc-400 hover:bg-black/5">
                      {id}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Copiar</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-zinc-700">{title}</h3>
                <span className="flex-1text-base flex w-full font-normal text-zinc-500">
                  {description}
                </span>
              </div>
            </div>

            <div className="flex">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 hover:bg-black/5"
              >
                <MessageCircle className="text-zinc-500" />
                <span className="text-xs text-zinc-500">2</span>
              </Button>
              <ContextMenuBarRule>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-black/5"
                  asChild
                >
                  <span>
                    <MoreHorizontal />
                  </span>
                </Button>
              </ContextMenuBarRule>
            </div>
          </div>
        </RuleWrapper>
      </Link>
    </ContextMenuRule>
  )
}

function FolderRule({
  title,
  id,
  isFirst = false,
}: RulePrimitive & { isFirst?: boolean }) {
  const solidId = id.replace('#', '')

  return (
    <ContextMenuRule>
      <RuleWrapper isFirst={isFirst}>
        <div className="flex w-full justify-between gap-2 px-4 py-4">
          <div className="flex w-full items-center gap-2">
            <span className="text-xss flex h-6 w-fit items-center justify-center rounded-md border px-2 text-zinc-400">
              {id}
            </span>
            <Link href={`/rules/${solidId}`} className="flex flex-col gap-2">
              <Button variant="outline" size="sm">
                <Boxes strokeWidth={1} />
                <span>{title}</span>
              </Button>
            </Link>
          </div>
          <div className="flex">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 hover:bg-black/5"
            >
              <MessageCircle className="text-zinc-500" />
              <span className="text-xs text-zinc-500">2</span>
            </Button>
            <ContextMenuBarRule>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-black/5"
                asChild
              >
                <span>
                  <MoreHorizontal />
                </span>
              </Button>
            </ContextMenuBarRule>
          </div>
        </div>
      </RuleWrapper>
    </ContextMenuRule>
  )
}

function RuleOrFolder({
  item,
  index,
}: {
  item: RuleOrFolderRuleProps
  index: number
}) {
  return item.type === 'rule' ? (
    <Rule {...item} isFirst={index === 0} />
  ) : (
    <FolderRule {...item} isFirst={index === 0} />
  )
}

type RuleOrFolderRuleProps =
  | (RulePrimitive & { type: 'rule' } & { description: string; index: number })
  | ((RulePrimitive & { type: 'folder' }) & { index: number })

export function RulePage() {
  const [items, setItems] = useState<RuleOrFolderRuleProps[]>([
    {
      index: 0,
      type: 'rule',
      title: 'Login obrigatório para dashboard',
      id: '#e62n48f',
      description:
        'O usuário deve estar logado para acessar o dashboard principal do sistema.',
    },

    {
      index: 1,
      type: 'folder',
      title: 'Autenticação',
      id: '#ea2nf8f',
    },

    {
      index: 2,
      type: 'rule',
      title: 'Carrinho de compras',
      id: '#e72nf8f',
      description:
        'O usuário deve ter um carrinho de compras para adicionar produtos.',
    },
    {
      index: 3,
      type: 'rule',
      title: 'Timeout de sessão',
      id: '#e82nf8f',
      description: 'A sessão do usuário expira após 30 minutos de inatividade.',
    },

    {
      index: 4,
      type: 'folder',
      title: 'Autenticação',
      id: '#e92nf8f',
    },
    {
      index: 5,
      type: 'rule',
      title: 'Timeout de sessão',
      id: '#e02nf8f',
      description: 'A sessão do usuário expira após 30 minutos de inatividade.',
    },
    {
      index: 6,
      type: 'rule',
      title: 'Timeout de sessão',
      id: '#e12nf8f',
      description: 'A sessão do usuário expira após 30 minutos de inatividade.',
    },
    {
      index: 7,
      type: 'rule',
      title: 'Timeout de sessão',
      id: '#e22nf8f',
      description: 'A sessão do usuário expira após 30 minutos de inatividade.',
    },
  ])

  return (
    <div className="flex flex-1 flex-col">
      <section
        data-name="title"
        className="sticky top-16 z-10 flex shrink-0 items-center gap-4 border-b bg-white px-4 py-5"
      >
        <div className="flex w-full flex-1 flex-col gap-1 pl-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold">Página de Produto</h1>
              <span className="text-xss mt-1 flex h-6 w-fit items-center justify-center rounded-md border px-2 text-zinc-400">
                #e62n48f
              </span>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal />
            </Button>
          </div>

          <div className="flex w-full items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-1 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                <Avatar className="size-5">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback className="size-5">CN</AvatarFallback>
                </Avatar>
                <Avatar className="size-5">
                  <AvatarImage
                    src="https://github.com/leerob.png"
                    alt="@leerob"
                  />
                  <AvatarFallback className="size-5">LR</AvatarFallback>
                </Avatar>
                <Avatar className="size-5">
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </div>

              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />

              <div className="flex gap-3">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Boxes strokeWidth={1.5} className="size-3.5 text-zinc-400" />
                  <span className="flex gap-1 text-xs">
                    <span>2</span>
                    <span className="hidden sm:block">grupos</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Box className="size-3 text-zinc-400" />
                  <span className="flex gap-1 text-xs">
                    <span>6</span>
                    <span className="hidden sm:block">regras</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FolderPlus />
              </Button>
              <Button variant="outline" size="sm">
                <PackagePlus />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-1 flex-col gap-4 bg-white md:p-4">
        <div className="flex w-full flex-col">
          <SortableList<RuleOrFolderRuleProps>
            items={items}
            onChange={setItems}
            renderItem={({
              item,
              isDragging,
              handleProps,
              setNodeRef,
              style,
            }) => (
              <div ref={setNodeRef} style={style}>
                <GripAndHover isDragging={isDragging} handleProps={handleProps}>
                  <RuleOrFolder item={item} index={item.index} />
                </GripAndHover>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  )
}
