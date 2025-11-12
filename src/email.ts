import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 이메일 주소 마스킹 처리
 * @param email - 마스킹할 이메일 주소
 * @returns 마스킹된 이메일 주소
 */
export function maskEmail(email: string): string {
  const maskChar = DEFAULT_MASK_CHAR;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return email;
  }

  const [localPart, domain] = email.split('@');
  const len = localPart.length;

  if (len <= 1) {
    return `${maskChar}@${domain}`;
  }

  if (len <= 3) {
    return `${localPart[0]}${maskChar.repeat(len - 1)}@${domain}`;
  }

  return `${localPart.slice(0, 3)}${maskChar.repeat(len - 3)}@${domain}`;
}
