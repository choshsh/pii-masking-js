import { maskAccountNumber } from './accountNumber';
import { maskAddress } from './address';
import { maskCardNumber } from './cardNumber';
import { maskEmail } from './email';
import { maskPhoneOrTel } from './phoneOrTel';
import { maskRnn } from './rnn';

export { maskAccountNumber } from './accountNumber';
export { maskAddress } from './address';
export { maskCardNumber } from './cardNumber';
export { maskEmail } from './email';
export { maskPhoneOrTel } from './phoneOrTel';
export { maskRnn } from './rnn';

export default {
  maskPhone: maskPhoneOrTel,
  maskEmail,
  maskRnn,
  maskAddress,
  maskCardNumber,
  maskAccountNumber,
};
