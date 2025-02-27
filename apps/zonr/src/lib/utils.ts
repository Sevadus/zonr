import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encodeBase64int(value: number) {
  const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  const chars: string[] = []
  if (value === 0) return BASE64_CHARS[0]
  while (value > 0) {
    chars.push(BASE64_CHARS[value % 64])
    value = Math.floor(value / 64)
  }
  return chars.reverse().join('')
}

export function decodeBase64int(value: string) {
  const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  let result = 0
  for (let i = 0; i < value.length; i++) {
    result = result * 64 + BASE64_CHARS.indexOf(value[i])
  }
  return result
}

export function shortenUrl(dt: string) {
  const dtts = Date.parse(dt.substring(0, 19) + 'Z') // Don't include the timezone
  const ts = Math.floor(Math.floor(dtts / 1000) / 60) // Unix timestamp minutes
  const tzsign = dt.substring(19, 20) === '-' ? '0' : '1'
  const shortUrl =
    encodeBase64int(ts) +
    tzsign +
    encodeBase64int(parseInt(dt.substring(20, 22))) +
    encodeBase64int(parseInt(dt.substring(23, 25)))
  return shortUrl
}

export function expandUrl(shortDt: string) {
  const tzsign = shortDt[shortDt.length - 3] === '0' ? '-' : '+'
  const tzhour = decodeBase64int(shortDt.substring(shortDt.length - 2, shortDt.length - 1))
  const tzmin = decodeBase64int(shortDt.substring(shortDt.length - 1))

  const ts = decodeBase64int(shortDt.substring(0, shortDt.length - 3))
  const dt = new Date(ts * 60 * 1000).toISOString().split('.')[0]
  return dt + tzsign + tzhour.toString().padStart(2, '0') + ':' + tzmin.toString().padStart(2, '0')
}
