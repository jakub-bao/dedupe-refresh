export enum FilterType {
    organisationUnit = 'organisationUnit',
    dataType='dataType',
    period='period',
    dedupeType='dedupeType',
    includeResolved='includeResolved',
    agency='agency',
    technicalArea='technicalArea',
}

export type RequiredFiltersModel = {
    organisationUnit: string,
    dataType: string,
    period: string,
    dedupeType: string,
    includeResolved: boolean
}

export type OptionalFiltersModel = {
    agency: string,
    technicalArea: string,
}

export type FiltersModel = {
    requiredFilters: RequiredFiltersModel
    optionalFilters: OptionalFiltersModel
}