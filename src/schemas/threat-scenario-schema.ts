import Joi from 'joi'
import classificationModel from '../models/classification-model'
import threatScenarioModel from '../models/threat-scenario-model'

const baseSchema = {
    title: Joi.string().max(50).required(),
    description: Joi.string().allow('', null).max(200).optional(),
    related_asset: Joi.string().allow('', null).max(50).optional(),
    classification_id: Joi.number().integer().required(),
    impact: Joi.number().integer().allow(...[0, 1, 2, 3]).required(),
    likelihood: Joi.number().integer().allow(...[0, 1, 2, 3]).required(),
}

const getCustomExists = (model: any) => {
    return {
        options: (value: any) => {
            return new Promise(async (resolve, reject) => {
                const res = await model.findOne(value)
                if (res.length) {
                    resolve()
                } else {
                    reject()
                }
            })
        },
    }
}

const routeParameterSchema = {
    id: {
        in: ['params'],
        custom: getCustomExists(threatScenarioModel),
    },
}

const bodySchema = {
    title: {
        exists: true,
        isLength: {
            options: {max: 50},
        },
    },
    description: {
        isLength: {
            options: {max: 200},
        },
    },
    related_asset: {
        isLength: {
            options: {max: 50},
        },
    },
    classification_id: {
        exists: true,
        custom: getCustomExists(classificationModel),
    },
    impact: {
        exists: true,
        isInt: true,
        isIn: {
            options: [[0, 1, 2, 3]],
        },
    },
    likelihood: {
        exists: true,
        isInt: true,
        isIn: {
            options: [[0, 1, 2, 3]],
        },
    },
}

export {
    bodySchema,
    routeParameterSchema,
}