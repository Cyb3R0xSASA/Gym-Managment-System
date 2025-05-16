import { methodError } from '../../middlewares/error/method.error.js';
import { errorMessage } from '../../utils/error.js';
import { HTTP_STATUS } from '../../config/constants.js';
import Plan from '../../models/plan.models.js';
import stripe from '../../config/stripe.conf.js';

const getPlans = methodError(
    async (req, res, next) => {
        const plans = await Plan.find().select('-__v -createdAt -updatedAt -stripeProductId -stripePriceIds');
        if (!plans || plans.length === 0) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, '85au6a0f'));
        res.status(200).json({
            status: HTTP_STATUS.SUCCESS,
            message: 'Plans fetched successfully',
            plans
        });
    }
);

const addPlan = methodError(
    async (req, res, next) => {
        const { name, description, monthlyPrice, semiAnnualPrice, annualPrice, semiAnnualDiscount, annualDiscount, features } = req.body;

        const existingPlan = await Plan.findOne({ 'name.ar': 'name.ar', 'name.en': name.en });
        if (existingPlan)
            return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, 'lj63i2v4'));

        // Create Stripe Product
        const stripeProduct = await stripe.products.create({
            name: name.en,
            description: description.en || '',
        });

        const createPrice = async (amount, interval, count = 1) => {
            if (!amount) return null;
            return await stripe.prices.create({
                unit_amount: amount * 100,
                currency: 'egp',
                recurring: { interval, interval_count: count },
                product: stripeProduct.id,
            });
        };

        const stripeMonthlyPrice = await createPrice(monthlyPrice, 'month');
        const stripeSemiAnnualPrice = await createPrice(semiAnnualPrice, 'month', 6);
        const stripeAnnualPrice = await createPrice(annualPrice, 'year');

        const plan = await Plan.create({
            name,
            description,
            monthlyPrice,
            semiAnnualPrice,
            annualPrice,
            semiAnnualDiscount,
            annualDiscount,
            features,
            stripeProductId: stripeProduct.id,
            stripePriceIds: {
                monthly: stripeMonthlyPrice?.id || null,
                semiAnnual: stripeSemiAnnualPrice?.id || null,
                annual: stripeAnnualPrice?.id || null,
            }
        });

        res.status(201).json({
            status: HTTP_STATUS.SUCCESS,
            message: 'Plan created successfully',
            data: {
                name: plan.name,
                description: plan.description,
                stripeProductId: plan.stripeProductId,
                stripePriceIds: plan.stripePriceIds,
            }
        });
    }
);

const updatePlan = methodError(
    async (req, res, next) => {
        const { id } = req.params;
        const data = req.body;
        const existingPlan = await Plan.findOne({ _id: id });
        if (!existingPlan) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 's69j26pj'));
        await Plan.updateOne({ _id: id }, { ...data });
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
        if (!existingPlan) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 's69j26pj'));
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