import mysql, { ConnectionConfig } from 'mysql'

const connectionPool = (config: ConnectionConfig) => {
    const pool = mysql.createPool(config)
    return (): mysql.Pool => pool
}

module.exports = connectionPool
