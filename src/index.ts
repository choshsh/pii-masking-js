import { maskPhoneOrTel } from './phoneOrTel';
import { maskEmail } from './email';
import { maskRnn } from './rnn';
import { maskAddress } from './address';
import { maskCardNumber } from './cardNumber';
import { maskAccountNumber } from './accountNumber';

// Named exports
export { maskPhoneOrTel } from './phoneOrTel';
export { maskEmail } from './email';
export { maskRnn } from './rnn';
export { maskAddress } from './address';
export { maskCardNumber } from './cardNumber';
export { maskAccountNumber } from './accountNumber';

// 기본 export
export default {
  maskPhone: maskPhoneOrTel,
  maskEmail,
  maskRnn,
  maskAddress,
  maskCardNumber,
  maskAccountNumber,
};
