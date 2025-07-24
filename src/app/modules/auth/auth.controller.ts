import { Request, Response, NextFunction } from 'express';

import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

export const AuthController = {
  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AuthService.loginUser(req.body);
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully!',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
