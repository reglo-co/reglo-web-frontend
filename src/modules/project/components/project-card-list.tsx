import type { ProjectMinimal } from '../typings'
import { Button } from '@/components/ui/button'
import { LogOut, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/modules/user/helpers'
import { CardImageLink } from '@/modules/common/components'
import Link from 'next/link'

type ProjectCardListProps = {
  projects: ProjectMinimal[]
}

export function ProjectCardList({ projects }: ProjectCardListProps) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.slug} className="relative">
            <CardImageLink
              href={`/${project.slug}`}
              name={project.name}
              image={
                <Avatar>
                  <AvatarImage src={project.avatar} />
                  <AvatarFallback>{getInitials(project.name)}</AvatarFallback>
                </Avatar>
              }
            />
            <Button
              key={project.slug}
              variant="ghost"
              size="sm"
              className="absolute top-6 right-3 w-fit text-red-600 hover:bg-transparent hover:text-red-500"
              asChild
            >
              <Link
                href={`/${project.slug}/sair`}
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

      {projects.length === 0 && (
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
