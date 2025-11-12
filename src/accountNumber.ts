import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 계좌번호 마스킹 처리
 * @param accountNumber - 마스킹할 계좌번호
 * @returns 마스킹된 계좌번호
 */
export function maskAccountNumber(accountNumber: string | number): string {
  // 입력 값 유효성 검사
  if (accountNumber === null || accountNumber === undefined) {
    return '';
  }

  // 문자열로 변환
  const value = String(accountNumber);

  // 숫자만 추출
  const digitsOnly = value.replace(/\D/g, '');
  // 숫자 길이가 4자리 이하인 경우 마스킹 제외
  if (digitsOnly.length <= 4) {
    return value;
  }

  // 문자 배열로 변환
  const chars = value.split('');
  // 마스킹 제외할 마지막 4자리 숫자 카운터
  let digitsToKeep = 4;

  // 뒤에서부터 순회하며 마스킹 처리
  for (let i = chars.length - 1; i >= 0; i--) {
    // 현재 문자가 숫자인지 확인
    if (/\d/.test(chars[i])) {
      // 제외할 숫자 카운터가 남아있으면 감소
      if (digitsToKeep > 0) {
        digitsToKeep--;
      } else {
        // 카운터 소진 시 마스킹 문자로 대체
        chars[i] = DEFAULT_MASK_CHAR;
      }
    }
  }

  // 배열을 다시 문자열로 조합
  return chars.join('');
}
