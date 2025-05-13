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

const verifyEmail = Joi.object({
    otp: Joi.number().required(),
})

const resendVerificationEmail = Joi.object({
    email: Joi.string().email().required(),
})

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(128)
})

const AuthValidation = {
    register: validate(register),
    verifyEmail: validate(verifyEmail),
    resendVerificationEmail: validate(resendVerificationEmail),
    login: validate(login),
}

export default AuthValidation;