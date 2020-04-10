import React from "react";
import {Button, Divider, Drawer, IconButton, Typography} from "@material-ui/core";
import {
    FiltersModel,
    FilterType,
    OptionalFiltersModel,
    RequiredFiltersModel,
} from "../models/filters.model";
import SelectFilter from "./selectFilter.component";
import FilterOptionsProvider from "../services/filterOptionsProvider.service";
import {ChevronLeft, FilterList} from "@material-ui/icons";
import {PositionProperty} from "csstype";
import "./filters.component.css";
import {FiltersUiModel} from "./filtersUi.model";
import CheckboxFilter from "./checkboxFilter.component";

const styles = {
    filtersIcon: {
        verticalAlign: 'sub'
    },
    closeDrawerIcon: {
        position: 'absolute' as PositionProperty,
        top: 0,
        right: 0
    }
};

function CloseDrawerIcon({onClick}:{onClick:()=>void}){
    return <IconButton onClick={onClick} style={styles.closeDrawerIcon} id='cypress_collapseFilters'>
        <ChevronLeft/>
    </IconButton>
}

function renderFilters(
    filterList: RequiredFiltersModel|OptionalFiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string|boolean)=>void,
    filterOptionsProvider: FilterOptionsProvider
) {
        return Object.keys(filterList).map((filterType:FilterType)=>{
            let filterOptions;
            if (filterType!=='period') filterOptions = filterOptionsProvider.getFilterOptions(filterType);
            else filterOptions = filterOptionsProvider.getPeriodOptions((filterList as RequiredFiltersModel).dataType);
            if (filterType===FilterType.includeResolved) return <CheckboxFilter
                key={0}
                checked={(filterList as RequiredFiltersModel).includeResolved}
                label='Include Resolved'
                onChange={()=>onFiltersSelect(FilterType.includeResolved, !(filterList as RequiredFiltersModel).includeResolved)}
            />
            return <SelectFilter
                key={filterType}
                filterType={filterType}
                filterValue={filterList[filterType]}
                onFilterSelect={(filterValue:string)=>onFiltersSelect(filterType, filterValue)}
                filterOptions={filterOptions}
            />
        });

}


function searchEnabled(selectedFilters:FiltersModel):boolean{
    return !!selectedFilters.requiredFilters.organisationUnit && !!selectedFilters.requiredFilters.dataType && !!selectedFilters.requiredFilters.period;
}

export default function Filters({selectedFilters, onFiltersSelect, filterOptionsProvider, onSearchClick, filtersUi}:{
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string|boolean)=>void,
    filterOptionsProvider: FilterOptionsProvider,
    onSearchClick: ()=>void,
    filtersUi: FiltersUiModel
}) {
    return <Drawer
        id='cypress_filters'
        anchor='left'
        variant="persistent"
        open={filtersUi.filtersOpen}
        classes={{paper:'filters_root'}}
    >
        <CloseDrawerIcon onClick={filtersUi.closeFilters}/>
        <Typography variant='h6'>
            <FilterList style={styles.filtersIcon}/>
            Filters
        </Typography>
        {renderFilters(selectedFilters.requiredFilters, onFiltersSelect, filterOptionsProvider)}
        {renderFilters(selectedFilters.optionalFilters, onFiltersSelect, filterOptionsProvider)}
        <br/>
        <Button variant="contained" color="secondary" onClick={onSearchClick} disabled={!searchEnabled(selectedFilters)} id='cypress_searchDedupes'>
            Search Dedupes
        </Button>
    </Drawer>;
}