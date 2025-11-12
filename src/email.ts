/**
 * 이메일 주소 마스킹 처리
 * @param email - 마스킹할 이메일 주소
 * @param maskChar - 마스킹에 사용할 문자 (기본값: '*')
 * @returns 마스킹된 이메일 주소
 */
export function maskEmail(email: string, maskChar: string = '*'): string {
  if (!email || typeof email !== 'string') {
    return '';
  }

  const atIndex = email.indexOf('@');
  if (atIndex === -1) {
    return email;
  }

  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex);

  if (localPart.length === 0) {
    return email;
  }

  let maskedLocal: string;
  
  if (localPart.length <= 2) {
    // 길이가 2 이하면 첫 글자만 보이고 나머지 마스킹
    maskedLocal = localPart[0] + maskChar.repeat(localPart.length - 1);
  } else if (localPart.length <= 4) {
    // 길이가 3-4면 앞 2글자 보이고 나머지 마스킹
    maskedLocal = localPart.slice(0, 2) + maskChar.repeat(localPart.length - 2);
  } else {
    // 길이가 5 이상이면 앞 3글자 보이고 나머지 마스킹
    maskedLocal = localPart.slice(0, 3) + maskChar.repeat(localPart.length - 3);
  }

  return maskedLocal + domain;
}

