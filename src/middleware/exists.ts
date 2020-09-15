import { NextFunction, Request, Response } from 'express'

const exists = (model: any) => {
    return async (req: Request, res: Response, next: NextFunction, value: number) => {
        const data = await model.findOne(value)
        if (!data.length) {
            res.sendStatus(404)
            return
        }

        next()
    }
}

export default exists
