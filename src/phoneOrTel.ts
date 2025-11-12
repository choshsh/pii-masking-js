import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 전화번호 마스킹 처리
 * @param phone - 마스킹할 전화번호 문자열
 * @returns 마스킹된 전화번호
 */
export function maskPhoneOrTel(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  const hasHyphen = phone.includes('-');
  const numbers = phone.replace(/\D/g, '');
  const len = numbers.length;

  let p1, p2, p3;
  let maskedP2, maskedP3;

  if (len === 11) {
    // 휴대폰 번호 (010-1234-5678) 또는 지역번호 포함 11자리 (031-1234-5678)
    p1 = numbers.substring(0, 3);
    p2 = numbers.substring(3, 7);
    p3 = numbers.substring(7, 11);
    maskedP2 = p2.substring(0, 2) + DEFAULT_MASK_CHAR.repeat(2);
    maskedP3 = p3.substring(0, 2) + DEFAULT_MASK_CHAR.repeat(2);
  } else if (len === 10) {
    // 지역번호 3자리 + 국번 3자리 (031-123-5678)
    p1 = numbers.substring(0, 3);
    p2 = numbers.substring(3, 6);
    p3 = numbers.substring(6, 10);
    maskedP2 = p2.substring(0, 2) + DEFAULT_MASK_CHAR.repeat(1);
    maskedP3 = p3.substring(0, 2) + DEFAULT_MASK_CHAR.repeat(2);
  } else if (len === 9) {
    // 지역번호 2자리 (02-123-4567)
    p1 = numbers.substring(0, 2);
    p2 = numbers.substring(2, 5);
    p3 = numbers.substring(5, 9);
    maskedP2 = p2.substring(0, 1) + DEFAULT_MASK_CHAR.repeat(2);
    maskedP3 = p3.substring(0, 2) + DEFAULT_MASK_CHAR.repeat(2);
  } else if (len === 8) {
    // 대표번호 (e.g. 1588-1234)
    const part1 = numbers.substring(0, 4);
    const part2 = numbers.substring(4, 8);
    const maskedPart2 = part2.substring(0, 2) + DEFAULT_MASK_CHAR.repeat(2);
    if (hasHyphen) {
      return `${part1}-${maskedPart2}`;
    } else {
      return `${part1}${maskedPart2}`;
    }
  } else {
    return phone; // 규칙에 맞지 않으면 원본 반환
  }

  if (hasHyphen) {
    return `${p1}-${maskedP2}-${maskedP3}`;
  } else {
    return `${p1}${maskedP2}${maskedP3}`;
  }
}
