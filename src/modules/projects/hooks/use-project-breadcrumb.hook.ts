import { useCurrentOrganization } from '@organizations'
import { useCurrentProject } from '@projects/hooks'

export function useProjectBreadcrumb() {
  const organization = useCurrentOrganization()
  const project = useCurrentProject()

  return [
    {
      title: organization?.name,
      url: organization?.slug ? `/${organization.slug}` : undefined,
    },
    {
      title: project?.name,
      url:
        organization?.slug && project?.slug
          ? `/${organization.slug}/${project.slug}`
          : undefined,
    },
  ]
}
