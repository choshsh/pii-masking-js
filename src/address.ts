// 주요 지역 약칭 배열
const REGIONS = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '세종',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
];

/**
 * 주소 마스킹 처리
 * @param address - 마스킹할 주소
 * @returns 마스킹된 주소
 */
export function maskAddress(address: string): string {
  // 입력 값 유효성 검사
  if (!address || typeof address !== 'string') {
    return '';
  }

  // 주소 앞뒤 공백 제거
  const trimmedAddress = address.trim();
  if (!trimmedAddress) {
    return '';
  }

  // 공백 기준 주소 분리
  const parts = trimmedAddress.split(/\s+/);

  // 주소 첫 부분이 지역명으로 시작하는지 확인
  const firstPart = parts[0];
  const startsWithRegion = REGIONS.some((region) => firstPart.startsWith(region));

  // 지역명 시작 여부에 따른 분기 처리
  if (startsWithRegion) {
    // 주소 어절이 2개 이하인 경우 마스킹 제외
    if (parts.length <= 2) {
      return trimmedAddress;
    }
    // '시/도 구/군' 이후 상세 주소 마스킹
    const visiblePart = parts.slice(0, 2).join(' ');
    const maskedPart = '*** '.repeat(parts.length - 2).trimEnd();
    return `${visiblePart} ${maskedPart}`;
  } else {
    // 지역명으로 시작하지 않으면 전체 마스킹
    return '*** '.repeat(parts.length).trimEnd();
  }
}
