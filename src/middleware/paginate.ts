import { IndexRequest } from '../requests/custom'
import { NextFunction, Response } from 'express'

/**
 * Usage: send 'page' query parameter
 * i.e. ?page=1 to get the first page of results
 *
 * Sets req.offset
 */
const paginate = (req: IndexRequest, res: Response, next: NextFunction) => {
    const { page }: { page?: string } = req.query
    const parsedPage = parseInt(page || '' , 10);
    if (isNaN( parsedPage)) {
        req.offset = 0
    } else {
        req.offset =  parsedPage ?  parsedPage * 10 - 10 : 0
    }
    next()
}

export default paginate