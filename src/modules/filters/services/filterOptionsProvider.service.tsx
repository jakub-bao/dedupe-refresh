import {FilterType, idName} from "../models/filters.model";
import {getData} from "../../shared/services/dataApi.service";

function transformIdNameList(list:{id:string, displayName}[]):idName[]{
    return list.map(item=>{return{id:item.id, name:item.displayName}});
}

export default class FilterOptionsProvider {
    private orgUnitList: idName[];
    private dataTypeList: idName[] = [{id: 'TARGETS', name: 'MER Targets'}, {id: 'RESULTS', name: 'MER Results'}];
    private agencyList: idName[];
    private technicalAreaList: idName[];

    init():Promise<any>{
        return Promise.all([
            this.getOrganisationUnits(),
            this.getAgencies(),
            this.getTechnicalAreas()
        ]);
    }

    private getOrganisationUnits(){
        return getData('/organisationUnits.json?filter=level:eq:3')
            .then(res=>transformIdNameList(res.organisationUnits))
            .then((orgUnits)=>{
                this.orgUnitList = orgUnits;
        });
    }

    private getAgencies(){
        return getData('/categoryOptionGroups.json?filter=groupSets.id:eq:bw8KHXzxd9i&paging=false')
            .then(res=>transformIdNameList(res.categoryOptionGroups))
            .then((agencyList)=>{
                this.agencyList = agencyList;
        });
    }

    private getTechnicalAreas(){

    }

    getFilterOptions(type:FilterType){
        switch(type){
            case FilterType.organisationUnit: return this.orgUnitList;
            case FilterType.dataType: return this.dataTypeList;
            case FilterType.agency: return this.agencyList;
            //throw new Error('Unknown filter option')
            default: return [];
        }
    }
}

