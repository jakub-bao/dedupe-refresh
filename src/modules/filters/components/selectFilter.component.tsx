import React, {ChangeEvent} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {FilterType} from "../models/filters.model";
import {camelCaseToHuman} from "../../shared/services/camelCase.service";
import {idName} from "../../shared/models/shared.models";
import "./selectFilter.component.css"


export default function SelectFilter({filterType, filterValue, onFilterSelect, filterOptions}:{
    filterType:FilterType,
    filterValue:string,
    onFilterSelect:(filterValue:string)=>void,
    filterOptions: idName[]
}) {
    return <FormControl>
        <InputLabel id={`selectFilter_${filterType}`}>{camelCaseToHuman(filterType)}</InputLabel>
        <Select
            labelId={`selectFilter_${filterType}`}
            id={`cypress_filter_${filterType}`}
            value={filterValue||''}
            onChange={(event:ChangeEvent<any>)=>onFilterSelect(event.target.value)}
            classes={{selectMenu: 'filters_menu'}}
        >
            {filterOptions.map(option=><MenuItem value={option.id} key={option.id}>{option.name}</MenuItem>)}
        </Select>
    </FormControl>;
}