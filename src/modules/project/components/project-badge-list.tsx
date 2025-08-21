import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import type { ProjectMinimal } from '../typings'

type ProjectBadgeListProps = {
  projects: ProjectMinimal[]
}

export function ProjectBadgeList({ projects }: ProjectBadgeListProps) {
  return (
    <div className="flex gap-1">
      {projects.map((project) => (
        <Badge variant="outline" key={project.slug} asChild>
          <Link href={`/${project.slug}`}>{project.name}</Link>
        </Badge>
      ))}

      {projects.length === 0 && (
        <span>Você não está vinculado a nenhum projeto</span>
      )}
    </div>
  )
}
