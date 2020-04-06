import React from "react";
import MaterialTable from "material-table";
import {DedupeModel} from "../models/dedupe.model";

const tableOptions = {
    pageSize: 20,
    pageSizeOptions: [20, 50, 100],
    selection: true,
    emptyRowsWhenPaging: false,
    thirdSortClick: false,
    padding: 'dense' as ('default' | 'dense')
};

const cellRightBorder = {
    borderRight: '1px solid black'
};

function iterateValuesFactory(property:string){
    return function(dedupe:DedupeModel){
        return <ol>
            {dedupe.duplicates.map(duplicate=><li>{duplicate[property]}</li>)}
        </ol>
    }
}


const columnSettings = [
    {title: 'Data Element', field: 'info.dataElementName'},
    {title: 'Disaggregation', field: 'data.disAggregation'},
    {title: 'Organisation Unit', field: 'info.orgUnitName', cellStyle:cellRightBorder},
    {title: 'Agency', render: iterateValuesFactory('agencyName'), sorting: false},
    {title: 'Partner', render: iterateValuesFactory('partnerName'), sorting: false},
    {title: 'Mechanism #', render: iterateValuesFactory('mechanismNumber'), sorting: false},
    {title: 'Value', render: iterateValuesFactory('value'), sorting: false}
];

export default function ResultsTable({filteredDedupes}:{filteredDedupes: DedupeModel[]}) {
    return <MaterialTable
        title="Data Deduplication"
        options={tableOptions}
        columns={columnSettings}
        data={filteredDedupes}/>;
}