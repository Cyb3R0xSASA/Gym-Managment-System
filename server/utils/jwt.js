import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
import { JWT, SERVER } from '../config/constants.js';
import { redis } from '../config/redis.conf.js';

const generateToken = (payload, type, expiresIn) =>
    sign(payload, JWT[type], { expiresIn });


const verifyToken = (token, type) =>{
    try {
        return verify(token, JWT[type]);
    } catch (error) {
        return null;
    }
}


const storeToken = async (key, token, expiresIn) =>
    await redis.set(key, token, 'EX', expiresIn);


const setCookies = (res, accessToken = null, refreshToken = null) => {
    if (accessToken)
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: SERVER.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });

    if (refreshToken)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: SERVER.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
};

const JWTMethods = {
    generateToken,
    verifyToken,
    storeToken,
    setCookies,
}

export default JWTMethods;
