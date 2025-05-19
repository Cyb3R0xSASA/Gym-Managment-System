// import { HTTP_STATUS } from "../config/constants.js";
// class AppError extends Error {
//     constructor() {
//         super();
//     };

//     create(statusText = HTTP_STATUS.ERROR, statusCode = 400, data=null, message=undefined) {
//         this.statusText = statusText;
//         this.statusCode = statusCode;
//         this.status = statusCode >= 200 && statusCode < 300 ? 1 : 0;  
//         this.data = data;
//         this.message = message;
//         return this;
//     };
// };

// const errorMessageFormat = (error) => {
//     return error.details[0].message.replaceAll('"', '');
// };

// const errorMessage = new AppError();

import { SERVER } from "../config/constants.js";
import { HTTP_STATUS } from "../config/constants.js";

export const sendSuccess = (res, message, data = {}, statusCode = HTTP_STATUS.OK) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const sendError = (
    res,
    message,
    errorCode = "UNKNOWN_ERROR",
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errors = []
) => {
    const isDev = SERVER.NODE_ENV !== "production";

    return res.status(statusCode).json({
        success: false,
        message,
        errorCode,
        ...(isDev && errors.length ? { errors } : {}),
    });
};

export const methodError = (asyncFn) => (req, res, next) =>
    asyncFn(req, res, next).catch((error) => next(error));

export const errorResponse = (error, req, res, next) => {
    const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal Server Error";
    const data = error.data || [];

    return sendError(res, message, "UNKNOWN_ERROR", statusCode, data);
};

export const routeError = (req, res, next) => {
    const isDev = SERVER.NODE_ENV !== "production";

    return sendError(
        res,
        isDev ? `Route Not Found: ${req.method} ${req.originalUrl}` : "Resource not found",
        "ROUTE_NOT_FOUND",
        HTTP_STATUS.NOT_FOUND,
        isDev ? [`${req.method} ${req.originalUrl}`] : []
    );
};
