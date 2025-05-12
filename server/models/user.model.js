import pkg from 'mongoose';
import bcrypt from 'bcrypt';
const {model, models, Schema} = pkg;

const userSchema = new Schema({
    firstName: { type: String, required: true, minlength: 1, maxlength: 250 },
    lastName: { type: String, required: true, minlength: 1, maxlength: 250 },
    email: { type: String, required: true, unique: true, match: /.+@.+\\..+/ },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'employee', 'trainer', 'client'], required: true },
    gym: { type: Schema.Types.ObjectId, ref: 'Gym' },
    branch: { type: Schema.Types.ObjectId, ref: 'Branch' },
    photo: { type: String },
    gender: { type: String, enum: ['male', 'female'] },
    details: {
        phone: { type: String },
        address: { type: String },
        birthDate: { type: Date },
        height: { type: Number },
        weight: { type: Number },
        goal: { type: String, enum: ['lose', 'gain', 'maintain'] },
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    isActive: { type: Boolean, default: false },
}, {timestamps: true});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = models.User || model('User', userSchema);
export default User;