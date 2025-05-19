import { sendError } from './error.js';
import { HTTP_STATUS } from '../config/constants.js';

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error || !req.body) {
            return sendError(
                res,
                'Enter fields error',
                'FIELDS_ERROR',
                400,
                error ? error.details.map(message => message.message.replaceAll('"', '')) : "Enter data",
            )
        }
        next();
    }
}

export {
    validate
}