import { Types } from 'mongoose';
import { HTTP_STATUS } from '../config/constants.js';
import { errorMessage } from './error.js';

const checkId = (req, _, next) => {
    const { id } = req.params;
    if(!Types.ObjectId.isValid(id)) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 'mw56yn26'));
    next();
};

export default checkId;