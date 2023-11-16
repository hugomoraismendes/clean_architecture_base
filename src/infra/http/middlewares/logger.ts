import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
  res.reqStartedAt = Date.now();
  console.info('HTTP request started', { req });

  res.on('finish', function () {
    console.info('HTTP request finished', { res, req });
  });

  next();
};
