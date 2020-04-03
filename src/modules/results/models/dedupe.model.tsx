
export type DedupeMetaModel = {
    orgUnitId: string;
    periodId: string;
    dataType: string;
}

export type DedupeDataModel = {
    dataElementId: string;
    disAggregation: string;
    categoryOptionComboId: string;
}

export type DedupeInfoModel = {
    orgUnitName: string;
    dataElementName: string;
}

export type DedupeStatusModel = {
    resolved: boolean;
}

export type DuplicateInfoModel = {
    agencyName: string;
    partnerName: string;
    mechanismNumber: number;
}

export type DuplicateModel = {
    value: number;
    info: DuplicateInfoModel;
}

export type DedupeModel = {
    meta: DedupeMetaModel;
    data: DedupeDataModel;
    info: DedupeInfoModel;
    status: DedupeStatusModel;
    duplicates: DuplicateModel[];
}