/**
 * 카드번호 마스킹 처리
 * @param cardNumber - 마스킹할 카드번호
 * @param maskChar - 마스킹에 사용할 문자 (기본값: '*')
 * @returns 마스킹된 카드번호
 */
export function maskCardNumber(cardNumber: string, maskChar: string = '*'): string {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return '';
  }

  // 숫자만 추출
  const numbers = cardNumber.replace(/\D/g, '');

  if (numbers.length < 12 || numbers.length > 19) {
    // 일반적인 카드번호 길이가 아니면 원본 반환
    return cardNumber;
  }

  // 처음 6자리와 마지막 4자리만 보이고 나머지는 마스킹
  const first = numbers.slice(0, 6);
  const last = numbers.slice(-4);
  const middleLength = numbers.length - 10;

  // 4자리씩 그룹핑하여 반환
  const masked = first + maskChar.repeat(middleLength) + last;
  const formatted = masked.match(/.{1,4}/g)?.join('-') || masked;

  return formatted;
}

