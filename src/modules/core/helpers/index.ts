export function extractInitialsFromName(fullName: string): string {
  const nameParts = fullName.trim().split(' ')
  const firstInitial = nameParts.at(0)?.[0] ?? ''
  const lastInitial = nameParts.at(-1)?.[0] ?? ''
  return `${firstInitial}${lastInitial}`.toUpperCase()
}

const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24
const DAYS_PER_MONTH = 30
const MONTHS_PER_YEAR = 12

const MILLISECONDS_PER_SECOND = 1000

function pluralize(count: number, singular: string, plural: string): string {
  return count > 1 ? plural : singular
}

export function formatRelativeTime(date: Date): string {
  const millisecondsDifference = Date.now() - date.getTime()
  const totalSeconds = Math.floor(millisecondsDifference / MILLISECONDS_PER_SECOND)

  if (totalSeconds < SECONDS_PER_MINUTE) {
    return 'Há menos de 1 minuto'
  }

  const totalMinutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE)
  if (totalMinutes < MINUTES_PER_HOUR) {
    return `Há ${totalMinutes} ${pluralize(totalMinutes, 'minuto', 'minutos')}`
  }

  const totalHours = Math.floor(totalMinutes / MINUTES_PER_HOUR)
  if (totalHours < HOURS_PER_DAY) {
    return `Há ${totalHours} ${pluralize(totalHours, 'hora', 'horas')}`
  }

  const totalDays = Math.floor(totalHours / HOURS_PER_DAY)
  if (totalDays < DAYS_PER_MONTH) {
    return `Há ${totalDays} ${pluralize(totalDays, 'dia', 'dias')}`
  }

  const totalMonths = Math.floor(totalDays / DAYS_PER_MONTH)
  if (totalMonths < MONTHS_PER_YEAR) {
    return `Há ${totalMonths} ${pluralize(totalMonths, 'mês', 'meses')}`
  }

  const totalYears = Math.floor(totalMonths / MONTHS_PER_YEAR)
  return `Há ${totalYears} ${pluralize(totalYears, 'ano', 'anos')}`
}
