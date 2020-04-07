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
    rootClosedFilters: {
        marginLeft: 15
    }
}));

function Indent({filtersOpen, classes, children}:{filtersOpen: boolean, classes: any, children: any}){
    console.log(filtersOpen);
    console.log({[classes.rootWithOpenFilters]: filtersOpen});
    console.log(clsx(classes.root, {[classes.rootWithOpenFilters]: filtersOpen}));
    return <div className={clsx(classes.root, {[classes.rootClosedFilters]: !filtersOpen})}>
        {children}
    </div>;
}

export default function Results({filteredDedupes, filtersUi}:{
    filteredDedupes: DedupeModel[],
    filtersUi: FiltersUiModel
}) {
    const classes = useStyles();
    if (!filteredDedupes) return <Indent filtersOpen={filtersUi.filtersOpen} classes={classes}><Typography>Start by selecting dedupes on the left...</Typography></Indent>;
    return <Indent filtersOpen={filtersUi.filtersOpen} classes={classes}><ResultsTable filteredDedupes={filteredDedupes}/></Indent>;
}