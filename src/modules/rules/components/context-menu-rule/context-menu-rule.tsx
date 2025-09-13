import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  BookOpen,
  FolderOpenDot,
  FolderPlus,
  PackagePlus,
  Trash,
} from 'lucide-react'
import type { PropsWithChildren } from 'react'

export function ContextMenuRule({ children }: PropsWithChildren) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <FolderOpenDot />
          <span>Abrir</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <PackagePlus />
          <span>Criar regra acima</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <FolderPlus />
          <span>Criar grupo acima</span>
        </ContextMenuItem>
        <ContextMenuItem variant="destructive">
          <Trash />
          <span>Deletar regra</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
