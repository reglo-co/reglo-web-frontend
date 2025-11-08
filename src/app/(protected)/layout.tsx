import { SystemConfigurationDialog } from '@ui/dialogs'
import { DialogCreateOrganization } from '@organizations'
import { Fragment, type PropsWithChildren } from 'react'

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      {children}
      <SystemConfigurationDialog />
      <DialogCreateOrganization />
    </Fragment>
  )
}
