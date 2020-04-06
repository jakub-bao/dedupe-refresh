import React from "react";
import {DedupeModel} from "../models/dedupe.model";
import ResultsTable from "./resultsTable.component";
import {Typography} from "@material-ui/core";


export default function Results({filteredDedupes}:{
    filteredDedupes: DedupeModel[]
}) {
    if (!filteredDedupes) return <Typography>Start by selecting dedupes on the left...</Typography>
    return <React.Fragment>
        <ResultsTable filteredDedupes={filteredDedupes}/>
    </React.Fragment>;
}