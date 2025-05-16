import Joi from 'joi';
import { validate } from '../../utils/validate.js';

const gymSchema = Joi.object({
    name: Joi.object({
        ar: Joi.string().required(),
        en: Joi.string(),
    }).required(),
    username: Joi.string().alphanum().min(3).max(30).lowercase().required(),
    description: Joi.object({
        ar: Joi.string().min(1).max(2500).required(),
        en: Joi.string().min(1).max(2500),
    }).required(),
    // photo: Joi.string().required(),
    // plan: Joi.string().required(),
    // branches: Joi.array().items(Joi.string()),
    // contact: Joi.object({
    //     phone: Joi.string().required(),
    //     email: Joi.string().required(),
    // }).required(),
});

const GymValidation = {
    gymSchema: validate(gymSchema),
};

export default GymValidation;