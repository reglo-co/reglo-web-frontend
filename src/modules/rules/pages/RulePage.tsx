import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import {
  Box,
  Boxes,
  Dot,
  FolderPlus,
  MessageCircle,
  MoreHorizontal,
  PackagePlus,
} from 'lucide-react'

type RuleProps = {
  title: string
  description: string
  id: string
  isLast: boolean
  comments: {
    quantity: number
  }
}

function Rule({ title, description, id, isLast, comments }: RuleProps) {
  return (
    <div data-component="rule" className="flex w-full items-stretch gap-4">
      <div className="flex w-6 flex-col items-center">
        <div className="bg-ndl-primary/60 mt-[3px] flex shrink-0 items-center justify-center rounded-full">
          <Dot className="size-5 text-white" />
        </div>
        <span className="h-full w-[3px] bg-zinc-200" />
        {isLast && (
          <span className="size-3 min-h-3 min-w-3 rounded-full bg-zinc-200" />
        )}
      </div>
      <div
        data-is-last={isLast}
        className="flex w-full flex-col gap-2 data-[is-last=false]:pb-8"
      >
        <div className="flex w-full flex-col gap-4 rounded-md border-2 border-l-4 border-zinc-200 border-l-blue-700/60 px-4 py-3 shadow-xs">
          <div className="flex w-full gap-3">
            <span className="text-xss flex items-center justify-center rounded-md border px-2 text-zinc-400">
              #{id}
            </span>
            <div className="flex items-center gap-2">
              <Box className="size-3.5 text-zinc-400" />
              <h3 className="text-base font-bold text-zinc-700">{title}</h3>
            </div>
          </div>
          <span className="flex w-full flex-1 py-2 pl-1 text-base font-normal text-gray-700">
            {description}
          </span>
          <div className="flex items-center gap-1 border-t border-zinc-200 pt-2 text-zinc-400">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
            >
              <MessageCircle className="relative -top-[0.5px] size-4" />
              <span className="font-semibold">{comments.quantity}</span>
            </Button>
          </div>
        </div>

        {isLast && (
          <div className="flex gap-2 pt-4">
            <Button variant="outline" size="sm">
              <PackagePlus />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export function RulePage() {
  return (
    <div className="flex flex-1 flex-col">
      <section
        data-name="title"
        className="flex shrink-0 items-center gap-4 border-b bg-white px-4 py-5"
      >
        <div className="flex w-full flex-1 flex-col gap-1 pl-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Página de Produto</h1>
              <span className="text-xss mt-1 flex h-6 w-fit items-center justify-center rounded-md border px-2 text-zinc-400">
                #e62n48f
              </span>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal />
            </Button>
          </div>
          <div className="mt-2 flex max-w-xl">
            <span className="text-sm text-zinc-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium, quas voluptate laboriosam neque ipsum quisquam quis
              placeat officia iste corrupti! Explicabo qui autem quae deserunt
              voluptatem ducimus ipsum amet nobis!
            </span>
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
                  <span className="text-xs">2 grupos</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Box className="size-3 text-zinc-400" />
                  <span className="text-xs">6 regras</span>
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
      <div className="bg-muted flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardDescription className="flex w-full flex-col gap-6 px-6">
            <div className="flex gap-3 pl-10">
              <Button variant="outline" size="sm">
                <Boxes strokeWidth={1} />
                <span>Descrição do produto</span>
              </Button>
              <Button variant="outline" size="sm">
                <Boxes strokeWidth={1} />
                <span>Compre junto</span>
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FolderPlus />
                </Button>
              </div>
            </div>

            <div className="flex w-full flex-col">
              <Rule
                title="Usuário logado"
                description="Usuário logado"
                id="e62n48f"
                isLast={false}
                comments={{ quantity: 1 }}
              />
              <Rule
                title="Usuário logado"
                description="Usuário logado"
                id="e62n48f"
                isLast={true}
                comments={{ quantity: 1 }}
              />
            </div>
          </CardDescription>
        </Card>
      </div>
    </div>
  )
}
