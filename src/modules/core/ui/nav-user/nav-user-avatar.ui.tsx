import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@ui/primitives'
import { useUser } from '@auth0/nextjs-auth0'

export function NavUserAvatar() {
  const { user } = useUser()
  const name = user?.name || ''
  const avatar = user?.picture || ''
  const nameInitial = name.slice(0, 2).toUpperCase()

  return (
    <Avatar className="h-8 w-8 rounded-full">
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback className="rounded-full">{nameInitial}</AvatarFallback>
    </Avatar>
  )
}
