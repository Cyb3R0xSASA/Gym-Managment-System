import { HTTP_STATUS, OTHER, SERVER } from "../../config/constants.js";
import stripe from "../../config/stripe.conf.js";
import checkId from "../../middlewares/checkId.js";
import { methodError } from "../../middlewares/error/method.error.js"
import Plan from "../../models/plan.models.js";
import { errorMessage } from "../../utils/error.js";

const createCheckoutSession = methodError(
    async (req, res, next) => {
        const { id } = req.user;
        const { planId, planType } = req.body;

        if (!Types.ObjectId.isValid(id))
            return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 'mw56yn26'))

        const plan = await Plan.findById(planId);
        if (!plan)
            return next(errorMessage.create(HTTP_STATUS.ERROR, 400, null, 's69j26pj'));

        const priceId = plan.stripePriceIds[planType];
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'paypal'],
            mode: 'subscription',
            customer_email: req.user.email,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${OTHER.FRONTEND_URL}/register?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${OTHER.FRONTEND_URL}/register?payment=cancel`,
            metadata: {
                userId: id.toString(),
                planId,
                planType,
            },
        });

        res.status(200).json({ status: HTTP_STATUS.SUCCESS, code: 1, data: { url: session.url } })
    }
);

const Payments = {
    createCheckoutSession,
}

export default Payments;