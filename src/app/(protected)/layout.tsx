import { Fragment, type PropsWithChildren } from 'react'

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return <Fragment>{children}</Fragment>
}
