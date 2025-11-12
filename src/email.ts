import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 이메일 주소 마스킹 처리
 * @param email - 마스킹할 이메일 주소
 * @returns 마스킹된 이메일 주소
 */
export function maskEmail(email: string): string {
  // 입력 값 유효성 및 '@' 포함 여부 검사
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return email;
  }

  // '@' 기준으로 로컬 파트와 도메인 분리
  const [localPart, domain] = email.split('@');
  const len = localPart.length;

  // 로컬 파트 처음 2글자만 노출 (단, 2글자 초과 시)
  const visibleLength = len > 2 ? 2 : 0;
  const maskedLocalPart =
    localPart.slice(0, visibleLength) +
    DEFAULT_MASK_CHAR.repeat(len - visibleLength);

  // 마스킹된 로컬 파트와 도메인 조합
  return `${maskedLocalPart}@${domain}`;
}
