# @cho_o/pii-masking-js

개인식별정보(PII: Personally Identifiable Information) 마스킹을 위한 경량 JavaScript/TypeScript 라이브러리입니다.

## 특징

- ✨ **Zero Dependencies**: 외부 의존성 없음
- 🔒 **Type-Safe**: TypeScript로 작성되어 완전한 타입 지원
- 📦 **Dual Package**: CommonJS와 ES Modules 모두 지원
- 🚀 **Node 16+**: Node.js 16 이상 모든 버전 지원
- 🎯 **경량**: 최소한의 코드로 구현

## 설치

```bash
npm install @cho_o/pii-masking-js
```

```bash
yarn add @cho_o/pii-masking-js
```

```bash
pnpm add @cho_o/pii-masking-js
```

## 사용법

### ES Modules

```javascript
import {
  maskPhoneOrTel,
  maskEmail,
  maskRnn,
  maskAddress,
  maskCardNumber,
  maskAccountNumber,
} from '@cho_o/pii-masking-js';

console.log(maskPhoneOrTel('010-1234-5678')); // 010-12**-56**
console.log(maskEmail('user@example.com')); // us**@example.com
console.log(maskRnn('901231-1234567')); // 901231-1******
console.log(maskCardNumber('1234-5678-9012-3456')); // 1234-****-****-3456
console.log(maskAccountNumber('123-456-789012')); // ***-***-**9012
console.log(maskAddress('서울시 강남구 테헤란로 123')); // 서울시 강남구 *** ***
```

### CommonJS

```javascript
const { maskPhoneOrTel, maskEmail, maskRnn } = require('@cho_o/pii-masking-js');

console.log(maskPhoneOrTel('010-1234-5678')); // 010-12**-56**
```

### TypeScript

```typescript
import { maskPhoneOrTel, maskEmail } from '@cho_o/pii-masking-js';

const phone: string = maskPhoneOrTel('010-1234-5678');
const email: string = maskEmail('user@example.com');
```

## API

### maskPhoneOrTel(phone: string): string

전화번호를 마스킹합니다.

```javascript
maskPhoneOrTel('010-1234-5678'); // '010-12**-56**'
maskPhoneOrTel('02-123-4567'); // '02-1**-45**'
maskPhoneOrTel('031-1234-5678'); // '031-12**-56**'
```

### maskEmail(email: string): string

이메일 주소를 마스킹합니다.

```javascript
maskEmail('user@example.com'); // 'us**@example.com'
maskEmail('verylongemail@example.com'); // 've***********@example.com'
maskEmail('ab@example.com'); // '**@example.com'
maskEmail('test@example.com'); // 'te**@example.com'
```

### maskRnn(rnn: string): string

주민등록번호(RRN)를 마스킹합니다.

```javascript
maskRnn('901231-1234567'); // '901231-1******'
maskRnn('9012311234567'); // '9012311******'
```

### maskAddress(address: string): string

주소를 마스킹합니다. 시/도와 구/군은 유지하고 나머지를 마스킹합니다.

```javascript
maskAddress('서울특별시 강남구 테헤란로 123'); // '서울특별시 강남구 *** ***'
maskAddress('서울시 강남구 101동 202호'); // '서울시 강남구 *** ***'
```

### maskCardNumber(cardNumber: string): string

카드번호를 마스킹합니다. 앞 4자리와 뒤 4자리만 보이고 나머지를 마스킹합니다.

```javascript
maskCardNumber('1234567890123456'); // '1234-****-****-3456'
maskCardNumber('1234-5678-9012-3456'); // '1234-****-****-3456'
```

### maskAccountNumber(accountNumber: string): string

계좌번호를 마스킹합니다. 뒤 4자리만 보이고 나머지를 마스킹합니다.

```javascript
maskAccountNumber('123-456-789012'); // '***-***-**9012'
maskAccountNumber('123456789012'); // '********9012'
```

## 마스킹 규칙

각 함수는 고정된 마스킹 문자(`*`)를 사용하여 개인정보를 보호합니다.

## 브라우저 지원

이 라이브러리는 Node.js 환경을 위해 설계되었습니다. 브라우저에서 사용하려면 번들러(Webpack, Rollup 등)를 사용하세요.

## 라이선스

MIT

## 기여

이슈와 Pull Request는 언제나 환영합니다!
