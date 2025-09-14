import { PropsWithChildren } from 'react'
import { FolderOpenDot, FolderPlus, PackagePlus, Trash } from 'lucide-react'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'

export function ContextMenuBarRule({ children }: PropsWithChildren) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger asChild>{children}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <FolderOpenDot />
            <span>Abrir</span>
          </MenubarItem>
          <MenubarItem>
            <PackagePlus />
            <span>Criar regra acima</span>
          </MenubarItem>
          <MenubarItem>
            <FolderPlus />
            <span>Criar grupo acima</span>
          </MenubarItem>
          <MenubarItem variant="destructive">
            <Trash />
            <span>Deletar regra</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
