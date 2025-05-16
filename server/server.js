import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { OTHER, SERVER } from './config/constants.js';
import { errorResponse } from './middlewares/error/method.error.js';
import { routeError } from './middlewares/error/route.error.js';
import connectDB from './config/db.conf.js';
import serviceRouter from './routes/v1/services.route.js';
import plansRouter from './routes/v1/plans.route.js';
import authRouter from './routes/v1/auth.route.js';
import gymRouter from './routes/v1/gym.route.js';

const app = express();

app.use(cors({
    origin: OTHER.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/plans', plansRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/gym', gymRouter);
app.get('/', (req, res) => {
    res.send('ربنا يكرمنا يا ونخلص علي خير');
});

app.use(errorResponse);
app.use(routeError);


app.listen(SERVER.PORT, () => {
    console.log(`Server is running on port ${SERVER.PORT}`);
    connectDB();
});