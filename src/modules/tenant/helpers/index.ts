export function getTenantUrl(tenant: string, path: string) {
  const isLocalhost = process.env.NODE_ENV === 'development'
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN
  const safePath = path.startsWith('/') ? path : `/${path}`

  if (isLocalhost) {
    return `http://${tenant}.${rootDomain}${safePath}`
  }

  return `https://${tenant}.${rootDomain}${safePath}`
}
