export function getInitials(name: string) {
  const parts = name.trim().split(' ')
  const first = parts.at(0)?.[0] ?? ''
  const last = parts.at(-1)?.[0] ?? ''
  return `${first}${last}`.toUpperCase()
}

export function getTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime()
  const seconds = Math.floor(diff / 1000)

  if (seconds < 60) return 'Há menos de 1 minuto'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `Há ${minutes} minuto${minutes > 1 ? 's' : ''}`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `Há ${hours} hora${hours > 1 ? 's' : ''}`

  const days = Math.floor(hours / 24)
  if (days < 30) return `Há ${days} dia${days > 1 ? 's' : ''}`

  const months = Math.floor(days / 30)
  if (months < 12) return `Há ${months} mês${months > 1 ? 'es' : ''}`

  const years = Math.floor(months / 12)
  return `Há ${years} ano${years > 1 ? 's' : ''}`
}
