const { describe, it } = require('node:test');
const assert = require('node:assert');
const { maskCardNumber } = require('../dist/index.js');

describe('maskCardNumber', () => {
  it('16자리 카드번호 마스킹 (하이픈 없음)', () => {
    const result = maskCardNumber('1234567890123456');
    assert.strictEqual(result, '1234-5678-9012-3456'.replace(/5678-9012/, '******'));
  });

  it('16자리 카드번호 마스킹 (하이픈 있음)', () => {
    const result = maskCardNumber('1234-5678-9012-3456');
    assert.strictEqual(result, '1234-5678-9012-3456'.replace(/5678-9012/, '******'));
  });

  it('짧은 카드번호 (잘못된 형식)', () => {
    const result = maskCardNumber('12345');
    assert.strictEqual(result, '12345');
  });

  it('빈 문자열 처리', () => {
    const result = maskCardNumber('');
    assert.strictEqual(result, '');
  });

  it('커스텀 마스킹 문자 사용', () => {
    const result = maskCardNumber('1234567890123456', 'X');
    const expected = '123456XXXXXX3456';
    assert.ok(result.replace(/-/g, '') === expected);
  });
});

