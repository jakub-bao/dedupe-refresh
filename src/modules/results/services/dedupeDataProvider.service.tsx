import {getData} from "../../shared/services/dataApi.service";
import {DataTypePeriodList} from "../../shared/models/shared.models";
import {
    DedupeDataModel,
    DedupeInfoModel,
    DedupeMetaModel,
    DedupeModel,
    DedupeStatusModel, DuplicateModel
} from "../models/dedupe.model";

function generateDedupeUrl(orgUnitId:string, dataType: string, periodId:string, dedupeType:string):string{
    return `/sqlViews/wzpSd6j89wc/data?paging=false`
        + `&var=ou:${orgUnitId}`
        + `&var=dt:${dataType}`
        + `&var=pe:${periodId}`
        + `&var=ty:${dedupeType}`
        + `&var=rs:true`
        + `&var=ps:100000`
        + `&var=pg:1`
        + `&var=ag:NONE`
        + `&var=dg:NONE`;
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
        duplicates: []
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

export default class DedupeDataProvider {
    private orgUnitId:string;
    private dedupeDatabase: DedupeModel[] = [];

    changeOrgUnit(orgUnitId:string, dataTypePeriods: DataTypePeriodList):Promise<any>{
        if (this.orgUnitId===orgUnitId) return Promise.resolve();
        return this.fetchDedupesByOrgUnit(orgUnitId, dataTypePeriods);
    }

    fetchDedupesByOrgUnit(orgUnitId:string, dataTypePeriods: DataTypePeriodList):Promise<any>{
        let queries = [];
        ['results', 'targets'].forEach(dataType=>{
            dataTypePeriods[dataType].forEach(period=>{
                ['PURE','CROSSWALK'].forEach(dedupeType=>{
                    queries.push(generateDedupeUrl(orgUnitId, dataType.toLocaleUpperCase(), period.id, dedupeType));
                });
            });
        });
        let promises = queries.map(query=>getData(query));
        return Promise.all(promises)
            .then(responses=>responses.map(response=>nameRows(response.listGrid.rows)))
            .then(responses=>responses.map(processResponse))
            // .then(test=>{console.log(test); return test;})
            .then(dedupes=>{this.dedupeDatabase =this.dedupeDatabase.concat(...dedupes)});
    }
    getAllDedupes():DedupeModel[]{
        return this.dedupeDatabase;
    }
}

