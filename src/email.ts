import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 이메일 주소 마스킹 처리
 * @param email - 마스킹할 이메일 주소
 * @returns 마스킹된 이메일 주소
 */
export function maskEmail(email: string): string {
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return email;
  }

  const [localPart, domain] = email.split('@');
  const len = localPart.length;

  if (len <= 2) {
    return `${DEFAULT_MASK_CHAR.repeat(len)}@${domain}`;
  }

  return `${localPart.slice(0, 2)}${DEFAULT_MASK_CHAR.repeat(len - 2)}@${domain}`;
}
