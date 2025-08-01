import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import { userRoutes } from './app/modules/users/user/user.route';
import { userDetailsRoutes } from './app/modules/users/userDetails/userDetails.route';
import { authRoutes } from './app/modules/auth/auth.route';
import notFound from './app/middleware/notFound';
 

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/users', userRoutes);
app.use('/api/users/details', userDetailsRoutes);
app.use('/api/auth', authRoutes);

// test route
app.get('/', (req: Request, res: Response) => {
  res.send('E-commerce backend running!');
});

// global error handler
app.use(globalErrorHandler);
app.use(notFound);
export default app;
