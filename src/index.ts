import { maskPhone } from './phone';
import { maskEmail } from './email';
import { maskRnn } from './rnn';
import { maskAddress } from './address';
import { maskCardNumber } from './cardNumber';
import { maskAccountNumber } from './accountNumber';

// Named exports
export { maskPhone } from './phone';
export { maskEmail } from './email';
export { maskRnn } from './rnn';
export { maskAddress } from './address';
export { maskCardNumber } from './cardNumber';
export { maskAccountNumber } from './accountNumber';

// 기본 export
export default {
  maskPhone,
  maskEmail,
  maskRnn,
  maskAddress,
  maskCardNumber,
  maskAccountNumber,
};

// 타입 정의
export interface MaskOptions {
  maskChar?: string;
}

