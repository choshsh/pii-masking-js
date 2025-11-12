import { DEFAULT_MASK_CHAR } from './constants';

const maskPart = (value: string, visibleLength: number) => {
  return (
    value.slice(0, visibleLength) +
    DEFAULT_MASK_CHAR.repeat(value.length - visibleLength)
  );
};

/**
 * 전화번호 마스킹 처리
 * @param phone - 마스킹할 전화번호 문자열
 * @returns 마스킹된 전화번호
 */
export function maskPhoneOrTel(phone: string | number): string {
  // 입력 값 유효성 검사
  if (phone === null || phone === undefined) {
    return '';
  }

  // 문자열로 변환
  const value = String(phone);

  // 하이픈(-) 존재 여부 확인
  const hasHyphen = value.includes('-');
  // 숫자 이외 문자 모두 제거
  const numbers = value.replace(/\D/g, '');
  const len = numbers.length;

  let p1, p2, p3;
  let maskedP2, maskedP3;

  // 전화번호 길이에 따른 분기 처리
  switch (len) {
    case 12: // 안심번호/가상번호 (0507-xxxx-xxxx)
      p1 = numbers.substring(0, 4);
      p2 = numbers.substring(4, 8);
      p3 = numbers.substring(8, 12);
      maskedP2 = maskPart(p2, 2);
      maskedP3 = maskPart(p3, 2);
      break;

    case 11: // 휴대폰 (010-xxxx-xxxx) 또는 지역번호 포함 11자리 (031-xxxx-xxxx)
      p1 = numbers.substring(0, 3);
      p2 = numbers.substring(3, 7);
      p3 = numbers.substring(7, 11);
      maskedP2 = maskPart(p2, 2);
      maskedP3 = maskPart(p3, 2);
      break;

    case 10: // 지역번호 3자리 + 국번 3자리 (031-xxx-xxxx)
      p1 = numbers.substring(0, 3);
      p2 = numbers.substring(3, 6);
      p3 = numbers.substring(6, 10);
      maskedP2 = maskPart(p2, 2);
      maskedP3 = maskPart(p3, 2);
      break;

    case 9: // 서울 지역번호 (02-xxx-xxxx)
      p1 = numbers.substring(0, 2);
      p2 = numbers.substring(2, 5);
      p3 = numbers.substring(5, 9);
      maskedP2 = maskPart(p2, 1);
      maskedP3 = maskPart(p3, 2);
      break;

    case 8: // 대표번호 (e.g. 1588-xxxx)
      const part1 = numbers.substring(0, 4);
      const part2 = numbers.substring(4, 8);
      const maskedPart2 = maskPart(part2, 2);
      // 하이픈 여부에 따라 포맷팅
      if (hasHyphen) {
        return `${part1}-${maskedPart2}`;
      } else {
        return `${part1}${maskedPart2}`;
      }

    default: // 규칙에 맞지 않으면 원본 반환
      return value;
  }

  // 하이픈 여부에 따라 최종 포맷팅
  if (hasHyphen) {
    return `${p1}-${maskedP2}-${maskedP3}`;
  } else {
    return `${p1}${maskedP2}${maskedP3}`;
  }
}
