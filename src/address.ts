import { DEFAULT_MASK_CHAR } from './constants';

/**
 * 주소 마스킹 처리
 * @param address - 마스킹할 주소
 * @returns 마스킹된 주소
 */
export function maskAddress(address: string): string {
  const maskChar = DEFAULT_MASK_CHAR;
  if (!address || typeof address !== 'string') {
    return '';
  }

  const parts = address.trim().split(/\s+/);

  if (parts.length <= 2) {
    return address; // 시/도, 구/군 정보만 있는 경우 마스킹하지 않음
  }

  const visiblePart = parts.slice(0, 2).join(' ');
  const maskedLength = address.length - visiblePart.length - 1; // -1 for the space

  if (maskedLength <= 0) {
    return visiblePart;
  }

  const maskedPart = maskChar.repeat(maskedLength);

  return `${visiblePart} ${maskedPart}`;
}
