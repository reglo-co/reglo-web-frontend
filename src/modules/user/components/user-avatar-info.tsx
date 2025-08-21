import { ChevronsUpDown } from 'lucide-react'
import type { UserMinimalProps } from '@/modules/user/typings'
import { UserAvatar } from './user-avatar'

type UserAvatarProps = UserMinimalProps & {
  showChevronsUpDown?: boolean
}

export function UserAvatarInfo({
  user,
  showChevronsUpDown = true,
}: UserAvatarProps) {
  return (
    <div className="flex w-full items-center gap-3 px-1 py-1.5 text-left text-sm">
      <UserAvatar user={user} />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
      {showChevronsUpDown && <ChevronsUpDown className="ml-auto size-4" />}
    </div>
  )
}
