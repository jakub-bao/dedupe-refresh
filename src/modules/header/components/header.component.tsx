import React from "react";
import {Button, Chip, Typography} from "@material-ui/core";
import {FiltersUiModel} from "../../filters/components/filtersUi.model";
import {FiltersModel} from "../../filters/models/filters.model";
import {Filter} from "@material-ui/icons";

const styles = {
    chip: {marginLeft: 5}
};

function renderFilterList(selectedFilters:FiltersModel) {
    return Object.keys(selectedFilters)
        .filter(filterType=>selectedFilters[filterType])
        .map((filterType:string)=>{
            return <Chip label={selectedFilters[filterType]} size="small" style={styles.chip}/>
    });
}

export default function Header({selectedFilters, filtersUi}:{selectedFilters: FiltersModel, filtersUi: FiltersUiModel}) {
    return <React.Fragment>
        <Typography variant='h4'>Data Deduplication</Typography>
        <Button onClick={filtersUi.collapseFilters} variant='outlined' size='small' id='cypress_openFilters'>
            <Filter/>
            Filters
        </Button>
        {renderFilterList(selectedFilters)}
    </React.Fragment>;
}