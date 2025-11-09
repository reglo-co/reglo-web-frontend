import { usePathnameContext } from '@core/hooks/use-pathname-context'
import { useProjectBySlug } from '@projects/hooks'

export function useCurrentProject() {
  const { organization, project: projectSlug } = usePathnameContext()
  const { project: projectData } = useProjectBySlug(organization, projectSlug)

  return projectData
}
