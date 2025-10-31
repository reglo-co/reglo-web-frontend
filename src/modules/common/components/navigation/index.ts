import { LinkOrganization } from './link-organization/link-organization'
import { NavListItem } from './nav-list-item/nav-list-item'
import { NavListRoot } from './nav-list-root/nav-list-root'

export * from './nav-list-item/nav-list-item'
export * from './nav-list-root/nav-list-root'

export const Navigation = {
  link: LinkOrganization,
  list: {
    root: NavListRoot,
    item: NavListItem,
  },
}
