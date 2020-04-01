import {FilterType, idName} from "../models/filters.model";
import {getData} from "../../shared/services/dataApi.service";
import {getPeriodsFromDatastore, PeriodList} from "./dataStorePeriods.service";

function transformIdNameList(list:{id:string, displayName}[]):idName[]{
    return list.map(item=>{return{id:item.id, name:item.displayName}});
}

export default class FilterOptionsProvider {
    private orgUnitList: idName[];
    private dataTypeList: idName[] = [{id: 'TARGETS', name: 'MER Targets'}, {id: 'RESULTS', name: 'MER Results'}];
    private periodList: PeriodList;
    private agencyList: idName[];
    private technicalAreaList: idName[];
    private dedupeTypeList: idName[] = [{id: 'PURE', name: 'Pure Dedupes'}, {id:'CROSSWALK', name: 'Crosswalk Dedupes'}];

    init():Promise<any>{
        return Promise.all([
            this.getOrganisationUnits(),
            this.getPeriods(),
            this.getAgencies(),
            this.getTechnicalAreas()
        ]);
    }

    private getOrganisationUnits():Promise<any>{
        return getData('/organisationUnits.json?filter=level:eq:3')
            .then(res=>transformIdNameList(res.organisationUnits))
            .then((orgUnits)=>{
                this.orgUnitList = orgUnits;
        });
    }

    private getPeriods():Promise<any>{
        return getPeriodsFromDatastore().then(periodList=>this.periodList=periodList);
    }

    private getAgencies():Promise<any>{
        return getData('/categoryOptionGroups.json?filter=groupSets.id:eq:bw8KHXzxd9i&paging=false')
            .then(res=>transformIdNameList(res.categoryOptionGroups))
            .then((agencyList)=>{
                this.agencyList = agencyList;
        });
    }

    private getTechnicalAreas():Promise<any>{
        return getData('/dataElementGroups.json?filter=groupSets.id:eq:LxhLO68FcXm&fields=id,shortName,displayName&paging=false')
            .then(res=>res.dataElementGroups)
            .then(degs=>degs.map(de=>{return {
                id: de.shortName,
                name: de.displayName
            }}))
            .then((technicalAreaList)=> {
                this.technicalAreaList = technicalAreaList;
            });
    }

    getFilterOptions(type:FilterType){
        switch(type){
            case FilterType.organisationUnit: return this.orgUnitList;
            case FilterType.dataType: return this.dataTypeList;
            case FilterType.agency: return this.agencyList;
            case FilterType.technicalArea: return this.technicalAreaList;
            case FilterType.dedupeType: return this.dedupeTypeList;
            //throw new Error('Unknown filter option')
            default: return [];
        }
    }

    getPeriodOptions(dataType:string){
        if (!dataType) return [];
        return this.periodList[dataType.toLocaleLowerCase()];
    }
}

