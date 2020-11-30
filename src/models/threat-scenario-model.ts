import query from '../database/mysql'

// @todo separate model from implementation
const indexQuery = `
    SELECT ts.id,
           ts.title,
           ts.description,
           ts.related_asset,
           ts.classification_id,
           c.name classification_name,
           ts.impact,
           ts.likelihood,
           (ts.impact + ts.likelihood) / 2 risk_level
    FROM threat_scenario.threat_scenario ts
        JOIN threat_scenario.classification c ON ts.classification_id = c.id
    LIMIT ? OFFSET ?;`

const findAll = (offset: number = 0, limit: number = 10) => query(indexQuery, [limit, offset])

const getQuery: string = `
    SELECT ts.id,
           ts.title,
           ts.description,
           ts.related_asset,
           ts.classification_id,
           c.name classification_name,
           ts.impact,
           ts.likelihood,
           (ts.impact + ts.likelihood) / 2 risk_level
    FROM threat_scenario.threat_scenario ts
         JOIN threat_scenario.classification c ON ts.classification_id = c.id
    WHERE ts.id = ?;`

const findOne = (id: number): Promise<any[]> => query(getQuery, [id])

const updateQuery = `
    UPDATE threat_scenario.threat_scenario
    SET title             = ?,
        description       = ?,
        related_asset     = ?,
        classification_id = ?,
        impact            = ?,
        likelihood        = ?
    WHERE id = ?;`

const update = (id: number, data: IThreatScenarioSchema): Promise<any> => {
    const { title, description, related_asset, classification_id, impact, likelihood } = data
    return query(updateQuery, [
        // @ts-ignore
        title, description, related_asset, classification_id, impact, likelihood, id
    ])
}

const insertQuery = `
    INSERT INTO threat_scenario.threat_scenario
    (title, description, related_asset, classification_id, impact, likelihood)
    VALUES (?, ?, ?, ?, ?, ?);`

const insert = (data: IThreatScenarioSchema): Promise<any> => {
    const { title, description, related_asset, classification_id, impact, likelihood } = data
    return query(insertQuery, [
        // @ts-ignore
        title, description, related_asset, classification_id, impact, likelihood
    ])
}

const deleteQuery = `DELETE FROM threat_scenario.threat_scenario ts WHERE id = ?;`

const remove = (id: number) => {
    return query(deleteQuery, [id])
}

const getCount = () => {
    return query('SELECT COUNT(*) AS count FROM threat_scenario.threat_scenario;')
}

export default {
    findAll,
    findOne,
    update,
    insert,
    remove,
    getCount,
}