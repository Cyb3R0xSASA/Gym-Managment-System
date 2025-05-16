import pkg from 'mongoose';
const { model, models, Schema } = pkg;

const planSchema = new Schema({
    name: {
        ar: { type: String, required: true, minlength: 1, maxlength: 250, unique: true },
        en: { type: String, minlength: 1, maxlength: 250, unique: true },
    },
    description: {
        ar: { type: String, minlength: 1, maxlength: 2500, required: true },
        en: { type: String, minlength: 1, maxlength: 2500 },
    },
    monthlyPrice: {
        type: Number,
        default: 0,
        min: 0,
        required: true,
    },
    semiAnnualPrice: {
        type: Number,
        default: 0,
        min: 0,
        required: true,
    },
    annualPrice: {
        type: Number,
        default: 0,
        min: 0,
        required: true,
    },
    semiAnnualDiscount: {
        type: Number,
        default: 0,
        min: 0,
        required: true,
    },
    annualDiscount: {
        type: Number,
        default: 0,
        min: 0,
        required: true,
    },
    features: {
        branches: { type: Number, required: true, min: 1 },
        employeesPerBranch: { type: Number, required: true, min: 1 },
        trainersPerBranch: { type: Number, required: true, min: 1 },
        clientsPerBranch: { type: Number, required: true, min: 1 },
    },
    stripeProductId: {
        type: String,
        required: true,
    },
    stripePriceIds: {
        monthly: { type: String, default: null },
        semiAnnual: { type: String, default: null },
        annual: { type: String, default: null },
    },
}, { timestamps: true });

const Plan = models.Plan || model('Plan', planSchema);
export default Plan;