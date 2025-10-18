import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/common/components/ui/avatar'

import { Button } from '@/common/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <header className='flex h-18 w-full justify-center'>
        <div className='flex h-full w-full max-w-7xl items-center justify-between px-4'>
          <div className='flex items-center gap-4'>
            <Link href='/workspace'>
              <Image
                src='/logo-reglo-symbol.svg'
                alt='Reglo Logo'
                className='size-8 transition hover:rotate-90'
                width={32}
                height={32}
              />
            </Link>
            <Button variant='secondary' size='icon' rounded>
              <LayoutGrid strokeWidth={1.75} />
            </Button>
          </div>

          {/* Teste do componente Avatar */}
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='Avatar' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
    </div>
  )
}
