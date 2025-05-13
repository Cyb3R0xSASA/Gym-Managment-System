import Redis from "ioredis";
import { REDIS } from "./constants.js";
import logger from "./logger.conf.js";

export const redis = new Redis(REDIS.URL);

redis.on('connect', () => {
    logger.info('Redis connected successfully');
});

redis.on('error', (err) => {
    logger.error('Redis connection error: ' + err);
});