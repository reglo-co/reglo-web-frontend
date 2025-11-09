import { PropsWithParams, WithOrganizationAndProject } from '@core/types'
import { Container } from '@core/ui'
import { ProjectProtected } from '@core/ui/protected/project-protected'
import { PropsWithChildren } from 'react'

export default async function Layout({
  children,
  params,
}: PropsWithChildren & PropsWithParams<WithOrganizationAndProject>) {
  const { organization, project } = await params

  return (
    <ProjectProtected organization={organization} project={project}>
      <Container className="gap-10">{children}</Container>
    </ProjectProtected>
  )
}
