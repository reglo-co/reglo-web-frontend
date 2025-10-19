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
import { ChangeEvent, useState } from 'react'

function EmailIcon() {
  return <Mail strokeWidth={1.25} className="text-rg-gray-5 size-3.5" />
}

export function CollaboratorsPermissions() {
  const [email, setEmail] = useState('')

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

    setEmail(truncatedValue)
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
        value={email}
        onChange={handleEmailChange}
        maxLength={320}
      />
      <Select defaultValue="viewer">
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
