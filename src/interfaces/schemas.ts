interface IThreatScenarioSchema {
    id: number
    title: string
    description?: string
    related_asset?: string
    classification_id: string
    classification_name: string,
    impact: number
    likelihood: number
}
