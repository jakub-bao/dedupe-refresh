import {DataTypePeriodList} from "../models/filters.model";
import {getData} from "../../shared/services/dataApi.service";

function generateDedupeUrl(orgUnitId:string, dataType: string, periodId:string, dedupeType:string, resolved: boolean):string{
    return `/sqlViews/wzpSd6j89wc/data?paging=false`
        + `&var=ou:${orgUnitId}`
        + `&var=dt:${dataType}`
        + `&var=pe:${periodId}`
        + `&var=ty:${dedupeType}`
        + `&var=rs:${resolved}`
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
                    [true, false].forEach(resolved=>{
                        queries.push(generateDedupeUrl(orgUnitId, dataType.toLocaleUpperCase(), period.id, dedupeType, resolved));
                    });
                });
            });
        });
        let promises = queries.map(query=>getData(query));
        return Promise.all(promises);
    }
}

