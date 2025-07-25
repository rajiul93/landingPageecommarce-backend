import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalErrorHandler from './src/app/middleware/globalErrorHandler';
import notFound from './src/app/middleware/notFound';
import { authRoutes } from './src/app/modules/auth/auth.route';
import { userRoutes } from './src/app/modules/users/user/user.route';
import { userDetailsRoutes } from './src/app/modules/users/userDetails/userDetails.route';

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());

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
