import { ZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validateRequest =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
