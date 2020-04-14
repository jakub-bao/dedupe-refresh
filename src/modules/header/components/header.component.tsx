import React from "react";
import {Button, Chip, Divider, Typography} from "@material-ui/core";
import {FiltersUiModel} from "../../filters/components/filtersUi.model";
import {FiltersModel, FilterType} from "../../filters/models/filters.model";
import FilterOptionsProvider from "../../filters/services/filterOptionsProvider.service";
import {FilterList} from "@material-ui/icons";

const styles = {
    chip: {marginLeft: 5},
    filtersCollapseButton: {
        transition: 'all 300ms ease 300ms'
    }
};

function renderFilterList(selectedFilters:FiltersModel, filterOptionsProvider:FilterOptionsProvider) {
    if (!selectedFilters) return null;
    return Object.keys(selectedFilters)
        .filter(filterType=>selectedFilters[filterType])
        .map((filterType:FilterType)=>{
            const valueName = filterOptionsProvider.getValueNameById(filterType, selectedFilters[filterType]);
            return <Chip label={valueName} size="small" style={styles.chip} key={valueName}/>
    });
}

function getButtonStyle(filtersUi:FiltersUiModel):object{
    if (!filtersUi.filtersOpen) return {variant:'contained', color:'primary'};
    else return {variant: 'outlined'};
}

export default function Header({selectedFilters, filterOptionsProvider, filtersUi}:{
    selectedFilters: FiltersModel,
    filterOptionsProvider: FilterOptionsProvider
    filtersUi: FiltersUiModel
}) {
    return <div id='cypress_header'>
        <Typography variant='h4'>Data Deduplication</Typography>
        <Button onClick={filtersUi.collapseFilters} {...getButtonStyle(filtersUi)} size='small' id='cypress_openFilters' style={styles.filtersCollapseButton}>
            <FilterList/>
            Filters
        </Button>
        <span id='cypress_filterBreadCrumb'>
            {renderFilterList(selectedFilters, filterOptionsProvider)}
        </span>
        <Divider/>
    </div>;
}