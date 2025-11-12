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
  
  if (numbers.length === 0) {
    return phone;
  }

  // 휴대폰 (010-1234-5678 형태)
  if (numbers.length === 11 && numbers.startsWith('010')) {
    return phone.replace(/(\d{3})-?(\d{4})-?(\d{4})/, `$1-${maskChar.repeat(4)}-$3`);
  }
  
  // 일반 전화번호 (02-123-4567, 031-123-4567 등)
  if (numbers.length === 9 || numbers.length === 10) {
    const match = phone.match(/(\d{2,3})-?(\d{3,4})-?(\d{4})/);
    if (match) {
      return `${match[1]}-${maskChar.repeat(match[2].length)}-${match[3]}`;
    }
  }

  // 기타 전화번호: 중간 부분 마스킹
  if (numbers.length >= 7) {
    const start = numbers.slice(0, 3);
    const end = numbers.slice(-4);
    const middleLength = numbers.length - 7;
    return phone.replace(numbers, `${start}${maskChar.repeat(middleLength)}${end}`);
  }

  return phone;
}

