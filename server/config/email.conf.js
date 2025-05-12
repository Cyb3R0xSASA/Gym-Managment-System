import { createTransport } from 'nodemailer';
import { EMAIL } from './constants.js';
import logger from './logger.conf.js';


export const transporter = createTransport({
    host: EMAIL.HOST,
    port: EMAIL.PORT,
    auth: {
        user: SMTP.USER,
        pass: SMTP.PASS
    },
});

transporter.verify((error, success) => {
    if (error)
        logger.error(`Email transporter error: ${error}`);

    logger.info(`Email transporter configured successfully: ${success}`);
});

export default transporter
