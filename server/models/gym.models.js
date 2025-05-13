import pkg from 'mongoose';
const {model, models, Schema} = pkg;

const gymSchema = new Schema({
    name: {
        ar: { type: String, minlength: 1, maxlength: 250 },
        en: { type: String, minlength: 1, maxlength: 250 },
    },
    username: { type: String, required: true, unique: true, minlength: 1, maxlength: 50, match: /^[a-zA-Z0-9]+$/ },
    description: {
        ar: { type: String, minlength: 1, maxlength: 2500 },
        en: { type: String, minlength: 1, maxlength: 2500 },
    },
    photo: { type: String, },
    plan: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
    branches: [{type: Schema.Types.ObjectId, ref: 'Branch'}],
    contact: {
        phone: { type: String, required: true },
        email: { type: String, required: true, match: /.+@.+\\..+/ },
    },
    socialLinks: [{
        type: { type: String, enum: ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'] },
        url: { type: String, required: true },
    }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['active', 'trial', 'suspended'], default: 'trial' },
    isActive: { type: Boolean, default: false },
}, {timestamps: true});

const Gym = models.Gym || model('Gym', gymSchema);
export default Gym;