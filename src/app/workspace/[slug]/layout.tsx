import { Header } from '@common/components/header/header'
import { Fragment, PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  )
}
