/**
 * 주소 마스킹 처리
 * @param address - 마스킹할 주소
 * @param maskChar - 마스킹에 사용할 문자 (기본값: '*')
 * @returns 마스킹된 주소
 */
export function maskAddress(address: string, maskChar: string = '*'): string {
  if (!address || typeof address !== 'string') {
    return '';
  }

  // 주소를 공백으로 분리
  const parts = address.trim().split(/\s+/);

  if (parts.length === 0) {
    return address;
  }

  // 첫 2개 부분(시/도, 구/군)은 유지하고 나머지는 마스킹
  if (parts.length <= 2) {
    return address;
  }

  const visibleParts = parts.slice(0, 2);
  const maskedParts = parts.slice(2).map(part => {
    // 숫자만 있는 경우 (동/호수 등)
    if (/^\d+$/.test(part)) {
      return maskChar.repeat(part.length);
    }
    // 문자가 포함된 경우 첫 글자만 보이고 나머지 마스킹
    if (part.length <= 2) {
      return part[0] + maskChar.repeat(part.length - 1);
    }
    return part[0] + maskChar.repeat(part.length - 1);
  });

  return [...visibleParts, ...maskedParts].join(' ');
}

