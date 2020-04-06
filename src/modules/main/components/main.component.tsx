import React from "react";
import Filters from "../../filters/components/filters.component";
import {FiltersModel, FilterType} from "../../filters/models/filters.model";
import FilterOptionsProvider from "../../filters/services/filterOptionsProvider.service";
import Loading from "../../shared/components/loading.component";
import {DedupeModel} from "../../results/models/dedupe.model";
import fetchDedupes from "../../results/services/dedupeDataProvider.service";
import Results from "../../results/components/results.component";

const styles = {
    results: {
        marginTop: 10,
        marginLeft: 235,
        marginRight: 15
    }
};

export default class Main extends React.Component<{}, {
    selectedFilters:FiltersModel,
    results: {
        dedupes: DedupeModel[]
    }
    loadingFilterOptions: boolean
}> {
    filterOptionsProvider:FilterOptionsProvider = new FilterOptionsProvider();
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
                includeResolved: null
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

    onSearchClick = ()=>{
        fetchDedupes(this.state.selectedFilters).then(dedupes=>{
            this.setState({results: {dedupes}});
        });
    };

    onFiltersSelect = (filterType:FilterType, filterValue:string):void=>{
        if (this.state.selectedFilters[filterType]===filterValue) return;
        let selectedFilters = {...this.state.selectedFilters};
        selectedFilters[filterType] = filterValue;
        this.setState({selectedFilters});
    };

    render() {
        if (this.state.loadingFilterOptions) return <Loading message={'Loading...'}/>;
        return <React.Fragment>
            <Filters
                selectedFilters={this.state.selectedFilters}
                onFiltersSelect={this.onFiltersSelect}
                filterOptionsProvider={this.filterOptionsProvider}
                onSearchClick={this.onSearchClick}
            />
            <div style={styles.results}>
                <Results filteredDedupes={this.state.results.dedupes}/>
            </div>
        </React.Fragment>;
    }
}