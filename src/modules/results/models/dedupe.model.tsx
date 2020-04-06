
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

export type DuplicateModel = {
    value: number;
    agencyName: string;
    partnerName: string;
    mechanismNumber: number;
}

export type DedupeModel = {
    meta: DedupeMetaModel;
    data: DedupeDataModel;
    info: DedupeInfoModel;
    status: DedupeStatusModel;
    duplicates: DuplicateModel[];
}