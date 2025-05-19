import { methodError } from '../../middlewares/error/method.error.js';
import { sendError, sendSuccess } from '../../utils/error.js';
import { HTTP_STATUS } from '../../config/constants.js';
import Plan from '../../models/plan.models.js';
import stripe from '../../config/stripe.conf.js';

const getPlans = methodError(
    async (req, res, next) => {
        const plans = await Plan.find().select('-__v -createdAt -updatedAt -stripeProductId -stripePriceIds');
        if (!plans || plans.length === 0) {
            return sendError(
                res,
                "No plans exist.",
                "NO_PLANS_AVAILABLE",
                HTTP_STATUS.NOT_FOUND
            );
        }

        return sendSuccess(
            res,
            'Plans fetched successfully',
            plans,
            200
        );
    }
);

const addPlan = methodError(
    async (req, res, next) => {
        const { name, description, monthlyPrice, semiAnnualPrice, annualPrice, semiAnnualDiscount, annualDiscount, features } = req.body;

        const existingPlan = await Plan.findOne({ 'name.ar': 'name.ar', 'name.en': name.en });
        if (existingPlan) {
            return sendError(
                res,
                'Plan Already Exist before.',
                'PLAN_EXIST',
                HTTP_STATUS.BAD_REQUEST,
            );
        }

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

        sendSuccess(
            res,
            'Plan created successfully',
            {
                name: plan.name,
                description: plan.description,
                stripeProductId: plan.stripeProductId,
                stripePriceIds: plan.stripePriceIds,
            },
            201
        );
        next();
    }
);

const updatePlan = methodError(
    async (req, res, next) => {
        const { id } = req.params;
        const data = req.body;
        const existingPlan = await Plan.findOne({ _id: id });
        if (!existingPlan) {
            return sendError(
                res,
                'Plan Not Exist',
                'NO_PLAN_AVAILABLE',
                400,
            )
        }
        await Plan.updateOne({ _id: id }, { ...data });
        const plan = await Plan.findOne({ _id: id }).select('-__v -createdAt -updatedAt');
        sendSuccess(
            res,
            'Plan updated successfully',
            { plan },
            200,
        );
        next();
    }
);

const deletePlan = methodError(
    async (req, res, next) => {
        const { id } = req.params;
        const existingPlan = await Plan.findOne({ _id: id });
        if (!existingPlan) {
            return sendError(
                res,
                'Plan Not Exist',
                'NO_PLAN_AVAILABLE',
                400,
            )
        };
        await Plan.deleteOne({ _id: id });
        sendSuccess(
            res,
            'Plan deleted successfully',
            null,
            200,
        )
    }
);


const Plans = {
    getPlans,
    addPlan,
    updatePlan,
    deletePlan,
}

export default Plans;