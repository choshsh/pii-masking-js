# pii-masking-js

개인식별정보(PII: Personally Identifiable Information) 마스킹을 위한 경량 JavaScript/TypeScript 라이브러리입니다.

## 특징

- ✨ **Zero Dependencies**: 외부 의존성 없음
- 🔒 **Type-Safe**: TypeScript로 작성되어 완전한 타입 지원
- 📦 **Dual Package**: CommonJS와 ES Modules 모두 지원
- 🚀 **Node 14+**: Node.js 14 이상 모든 버전 지원
- 🎯 **경량**: 최소한의 코드로 구현

## 설치

```bash
npm install pii-masking-js
```

```bash
yarn add pii-masking-js
```

```bash
pnpm add pii-masking-js
```

## 사용법

### ES Modules

```javascript
import { maskPhone, maskEmail, maskRnn, maskAddress, maskCardNumber, maskAccountNumber } from 'pii-masking-js';

console.log(maskPhone('010-1234-5678')); // 010-****-5678
console.log(maskEmail('user@example.com')); // use*@example.com
console.log(maskRnn('901231-1234567')); // 901231-*******
console.log(maskCardNumber('1234-5678-9012-3456')); // 1234-56******-3456
console.log(maskAccountNumber('123-456-789012')); // 123******012
console.log(maskAddress('서울시 강남구 테헤란로 123')); // 서울시 강남구 테****** ***
```

### CommonJS

```javascript
const { maskPhone, maskEmail, maskRnn } = require('pii-masking-js');

console.log(maskPhone('010-1234-5678')); // 010-****-5678
```

### TypeScript

```typescript
import { maskPhone, maskEmail, MaskOptions } from 'pii-masking-js';

const phone: string = maskPhone('010-1234-5678');
const email: string = maskEmail('user@example.com', '#'); // 커스텀 마스킹 문자
```

## API

### maskPhone(phone: string, maskChar?: string): string

전화번호를 마스킹합니다.

```javascript
maskPhone('010-1234-5678'); // '010-****-5678'
maskPhone('02-123-4567'); // '02-***-4567'
maskPhone('031-1234-5678'); // '031-****-5678'
maskPhone('010-1234-5678', 'X'); // '010-XXXX-5678'
```

### maskEmail(email: string, maskChar?: string): string

이메일 주소를 마스킹합니다.

```javascript
maskEmail('user@example.com'); // 'use*@example.com'
maskEmail('verylongemail@example.com'); // 'ver*************@example.com'
maskEmail('ab@example.com'); // 'a*@example.com'
maskEmail('test@example.com', '#'); // 'tes#@example.com'
```

### maskRnn(rnn: string, maskChar?: string): string

주민등록번호(RRN)를 마스킹합니다.

```javascript
maskRnn('901231-1234567'); // '901231-*******'
maskRnn('9012311234567'); // '901231-*******'
maskRnn('901231-1234567', 'X'); // '901231-XXXXXXX'
```

### maskAddress(address: string, maskChar?: string): string

주소를 마스킹합니다. 시/도와 구/군은 유지하고 나머지를 마스킹합니다.

```javascript
maskAddress('서울특별시 강남구 테헤란로 123'); // '서울특별시 강남구 테****** ***'
maskAddress('서울시 강남구 101동 202호'); // '서울시 강남구 *** ***'
```

### maskCardNumber(cardNumber: string, maskChar?: string): string

카드번호를 마스킹합니다. 앞 6자리와 뒤 4자리만 보이고 나머지를 마스킹합니다.

```javascript
maskCardNumber('1234567890123456'); // '1234-56******-3456'
maskCardNumber('1234-5678-9012-3456'); // '1234-56******-3456'
maskCardNumber('1234567890123456', 'X'); // '1234-56XXXXXX-3456'
```

### maskAccountNumber(accountNumber: string, maskChar?: string): string

계좌번호를 마스킹합니다. 앞 3자리와 뒤 3자리만 보이고 나머지를 마스킹합니다.

```javascript
maskAccountNumber('123-456-789012'); // '123******012'
maskAccountNumber('123456789012'); // '123******012'
maskAccountNumber('123456789012', 'X'); // '123XXXXXX012'
```

## 파라미터

모든 함수는 선택적으로 두 번째 파라미터로 마스킹 문자를 받습니다.

- `maskChar` (선택, 기본값: `'*'`): 마스킹에 사용할 문자

## 브라우저 지원

이 라이브러리는 Node.js 환경을 위해 설계되었습니다. 브라우저에서 사용하려면 번들러(Webpack, Rollup 등)를 사용하세요.

## 라이선스

MIT

## 기여

이슈와 Pull Request는 언제나 환영합니다!

