/**
 * 주민등록번호 마스킹 처리
 * @param rnn - 마스킹할 주민등록번호 (RRN: Resident Registration Number)
 * @param maskChar - 마스킹에 사용할 문자 (기본값: '*')
 * @returns 마스킹된 주민등록번호
 */
export function maskRnn(rnn: string, maskChar: string = '*'): string {
  if (!rnn || typeof rnn !== 'string') {
    return '';
  }

  // 숫자만 추출
  const numbers = rnn.replace(/\D/g, '');

  if (numbers.length !== 13) {
    // 13자리가 아니면 원본 반환
    return rnn;
  }

  // 앞 6자리 - 뒤 7자리 형태로 마스킹 (뒤 7자리 모두 마스킹)
  const front = numbers.slice(0, 6);
  const masked = `${front}-${maskChar.repeat(7)}`;

  return masked;
}

