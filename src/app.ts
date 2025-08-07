import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import { authRoutes } from './app/modules/auth/auth.route';
import { categoryRoutes } from './app/modules/category/category.router';
import { userRoutes } from './app/modules/users/user/user.route';
import { userDetailsRoutes } from './app/modules/users/userDetails/userDetails.route';
 

const app: Application = express();

// middlewares
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/users', userRoutes);
app.use('/api/users/details', userDetailsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

// test route
app.get('/', (req: Request, res: Response) => {
  res.send('E-commerce backend running!');
});

// global error handler
app.use(globalErrorHandler);
app.use(notFound);
export default app;
