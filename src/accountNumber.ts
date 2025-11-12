/**
 * 계좌번호 마스킹 처리
 * @param accountNumber - 마스킹할 계좌번호
 * @param maskChar - 마스킹에 사용할 문자 (기본값: '*')
 * @returns 마스킹된 계좌번호
 */
export function maskAccountNumber(accountNumber: string, maskChar: string = '*'): string {
  if (!accountNumber || typeof accountNumber !== 'string') {
    return '';
  }

  // 숫자만 추출
  const numbers = accountNumber.replace(/\D/g, '');

  if (numbers.length < 8) {
    // 계좌번호가 너무 짧으면 원본 반환
    return accountNumber;
  }

  // 처음 3자리와 마지막 3자리만 보이고 나머지는 마스킹
  const first = numbers.slice(0, 3);
  const last = numbers.slice(-3);
  const middleLength = numbers.length - 6;

  const masked = `${first}${maskChar.repeat(middleLength)}${last}`;

  return masked;
}

