import { Request, Response } from 'express'
import { IndexRequest, PostRequest, PutRequest } from '../requests/custom'
import threatScenario from '../models/threat-scenario-model'

const index = async (req: IndexRequest, res: Response) => {
    try {
        const data = await threatScenario.findAll(req.offset)
        res.send(data)
    } catch (e) {
        res.status(500).end()
    }
}

const get = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        const data = await threatScenario.findOne(id)
        res.send(data[0])
    } catch (e) {
        res.status(500).end()
    }
}

const put = async (req: PutRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        // @todo Create threat scenario DTO?
        await threatScenario.update(id, req.body)
        res.send({
            id,
            ...req.body,
        })
    } catch (e) {
        res.status(500).end()
    }
}

const post = async (req: PostRequest, res: Response) => {
    try {
        const result = await threatScenario.insert(req.body)
        res.send({
            id: result.insertId,
            ...req.body,
        })
    } catch (e) {
        res.status(500).end()
    }
}

const remove = async (req: PostRequest, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        await threatScenario.remove(id)
    } catch (e) {
        res.status(500).end()
    }
}

export {
    index,
    get,
    put,
    post,
    remove,
}