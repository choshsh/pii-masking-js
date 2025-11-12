import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 계좌번호 마스킹 처리
 * @param accountNumber - 마스킹할 계좌번호
 * @returns 마스킹된 계좌번호
 */
export function maskAccountNumber(accountNumber: string): string {
  const maskChar = DEFAULT_MASK_CHAR;
  if (!accountNumber || typeof accountNumber !== 'string') {
    return '';
  }

  const digitsOnly = accountNumber.replace(/\D/g, '');
  if (digitsOnly.length <= 4) {
    return accountNumber;
  }

  const chars = accountNumber.split('');
  let digitsToKeep = 4;

  for (let i = chars.length - 1; i >= 0; i--) {
    if (/\d/.test(chars[i])) {
      if (digitsToKeep > 0) {
        digitsToKeep--;
      } else {
        chars[i] = maskChar;
      }
    }
  }

  return chars.join('');
}
