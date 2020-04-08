import React from "react";
import {Button, Chip, Typography} from "@material-ui/core";
import {FiltersUiModel} from "../../filters/components/filtersUi.model";
import {FiltersModel, FilterType} from "../../filters/models/filters.model";
import {Filter} from "@material-ui/icons";
import FilterOptionsProvider from "../../filters/services/filterOptionsProvider.service";

const styles = {
    chip: {marginLeft: 5}
};

function renderFilterList(selectedFilters:FiltersModel, filterOptionsProvider:FilterOptionsProvider) {
    return Object.keys(selectedFilters)
        .filter(filterType=>selectedFilters[filterType])
        .map((filterType:FilterType)=>{
            const valueName = filterOptionsProvider.getValueNameById(filterType, selectedFilters[filterType]);
            return <Chip label={valueName} size="small" style={styles.chip}/>
    });
}

export default function Header({selectedFilters, filterOptionsProvider, filtersUi}:{
    selectedFilters: FiltersModel,
    filterOptionsProvider: FilterOptionsProvider
    filtersUi: FiltersUiModel
}) {
    return <React.Fragment>
        <Typography variant='h4'>Data Deduplication</Typography>
        <Button onClick={filtersUi.collapseFilters} variant='outlined' size='small' id='cypress_openFilters'>
            <Filter/>
            Filters
        </Button>
        {renderFilterList(selectedFilters, filterOptionsProvider)}
    </React.Fragment>;
}