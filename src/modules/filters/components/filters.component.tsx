import React from "react";
import {Button, Drawer, Typography} from "@material-ui/core";
import {FiltersModel, FilterType} from "../models/filters.model";
import SelectFilter from "./selectFilter.component";
import "./filters.component.css";
import FilterOptionsProvider from "../services/filterOptionsProvider.service";
import {FilterList} from "@material-ui/icons";

const styles = {
    filtersIcon: {
        verticalAlign: 'sub'
    }
};

function renderSelectFilters(
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string)=>void,
    filterOptionsProvider: FilterOptionsProvider
) {
    return Object.keys(selectedFilters).map((filterType:string)=>{
        let filterOptions;
        if (filterType!=='period') filterOptions = filterOptionsProvider.getFilterOptions(filterType as FilterType);
        else filterOptions = filterOptionsProvider.getPeriodOptions(selectedFilters.dataType);
        return <SelectFilter
            key={filterType}
            filterType={filterType as FilterType}
            filterValue={selectedFilters[filterType]}
            onFilterSelect={(filterValue:string)=>onFiltersSelect(filterType as FilterType, filterValue)}
            filterOptions={filterOptions}
        />
    });
}

function searchEnabled(selectedFilters:FiltersModel):boolean{
    return !!selectedFilters.organisationUnit && !!selectedFilters.dataType && !!selectedFilters.period;
}

export default function Filters({selectedFilters, onFiltersSelect, filterOptionsProvider, onSearchClick}:{
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string)=>void,
    filterOptionsProvider: FilterOptionsProvider,
    onSearchClick: ()=>void
}) {
    return <Drawer
        anchor='left'
        variant="persistent"
        open={true}
        classes={{paper:'filters_root'}}
    >
        <Typography variant='h6'>
            <FilterList style={styles.filtersIcon}/>
            Filters
        </Typography>
        {renderSelectFilters(selectedFilters, onFiltersSelect, filterOptionsProvider)}
        <br/>
        <Button variant="contained" color="secondary" onClick={onSearchClick} disabled={!searchEnabled(selectedFilters)}>
            Search Dedupes
        </Button>
    </Drawer>;
}