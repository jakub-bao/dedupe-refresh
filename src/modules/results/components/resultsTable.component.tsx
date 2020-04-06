import React from "react";
import MaterialTable from "material-table";
import {DedupeModel} from "../models/dedupe.model";

const columnSettings = [
    {title: 'Data Element', field: 'info.dataElementName'}
];

export default function ResultsTable({filteredDedupes}:{filteredDedupes: DedupeModel[]}) {
    return <MaterialTable
        columns={columnSettings}
        data={filteredDedupes}/>;
}