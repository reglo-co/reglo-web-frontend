import { PropsWithParams, WithOrganizationAndProject } from '@core/types'
import { OrganizationProtected } from '@core/ui/protected'
import { ProjectProtected } from '@core/ui/protected/project-protected'

export default async function Page({
  params,
}: PropsWithParams<WithOrganizationAndProject>) {
  const { organization, project } = await params

  return (
    <OrganizationProtected organization={organization}>
      <ProjectProtected project={project}>
        <div>ProjectPage</div>
      </ProjectProtected>
    </OrganizationProtected>
  )
}
