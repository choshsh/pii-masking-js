const { describe, it } = require('node:test');
const assert = require('node:assert');
const { maskAccountNumber } = require('../dist/index.js');

describe('maskAccountNumber', () => {
  it('일반 계좌번호 마스킹 (하이픈 있음)', () => {
    const result = maskAccountNumber('123-456-789012');
    assert.strictEqual(result, '***-***-**9012');
  });

  it('계좌번호 마스킹 (하이픈 없음)', () => {
    const result = maskAccountNumber('123456789012');
    assert.strictEqual(result, '********9012');
  });

  it('짧은 계좌번호 (4자리 이하)', () => {
    assert.strictEqual(maskAccountNumber('1234'), '1234');
    assert.strictEqual(maskAccountNumber('123'), '123');
  });

  it('5자리 계좌번호 마스킹', () => {
    assert.strictEqual(maskAccountNumber('12345'), '*2345');
  });

  it('8자리 계좌번호 마스킹', () => {
    assert.strictEqual(maskAccountNumber('12345678'), '****5678');
  });

  it('빈 문자열 처리', () => {
    const result = maskAccountNumber('');
    assert.strictEqual(result, '');
  });

  it('null 또는 undefined 처리', () => {
    assert.strictEqual(maskAccountNumber(null), '');
    assert.strictEqual(maskAccountNumber(undefined), '');
  });

  describe('은행별 계좌번호 마스킹', () => {
    it('우리은행 계좌번호 (13자리)', () => {
      const result = maskAccountNumber('1002-123-456789');
      assert.strictEqual(result, '****-***-**6789');
    });

    it('국민은행 계좌번호 (12자리)', () => {
      const result = maskAccountNumber('123-45-6789-123');
      assert.strictEqual(result, '***-**-***9-123');
    });

    it('국민은행 계좌번호 (14자리)', () => {
      const result = maskAccountNumber('123456-78-912345');
      assert.strictEqual(result, '******-**-**2345');
    });

    it('신한은행 계좌번호 (12자리)', () => {
      const result = maskAccountNumber('110-123-456789');
      assert.strictEqual(result, '***-***-**6789');
    });

    it('하나은행 계좌번호 (12자리)', () => {
      const result = maskAccountNumber('123-456789-123');
      assert.strictEqual(result, '***-*****9-123');
    });

    it('농협은행 계좌번호 (13자리)', () => {
      const result = maskAccountNumber('302-1234-5678-91');
      assert.strictEqual(result, '***-****-**78-91');
    });
  });
});
