const errorResponse = (error, _, res, __) => {
    return res.status(error.statusCode || 400)
        .json({
            status: error.statusText,
            message: error.message,
            data: error.data,
        });
};

const methodError = (asyncFn) => 
    (req, res, next) => 
        asyncFn(req, res, next).catch((error) => next(error));

export {
    errorResponse,
    methodError,
};