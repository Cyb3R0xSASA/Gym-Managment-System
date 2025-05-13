import { HTTP_STATUS, OTHER } from "../../config/constants.js";

export const routeError = (req, res, __) =>{
    console.log('first')
    res.status(404).json({ status: HTTP_STATUS.NOT_FOUND, message: `Not Found - ${OTHER.CORS_ORIGIN}${req.originalUrl}`, data: null })
}