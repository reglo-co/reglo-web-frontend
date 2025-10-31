/**
 * Handles email input to block invalid characters
 * Rules:
 * - Only allows letters, numbers, dots, hyphens, underscores, and @
 * - First character must be a letter
 * - Blocks spaces and other special characters
 */
export function handleEmailInput(value: string): string {
  // Transform all characters to lowercase
  let cleaned = value.toLowerCase()

  // Remove all characters except lowercase letters, numbers, dots, hyphens, underscores, commas, and @
  cleaned = cleaned.replace(/[^a-z0-9.@_\-]/g, '')

  // Se o primeiro caractere for número ou caractere especial, exceto vírgula, remova
  if (cleaned.length > 0 && /^[0-9@._-]/.test(cleaned[0])) {
    cleaned = cleaned.replace(/^[0-9@._-]+/, '')
  }

  // Split by @ to handle local and domain parts separately
  const parts = cleaned.split('@')

  if (parts.length > 2) {
    // If there's more than one @, keep only the first two parts
    cleaned = parts[0] + '@' + parts.slice(1).join('')
  }

  return cleaned
}
