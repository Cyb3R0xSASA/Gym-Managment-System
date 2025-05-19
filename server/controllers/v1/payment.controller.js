import { HTTP_STATUS, OTHER } from "../../config/constants.js";
import stripe from "../../config/stripe.conf.js";
import { methodError } from "../../middlewares/error/method.error.js";
import { Types } from "mongoose";
import Plan from "../../models/plan.models.js";
import User from "../../models/user.models.js";
import { sendError, sendSuccess } from "../../utils/error.js";

const createCheckoutSession = methodError(async (req, res, next) => {
    const { id, email } = req.user;

    // Validate MongoDB ObjectId
    if (!Types.ObjectId.isValid(id)) {
        return sendError(res, HTTP_STATUS.NOT_FOUND, "Invalid user ID", "invalid_user_id");
    }

    // Fetch user with selected plan
    const user = await User.findById(id).populate({ path: "plan", select: "_id" });

    if (!user || !user.plan) {
        return sendError(res, HTTP_STATUS.NOT_FOUND, "Plan not found for this user", "user_plan_not_found");
    }

    const planId = user.plan._id.toString();
    const planType = user.planType;

    // Fetch full plan details
    const plan = await Plan.findById(planId);
    if (!plan) {
        return sendError(res, HTTP_STATUS.BAD_REQUEST, "Selected plan does not exist", "plan_not_found");
    }

    const priceId = plan.stripePriceIds[planType];
    if (!priceId) {
        return sendError(res, HTTP_STATUS.BAD_REQUEST, "Pricing information is missing for this plan type", "missing_price_id");
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        customer_email: email,
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: `${OTHER.FRONTEND_URL}/register?payment=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${OTHER.FRONTEND_URL}/register?payment=cancel`,
        metadata: {
            userId: id,
            planId,
            planType,
        },
    });

    return sendSuccess(res, HTTP_STATUS.SUCCESS, { url: session.url });
});


const Payments = {
    createCheckoutSession,
}

export default Payments;