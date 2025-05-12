import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from './constants.js';
import logger from './logger.conf.js';

cloudinary.config({
    cloud_name: CLOUDINARY.CLOUD_NAME,
    api_key: CLOUDINARY.API_KEY,
    api_secret: CLOUDINARY.API_SECRET,
});

logger.info('Cloudinary configured successfully');

export default cloudinary;