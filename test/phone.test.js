const { describe, it } = require('node:test');
const assert = require('node:assert');
const { maskPhoneOrTel } = require('../dist/index.js');

describe('maskPhoneOrTel', () => {
  it('휴대폰 번호 마스킹 (하이픈 있음)', () => {
    const result = maskPhoneOrTel('010-1234-5678');
    assert.strictEqual(result, '010-12**-56**');
  });

  it('휴대폰 번호 마스킹 (하이픈 없음)', () => {
    const result = maskPhoneOrTel('01012345678');
    assert.strictEqual(result, '01012**56**');
  });

  it('일반 전화번호 마스킹 (서울)', () => {
    const result = maskPhoneOrTel('02-123-4567');
    assert.strictEqual(result, '02-1**-45**');
  });

  it('일반 전화번호 마스킹 (지역번호 3자리) (중간 번호 3자리)', () => {
    const result = maskPhoneOrTel('031-123-5678');
    assert.strictEqual(result, '031-12*-56**');
  });
  it('일반 전화번호 마스킹 (지역번호 3자리) (중간 번호 4자리)', () => {
    const result = maskPhoneOrTel('031-1234-5678');
    assert.strictEqual(result, '031-12**-56**');
  });

  it('빈 문자열 처리', () => {
    const result = maskPhoneOrTel('');
    assert.strictEqual(result, '');
  });

  it('null/undefined 처리', () => {
    const result = maskPhoneOrTel(null);
    assert.strictEqual(result, '');
  });

  it('8자리 대표번호 마스킹 (하이픈 있음)', () => {
    const result = maskPhoneOrTel('1588-1234');
    assert.strictEqual(result, '1588-12**');
  });

  it('8자리 대표번호 마스킹 (하이픈 없음)', () => {
    const result = maskPhoneOrTel('15881234');
    assert.strictEqual(result, '158812**');
  });

  it('규칙에 맞지 않는 짧은 번호', () => {
    const result = maskPhoneOrTel('123-4567');
    assert.strictEqual(result, '123-4567');
  });
});
