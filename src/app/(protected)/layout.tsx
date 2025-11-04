import { SystemConfigurationDialog } from '@/modules/common/ui/dialogs'
import { DialogCreateOrganization } from '@/modules/organizations'
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
