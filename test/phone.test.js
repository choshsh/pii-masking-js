const { describe, it } = require('node:test');
const assert = require('node:assert');
const { maskPhone } = require('../dist/index.js');

describe('maskPhone', () => {
  it('휴대폰 번호 마스킹 (하이픈 있음)', () => {
    const result = maskPhone('010-1234-5678');
    assert.strictEqual(result, '010-****-5678');
  });

  it('휴대폰 번호 마스킹 (하이픈 없음)', () => {
    const result = maskPhone('01012345678');
    assert.strictEqual(result, '010-****-5678');
  });

  it('일반 전화번호 마스킹 (서울)', () => {
    const result = maskPhone('02-123-4567');
    assert.strictEqual(result, '02-***-4567');
  });

  it('일반 전화번호 마스킹 (지역번호 3자리)', () => {
    const result = maskPhone('031-1234-5678');
    assert.strictEqual(result, '031-****-5678');
  });

  it('빈 문자열 처리', () => {
    const result = maskPhone('');
    assert.strictEqual(result, '');
  });

  it('null/undefined 처리', () => {
    const result = maskPhone(null);
    assert.strictEqual(result, '');
  });

  it('커스텀 마스킹 문자 사용', () => {
    const result = maskPhone('010-1234-5678', 'X');
    assert.strictEqual(result, '010-XXXX-5678');
  });
});

