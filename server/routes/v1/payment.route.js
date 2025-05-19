import { Router } from "express";
import PaymentValidation from "../../middlewares/validation/payment.validation.js";
import Payments from "../../controllers/v1/payment.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post('/checkout', protect, PaymentValidation.checkout, Payments.createCheckoutSession)

export default router;