import JWTMethods from "../utils/jwt.js";
import { HTTP_STATUS } from "../config/constants.js";
import { sendError } from "../utils/error.js";

const protect = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return sendError(res, HTTP_STATUS.UNAUTHORIZED, "Authentication required. Please log in.", "auth_missing_token");
    }

    const decoded = JWTMethods.verifyToken(token, 'SECRET');
    if (!decoded) {
        return sendError(res, HTTP_STATUS.UNAUTHORIZED, "Invalid or expired token. Please log in again.", "auth_invalid_token");
    }

    req.user = decoded;
    next();
};

const role = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return sendError(res, HTTP_STATUS.UNAUTHORIZED, "You don't have permission to access this resource.", "auth_forbidden_role");
        }
        next();
    };
};

const isActive = (req, res, next) => {
    const user = req.user;
    if (!user.isActive) {
        return sendError(res, HTTP_STATUS.UNAUTHORIZED, "Your account is not activated. Please verify your email.", "auth_inactive_account");
    }
    next();
};

export { protect, isActive, role };
