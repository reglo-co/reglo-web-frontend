'use client'

import { Button } from '@/modules/common/ui/primitives/button'
import { UserProfile } from '@clerk/nextjs'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function UserProfilePage() {
  const router = useRouter()

  return (
    <div className="relative container mx-auto flex h-screen w-full items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-16 right-10 z-50 md:top-4 md:right-4"
        onClick={() => router.back()}
      >
        <X className="size-4" />
        <span className="sr-only">Fechar</span>
      </Button>
      <UserProfile
        appearance={{
          elements: {
            rootBox: 'w-screen! h-screen! shadow-none! mx-auto!',
            cardBox: 'w-screen! h-screen! shadow-none! mx-auto!',
          },
        }}
      />
    </div>
  )
}
