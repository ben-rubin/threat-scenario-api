import { checkSchema } from 'express-validator'
import { get, index, post, put, remove } from '../controller/threat-scenario-controller'
import exists from '../middleware/exists'
import paginate from '../middleware/paginate'
import { validator } from '../middleware/validate'
import { bodySchema } from '../schemas/threat-scenario-schema'
import threatScenarioModel from '../models/threat-scenario-model'

const router = require('express').Router()
    .get('/', paginate, index)
    .get('/:id', get)
    .delete('/:id', remove)
    // @ts-ignore
    .put('/:id', checkSchema(bodySchema), validator, put)
    // @ts-ignore
    .post('/', checkSchema(bodySchema), validator, post)
    // @ts-ignore
    .param('id', exists(threatScenarioModel))

export default router