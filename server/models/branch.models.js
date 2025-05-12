import pkg from 'mongoose';
const {model, models, Schema} = pkg;

const branchSchema = new Schema({
    name: { type: String, unique: true, required: true, minlength: 1, maxlength: 250 },
    address: { type: String, required: true, minlength: 1, maxlength: 250 },
    gym: { type: Schema.Types.ObjectId, ref: 'Gym', required: true, unique: true },
}, {timestamps: true});

const Branch = models.Branch || model('Branch', branchSchema);
export default Branch;