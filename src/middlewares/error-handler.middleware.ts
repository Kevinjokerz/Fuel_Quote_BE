import { Request, Response, NextFunction } from 'express';

/* eslint-disable @typescript-eslint/no-unused-vars */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const returnError = err instanceof Error ? err : new Error('Internal Server Error');
  return res.status(500).send({ error: returnError.message });
};

export { errorHandler };