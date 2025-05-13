import { methodError } from '../../middlewares/error/method.error.js';
import Plan from '../../models/plan.models.js';
import User from '../../models/user.models.js';
import JWTMethods from '../../utils/jwt.js';
import {errorMessage} from '../../utils/error.js';
import { HTTP_STATUS } from '../../config/constants.js';
import { otpGenerator, deleteOTP } from '../../utils/otp.js';

const register = methodError(
    async (req, res, next) => {
        const {planId, planType, ...userData} = req.body;
        let code = req.body.code || 'user';

        let role = 'client';
        if(planId && planType) {
            const plan = await Plan.findById(planId);
            if(!plan) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 's69j26pj'));
            role = 'admin';
        };

        const user = await User.findOne({email: userData.email});
        if(user) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, '2m12nj8k'));

        const codeEncryption = JWTMethods.verifyToken(code, 'ROLE');
        if (codeEncryption && codeEncryption.role === 'employee') role = 'employee'
        else if (codeEncryption && codeEncryption.role === 'trainer') role = 'trainer';

        // For users except admin, they need to add gym id, branch id.
        if (role !== 'admin') {
            // Add gym if not admin
        }
    
        const newUser = await User.create({...userData, role, plan: planId, planType});
        await otpGenerator(newUser, next, 'Verify Email');
        const accessToken = JWTMethods.generateToken({id: newUser._id, role}, 'SECRET', '15m');
        const refreshToken = JWTMethods.generateToken({id: newUser._id, role}, 'REFRESH', '7d');
        await JWTMethods.storeToken(`otp:${newUser._id}`, refreshToken, 7 * 24 * 60 * 60);
        JWTMethods.setCookies(res, accessToken, refreshToken);

        res.status(201).json({ status: HTTP_STATUS.SUCCESS, data: {accessToken, refreshToken}, message: 'User created successfully' });
    }
);

const login = methodError();
const logout = methodError();
const refreshToken = methodError();
const verifyEmail = methodError();
const resendVerificationEmail = methodError();
const forgotPassword = methodError();
const resetPassword = methodError();

const Auth = {
    login,
    register,
    logout,
    refreshToken,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword
}

export default Auth;