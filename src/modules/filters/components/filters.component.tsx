import React from "react";
import {Drawer} from "@material-ui/core";
import {FiltersModel, FilterType} from "../models/filters.model";
import SelectFilter from "./selectFilter.component";
import "./filters.component.css";
import FilterOptionsProvider from "../services/filterOptionsProvider.service";

function renderSelectFilters(
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string)=>void,
    filterOptionsProvider: FilterOptionsProvider
) {
    return Object.keys(selectedFilters).map((filterType:string)=>{
        return <SelectFilter
            key={filterType}
            filterType={filterType as FilterType}
            filterValue={selectedFilters[filterType]}
            onFilterSelect={(filterValue:string)=>onFiltersSelect(filterType as FilterType, filterValue)}
            filterOptions={filterOptionsProvider.getFilterOptions(filterType as FilterType)}
        />
    });
}

export default function Filters({selectedFilters, onFiltersSelect, filterOptionsProvider}:{
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string)=>void,
    filterOptionsProvider: FilterOptionsProvider
}) {
    return <Drawer
        anchor='left'
        variant="persistent"
        open={true}
        classes={{paper:'filters_root'}}
    >
        {renderSelectFilters(selectedFilters, onFiltersSelect, filterOptionsProvider)}
    </Drawer>;
}