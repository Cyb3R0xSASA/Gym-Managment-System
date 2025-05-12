import Stripe from 'stripe';
import { STRIPE } from './constants.js';
import logger from './logger.conf.js';

const stripe = new Stripe(STRIPE.SECRET_KEY, {
    apiVersion: '2022-11-15',
});

if (stripe) {
    logger.info('Stripe configured successfully');
} else {
    logger.error('Stripe configuration failed');
}

export default stripe;