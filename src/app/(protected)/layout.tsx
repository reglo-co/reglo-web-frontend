import { SystemConfigurationDialog } from '@/modules/common/ui/dialogs'
import { Fragment, type PropsWithChildren } from 'react'

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      {children}
      <SystemConfigurationDialog />
    </Fragment>
  )
}
