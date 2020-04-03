import React from "react";
import Filters from "../../filters/components/filters.component";
import {FiltersModel, FilterType} from "../../filters/models/filters.model";
import FilterOptionsProvider from "../../filters/services/filterOptionsProvider.service";
import Loading from "../../shared/components/loading.component";
import DedupeDataProvider from "../../results/services/dedupeDataProvider.service";
import {DedupeModel} from "../../results/models/dedupe.model";

export default class Main extends React.Component<{}, {
    selectedFilters:FiltersModel,
    results: {
        dedupes: DedupeModel[]
    }
    loadingFilterOptions: boolean
}> {
    filterOptionsProvider:FilterOptionsProvider = new FilterOptionsProvider();
    dedupeDataProvider:DedupeDataProvider = new DedupeDataProvider();
    constructor(props) {
        super(props);
        this.state = {
            selectedFilters: {
                organisationUnit: null,
                dataType: null,
                period: null,
                agency: null,
                technicalArea: null,
                dedupeType: null,
            },
            results: {
                dedupes: null
            },
            loadingFilterOptions: true
        };
        this.filterOptionsProvider.init().then(()=>{
            this.setState({loadingFilterOptions:false});
        });
    }

    fetchDedupes(orgUnitId:string){
        this.dedupeDataProvider
            .changeOrgUnit(orgUnitId, this.filterOptionsProvider.getAllPeriods())
            .then(()=>{
                this.setState({results: {dedupes:this.dedupeDataProvider.getAllDedupes()}})
            })
    }

    onFiltersSelect = (filterType:FilterType, filterValue:string):void=>{
        let selectedFilters = {...this.state.selectedFilters};
        selectedFilters[filterType] = filterValue;
        this.setState({selectedFilters});
        if (filterType===FilterType.organisationUnit) this.fetchDedupes(filterValue);
    };

    render() {
        if (this.state.loadingFilterOptions) return <Loading message={'Loading...'}/>;
        return <React.Fragment>
            <Filters
                selectedFilters={this.state.selectedFilters}
                onFiltersSelect={this.onFiltersSelect}
                filterOptionsProvider={this.filterOptionsProvider}
            />
            <div id="cypress_results" style={{marginLeft: 300}}>{JSON.stringify(this.state.results.dedupes)}</div>
        </React.Fragment>;
    }
}