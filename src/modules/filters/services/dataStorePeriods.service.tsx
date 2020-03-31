import {idName} from "../models/filters.model";
import {getData} from "../../shared/services/dataApi.service";

function transformPeriod(periodResponse:any):idName[] {
    let today = new Date();
    return Object.keys(periodResponse)
        .filter(periodKey=>{
            let start  = new Date(periodResponse[periodKey].start);
            let end = new Date(periodResponse[periodKey].end);
            return start < today && today < end;
        })
        .map(periodKey=>{
            return {
                id: periodKey,
                name: periodKey
            }
        });
}

function transformFromDatastore(response:any):PeriodList {
    return {
        targets: transformPeriod(response.TARGETS),
        results: transformPeriod(response.RESULTS)
    };
}

export type PeriodList = {
    results: idName[];
    targets: idName[]
}

export function getPeriodsFromDatastore():Promise<PeriodList>{
    return getData('/dataStore/dedupe/periodSettings').then(transformFromDatastore)
}