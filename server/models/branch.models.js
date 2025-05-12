import pkg from 'mongoose';
const {model, models, Schema} = pkg;

const branchSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    gym: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
}, {timestamps: true});

const Branch = models.Branch || model('Branch', branchSchema);
export default Branch;