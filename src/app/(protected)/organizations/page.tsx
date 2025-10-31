import { Header } from '@common/components/header'
import { Organizations } from '@organizations/components'
import { ModalOrganizationsCreate } from '@organizations/modals'
import { Fragment } from 'react'

export default function Page() {
  return (
    <Fragment>
      <Header withoutMenu />

      <div className="rg-max-container rg-container-medium page-height flex flex-col items-center">
        <Organizations.Empty />
        <Organizations.List />
        <Organizations.Skeleton />
      </div>

      <ModalOrganizationsCreate />
    </Fragment>
  )
}


