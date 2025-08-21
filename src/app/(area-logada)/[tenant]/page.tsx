import { Breadcrumb } from '@/components/ui/navigation/breadcrumb'
import { RulePage } from '@/modules/rules/pages/RulePage'
import { withGlobalLoading } from '@/modules/common/components/global-loading'

export function Page() {
  return (
    <>
      <Breadcrumb />
      <RulePage />
    </>
  )
}

export default withGlobalLoading(Page)
