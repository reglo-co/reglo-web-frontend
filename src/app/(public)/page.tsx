import { Navigation } from '@common/components'

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Navigation.link href="/workspace">Workspace</Navigation.link>
    </div>
  )
}
