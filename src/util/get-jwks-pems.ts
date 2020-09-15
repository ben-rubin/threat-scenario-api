const get = require('lodash/get')
const request = require('request')
const jwkToPem = require('jwk-to-pem')
import { IncomingMessage } from 'http'

export interface IJwk {
    alg: string
    e: string
    kid: string
    kty: string
    n: string
    use: string
}
export interface IJwks {
    keys: IJwk[]
}
export interface IPublicKeys {
    [key: string]: string
}

const getJwksPems = (url: string): Promise<IPublicKeys> => {
    return new Promise((resolve, reject) => {
        const options = {
            url: `${url}/.well-known/jwks.json`,
            json: true,
        }
        request.get(options, (err: Error, resp: IncomingMessage, body?: IJwks) => {
            if (err) {
                reject(err.message)
                return
            }
            if (!get(body, 'keys.length')) {
                reject(body)
                return
            }

            const pems: IPublicKeys = {}
            for (const key of body!.keys) {
                pems[key.kid] = jwkToPem(key)
            }
            resolve(pems)
        })
    })
}

export default getJwksPems
