import Joi from 'joi';
import { validate } from '../../utils/validate.js';

const commentSchema = Joi.object({
    content: Joi.string().min(1).max(2500).required(),
});

const messageSchema = Joi.object({
    name: Joi.string().min(1).max(250).required(),
    email: Joi.string().email(),
    phone: Joi.string().required(),
    message: Joi.string().min(1).max(2500).required(),
});

const ServicesValidation = {
    commentSchema: validate(commentSchema),
    messageSchema: validate(messageSchema),
};

export default ServicesValidation;
