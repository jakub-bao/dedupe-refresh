import React from "react";
import MaterialTable, {MTableBodyRow} from "material-table";
import {DedupeModel} from "../models/dedupe.model";
import {DuplicatesCell, DuplicatesCellHeader} from "./tableCells/duplicatesCell.component";
import ResolutionMethodCell from "./tableCells/resolutionMethodCell.component";
import getStatusCellBackground from "../services/getStatusCellBackground.service";

const noSort = {sorting: false};
const padding = '5px 5px 5px 5px';

const tableOptions = {
    pageSize: 20,
    pageSizeOptions: [20, 50, 100],
    selection: true,
    emptyRowsWhenPaging: false,
    thirdSortClick: false,
    padding: 'dense' as ('default' | 'dense'),
    headerStyle: {padding},
    toolbar: false,
};

const borderRight = '1px solid #00000021';


const columnSettings = [
    {title: 'Data Element', field: 'info.dataElementName', cellStyle: {padding}},
    {title: 'Disaggregation', field: 'data.disAggregation', cellStyle: {padding}},
    {title: 'Org Unit', field: 'info.orgUnitName', cellStyle: {padding, borderRight}},
    {title: <DuplicatesCellHeader/>, render: (dedupe:DedupeModel)=><DuplicatesCell dedupe={dedupe}/>, ...noSort, cellStyle: {padding, borderRight}},
    {title: 'Resolution', render: (dedupe:DedupeModel)=><ResolutionMethodCell dedupe={dedupe}/>, ...noSort, cellStyle: {padding, borderRight}},
    {title: 'Status', field: 'internalStatus.statusName', cellStyle: getStatusCellBackground}
];

const customComponents = {
    Container: props=><div {...props}></div>,
    Row: props=><MTableBodyRow {...props} className='cypress_resultsRow'/>
};

export default function ResultsTable({filteredDedupes}:{filteredDedupes: DedupeModel[]}) {
    return <MaterialTable
        title="Data Deduplication"
        options={tableOptions}
        columns={columnSettings}
        data={filteredDedupes}
        components={customComponents}
    />;
}