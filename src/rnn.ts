import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 주민등록번호 마스킹 처리
 * @param rnn - 마스킹할 주민등록번호 (RRN: Resident Registration Number)
 * @returns 마스킹된 주민등록번호
 */
export function maskRnn(rnn: string): string {
  const maskChar = DEFAULT_MASK_CHAR;
  if (!rnn || typeof rnn !== 'string') {
    return '';
  }

  // 숫자만 추출
  const numbers = rnn.replace(/\D/g, '');

  if (numbers.length !== 13) {
    // 13자리가 아니면 원본 반환
    return rnn;
  }

  const front = numbers.slice(0, 6);
  const back = numbers.slice(6);

  // 뒤 7자리 중 첫번째 자리와 마지막 자리를 제외하고 5자리 마스킹
  const maskedBack = `${back.charAt(0)}${maskChar.repeat(5)}${back.charAt(6)}`;

  // 원본에 하이픈이 있었는지 확인하여 동일한 형식으로 반환
  if (rnn.includes('-')) {
    return `${front}-${maskedBack}`;
  }

  return `${front}${maskedBack}`;
}
