import crypto from 'crypto'

// Strong encryption key (32 bytes for AES-256)
// In production, this should be an environment variable
const ENCRYPTION_KEY = 'NolinAI_SuperSecretKey_ForEncryption_2025'

// Initialization vector length
const IV_LENGTH = 16

/**
 * Encrypts a string using AES-256-CBC
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  )
  
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  // Return iv + encrypted data as base64
  return Buffer.from(iv.toString('hex') + ':' + encrypted).toString('base64')
}

/**
 * Decrypts a previously encrypted string
 */
export function decrypt(encryptedText: string): string {
  // Convert from base64 to buffer
  const buffer = Buffer.from(encryptedText, 'base64').toString('utf8')
  
  // Split iv and encrypted data
  const parts = buffer.split(':')
  if (parts.length !== 2) {
    throw new Error('Invalid encrypted text format')
  }
  
  const iv = Buffer.from(parts[0], 'hex')
  const encrypted = parts[1]
  
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  )
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return decrypted
} 