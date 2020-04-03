import {getData} from "../../shared/services/dataApi.service";
import {DataTypePeriodList} from "../../shared/models/shared.models";

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

export default class DedupeDataProvider {
    private orgUnitId:string;
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
        return Promise.all(promises);
    }
}

