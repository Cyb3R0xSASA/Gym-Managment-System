import stripe from "../../../config/stripe.conf.js";
import User from '../../../models/user.models.js';
import { methodError } from "../../../middlewares/error/method.error.js";
import { STRIPE } from "../../../config/constants.js";

const handleStripeWebhook = methodError(
    async (req, res, next) => {
        const sig = req.headers['stripe-signature'];
        let event;

        event = stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE.WEBHOOK);
        const obj = event.data.object;
        const { userId, planId, planType } = obj.metadata || {};

        switch (event.type) {
            case 'checkout.session.completed': {
                const subscription = await stripe.subscriptions.retrieve(obj.subscription);
                await User.findByIdAndUpdate(userId, {
                    isPaid: true,
                    plan: planId,
                    planType,
                    stripeCustomerId: obj.customer,
                    stripeSubscriptionId: obj.subscription,
                    subscriptionStatus: subscription.status,
                    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                    status: 'active',
                    isActive: true
                });
            };
                break;
            case 'invoice.payment_failed': {
                await User.findOneAndUpdate(
                    { stripeCustomerId: obj.customer },
                    { subscriptionStatus: 'past_due', isPaid: false }
                );
                break;
            };
        }


        // if (event.type === 'checkout.session.completed') {
        //     const session = event.data.object;
        //     const userId = session.metadata.userId;
        //     const planId = session.metadata.planId;
        //     const planType = session.metadata.planType;

        //     await User.findByIdAndDelete(userId, {
        //         isPaid: true,
        //         plan: planId,
        //         planType,
        //         status: 'active',
        //         isActive: true,
        //     });
        // };


    })