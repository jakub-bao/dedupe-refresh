
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

export enum ResolutionMethodType {
    maximum= 'maximum',
    sum = 'sum',
    custom = 'custom'
}

export type DedupeResolvedByModel = {
    resolutionMethod: ResolutionMethodType;
    resolutionValue: number;
    deduplicationAdjustmentValue: number;
}

export type DedupeResolutionAvailableValues = {
    max: number;
    sum: number;
};

export type DedupeResolutionModel = {
    isResolved: boolean;
    resolvedBy: DedupeResolvedByModel;
    availableValues: DedupeResolutionAvailableValues;
}

export type DuplicateModel = {
    value: number;
    agencyName: string;
    partnerName: string;
    mechanismNumber: number;
}

export enum DedupeInternalStatusName {
    alreadyResolved = 'Resolved',
    readyToEdit = 'Ready to edit',
    readyToSave = 'Ready to be saved',
    saved = 'Saved to server',
    error = 'Error'
}

export type DedupeInternalStatusModel = {
    statusName: DedupeInternalStatusName;
}

export type DedupeModel = {
    meta: DedupeMetaModel;
    data: DedupeDataModel;
    info: DedupeInfoModel;
    resolution: DedupeResolutionModel;
    duplicates: DuplicateModel[];
    internalStatus: DedupeInternalStatusModel;
}