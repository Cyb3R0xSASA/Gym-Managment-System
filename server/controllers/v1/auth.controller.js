import { methodError } from '../../middlewares/error/method.error.js';
import Plan from '../../models/plan.models.js';
import User from '../../models/user.models.js';
import JWTMethods from '../../utils/jwt.js';
import { errorMessage } from '../../utils/error.js';
import { HTTP_STATUS } from '../../config/constants.js';
import { otpGenerator, deleteOTP } from '../../utils/otp.js';
import bcrypt from 'bcrypt';
import { redis } from '../../config/redis.conf.js';
import { Types } from 'mongoose';

const register = methodError(
    async (req, res, next) => {
        const { planId, planType, ...userData } = req.body;
        let code = req.body.code || 'user';
        let role = 'sasa';

        if (planId && planType) {
            const isId = Types.ObjectId.isValid(planId);
            if (!isId) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 'mw56yn26'));
            const plan = await Plan.findById(planId);
            if (!plan) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 's69j26pj'));
            role = 'admin';
        };

        const user = await User.findOne({ email: userData.email });
        if (user) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 's69j26pj'));

        if (['employee', 'trainer'].includes(code)) {
            const codeEncryption = JWTMethods.verifyToken(code, 'ROLE');
            if (codeEncryption && codeEncryption.role === 'employee') role = 'employee'
            else if (codeEncryption && codeEncryption.role === 'trainer') role = 'trainer';
        };

        // For users except admin, they need to add gym id, branch id.
        if (role !== 'admin') {
            // Add gym if not admin
        }

        const newUser = await User.create({ ...userData, role, plan: planId, planType });
        await otpGenerator(newUser, next, 'Verify Email');
        const accessToken = JWTMethods.generateToken({ id: newUser._id, role }, 'SECRET', '15m');
        const refreshToken = JWTMethods.generateToken({ id: newUser._id, role }, 'REFRESH', '7d');
        await JWTMethods.storeToken(`refresh_token:${newUser._id}`, refreshToken, 7 * 24 * 60 * 60);
        JWTMethods.setCookies(res, accessToken, refreshToken);

        res.status(201).json({ status: HTTP_STATUS.SUCCESS, message: 'User created successfully' });
    }
);

const verifyEmail = methodError(
    async (req, res, next) => {
        const { otp } = req.body;
        const user = await User.findOne({ _id: req.user.id });
        if (!user) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 'gy77yq24'));

        const otpKey = `otp_key:${user._id}`;
        const attemptsKey = `otp_attempts:${user._id}`;
        const otpVerification = await redis.get(otpKey);

        if (await redis.get(attemptsKey) >= 5) {
            await redis.del(otpKey);
            return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, 'Too many failed attempts.'));
        }

        if (!otpVerification || !(await bcrypt.compare(otp, otpVerification))) {
            const attempts = await redis.incr(attemptsKey);
            if (attempts === 5) {
                await redis.del(otpKey);
                return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, 'Too many failed attempts.'));
            }
            return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, `Invalid OTP. You have ${5 - attempts} attempts left.`));
        }

        await User.findByIdAndUpdate(user._id, { isActive: true, status: 'active' });
        await deleteOTP(user._id);
        await redis.del(attemptsKey);

        res.status(200).json({ status: HTTP_STATUS.SUCCESS, message: 'Email verified successfully' });
    }
);

const resendVerificationEmail = methodError(
    async (req, res, next) => {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 's69j26pj'));
        if (user.isActive) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, 'User is already verified'));
        if (!await redis.get(`otp_key:${user._id}`)) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, 'Resend OTP after 1 minute'));
        await otpGenerator(user, next, 'Verify Email');
        const accessToken = JWTMethods.generateToken({ id: user._id, role: user.role }, 'SECRET', '15m');
        const refreshToken = JWTMethods.generateToken({ id: user._id, role: user.role }, 'REFRESH', '7d');
        await JWTMethods.storeToken(`refresh_token:${user._id}`, refreshToken, 7 * 24 * 60 * 60);
        JWTMethods.setCookies(res, accessToken, refreshToken);
        res.status(200).json({
            status: HTTP_STATUS.SUCCESS, data: {
                accessToken,
                refreshToken
            }, message: 'Verification email sent successfully'
        });
    }
);

const login = methodError(
    async (req, res, next) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 's69j26pj'));

        if (!user.isActive) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, 'Account is not verified'));

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, '2v7s2g5s'));

        const accessToken = JWTMethods.generateToken({ id: user._id, role: user.role }, 'SECRET', '15m');
        const refreshToken = JWTMethods.generateToken({ id: user._id, role: user.role }, 'REFRESH', '7d');
        await JWTMethods.storeToken(`refresh_token:${user._id}`, refreshToken, 7 * 24 * 60 * 60);
        JWTMethods.setCookies(res, accessToken, refreshToken);

        res.status(200).json({
            status: HTTP_STATUS.SUCCESS, data: {
                accessToken,
                refreshToken
            }, message: 'Login successful'
        });
    }
);

const logout = methodError(
    async (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null));
        await redis.del(`refresh_token:${req.user.id}`);
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({ status: HTTP_STATUS.SUCCESS, data: null, message: 'Logout successful' });
    }
);

const refreshToken = methodError(
    async (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        console.log(refreshToken)
        if (!refreshToken) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null));

        const decoded = JWTMethods.verifyToken(refreshToken, 'REFRESH');
        if (!decoded) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null));

        const user = await User.findById(decoded.id);
        if (!user) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null));
        const accessToken = JWTMethods.generateToken({ id: user._id, role: user.role }, 'SECRET', '15m');
        JWTMethods.setCookies(res, accessToken, refreshToken);
        res.status(200).json({
            status: HTTP_STATUS.SUCCESS, data: {
                accessToken,
                refreshToken
            }, message: 'Login successful'
        });
    }
);
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