/**
 * 주소 마스킹 처리
 * @param address - 마스킹할 주소
 * @returns 마스킹된 주소
 */
export function maskAddress(address: string): string {
  if (!address || typeof address !== 'string') {
    return '';
  }

  const parts = address.trim().split(/\s+/);

  if (parts.length <= 2) {
    return address; // 시/도, 구/군 정보만 있는 경우 마스킹하지 않음
  }

  const visiblePart = parts.slice(0, 2).join(' ');
  const maskedPart = '*** '.repeat(parts.length - 2).trimEnd();

  return `${visiblePart} ${maskedPart}`;
}
