import {DataTypePeriodList, FilterType, idName} from "../models/filters.model";
import {getData} from "../../shared/services/dataApi.service";
import {getPeriodsFromDatastore} from "./dataStorePeriods.service";

function transformIdNameList(list:{id:string, displayName}[]):idName[]{
    return list.map(item=>{return{id:item.id, name:item.displayName}});
}

export default class FilterOptionsProvider {
    private orgUnitList: idName[];
    private dataTypeList: idName[] = [{id: 'TARGETS', name: 'MER Targets'}, {id: 'RESULTS', name: 'MER Results'}];
    private periodList: DataTypePeriodList;
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

    private getAllOrganisationUnits():Promise<any>{
        return getData('/organisationUnits.json?filter=level:eq:3')
            .then(res=>transformIdNameList(res.organisationUnits));
    }

    private getUserOrganisationUnits():Promise<any>{
        return getData('/me?fields=organisationUnits[id,name]')
            .then(res=>res.organisationUnits);
    }

    private getOrganisationUnits():Promise<any>{
        return Promise.all([
            this.getUserOrganisationUnits(),
            this.getAllOrganisationUnits(),
        ]).then(response=>{
            let userOus = response[0];
            let allOus = response[1];
            let isGlobal = userOus.map(ou=>ou.name).includes('Global');
            if (isGlobal) return this.orgUnitList = allOus;
            else return this.orgUnitList = userOus;
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
            throw new Error('Unknown filter option')
        }
    }

    getPeriodOptions(dataType:string){
        if (!dataType) return [];
        return this.periodList[dataType.toLocaleLowerCase()];
    }

    getAllPeriods():DataTypePeriodList{
        return this.periodList;
    }
}


