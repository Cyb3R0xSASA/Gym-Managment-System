import pkg from 'mongoose';
const {model, models, Schema} = pkg;

const planSchema = new Schema({
    name: {
        ar: { type: String, required: true, minlength: 1, maxlength: 250, unique: true },
        en: { type: String, minlength: 1, maxlength: 250, unique: true },
    },
    description: {
        ar: { type: String, minlength: 1, maxlength: 2500 },
        en: { type: String, minlength: 1, maxlength: 2500 },
    },
    monthlyPrice: {
        type: Number,
        default: 0,
        min: 0,
    },
    semiAnnualPrice: {
        type: Number,
        default: 0,
        min: 0,
    },
    annualPrice: {
        type: Number,
        default: 0,
        min: 0,
    },
    semiAnnualDiscount: {
        type: Number,
        default: 0,
        min: 0,
    },
    annualDiscount: {
        type: Number,
        default: 0,
        min: 0,
    },
    durationDays: {
        type: Number,
        default: 30,
        min: 1,
    },
    features: {
        branches: {type: Number, required: true, min: 1},
        employeesPerBranch: {type: Number, required: true, min: 1},
        trainersPerBranch: {type: Number, required: true, min: 1},
        clientsPerBranch: {type: Number, required: true, min: 1},
    }
}, {timestamps: true});

const Plan = models.Plan || model('Plan', planSchema);
export default Plan