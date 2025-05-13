import Joi from "joi";
import { validate } from "../../utils/validate.js";

const register = Joi.object({
    firstName: Joi.string().required().min(1).max(250),
    lastName: Joi.string().required().min(1).max(250),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(128)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')),
    
    gender: Joi.string().required().valid('male', 'female'),
    planId: Joi.string(),
    planType: Joi.string().valid('monthly', 'semiAnnual', 'annual'),
    code: Joi.string(),
    details: Joi.object({
        phone: Joi.string().min(10).max(15),
        address: Joi.string().min(10).max(250),
        birthDate: Joi.date(),
        height: Joi.number().min(100).max(300),
        weight: Joi.number().min(30).max(300),
        goal: Joi.string().valid('lose', 'gain', 'maintain'),
    }),
})

const AuthValidation = {
    register: validate(register),
}

export default AuthValidation;