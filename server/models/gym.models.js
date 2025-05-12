import pkg from 'mongoose';
const {model, models, Schema} = pkg;

const gymSchema = new Schema({
    name: {
        ar: { type: String},
        en: { type: String },
    },
    description: {
        ar: { type: String },
        en: { type: String },
    },
    photo: { type: String },
    plan: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
    branches: [{type: Schema.Types.ObjectId, ref: 'Branch', required: true}],
    contact: {
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },
    socialLinks: [{
        type: { type: String, enum: ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'] },
        url: { type: String, required: true },
    }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['active', 'trail', 'suspended'], default: 'trail' },
    isActive: { type: Boolean, default: false },
}, {timestamps: true});

const Gym = models.Gym || model('Gym', gymSchema);
export default Gym;