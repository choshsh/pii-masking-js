import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 계좌번호 마스킹 처리
 * @param accountNumber - 마스킹할 계좌번호
 * @returns 마스킹된 계좌번호
 */
export function maskAccountNumber(accountNumber: string | number): string {
  if (accountNumber === null || accountNumber === undefined) {
    return '';
  }

  const value = String(accountNumber);

  const digitsOnly = value.replace(/\D/g, '');
  if (digitsOnly.length <= 4) {
    return value;
  }

  const chars = value.split('');
  let digitsToKeep = 4;

  for (let i = chars.length - 1; i >= 0; i--) {
    if (/\d/.test(chars[i])) {
      if (digitsToKeep > 0) {
        digitsToKeep--;
      } else {
        chars[i] = DEFAULT_MASK_CHAR;
      }
    }
  }

  return chars.join('');
}
