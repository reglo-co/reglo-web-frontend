'use client'

import { Logo } from '@core/ui'
import { Item, ItemMedia } from '@ui/primitives'

import { usePathnameContext } from '@core/hooks/use-pathname-context'
import { useProjectBySlug } from '@projects/hooks'
import { Badge, ItemActions, ItemContent, ItemTitle } from '@ui/primitives'

export function CurrentProject() {
  const { organization: organizationSlug, project: projectSlug } =
    usePathnameContext()
  const { project } = useProjectBySlug(organizationSlug, projectSlug)

  if (!project) {
    return null
  }

  return (
    <Item
      size="sm"
      variant="outline"
      className="bg-popover min-w-54 items-center gap-2.5 px-3 py-2"
    >
      <ItemMedia>
        <Logo.Symbol className="size-2.5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="mt-0.5 line-clamp-1">{project?.name}</ItemTitle>
      </ItemContent>
      <ItemActions className="scale-85">
        <Badge className="type-micro!">main</Badge>
      </ItemActions>
    </Item>
  )
}
