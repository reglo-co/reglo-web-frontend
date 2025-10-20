import { SignUp } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Page() {
  return redirect('/waitlist')

  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp />
    </div>
  )
}
