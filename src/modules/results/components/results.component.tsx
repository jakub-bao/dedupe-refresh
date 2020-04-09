import React from "react";
import {DedupeModel} from "../models/dedupe.model";
import ResultsTable from "./resultsTable.component";
import {Typography} from "@material-ui/core";

const styles = {
    info: {
        margin: '30px 10px'
    }
};

export default function Results({filteredDedupes}:{
    filteredDedupes: DedupeModel[],
}) {
    if (!filteredDedupes) return <Typography style={styles.info}>Start by selecting dedupes on the left...</Typography>;
    if (filteredDedupes.length===0) return <Typography style={styles.info}>No duplicates found matching selected criteria</Typography>
    return <ResultsTable filteredDedupes={filteredDedupes}/>;
}