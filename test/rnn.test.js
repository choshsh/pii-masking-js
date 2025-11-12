const { describe, it } = require('node:test');
const assert = require('node:assert');
const { maskRnn } = require('../dist/index.js');

describe('maskRnn', () => {
  it('주민등록번호 마스킹 (하이픈 있음)', () => {
    const result = maskRnn('901231-1234567');
    assert.strictEqual(result, '901231-1******');
  });

  it('주민등록번호 마스킹 (하이픈 없음)', () => {
    const result = maskRnn('9012311234567');
    assert.strictEqual(result, '9012311******');
  });

  it('생년월일(6자리)만 있는 경우 맨 앞자리만 남기고 마스킹 처리', () => {
    const result = maskRnn('901231');
    assert.strictEqual(result, '9*****');
  });

  it('생년월일(8자리)만 있는 경우 맨 3자리만 남기고 마스킹 처리', () => {
    const result = maskRnn('19901231');
    assert.strictEqual(result, '199*****');
  });

  it('잘못된 길이의 주민등록번호', () => {
    const result = maskRnn('12345');
    assert.strictEqual(result, '12345');
  });

  it('빈 문자열 처리', () => {
    const result = maskRnn('');
    assert.strictEqual(result, '');
  });
});
