import Joi from 'joi';

const gymSchema = Joi.object({
    name: Joi.object({
        ar: Joi.string().required(),
        en: Joi.string(),
    }).required(),
    description: Joi.object({
        ar: Joi.string().required(),
        en: Joi.string(),
    }).required(),
    photo: Joi.string(),
    plan: Joi.string().required(),
    branches: Joi.array().items(Joi.string()),
    contact: Joi.object({
        phone: Joi.string().required(),
        email: Joi.string().required(),
    }).required(),
});