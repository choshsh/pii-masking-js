const { describe, it } = require('node:test');
const assert = require('node:assert');
const { maskEmail } = require('../dist/index.js');

describe('maskEmail', () => {
  it('일반 이메일 마스킹', () => {
    const result = maskEmail('user@example.com');
    assert.strictEqual(result, 'us**@example.com');
  });

  it('긴 이메일 주소 마스킹', () => {
    const result = maskEmail('verylongemail@example.com');
    assert.strictEqual(result, 've***********@example.com');
  });

  it('짧은 이메일 주소 마스킹 (1글자)', () => {
    const result = maskEmail('a@example.com');
    assert.strictEqual(result, '*@example.com');
  });

  it('짧은 이메일 주소 마스킹 (2글자)', () => {
    const result = maskEmail('ab@example.com');
    assert.strictEqual(result, '**@example.com');
  });

  it('짧은 이메일 주소 마스킹 (3글자)', () => {
    const result = maskEmail('abc@example.com');
    assert.strictEqual(result, 'ab*@example.com');
  });

  it('@ 기호 없는 경우', () => {
    const result = maskEmail('notanemail');
    assert.strictEqual(result, 'notanemail');
  });

  it('빈 문자열 처리', () => {
    const result = maskEmail('');
    assert.strictEqual(result, '');
  });
});
