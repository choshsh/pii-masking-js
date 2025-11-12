const { describe, it } = require('node:test');
const assert = require('node:assert');
const { maskAccountNumber } = require('../dist/index.js');

describe('maskAccountNumber', () => {
  it('일반 계좌번호 마스킹', () => {
    const result = maskAccountNumber('123-456-789012');
    assert.strictEqual(result, '123******012');
  });

  it('계좌번호 마스킹 (하이픈 없음)', () => {
    const result = maskAccountNumber('123456789012');
    assert.strictEqual(result, '123******012');
  });

  it('짧은 계좌번호', () => {
    const result = maskAccountNumber('12345');
    assert.strictEqual(result, '12345');
  });

  it('빈 문자열 처리', () => {
    const result = maskAccountNumber('');
    assert.strictEqual(result, '');
  });
});
