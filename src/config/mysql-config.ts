import { ConnectionConfig } from 'mysql';

const mysqlConfig: ConnectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}

export default mysqlConfig;