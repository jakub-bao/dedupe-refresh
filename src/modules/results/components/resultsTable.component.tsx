import React from "react";
import MaterialTable from "material-table";
import {DedupeModel} from "../models/dedupe.model";

const noSort = {sorting: false};
const padding = '5px 5px 5px 5px';

const tableOptions = {
    pageSize: 20,
    pageSizeOptions: [20, 50, 100],
    selection: true,
    emptyRowsWhenPaging: false,
    thirdSortClick: false,
    padding: 'dense' as ('default' | 'dense'),
    headerStyle: {padding}
};

const borderRight = '1px solid #00000021';


const columnSettings = [
    {title: 'Data Element', field: 'info.dataElementName', cellStyle: {padding}},
    {title: 'Disaggregation', field: 'data.disAggregation', cellStyle: {padding}},
    {title: 'Organisation Unit', field: 'info.orgUnitName', cellStyle: {padding, borderRight}},
    {title: 'Agency', render: iterateValuesFactory('agencyName'), ...noSort, cellStyle: {padding}},
    {title: 'Partner', render: iterateValuesFactory('partnerName'), ...noSort, cellStyle: {padding}},
    {title: 'Mechanism #', render: iterateValuesFactory('mechanismNumber'), ...noSort, cellStyle: {padding}},
    {title: 'Value', render: iterateValuesFactory('value'), ...noSort, cellStyle: {padding, borderRight}}
];


function iterateValuesFactory(property:string){
    return function(dedupe:DedupeModel){
        return <ul style={{paddingInlineStart: 15}}>
            {dedupe.duplicates.map(duplicate=><li>{duplicate[property]}</li>)}
        </ul>
    }
}

export default function ResultsTable({filteredDedupes}:{filteredDedupes: DedupeModel[]}) {
    return <MaterialTable
        title="Data Deduplication"
        options={tableOptions}
        columns={columnSettings}
        data={filteredDedupes}/>;
}