const { describe, it } = require('node:test');
const assert = require('node:assert');
const { maskAddress } = require('../dist/index.js');

describe('maskAddress', () => {
  it('상세 주소 마스킹 (시/군/구 이후)', () => {
    const result = maskAddress('서울특별시 강남구 테헤란로 123 빌딩 101호');
    assert.strictEqual(result, '서울특별시 강남구 *** *** *** ***');
  });

  it('짧은 주소는 마스킹하지 않음 (2부분 이하)', () => {
    const result = maskAddress('서울특별시 강남구');
    assert.strictEqual(result, '서울특별시 강남구');
  });

  it('동, 호수 주소 마스킹', () => {
    const result = maskAddress('서울시 강남구 101동 202호');
    assert.strictEqual(result, '서울시 강남구 *** ***');
  });

  it('빈 문자열은 그대로 반환', () => {
    const result = maskAddress('');
    assert.strictEqual(result, '');
  });

  it('null/undefined는 빈 문자열로 처리', () => {
    assert.strictEqual(maskAddress(null), '');
    assert.strictEqual(maskAddress(undefined), '');
  });

  it('공백 없는 주소는 마스킹하지 않음 (1부분)', () => {
    const result = maskAddress('서울시강남구논현동');
    assert.strictEqual(result, '서울시강남구논현동');
  });

  it('매우 상세한 아파트 주소 마스킹', () => {
    const result = maskAddress('경기도 성남시 분당구 정자동 178-1 상록마을 우성아파트 301동 1203호');
    assert.strictEqual(result, '경기도 성남시 *** *** *** *** *** *** ***');
  });

  it('도로명 주소 마스킹 (쉼표 포함)', () => {
    const result = maskAddress('부산광역시 해운대구 센텀중앙로 78, 센텀그린타워 1501호');
    assert.strictEqual(result, '부산광역시 해운대구 *** *** *** ***');
  });
});
