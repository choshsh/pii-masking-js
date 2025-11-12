import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 주민등록번호 마스킹 처리
 * @param rnn - 마스킹할 주민등록번호 (RRN: Resident Registration Number)
 * @returns 마스킹된 주민등록번호
 */
export function maskRnn(rnn: string | number): string {
  // 입력 값 유효성 검사
  if (rnn === null || rnn === undefined) {
    return '';
  }

  const value = String(rnn);

  // 숫자 이외 문자 모두 제거
  const numbers = value.replace(/\D/g, '');

  // 생년월일 6자리인 경우, 첫 글자 제외 마스킹
  if (numbers.length === 6) {
    return `${numbers.charAt(0)}${DEFAULT_MASK_CHAR.repeat(5)}`;
  }

  // 생년월일 8자리인 경우, 3자리 제외 마스킹
  if (numbers.length === 8) {
    return `${numbers.slice(0, 3)}${DEFAULT_MASK_CHAR.repeat(5)}`;
  }

  // 주민등록번호 유효 길이(13자리) 확인
  if (numbers.length !== 13) {
    return value;
  }

  // 앞 6자리(생년월일), 뒤 7자리 분리
  const front = numbers.slice(0, 6);
  const back = numbers.slice(6);

  // 뒤 7자리 중 첫째 자리(성별)만 노출
  const maskedBack = `${back.charAt(0)}${DEFAULT_MASK_CHAR.repeat(6)}`;

  // 원본 하이픈(-) 여부에 따라 포맷팅
  if (value.includes('-')) {
    return `${front}-${maskedBack}`;
  }

  return `${front}${maskedBack}`;
}
