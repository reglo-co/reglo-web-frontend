import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import type { WorkspaceMinimal } from '../typings'

type WorkspaceBadgeListProps = {
  workspaces: WorkspaceMinimal[]
}

export function WorkspaceBadgeList({ workspaces }: WorkspaceBadgeListProps) {
  return (
    <div className="flex gap-1">
      {workspaces.map((workspace) => (
        <Badge variant="outline" key={workspace.slug} asChild>
          <Link href={`/${workspace.slug}`}>{workspace.name}</Link>
        </Badge>
      ))}

      {workspaces.length === 0 && (
        <span>Você não está vinculado a nenhum projeto</span>
      )}
    </div>
  )
}
