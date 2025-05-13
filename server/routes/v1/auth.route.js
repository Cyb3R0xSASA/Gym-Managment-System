import { Router } from 'express';
import AuthValidation from '../../middlewares/validation/auth.validation.js';
import Auth from '../../controllers/v1/auth.controller.js';
const router = Router();

router.post('/register', AuthValidation.register, Auth.register);
// router.post('/verify-email', AuthValidation.verifyEmail, Auth.verifyEmail);
// router.post('/resend-verification-email', AuthValidation.resendVerificationEmail, Auth.resendVerificationEmail);
// router.post('/login', AuthValidation.login, Auth.login);
// router.post('/forgot-password', AuthValidation.forgotPassword, Auth.forgotPassword);
// router.post('/reset-password', AuthValidation.resetPassword, Auth.resetPassword);
// router.post('/logout', Auth.logout);
// router.post('/refresh-token', Auth.refreshToken);

export default router;
