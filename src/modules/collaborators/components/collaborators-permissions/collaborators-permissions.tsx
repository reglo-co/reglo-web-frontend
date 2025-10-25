import { useWorkspaceModalStore } from '@/modules/workspaces/store'
import { AvatarIcon } from '@common/components'
import { Mail, UserPen, UserSearch, UserStar } from 'lucide-react'

import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@common/components/ui'
import { ChangeEvent } from 'react'

function EmailIcon() {
  return <Mail strokeWidth={1.25} className="text-rg-gray-5 size-3.5" />
}

interface CollaboratorsPermissionsProps {
  index: number
}

export function CollaboratorsPermissions({
  index,
}: CollaboratorsPermissionsProps) {
  const { collaborators, updateCollaborator } = useWorkspaceModalStore()
  const collaborator = collaborators[index]

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value

    // Filtra caracteres válidos para email (letras, números, @, ., -, _)
    const validEmailChars = /^[a-zA-Z0-9@._-]*$/

    // Se contém caracteres inválidos, não atualiza o estado
    if (!validEmailChars.test(inputValue)) {
      return
    }

    // Limita o tamanho do email (RFC 5321 recomenda máximo 320 caracteres)
    const maxLength = 320
    const truncatedValue = inputValue.slice(0, maxLength)

    updateCollaborator(index, { email: truncatedValue })
  }

  function handlePermissionChange(permission: 'admin' | 'editor' | 'viewer') {
    updateCollaborator(index, { permission })
  }

  return (
    <div className="xs:flex-row flex flex-col items-center justify-center gap-3 sm:justify-start">
      <AvatarIcon
        className="size-9 cursor-default"
        src="https://github.com/shadcn.pngs"
      />
      <Input
        type="email"
        iconLeft={<EmailIcon />}
        placeholder="E-mail do colaborador..."
        className="h-9"
        value={collaborator?.email || ''}
        onChange={handleEmailChange}
        maxLength={320}
      />
      <Select
        value={collaborator?.permission || 'viewer'}
        onValueChange={handlePermissionChange}
      >
        <SelectTrigger className="xs:w-[180px] w-full">
          <SelectValue placeholder="Permissões" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value="admin"
            icon={
              <UserStar
                strokeWidth={1.5}
                className="text-rg-primary size-3.5"
              />
            }
          >
            Admin
          </SelectItem>
          <SelectItem
            value="editor"
            icon={
              <UserPen strokeWidth={1.5} className="text-rg-primary size-3.5" />
            }
          >
            Edição
          </SelectItem>
          <SelectItem
            value="viewer"
            icon={
              <UserSearch
                strokeWidth={1.5}
                className="text-rg-primary size-3.5"
              />
            }
          >
            Leitura
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
