// Email regex pattern for validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Common spam domains to reject
const SPAM_DOMAINS = [
  'tempmail.com',
  'guerrillamail.com',
  'mailinator.com',
  'sharklasers.com',
  'dispostable.com',
  'youmailbo.com',
  'fake-email.com',
  'spamgourmet.com',
  'yopmail.com',
  'deadaddress.com',
  '10minutemail.com',
  'throwawaymail.com',
  'tempmail.net',
  'trashmail.com',
  'spambog.com',
  'fakeinbox.com',
]

/**
 * Validates email format and checks against known spam domains
 */
export function validateEmail(email: string): { valid: boolean; reason?: string } {
  // Check if email is empty
  if (!email || email.trim() === '') {
    return { valid: false, reason: 'Email is required' }
  }
  
  // Check email format
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, reason: 'Invalid email format' }
  }
  
  // Check for spam domains
  const domain = email.split('@')[1].toLowerCase()
  if (SPAM_DOMAINS.includes(domain)) {
    return { valid: false, reason: 'Please use a non-temporary email address' }
  }
  
  return { valid: true }
}

/**
 * Validates a name field
 */
export function validateName(name: string): { valid: boolean; reason?: string } {
  // Check if name is empty
  if (!name || name.trim() === '') {
    return { valid: false, reason: 'Name is required' }
  }
  
  // Check name length
  if (name.length < 2) {
    return { valid: false, reason: 'Name is too short' }
  }
  
  // Check name length
  if (name.length > 100) {
    return { valid: false, reason: 'Name is too long' }
  }
  
  // Check for suspicious repetition
  if (/(.)\1{5,}/.test(name)) {
    return { valid: false, reason: 'Name contains suspicious character repetition' }
  }
  
  return { valid: true }
}

/**
 * Sanitizes input by removing potentially dangerous characters
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''
  
  // Remove script tags and other potentially harmful HTML
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<\/?\s*[a-z0-9]+(?:\s+[a-z0-9-]+(?:=(?:".*?"|'.*?'|[^'">\s]+))?)*\s*\/?\s*>/gi, '')
    .trim()
}

/**
 * Checks if the submission is from a bot using a honeypot field
 */
export function isBot(honeypotValue: string | undefined): boolean {
  // If honeypot field is filled, it's likely a bot
  return !!honeypotValue && honeypotValue.trim() !== ''
} 