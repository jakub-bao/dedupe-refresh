
export type DedupeMetaModel = {
    orgUnitId: string;          // #8
    periodId: string;
    dataType: string;
}

export type DedupeDataModel = {
    // value: number;              // #6
    dataElementId: string;      // #9
    disAggregation: string;     // #2
    // mechanismNumber: number;    // #4
    categoryOptionComboId: string;   // #10
}

export type DedupeInfoModel = {
    orgUnitName: string;        // #0
    dataElementName: string;    // #1
    // agencyName: string;         // #3
    // partnerName: string;        // #5
}

export type DedupeStatusModel = {
    resolved: boolean;
}

export type DuplicateInfoModel = {
    agencyName: string;         // #3
    partnerName: string;        // #5
    mechanismNumber: number;    // #4
}

export type DuplicateModel = {
    value: number;              // #6
    info: DuplicateInfoModel;
}

export type DedupeModel = {
    meta: DedupeMetaModel;
    data: DedupeDataModel;
    info: DedupeInfoModel;
    status: DedupeStatusModel;
    duplicates: DuplicateModel[];
}