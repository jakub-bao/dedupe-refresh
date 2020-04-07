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
    loadingFilterOptions: boolean,
    loadingDedupes: boolean,
    ui: {
        filtersOpen: boolean
    }
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
            loadingFilterOptions: true,
            loadingDedupes: false,
            ui: {
                filtersOpen: true
            }
        };
        this.filterOptionsProvider.init().then(()=>{
            this.setState({loadingFilterOptions:false});
        });
    }

    onSearchClick = ()=>{
        this.setState({loadingDedupes: true});
        fetchDedupes(this.state.selectedFilters).then(dedupes=>{
            this.setState({results: {dedupes}, loadingDedupes: false});
        });
    };

    onFiltersSelect = (filterType:FilterType, filterValue:string):void=>{
        if (this.state.selectedFilters[filterType]===filterValue) return;
        let selectedFilters = {...this.state.selectedFilters};
        selectedFilters[filterType] = filterValue;
        this.setState({selectedFilters});
    };

    renderResults(){
        if (this.state.loadingDedupes) return <Loading message={'Searching duplicates...'}/>;
        return <Results filteredDedupes={this.state.results.dedupes}/>;
    }

    renderPreselect(){
        if (!this.state.selectedFilters.organisationUnit) return <div onClick={this.preselect}>preselect</div>
    }

    preselect = ()=>{
        let selectedFilters = {...this.state.selectedFilters};
        selectedFilters.organisationUnit = 'XtxUYCsDWrR';
        selectedFilters.dataType = 'RESULTS';
        selectedFilters.period = '2020Q2';
        this.setState({selectedFilters});
        setTimeout(this.onSearchClick, 0);
    };

    uiSetFiltersOpen = (open:boolean)=>{
        let ui = {...this.state.ui};
        ui.filtersOpen = open;
        this.setState({ui})
    };

    render() {
        if (this.state.loadingFilterOptions) return <Loading message={'Loading...'}/>;
        return <React.Fragment>
            <Filters
                selectedFilters={this.state.selectedFilters}
                onFiltersSelect={this.onFiltersSelect}
                filterOptionsProvider={this.filterOptionsProvider}
                onSearchClick={this.onSearchClick}
                filtersUi={{filtersOpen:this.state.ui.filtersOpen, closeFilters: ()=>this.uiSetFiltersOpen(false)}}
            />
            <div style={styles.results}>
                {this.renderPreselect()}
                {this.renderResults()}
            </div>
        </React.Fragment>;
    }
}