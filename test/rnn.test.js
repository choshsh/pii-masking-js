const { describe, it } = require('node:test');
const assert = require('node:assert');
const { maskRnn } = require('../dist/index.js');

describe('maskRnn', () => {
  it('주민등록번호 마스킹 (하이픈 있음)', () => {
    const result = maskRnn('901231-1234567');
    assert.strictEqual(result, '901231-*******');
  });

  it('주민등록번호 마스킹 (하이픈 없음)', () => {
    const result = maskRnn('9012311234567');
    assert.strictEqual(result, '901231-*******');
  });

  it('잘못된 길이의 주민등록번호', () => {
    const result = maskRnn('12345');
    assert.strictEqual(result, '12345');
  });

  it('빈 문자열 처리', () => {
    const result = maskRnn('');
    assert.strictEqual(result, '');
  });

  it('커스텀 마스킹 문자 사용', () => {
    const result = maskRnn('901231-1234567', 'X');
    assert.strictEqual(result, '901231-XXXXXXX');
  });
});

