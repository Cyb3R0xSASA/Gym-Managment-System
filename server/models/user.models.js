import pkg from 'mongoose';
import bcrypt from 'bcrypt';
const { model, models, Schema } = pkg;

const userSchema = new Schema({
    firstName: { type: String, required: true, minlength: 1, maxlength: 250 },
    lastName: { type: String, required: true, minlength: 1, maxlength: 250 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'] },
    password: { type: String, required: true, minlength: 8, maxlength: 128, select: false, match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'] },
    role: { type: String, enum: ['admin', 'employee', 'trainer', 'client', 'sasa'], required: true },
    gym: { type: Schema.Types.ObjectId, ref: 'Gym' },
    branch: { type: Schema.Types.ObjectId, ref: 'Branch' },
    plan: { type: Schema.Types.ObjectId, ref: 'Plan' },
    isPaid: { type: Boolean, default: false },
    planType: { type: String, enum: ['monthly', 'yearly', 'semiAnnual'] },
    photo: { type: String },
    gender: { type: String, enum: ['male', 'female'] },
    details: {
        phone: { type: String },
        address: { type: String },
        birthDate: { type: Date },
    },
    // Stripe Fields
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'incomplete', 'incomplete_expired', 'trialing', 'past_due', 'canceled', 'unpaid'],
        default: 'incomplete'
    },
    currentPeriodEnd: { type: Date },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    isActive: { type: Boolean, default: false },

}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = models.User || model('User', userSchema);
export default User;