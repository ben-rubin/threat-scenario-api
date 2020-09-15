import { NextFunction, Request, Response } from 'express'
const jwt = require('jsonwebtoken')
import get from 'lodash/get'
import { IPublicKeys } from '../util/get-jwks-pems'


// @todo write test
// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
const jwtVerify = (keys: IPublicKeys, clientId: string, iss: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const bearer = req.get('Authorization')

        if (!bearer || !keys || !bearer.startsWith('Bearer ')) {
            return res.sendStatus(403)
        }

        // Strip out 'Bearer '
        const token = bearer.substring(7)
        const decodedToken = jwt.decode(token, {complete: true})

        if(!decodedToken || !decodedToken.header.kid || !keys[decodedToken.header.kid]) {
            return res.sendStatus(403)
        }

        jwt.verify(token, keys[decodedToken.header.kid], { issuer: iss, maxAge: 3600 },
            (err: Error, verifiedToken: any) => {
                if (err ||
                    get(verifiedToken, 'client_id') !== clientId ||
                    get(verifiedToken, 'token_use') !== 'access'
                ) {
                    return res.sendStatus(403)
                }
            })
        next()
    }
}

export default jwtVerify
