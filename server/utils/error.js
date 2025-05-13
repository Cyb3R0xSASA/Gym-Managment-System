import { HTTP_STATUS } from "../config/constants.js";
class AppError extends Error {
    constructor() {
        super();
    };

    create(statusText = HTTP_STATUS.ERROR, statusCode = 400, data=null, message=undefined) {
        this.statusText = statusText;
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        return this;
    };
};

const errorMessageFormat = (error) => {
    return error.details[0].message.replaceAll('"', '');
};

const errorMessage = new AppError();

export {
    errorMessageFormat,
    errorMessage,
};