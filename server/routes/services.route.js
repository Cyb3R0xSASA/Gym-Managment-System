import { Router } from 'express';
import {Comments, createMessage} from '../controllers/services.controller.js';
import ServicesValidation from '../middlewares/validation/services.validation.js';
const router = Router();

router.get('/comments', Comments.getComments);
router.post('/comments', ServicesValidation.commentSchema, Comments.createComment);
router.put('/comments/:id', Comments.updateComment);
router.delete('/comments/:id', Comments.deleteComment);

router.post('/message', ServicesValidation.messageSchema, createMessage);

export default router;