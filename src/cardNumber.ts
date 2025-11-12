import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 카드번호 마스킹 처리
 * @param cardNumber - 마스킹할 카드번호
 * @returns 마스킹된 카드번호
 */
export function maskCardNumber(cardNumber: string | number): string {
  // 입력 값 유효성 검사
  if (cardNumber === null || cardNumber === undefined) {
    return '';
  }

  const value = String(cardNumber);

  // 숫자 이외 문자 모두 제거
  const numbers = value.replace(/\D/g, '');

  // 카드번호 유효 길이(12-19자리) 확인
  if (numbers.length < 12 || numbers.length > 19) {
    return value;
  }

  // 앞 4자리, 뒤 4자리 추출
  const first4 = numbers.slice(0, 4);
  const last4 = numbers.slice(-4);
  // 중간 4-11자리 마스킹
  const middleMasked = DEFAULT_MASK_CHAR.repeat(numbers.length - 8);

  const masked = `${first4}${middleMasked}${last4}`;

  // 원본 하이픈(-) 여부에 따라 포맷팅
  if (value.includes('-')) {
    // 4자리 단위로 하이픈(-) 추가
    const parts = [];
    for (let i = 0; i < masked.length; i += 4) {
      parts.push(masked.slice(i, i + 4));
    }
    return parts.join('-');
  }

  return masked;
}
