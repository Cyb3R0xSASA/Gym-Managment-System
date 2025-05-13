import { errorMessage } from './error.js';
import { HTTP_STATUS } from '../config/constants.js';

const validate = (schema) => {
    return (req, _, next) => {
        const { error } = schema.validate(req.body);
        const message = error ? 'l2wa49h5': '9ka4gf04';
        if (error || !req.body) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, message));
        next();
    }
}

export {
    validate
}