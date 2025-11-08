import { NavUserAvatar } from '@core/ui'
import { useUser } from '@auth0/nextjs-auth0'

export function NavUserHeader() {
  const { user } = useUser()
  const name = user?.name || ''
  const email = user?.email || ''

  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <NavUserAvatar />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{name}</span>
        <span className="truncate text-xs">{email}</span>
      </div>
    </div>
  )
}
