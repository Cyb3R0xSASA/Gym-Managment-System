import { createTransport } from 'nodemailer';
import { SMTP } from './constants.js';
import logger from './logger.conf.js';

export const transporter = createTransport({
    host: SMTP.HOST,
    port: SMTP.PORT,
    auth: {
        user: SMTP.USER,
        pass: SMTP.PASSWORD
    },
});


transporter.verify((error) => {
    if (error)
        logger.error(`Email transporter error: ${error}`);
    else
        logger.info(`Email transporter configured successfully`);
});

export default transporter
