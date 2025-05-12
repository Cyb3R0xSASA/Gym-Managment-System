import { connect } from 'mongoose';
import { DATABASE } from './constants.js';
import logger from './logger.conf.js';

const connectDB = async () => {
    try {
        const conn = await connect(DATABASE.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1)
    }
};

export default connectDB;