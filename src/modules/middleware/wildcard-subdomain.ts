import { NextRequest, NextResponse } from 'next/server'

// Configurações de domínio
const ROOT_DOMAIN = (
  process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'reglo.co'
).toLowerCase()

// Subdomínios reservados que não devem ser tratados como workspaces
export const RESERVED_SUBDOMAINS = new Set([
  'www',
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

/**
 * Normaliza o header host removendo a porta
 */
function normalizeHost(hostHeader: string | null): string {
  return (hostHeader ?? '').split(':')[0].toLowerCase()
}

/**
 * Verifica se o caminho deve ser ignorado pelo middleware
 */
function isBypassedPath(pathname: string): boolean {
  if (PUBLIC_PATH_PREFIXES.some((p) => pathname.startsWith(p))) return true
  if (PUBLIC_FILES.has(pathname)) return true
  if (STATIC_FILE_REGEX.test(pathname)) return true
  return false
}

/**
 * Verifica se o hostname termina com algum dos sufixos fornecidos
 */
function hasAnySuffix(hostname: string, suffixes: string[]): boolean {
  return suffixes.some((s) => hostname.endsWith(s))
}

/**
 * Extrai o primeiro label (subdomínio) do hostname
 */
function firstLabel(hostname: string): string {
  return hostname.split('.')[0]
}

/**
 * Extrai o workspace do hostname baseado no subdomínio
 */
function extractWorkspaceFromHost(hostname: string): string | null {
  if (!hostname) return null

  // Para desenvolvimento local com wildcard
  if (hasAnySuffix(hostname, LOCAL_WILDCARD_SUFFIXES)) {
    return firstLabel(hostname)
  }

  // Se for o domínio raiz, não há workspace
  if (hostname === ROOT_DOMAIN) return null

  // Se terminar com o domínio raiz, extrai o subdomínio
  if (hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    return firstLabel(hostname)
  }

  return null
}

/**
 * Middleware para resolução de subdomínio dinâmico
 * Redireciona subdomínios para rotas com workspace
 */
export function handleWildcardSubdomain(req: NextRequest): NextResponse | null {
  const pathname = req.nextUrl.pathname

  // Bypass para arquivos estáticos e rotas públicas
  if (isBypassedPath(pathname)) {
    return null
  }

  const host = normalizeHost(req.headers.get('host'))
  const workspace = extractWorkspaceFromHost(host)

  if (workspace && RESERVED_SUBDOMAINS.has(workspace)) {
    const url = req.nextUrl.clone()
    url.pathname = '/404'
    return NextResponse.rewrite(url)
  }

  // Se encontrou um workspace válido (não reservado), reescreve a URL
  if (workspace && !RESERVED_SUBDOMAINS.has(workspace)) {
    const url = req.nextUrl.clone()
    url.pathname = `/workspaces/${workspace}${pathname}`
    return NextResponse.rewrite(url)
  }

  return null
}
