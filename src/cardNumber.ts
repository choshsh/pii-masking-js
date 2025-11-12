import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 카드번호 마스킹 처리
 * @param cardNumber - 마스킹할 카드번호
 * @returns 마스킹된 카드번호
 */
export function maskCardNumber(cardNumber: string): string {
  const maskChar = DEFAULT_MASK_CHAR;
  if (!cardNumber || typeof cardNumber !== 'string') {
    return '';
  }

  const numbers = cardNumber.replace(/\D/g, '');

  if (numbers.length < 12 || numbers.length > 19) {
    return cardNumber;
  }

  const first6 = numbers.slice(0, 6);
  const last4 = numbers.slice(-4);
  const middleMasked = maskChar.repeat(numbers.length - 10);

  const masked = `${first6}${middleMasked}${last4}`;

  return masked.replace(/(.{4})/g, '$1-').replace(/-$/, '');
}
