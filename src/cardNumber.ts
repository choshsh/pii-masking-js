import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 카드번호 마스킹 처리
 * @param cardNumber - 마스킹할 카드번호
 * @returns 마스킹된 카드번호
 */
export function maskCardNumber(cardNumber: string): string {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return '';
  }

  const numbers = cardNumber.replace(/\D/g, '');

  if (numbers.length < 12 || numbers.length > 19) {
    return cardNumber;
  }

  const first4 = numbers.slice(0, 4);
  const last4 = numbers.slice(-4);
  const middleMasked = DEFAULT_MASK_CHAR.repeat(numbers.length - 8);

  const masked = `${first4}${middleMasked}${last4}`;

  const parts = [];
  for (let i = 0; i < masked.length; i += 4) {
    parts.push(masked.slice(i, i + 4));
  }
  return parts.join('-');
}
