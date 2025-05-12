import { methodError } from '../../middlewares/error/method.error.js';
import { errorMessage } from '../../utils/error.js';
import { HTTP_STATUS } from '../../config/constants.js';
import Plan  from '../../models/plan.models.js';

const getPlans = methodError(
    async (req, res, next) => {
        const plans = await Plan.find().select('-__v -createdAt -updatedAt');
        if(!plans || plans.length === 0) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, '85au6a0f'));
        res.status(200).json({ 
            status: HTTP_STATUS.SUCCESS, 
            message: 'Plans fetched successfully',
            data: { plans } 
        });
    }
);

const addPlan = methodError(
    async (req, res, next) => {
        const existingPlan = await Plan.findOne({ name: { ar: req.body.name.ar, en: req.body.name.en } });
        if(existingPlan) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, 'lj63i2v4'));

        const plan = await Plan.create(req.body);
        res.status(201).json({ 
            status: HTTP_STATUS.SUCCESS, 
            message: 'Plan created successfully', 
            data: { 
                name: plan.name,
                description: plan.description, 
                monthlyPrice: plan.monthlyPrice, 
                semiAnnualPrice: plan.semiAnnualPrice, 
                annualPrice: plan.annualPrice, 
                semiAnnualDiscount: plan.semiAnnualDiscount, 
                annualDiscount: plan.annualDiscount, 
                features: plan.features 
            } 
        });
    }
);

const updatePlan = methodError(
    async (req, res, next) => {
        const { id } = req.params;
        const data = req.body;
        const existingPlan = await Plan.findOne({ _id: id });
        if(!existingPlan) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 's69j26pj'));
        await Plan.updateOne({ _id: id }, {...data});
        const plan = await Plan.findOne({ _id: id }).select('-__v -createdAt -updatedAt');
        res.status(200).json({ 
            status: HTTP_STATUS.SUCCESS, 
            message: 'Plan updated successfully', 
            data: { plan } 
        });
    }
);
const deletePlan = methodError(
    async (req, res, next) => {
        const { id } = req.params;
        const existingPlan = await Plan.findOne({ _id: id });
        if(!existingPlan) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 's69j26pj'));
        await Plan.deleteOne({ _id: id });
        res.status(200).json({ 
            status: HTTP_STATUS.SUCCESS, 
            message: 'Plan deleted successfully', 
            data: null
        });
    }
);


const Plans = {
    getPlans,
    addPlan,
    updatePlan,
    deletePlan,
}

export default Plans;