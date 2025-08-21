import type { WorkspaceMinimal } from '../typings'
import { Button } from '@/components/ui/button'
import { LogOut, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/modules/user/helpers'
import { CardImageLink } from '@/modules/common/components'
import Link from 'next/link'

type WorkspaceCardListProps = {
  workspaces: WorkspaceMinimal[]
}

export function WorkspaceCardList({ workspaces }: WorkspaceCardListProps) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-4">
        {workspaces.map((workspace) => (
          <div key={workspace.slug} className="relative">
            <CardImageLink
              href={`/${workspace.slug}`}
              name={workspace.name}
              image={
                <Avatar>
                  <AvatarImage src={workspace.avatar} />
                  <AvatarFallback>{getInitials(workspace.name)}</AvatarFallback>
                </Avatar>
              }
            />
            <Button
              key={workspace.slug}
              variant="ghost"
              size="sm"
              className="absolute top-6 right-3 w-fit text-red-600 hover:bg-transparent hover:text-red-500"
              asChild
            >
              <Link
                href={`/${workspace.slug}/sair`}
                className="flex items-center gap-1"
              >
                <LogOut className="size-4" />
                Sair
              </Link>
            </Button>
          </div>
        ))}
        <CardImageLink
          name="Criar novo projeto"
          href="/criar-projeto"
          key="criar-projeto"
          image={<Plus className="size-4" />}
        />
      </div>

      {workspaces.length === 0 && (
        <div className="flex flex-col gap-2">
          <span>Você não possui nenhum projeto</span>
          <Button className="mt-1 w-fit">
            <Plus className="size-3.5" />
            <span>Criar projeto</span>
          </Button>
        </div>
      )}
    </div>
  )
}
