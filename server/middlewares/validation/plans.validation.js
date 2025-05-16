import Joi from 'joi';
import { validate } from '../../utils/validate.js';

const planSchema = Joi.object({
    name: Joi.object({
        ar: Joi.string().min(1).max(250).required(),
        en: Joi.string().min(1).max(250),
    }),
    description: Joi.object({
        ar: Joi.string().min(1).max(2500).required(),
        en: Joi.string().min(1).max(2500),
    }),
    monthlyPrice: Joi.number().min(0).required(),
    semiAnnualPrice: Joi.number().min(0).required(),
    annualPrice: Joi.number().min(0).required(),
    semiAnnualDiscount: Joi.number().min(0).required(),
    annualDiscount: Joi.number().min(0).required(),
    features: Joi.object({
        branches: Joi.number().min(1).required(),
        employeesPerBranch: Joi.number().min(1).required(),
        trainersPerBranch: Joi.number().min(1).required(),
        clientsPerBranch: Joi.number().min(1).required(),
    }).required(),
});

const PlansValidation = {
    planSchema: validate(planSchema),
};

export default PlansValidation;