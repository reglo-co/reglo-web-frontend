export function getInitials(name: string): string {
  if (!name) return ''

  const parts = name.trim().split(/\s+/)

  if (parts.length === 1) {
    const word = parts[0]
    return word.length >= 2
      ? word[0].toUpperCase() + word[1].toUpperCase()
      : word[0].toUpperCase()
  }

  const first = parts[0][0].toUpperCase()
  const last = parts[parts.length - 1][0].toUpperCase()

  return first + last
}
