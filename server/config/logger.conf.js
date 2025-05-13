import { createLogger, format, transports } from "winston";
import { SERVER } from './constants.js';
import path from 'path';

const __dirname = path.resolve();
const isProduction = SERVER.NODE_ENV === 'production';

const logger = createLogger({
    level: isProduction ? 'info' : 'debug',
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => `${timestamp} [${level.toUpperCase()}]: ${message}`),
    ),
    transports: [
        new transports.Console(),
        ...(isProduction
            ? [
                new transports.File({ filename: path.join(__dirname, 'logs/error.log'), level: 'error' }),
                new transports.File({ filename: path.join(__dirname, 'logs/combined.log') })
            ]
            : []),
    ],
});

export default logger;