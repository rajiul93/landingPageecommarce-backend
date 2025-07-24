import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './src/app/middleware/globalErrorHandler';
import { userRoutes } from './src/app/modules/user/user.route';
import { authRoutes } from './src/app/modules/auth/auth.route';
import notFound from './src/app/middleware/notFound';

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// test route
app.get('/', (req: Request, res: Response) => {
  res.send('Ecommerce backend running!');
});

// global error handler
app.use(globalErrorHandler);
app.use(notFound);
export default app;
