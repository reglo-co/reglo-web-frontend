import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { UserMinimalProps } from '@/modules/user/typings'
import { getInitials } from '@/modules/user/helpers'
import type { ClassNameProps } from '@/modules/common/typings'
import { cn } from '@/lib/utils'

type UserAvatarProps = UserMinimalProps & ClassNameProps

export function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <Avatar className={cn('size-8 rounded-lg', className)}>
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback className="rounded-lg">
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  )
}
