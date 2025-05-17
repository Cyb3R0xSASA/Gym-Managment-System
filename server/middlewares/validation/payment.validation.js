import Joi from 'joi';
import { validate } from '../../utils/validate.js';

const checkout = Joi.object({
    planId: Joi.string(),
    planId: Joi.string().valid('monthly', 'semiAnnual', 'annual'),
});

const PaymentValidation = {
    checkout: validate(checkout)
};

export default PaymentValidation;