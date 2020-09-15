import { NextFunction, Request, Response } from 'express';

const sanitize = (req: Request, res: Response, next: NextFunction) => {
    res.removeHeader('X-Powered-By')
    next()
}

export default sanitize