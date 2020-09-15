import { NextFunction, Request, Response } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { ObjectSchema } from 'joi'

const validateWith = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        })

        if (result.error) {
            const errorMessages = result.error.details.map(d => {
                return { [d.path[0]]: d.message }
            })

            res.status(422).send(errorMessages)
            next(422)
            return
        }

        next()
    }
}

const validator = (req: Request, res: Response, next: NextFunction) => {
    try {
        validationResult(req).throw();
        next()
    } catch (err) {
        res.sendStatus(422);
    }
}
export {
    validateWith,
    validator,
}