import Joi from 'joi';
import { HTTP_STATUS } from '../../config/constants.js';
import { errorMessage } from '../../utils/error.js';

const planSchema = Joi.object({
    name: Joi.object({ar: Joi.string().required(), en: Joi.string()}),
    description: Joi.object({ar: Joi.string().required(), en: Joi.string()}),
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

const validatePlan = (req, _, next) => {
    const { error } = planSchema.validate(req.body);
    const message = error ? 'l2wa49h5': '9ka4gf04';
    if (error || !req.body) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, message));
    next();
};

export default validatePlan;