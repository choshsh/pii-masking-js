const { describe, it } = require('node:test');
const assert = require('node:assert');
const { maskAddress } = require('../dist/index.js');

describe('maskAddress', () => {
  it('전체 주소 마스킹', () => {
    const result = maskAddress('서울특별시 강남구 테헤란로 123 빌딩 101호');
    assert.strictEqual(result, '서울특별시 강남구 테******** *** ***');
  });

  it('짧은 주소 마스킹 (2부분 이하)', () => {
    const result = maskAddress('서울특별시 강남구');
    assert.strictEqual(result, '서울특별시 강남구');
  });

  it('숫자가 포함된 주소 마스킹', () => {
    const result = maskAddress('서울시 강남구 101동 202호');
    assert.strictEqual(result, '서울시 강남구 *** ***');
  });

  it('빈 문자열 처리', () => {
    const result = maskAddress('');
    assert.strictEqual(result, '');
  });

  it('커스텀 마스킹 문자 사용', () => {
    const result = maskAddress('서울시 강남구 테헤란로 123', '#');
    assert.strictEqual(result, '서울시 강남구 테##### ###');
  });
});

