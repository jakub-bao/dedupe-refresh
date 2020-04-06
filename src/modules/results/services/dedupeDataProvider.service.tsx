import {getData} from "../../shared/services/dataApi.service";
import {DataTypePeriodList} from "../../shared/models/shared.models";
import {
    DedupeModel,
    DuplicateModel
} from "../models/dedupe.model";
import {FiltersModel} from "../../filters/models/filters.model";

function generateDedupeUrl(selectedFilters:FiltersModel):string{
    return `/sqlViews/wzpSd6j89wc/data?paging=false`
        + `&var=ou:${selectedFilters.organisationUnit}`
        + `&var=dt:${selectedFilters.dataType}`
        + `&var=pe:${selectedFilters.period}`
        + `&var=ty:${selectedFilters.dedupeType||'PURE'}`
        + `&var=rs:${selectedFilters.includeResolved||false}`
        + `&var=ps:100000`
        + `&var=pg:1`
        + `&var=ag:${selectedFilters.agency||'NONE'}`
        + `&var=dg:${selectedFilters.technicalArea||'NONE'}`;
}

function extractDuplicates(rows:namedRow[]):DuplicateModel[]{
    return rows.map(namedRow=>{
        return {
            value: namedRow.value,
            info: {
                agencyName: namedRow.agencyName,
                partnerName: namedRow.partnerName,
                mechanismNumber: namedRow.mechanismNumber
            }
        }
    })
}

function generateDedupe(selectedRows: namedRow[]):DedupeModel{
    let first = selectedRows[0];
    let dedupe:DedupeModel = {
        meta: {
            orgUnitId: first.orgUnitId,
            periodId: 'blank',
            dataType: 'blank'
        },
        data: {
            dataElementId: first.dataElementId,
            disAggregation: first.disAggregation,
            categoryOptionComboId: first.categoryOptionComboId
        },
        info: {
            orgUnitName: first.orgUnitName,
            dataElementName: first.dataElementName
        },
        status: {
            resolved: first.duplicateStatus==='RESOLVED'
        },
        duplicates: extractDuplicates(selectedRows)
    };
    return dedupe;
}

function processResponse(rows:any[]):DedupeModel[]{
    if (rows.length===0) return [];
    let dedupesCount = rows[0].totalGroups;
    let dedupes = [];
    for (var groupNumber=1; groupNumber<=dedupesCount; groupNumber++){
        let selectedRows = rows.filter(row=>row.group===groupNumber);
        let dedupe:DedupeModel = generateDedupe(selectedRows);
        dedupes.push(dedupe)
    }
    console.debug(dedupes);
    return dedupes;
}

type namedRow = {
    orgUnitName:string;
    dataElementName:string;
    disAggregation:string;
    agencyName: string;
    mechanismNumber:number;
    partnerName:string;
    value:number;
    duplicateStatus:string;
    orgUnitId:string;
    dataElementId:string;
    categoryOptionComboId:string;
    group:number;
    totalGroups:number;
};

function nameRows(rows:any[]):namedRow[]{
    return rows.map(row=>{
        return {
            orgUnitName: row[0],
            dataElementName: row[1],
            disAggregation: row[2],
            agencyName: row[3],
            mechanismNumber: row[4],
            partnerName: row[5],
            value: row[6],
            duplicateStatus: row[7],
            orgUnitId: row[8],
            dataElementId: row[9],
            categoryOptionComboId: row[10],
            group: row[11],
            totalGroups: row[12],
        }
    });
}

export default function fetchDedupes(selectedFilters:FiltersModel):Promise<DedupeModel[]>{
    let requestUrl = generateDedupeUrl(selectedFilters);

    return getData(requestUrl)
        .then(response=>nameRows(response.listGrid.rows))
        .then(processResponse);
}
