export function toSlug(text: string): string {
  // Converte para minúsculas
  let slug = text.toLowerCase()

  // Substitui espaços por hífens
  slug = slug.replace(/\s+/g, '-')

  // Remove todos os caracteres que não sejam letras, números ou hífen
  slug = slug.replace(/[^a-z0-9-]/g, '')

  // Remove hífens duplicados
  slug = slug.replace(/-+/g, '-')

  // Garante que não começa com número (adiciona prefixo "x" se necessário)
  if (/^[0-9]/.test(slug)) {
    slug = `x${slug}`
  }

  // Remove hífens no início ou fim (caso sobre)
  slug = slug.replace(/^-+|-+$/g, '')

  // Limita a 36 caracteres
  if (slug.length > 36) {
    slug = slug.substring(0, 36)
  }

  return slug
}
