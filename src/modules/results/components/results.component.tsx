// import React from "react";
// import {DedupeModel} from "../models/dedupe.model";
// import ResultsTable from "./resultsTable.component";
// import {Typography} from "@material-ui/core";
// import {FiltersUiModel} from "../../filters/components/filtersUi.model";
// import {makeStyles} from "@material-ui/core/styles";
// import clsx from "clsx";
//
//
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         marginTop: 10,
//         marginLeft: 235,
//         marginRight: 15
//     },
//     rootClosedFilters: {
//         marginLeft: 15
//     }
// }));
//
// function Indent({filtersOpen, classes, children}:{filtersOpen: boolean, classes: any, children: any}){
//     return <div className={clsx(classes.root, {[classes.rootClosedFilters]: !filtersOpen})}>
//         {children}
//     </div>;
// }
//
// export default function Results({filteredDedupes, filtersUi}:{
//     filteredDedupes: DedupeModel[],
//     filtersUi: FiltersUiModel
// }) {
//     const classes = useStyles();
//     if (!filteredDedupes) return <Indent filtersOpen={filtersUi.filtersOpen} classes={classes}><Typography>Start by selecting dedupes on the left...</Typography></Indent>;
//     return <Indent filtersOpen={filtersUi.filtersOpen} classes={classes}><ResultsTable filteredDedupes={filteredDedupes}/></Indent>;
// }

import React from "react";
import {DedupeModel} from "../models/dedupe.model";
import ResultsTable from "./resultsTable.component";
import {Typography} from "@material-ui/core";
import {FiltersUiModel} from "../../filters/components/filtersUi.model";

const styles = {
    root: {
        marginTop: 10,
        marginLeft: 235,
        marginRight: 15,
        transition: 'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    rootClosedFilters: {
        marginLeft: 15
    }
};

function Indent({filtersOpen, children}:{filtersOpen: boolean, children: any}){
    let finalStyle = Object.assign({}, styles.root, filtersOpen?{}:styles.rootClosedFilters);
    return <div style={finalStyle}>
        {children}
    </div>;
}

export default function Results({filteredDedupes, filtersUi}:{
    filteredDedupes: DedupeModel[],
    filtersUi: FiltersUiModel
}) {
    if (!filteredDedupes) return <Indent filtersOpen={filtersUi.filtersOpen}><Typography>Start by selecting dedupes on the left...</Typography></Indent>;
    return <Indent filtersOpen={filtersUi.filtersOpen}><ResultsTable filteredDedupes={filteredDedupes}/></Indent>;
}