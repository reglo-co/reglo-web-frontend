import { OrganizationsCard } from '@organizations/components/organizations-card/organizations-card'
import { OrganizationsEmpty } from '@organizations/components/organizations-empty/organizations-empty'
import { OrganizationsList } from '@organizations/components/organizations-list/organizations-list'
import { OrganizationsSkeleton } from '@organizations/components/organizations-skeleton/organizations-skeleton'

export const Organizations = {
  Empty: OrganizationsEmpty,
  List: OrganizationsList,
  Card: OrganizationsCard,
  Skeleton: OrganizationsSkeleton,
}
