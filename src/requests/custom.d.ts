import { Request } from 'express'

export interface IndexRequest extends Request {
    offset: number
    limit: number
    data: any
}

export interface PutRequest extends Request {
    data: any
}

export interface PostRequest extends Request {
    data: any
}
