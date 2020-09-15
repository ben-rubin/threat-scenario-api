require('dotenv').config()
const express = require('express')
const cors = require('cors')

import router from './routers/router'
import jwtVerify from './middleware/jwt-verify'
import sanitize from './middleware/sanitize'
import getJwksPems from './util/get-jwks-pems'

// @todo HTTPS
const app = express()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use(sanitize)

// @todo look into key rotation
// @todo refresh keys at some point?
const boot = async (): Promise<any> => {
    const pems = await getJwksPems(process.env.AWS_ISS!)

    app.use(jwtVerify(
        pems,
        process.env.AWS_COGNITO_CLIENTID!,
        process.env.AWS_ISS!
    ))
    app.use('/threat-scenario', router)

    return app
}

export default boot