import mysql from 'mysql'
import mysqlConfig from '../config/mysql-config'

const connectionPool = require('../util/mysql-connection')(mysqlConfig)

const runQuery = (query: string, parameters: [string | number]): Promise<any[]> =>
    new Promise(async (resolve, reject) => {
        try {
            const pool: mysql.Pool = await connectionPool()
            pool.query(query, parameters, (error, results, fields) => {
                if (error) {
                    reject(error)
                }
                resolve(results)
            })
        } catch (e) {
            reject(e)
        }
    })

export default runQuery