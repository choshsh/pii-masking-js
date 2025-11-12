import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 주민등록번호 마스킹 처리
 * @param rnn - 마스킹할 주민등록번호 (RRN: Resident Registration Number)
 * @returns 마스킹된 주민등록번호
 */
export function maskRnn(rnn: string | number): string {
  if (rnn === null || rnn === undefined) {
    return '';
  }
  const value = String(rnn);

  // 숫자만 추출
  const numbers = value.replace(/\D/g, '');

  if (numbers.length === 6) {
    return `${numbers.charAt(0)}${DEFAULT_MASK_CHAR.repeat(5)}`;
  }

  if (numbers.length === 8) {
    return `${numbers.slice(0, 3)}${DEFAULT_MASK_CHAR.repeat(5)}`;
  }

  if (numbers.length !== 13) {
    // 13자리가 아니면 원본 반환
    return value;
  }

  const front = numbers.slice(0, 6);
  const back = numbers.slice(6);

  // 뒤 7자리 중 첫번째 자리만 남기고 6자리 마스킹
  const maskedBack = `${back.charAt(0)}${DEFAULT_MASK_CHAR.repeat(6)}`;

  // 원본에 하이픈이 있었는지 확인하여 동일한 형식으로 반환
  if (value.includes('-')) {
    return `${front}-${maskedBack}`;
  }

  return `${front}${maskedBack}`;
}
