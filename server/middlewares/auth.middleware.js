import JWTMethods from "../utils/jwt.js";
import { errorMessage } from "../utils/error.js";
import { HTTP_STATUS } from "../config/constants.js";

const protect = (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log('cookies: ', req.cookies.accessToken)
    if(!token) return next(errorMessage.create(HTTP_STATUS.UNAUTHORIZED, 401, null, 'o1t6ue44'));

    const decoded = JWTMethods.verifyToken(token, 'SECRET');
    if(!decoded) return next(errorMessage.create(HTTP_STATUS.UNAUTHORIZED, 401, null, 'o1t6ue44'));

    req.user = decoded;
    next();
};

const role = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) return next(errorMessage.create(HTTP_STATUS.UNAUTHORIZED, 401, null, 'o1t6ue44'));
        next();
    }
};

const isActive = (req, res, next) => {
    const user = req.user;
    if(!user.isActive) return next(errorMessage.create(HTTP_STATUS.UNAUTHORIZED, 401, null, 'o1t6ue44'));
    next();
}

export { protect, isActive, role };