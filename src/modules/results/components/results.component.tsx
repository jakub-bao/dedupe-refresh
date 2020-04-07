import React from "react";
import {DedupeModel} from "../models/dedupe.model";
import ResultsTable from "./resultsTable.component";
import {Typography} from "@material-ui/core";
import {FiltersUiModel} from "../../filters/components/filtersUi.model";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";



const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 10,
        marginLeft: 235,
        marginRight: 15
    },
    rootWithOpenFilters: {
        marginLeft: 15
    }
}));

export default function Results({filteredDedupes, filtersUi}:{
    filteredDedupes: DedupeModel[],
    filtersUi: FiltersUiModel
}) {
    const classes = useStyles();
    if (!filteredDedupes) return <Typography>Start by selecting dedupes on the left...</Typography>
    return <div className={clsx(classes.root, {[classes.rootWithOpenFilters]: filtersUi.filtersOpen})}>
        <ResultsTable filteredDedupes={filteredDedupes}/>
    </div>;
}