import { Types } from "mongoose";
import { sendError } from "../utils/error.js";

export const checkId = (req, res, next, id) => {
    const ID = req?.params?.id || id;
    if(!Types.ObjectId.isValid(ID)){
        return sendError(
            res,
            "Invalid resource identifier.",
            "INVALID_ID",
            HTTP_STATUS.BAD_REQUEST,
            [`Invalid ObjectId: ${ID}`],
        );
    };
}