import { methodError } from '../../middlewares/error/method.error.js';
import Plan from '../../models/plan.models.js';
import User from '../../models/user.models.js';
import JWTMethods from '../../utils/jwt.js';
import { sendError, sendSuccess } from '../../utils/error.js';
import { HTTP_STATUS } from '../../config/constants.js';
import { otpGenerator, deleteOTP } from '../../utils/otp.js';
import bcrypt from 'bcrypt';
import { redis } from '../../config/redis.conf.js';
import { checkId } from '../../middlewares/checkId.js';

const register = methodError(
    async (req, res, next) => {
        const { planId, planType, gymUser, ...userData } = req.body;
        const code = req.body.code || null;
        let role = 'client';

        if (planId) {
            if (!['monthly', 'semiAnnual', 'annual'].includes(planType)) {
                return sendError(
                    res,
                    'Plan code error',
                    'PLAN_NOT_EXIST',
                    HTTP_STATUS.BAD_REQUEST,
                    ['Plan Type Not Exist']
                )
            }

            checkId('', res, next, planId)
            const plan = await Plan.findById(planId);
            if (!plan) {
                return sendError(
                    res,
                    'Plan code error',
                    'PLAN_NOT_EXIST',
                    HTTP_STATUS.BAD_REQUEST,
                )
            }
            role = 'admin';
        }

        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            return sendError(
                res,
                'This email already exist',
                'USER_EXISTS',
                HTTP_STATUS.BAD_REQUEST,
            );
        }

        if (code) {
            const decoded = JWTMethods.verifyToken(code, 'ROLE');
            if (decoded?.role === 'employee') role = 'employee';
            if (decoded?.role === 'trainer') role = 'trainer';
        }

        if (role !== 'admin') {
            // complete it after create gym model
            // const gym = 
        }

        const newUser = await User.create({ ...userData, role, plan: planId, planType });
        await otpGenerator(newUser, next, 'Action Required: Confirm Your Email Address for Trainix');

        const accessToken = JWTMethods.generateToken({ id: newUser._id, role }, 'SECRET', '15m');
        const refreshToken = JWTMethods.generateToken({ id: newUser._id, role }, 'REFRESH', '7d');
        await JWTMethods.storeToken(`refresh_token:${newUser._id}`, refreshToken, 7 * 24 * 60 * 60);
        JWTMethods.setCookies(res, accessToken, refreshToken);

        return sendSuccess(
            res,
            'Account created successfully. Please verify your email.',
            {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                accessToken,
                refreshToken,
            },
            HTTP_STATUS.CREATED,
        )
    });

const verifyEmail = methodError(
    async (req, res, next) => {
        const { otp, email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            sendError(
                res,
                'User not found. Please sign up first.',
                'USER_NOT_FOUND',
                HTTP_STATUS.NOT_FOUND
            )
        }

        const otpKey = `otp_key:${user._id}`;
        const attemptsKey = `otp_attempts:${user._id}`;
        const storedOtp = await redis.get(otpKey);

        const attempts = parseInt(await redis.get(attemptsKey)) || 0;
        if (attempts >= 5) {
            await redis.del(otpKey);
            return sendError(
                res,
                'To many failed attempts try again later.',
                'MANY_FAILED_ATTEMPTS',
                HTTP_STATUS.UNAUTHORIZED,
            )
        }

        const isValidOtp = storedOtp && await bcrypt.compare(otp, storedOtp);
        if (!isValidOtp) {
            const newAttempts = await redis.incr(attemptsKey);
            if (newAttempts >= 5) await redis.del(otpKey);
            return sendError(
                res,
                `Invalid OTP. You have ${5 - newAttempts} attempts left.`,
                'INVALID_OTP',
                HTTP_STATUS.UNAUTHORIZED,
            );
        }

        await User.findByIdAndUpdate(user._id, { isActive: true });
        await deleteOTP(user._id);
        await redis.del(attemptsKey);

        return sendSuccess(
            res,
            'Email verified successfully',
            null,
            HTTP_STATUS.OK
        )
    });

const resendVerificationEmail = methodError(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(errorMessage.create(HTTP_STATUS.NOT_FOUND, 404, null, 's69j26pj'));
    if (user.isActive) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, 'User is already verified'));

    const existingOTP = await redis.get(`otp_key:${user._id}`);
    if (existingOTP) {
        return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null, 'Resend OTP after 1 minute'));
    }

    await otpGenerator(user, next, 'Verify Email');

    const accessToken = JWTMethods.generateToken({ id: user._id, role: user.role }, 'SECRET', '15m');
    const refreshToken = JWTMethods.generateToken({ id: user._id, role: user.role }, 'REFRESH', '7d');
    await JWTMethods.storeToken(`refresh_token:${user._id}`, refreshToken, 7 * 24 * 60 * 60);
    JWTMethods.setCookies(res, accessToken, refreshToken);

    res.status(200).json({
        status: HTTP_STATUS.SUCCESS,
        code: 1,
        message: 'Verification email sent successfully',
        data: { accessToken, refreshToken },
    });
});

const login = methodError(async (req, res, next) => {
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
        status: HTTP_STATUS.SUCCESS,
        code: 1,
        message: 'Login successful',
        data: { accessToken, refreshToken },
    });
});

const logout = methodError(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null));

    await redis.del(`refresh_token:${req.user.id}`);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({
        status: HTTP_STATUS.SUCCESS,
        code: 1,
        data: null,
        message: 'Logout successful',
    });
});

const refreshToken = methodError(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null));

    const decoded = JWTMethods.verifyToken(refreshToken, 'REFRESH');
    if (!decoded) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null));

    const user = await User.findById(decoded.id);
    if (!user) return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 400, null));

    const accessToken = JWTMethods.generateToken({ id: user._id, role: user.role }, 'SECRET', '15m');
    JWTMethods.setCookies(res, accessToken, refreshToken);

    res.status(200).json({
        status: HTTP_STATUS.SUCCESS,
        code: 1,
        message: 'Login successful',
        data: { accessToken, refreshToken },
    });
});

const forgotPassword = methodError(); // Placeholder
const resetPassword = methodError();  // Placeholder

const Auth = {
    login,
    register,
    logout,
    refreshToken,
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword
};

export default Auth;
