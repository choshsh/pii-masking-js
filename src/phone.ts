/**
 * 전화번호 마스킹 처리
 * @param phone - 마스킹할 전화번호 문자열
 * @param maskChar - 마스킹에 사용할 문자 (기본값: '*')
 * @returns 마스킹된 전화번호
 */
export function maskPhone(phone: string, maskChar: string = '*'): string {
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  // 숫자만 추출
  const numbers = phone.replace(/\D/g, '');
  const len = numbers.length;

  if (len < 7) {
    return phone; // 마스킹하기에 너무 짧은 경우 원본 반환
  }

  const last4 = numbers.slice(-4);

  // 서울 지역번호 (02) - 9자리 또는 10자리
  if (numbers.startsWith('02')) {
    const prefix = numbers.slice(0, 2);
    const middle = numbers.slice(2, -4);
    if (middle.length > 0) {
      return `${prefix}-${maskChar.repeat(middle.length)}-${last4}`;
    }
  }

  // 휴대폰 번호 (11자리) 또는 3자리 지역번호 (10자리)
  if (len === 11 || len === 10) {
    const prefix = numbers.slice(0, 3);
    const middle = numbers.slice(3, -4);
    if (middle.length > 0) {
      return `${prefix}-${maskChar.repeat(middle.length)}-${last4}`;
    }
  }

  // 기타 9자리 번호 (e.g. 1588-xxxx)
  if (len === 9) {
    const prefix = numbers.slice(0, 2);
    const middle = numbers.slice(2, -4);
    if (middle.length > 0) {
      return `${prefix}-${maskChar.repeat(middle.length)}-${last4}`;
    }
  }

  // 일반적인 fallback: 앞 3자리와 뒤 4자리를 제외하고 마스킹
  const prefix = numbers.slice(0, 3);
  const middle = numbers.slice(3, -4);
  if (middle.length > 0) {
    return `${prefix}${maskChar.repeat(middle.length)}${last4}`;
  }

  // 모든 조건에 맞지 않는 짧은 번호 (e.g. 7자리)는 앞 3자리만 노출
  if (len >= 4) {
    return `${numbers.slice(0, len - 4)}${maskChar.repeat(4)}`;
  }

  return phone; // 그 외의 경우는 원본 반환
}

