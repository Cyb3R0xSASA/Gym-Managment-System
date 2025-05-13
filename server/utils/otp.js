import { renderFile } from "ejs";
import path from 'path';
import { redis } from "../config/redis.conf.js";
import { genSaltSync, hashSync } from "bcrypt";
import { transporter } from "../config/smtp.conf.js";
import { HTTP_STATUS, OTP_CONF, OTHER, SMTP } from "../config/constants.js";
import { randomOTPGenerator } from "./random.js";
import { fileURLToPath } from 'url';
import { errorMessage } from "./error.js";

const otpGenerator = async (user, next, subject) => {
    const limitKey = `otp_limit:${user.id}`;
    const otpKey = `otp_key:${user.id}`;
    const attempts = await redis.get(limitKey);
    const coolDownKey = `otp_cooldown:${user.id}`;
    
    if (await redis.exists(coolDownKey))
        return next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 429, {waitTime: await redis.ttl(coolDownKey)}, `Too many requests, please try again after ${await redis.ttl(coolDownKey)} seconds`));

    if(attempts && attempts === OTP_CONF.MAX_OTP_PER_DAY){
        await redis.del(otpKey);
        next(errorMessage.create(HTTP_STATUS.BAD_REQUEST, 429, null, { message: 'You reached for max requests of OTP for today' }));
    }
    const otp = randomOTPGenerator();
    await redis.set(otpKey, hashSync(otp, genSaltSync(10)), 'EX', OTP_CONF.OTP_TTL_SECONDS);
    await redis.incr(limitKey);
    if(!attempts) 
        await redis.expire(limitKey, OTP_CONF.OTP_LIMIT_TTL);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const templatePath = path.join(__dirname, '../services/emails/email.ejs');

    const html = await renderFile(templatePath, { 
        subject,
        otp,
        userName: `${user.firstName} ${user.lastName}`,
        verifyLink: `${OTHER.FRONTEND_URL}/verify-email?token=${otp}`
    });

    const mailOptions = {
        from: SMTP.FROM,
        to: user.email,
        subject,
        html,
        attachments: [
            {
                filename: 'trainix.png',
                path: path.join(__dirname, '../services/emails/trainix.png'),
                cid: 'trainixLogo'
            }
        ]
    }
    
    await transporter.sendMail(mailOptions);
    await redis.set(coolDownKey, '1', 'EX', OTP_CONF.COOLDOWN_SECONDS);
};

const deleteOTP = async (userId) => {
    await redis.del(`otp_key:${userId}`);
    await redis.del(`otp_limit:${userId}`);
    await redis.del(`otp_cooldown:${userId}`);
};

export { otpGenerator, deleteOTP };