import { NextRequest, NextResponse } from 'next/server'

// Configurações de domínio
const ROOT_DOMAIN = (
  process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'reglo.co'
).toLowerCase()

// Subdomínios reservados que não devem ser tratados como workspaces
export const RESERVED_SUBDOMAINS = new Set([
  'www', // www.reglo.co deve ser tratado como domínio raiz
  'api',
  'admin',
  'email',
  'auth',
  'localhost',
  'lvh.me',
  'nip.io',
])

// Configurações para bypass de arquivos estáticos
const STATIC_FILE_REGEX = /\.(.*)$/
const PUBLIC_PATH_PREFIXES = ['/api', '/_next']
const PUBLIC_FILES = new Set(['/favicon.ico', '/robots.txt', '/sitemap.xml'])

// Sufixos para desenvolvimento local com wildcard
const LOCAL_WILDCARD_SUFFIXES = ['.lvh.me', '.localhost', '.nip.io']

function normalizeHost(hostHeader: string | null): string {
  return (hostHeader ?? '').split(':')[0].toLowerCase()
}
function isBypassedPath(pathname: string): boolean {
  if (PUBLIC_PATH_PREFIXES.some((p) => pathname.startsWith(p))) return true
  if (PUBLIC_FILES.has(pathname)) return true
  if (STATIC_FILE_REGEX.test(pathname)) return true
  return false
}
function hasAnySuffix(hostname: string, suffixes: string[]): boolean {
  return suffixes.some((s) => hostname.endsWith(s))
}
function firstLabel(hostname: string): string {
  return hostname.split('.')[0]
}
function extractWorkspaceFromHost(hostname: string): string | null {
  if (!hostname) return null

  if (hasAnySuffix(hostname, LOCAL_WILDCARD_SUFFIXES)) {
    return firstLabel(hostname)
  }
  if (hostname === ROOT_DOMAIN) return null

  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    const labels = hostname.split('.')
    if (labels.length === 2) return null

    const first = labels[0]
    if (first === 'www') {
      if (labels.length === 3) return null
      if (labels.length >= 4) return labels[1]
    }
    return first
  }
  return null
}

/**
 * Middleware para resolução de subdomínio dinâmico
 * Redireciona subdomínios para rotas com workspace
 */
export function handleWildcardSubdomain(req: NextRequest): NextResponse | null {
  console.log('[Middleware] handleWildcardSubdomain')

  const pathname = req.nextUrl.pathname
  if (isBypassedPath(pathname)) {
    return NextResponse.next()
  }

  const host = normalizeHost(req.headers.get('host'))

  // >>> ajuste do WWW: redireciona www.{algo}.reglo.co -> {algo}.reglo.co
  if (host.startsWith('www.') && host.endsWith(`.${ROOT_DOMAIN}`)) {
    const url = req.nextUrl.clone()
    url.hostname = host.replace(/^www\./, '')
    return NextResponse.redirect(url, 301)
  }
  // <<< fim do ajuste

  const workspace = extractWorkspaceFromHost(host)
  console.log('[Middleware] host:', host, 'workspace:', workspace)

  if (workspace && RESERVED_SUBDOMAINS.has(workspace)) {
    console.log(`[Middleware] RESERVED_SUBDOMAINS.has(${workspace})`)
    const url = req.nextUrl.clone()
    url.pathname = '/404'
    return NextResponse.rewrite(url)
  }

  if (workspace && !RESERVED_SUBDOMAINS.has(workspace)) {
    console.log(
      `[Middleware] workspace && !RESERVED_SUBDOMAINS.has(${workspace})`
    )
    const url = req.nextUrl.clone()
    url.pathname = `/workspaces/${workspace}${pathname}`
    return NextResponse.rewrite(url)
  }

  console.log('[Middleware] return NextResponse.next()')
  return NextResponse.next()
}
