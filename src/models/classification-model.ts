import query from '../database/mysql'

const getQuery: string = `
    SELECT * FROM threat_scenario.classification c
        WHERE c.id = ?;`

const findOne = (id: number): Promise<any[]> => query(getQuery, [id])


export default {
    findOne,
}