export type PropsWithClassname = {
  className?: string
}

export type PropsWithParams<T extends Record<string, string>> = {
  params: Promise<T>
}

export type WithOrganization = {
  organization: string
}

export type WithProject = {
  project: string
}

export type WithOrganizationAndProject = WithOrganization & WithProject
