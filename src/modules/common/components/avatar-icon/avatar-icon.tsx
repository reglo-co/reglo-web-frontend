import { Avatar, AvatarFallback, AvatarImage } from '@common/components'
import { cn } from '@common/lib/utils'
import { PropsWithClassname } from '@common/types'
import { AvatarProps } from '@radix-ui/react-avatar'
import { UserIcon } from 'lucide-react'

type AvatarIconProps = AvatarProps &
  PropsWithClassname & {
    src?: string
    alt?: string
  }

export function AvatarIcon({ src, alt, className, ...props }: AvatarIconProps) {
  return (
    <Avatar
      className={cn('rg-transition cursor-pointer hover:opacity-80', className)}
      {...props}
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="text-xs">
        <UserIcon strokeWidth={1.5} className="text-rg-gray-5 size-4" />
      </AvatarFallback>
    </Avatar>
  )
}
