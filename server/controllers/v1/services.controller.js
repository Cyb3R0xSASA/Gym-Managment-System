import { methodError } from '../../middlewares/error/method.error.js';
import { HTTP_STATUS } from '../../config/constants.js';
import { Comment, Message } from '../../models/services.model.js';

const getComments = methodError(
    async (req, res) => {
        const comments = await Comment.find().populate({path: 'user', select: 'name photo'});
        res.status(200).json({
            status: HTTP_STATUS.SUCCESS,
            message: 'Comments fetched successfully',
            data: { comments },
        });
});

const createComment = methodError(
    async (req, res) => {
        const comment = await Comment.create(req.body);
        res.status(201).json({
            status: HTTP_STATUS.CREATED,
            message: 'Comment created successfully',
            data: { comment },
        });
});
const updateComment = methodError()
const deleteComment = methodError()

const createMessage = methodError(
    async (req, res) => {
        console.log(req.body)
        const message = await Message.create(req.body);
        res.status(201).json({
            status: HTTP_STATUS.SUCCESS,
            message: 'Message created successfully',
            data: { name: message.name, email: message.email, phone: message.phone, message: message.message },
        });
    }
);


const Comments = {
    getComments,
    createComment,
    updateComment,
    deleteComment,
};

export { Comments, createMessage };
