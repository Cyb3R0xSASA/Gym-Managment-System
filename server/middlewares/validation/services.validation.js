import Joi from 'joi';
import { errorMessage } from '../../utils/error.js';
import { HTTP_STATUS } from '../../config/constants.js';

const commentSchema = Joi.object({
    content: Joi.string().min(1).max(2500).required(),
});

const messageSchema = Joi.object({
    name: Joi.string().min(1).max(250).required(),
    email: Joi.string().email(),
    phone: Joi.string().required(),
    message: Joi.string().min(1).max(2500).required(),
});

const validateComment = (req, _, next) => {
    const { error } = commentSchema.validate(req.body);
    const message = error ? 'l2wa49h5': '9ka4gf04';
    if (error || !req.body) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, message));
    next();
};

const validateMessage = (req, _, next) => {
    const { error } = messageSchema.validate(req.body);
    const message = error ? 'l2wa49h5': '9ka4gf04';
    if (error || !req.body) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, message));
    next();
};

export {
    validateComment,
    validateMessage,
};
