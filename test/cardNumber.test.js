const { describe, it } = require('node:test');
const assert = require('node:assert');
const { maskCardNumber } = require('../dist/index.js');

describe('maskCardNumber', () => {
  it('16자리 카드번호 마스킹 (하이픈 없음)', () => {
    const result = maskCardNumber('1234567890123456');
    assert.strictEqual(result, '1234-****-****-3456');
  });

  it('16자리 카드번호 마스킹 (하이픈 있음)', () => {
    const result = maskCardNumber('1234-5678-9012-3456');
    assert.strictEqual(result, '1234-****-****-3456');
  });

  it('16자리 카드번호 마스킹 (숫자)', () => {
    const result = maskCardNumber(1234567890123456);
    assert.strictEqual(result, '1234-****-****-3456');
  });

  it('짧은 카드번호 (잘못된 형식)', () => {
    const result = maskCardNumber('12345');
    assert.strictEqual(result, '12345');
  });

  it('빈 문자열 처리', () => {
    const result = maskCardNumber('');
    assert.strictEqual(result, '');
  });

  it('신한카드 16자리 마스킹 (하이픈 없음)', () => {
    const result = maskCardNumber('4500123412341234');
    assert.strictEqual(result, '4500-****-****-1234');
  });

  it('신한카드 16자리 마스킹 (하이픈 있음)', () => {
    const result = maskCardNumber('4500-1234-1234-1234');
    assert.strictEqual(result, '4500-****-****-1234');
  });

  it('KB국민카드 16자리 마스킹 (하이픈 없음)', () => {
    const result = maskCardNumber('3560567890123456');
    assert.strictEqual(result, '3560-****-****-3456');
  });

  it('KB국민카드 16자리 마스킹 (하이픈 있음)', () => {
    const result = maskCardNumber('3560-5678-9012-3456');
    assert.strictEqual(result, '3560-****-****-3456');
  });

  it('삼성카드 16자리 마스킹 (하이픈 없음)', () => {
    const result = maskCardNumber('4048567890123456');
    assert.strictEqual(result, '4048-****-****-3456');
  });

  it('삼성카드 16자리 마스킹 (하이픈 있음)', () => {
    const result = maskCardNumber('4048-5678-9012-3456');
    assert.strictEqual(result, '4048-****-****-3456');
  });
});
