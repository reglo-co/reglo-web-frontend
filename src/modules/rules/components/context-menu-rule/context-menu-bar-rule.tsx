import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { FolderOpenDot, FolderPlus, PackagePlus, Trash } from 'lucide-react'
import { PropsWithChildren } from 'react'

export function ContextMenuBarRule({ children }: PropsWithChildren) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{children}</MenubarTrigger>
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
