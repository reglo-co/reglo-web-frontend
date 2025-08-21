export function getWorkspaceUrl(workspace: string, path: string) {
  const isLocalhost = process.env.NODE_ENV === 'development'
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN
  const safePath = path.startsWith('/') ? path : `/${path}`

  if (isLocalhost) {
    return `http://${workspace}.${rootDomain}${safePath}`
  }

  return `https://${workspace}.${rootDomain}${safePath}`
}
