import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'joi';
import { BadRequestError } from '../types/http-error.type'

const validateBody = <T>(schema: AnySchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const value = req.body;
    const result = schema.validate(value);
    if (result.error) {
      const firstError = result.error.details[0];
      const tempError = new BadRequestError(firstError.message);
      console.log(tempError);
      return next(new BadRequestError(firstError.message));
    }
    return next();
  };
};

export { validateBody };