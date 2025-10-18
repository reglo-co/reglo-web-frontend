import { Header } from '@common/components/header'
import { Workspaces } from '@workspaces/components'
import { Fragment } from 'react'

export default function Page() {
  return (
    <Fragment>
      <Header withoutMenu />

      <div className="rg-max-container rg-container-medium page-height flex flex-col items-center">
        <Workspaces.Empty />
        <Workspaces.List />
      </div>
    </Fragment>
  )
}
