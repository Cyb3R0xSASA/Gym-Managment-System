import pkg from 'mongoose';
const {model, models, Schema} = pkg;

const commentSchema = new Schema({
    content: { type: String, required: true, minlength: 1, maxlength: 2500 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {timestamps: true});

const messageSchema = new Schema({
    name: { type: String, required: true, minlength: 1, maxlength: 250 },
    email: { type: String },
    phone: { type: String, required: true},
    message: { type: String, required: true, minlength: 1, maxlength: 2500 },
}, {timestamps: true});

const Message = models.Message || model('Message', messageSchema);
const Comment = models.Comment || model('Comment', commentSchema);
export {Message, Comment};