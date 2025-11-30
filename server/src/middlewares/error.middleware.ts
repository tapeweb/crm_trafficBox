import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({ message: "Internal server error", error: err.message});
}