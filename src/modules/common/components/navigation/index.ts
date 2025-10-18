import { LinkWorkspace } from './link-workspace/link-workspace'
import { NavListItem } from './nav-list-item/nav-list-item'
import { NavListRoot } from './nav-list-root/nav-list-root'

export * from './nav-list-item/nav-list-item'
export * from './nav-list-root/nav-list-root'

export const Navigation = {
  link: LinkWorkspace,
  list: {
    root: NavListRoot,
    item: NavListItem,
  },
}
