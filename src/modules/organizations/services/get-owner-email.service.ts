export async function getOwnerEmail(
  organizationSlug: string
): Promise<string | null> {
  const response = await fetch(
    `/api/organizations/owner-email/${organizationSlug}`
  )
  const data = await response.json()
  return data.ownerEmail
}
