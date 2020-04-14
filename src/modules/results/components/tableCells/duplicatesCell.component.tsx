import React from "react";
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import "./duplicatesCell.component.css";
import {DedupeModel, DuplicateModel} from "../../models/dedupe.model";

const sizes = ['80px', '140px', '80px', '80px'];

const styles = {
    root: {
        width: 400
    },
    cells: sizes.map(width=>({
        width: width
    })),
    duplicateCellHeader: {
        display: 'flex',
    },
    duplicateCellHeaderItem:sizes.map(width=>({
        flexBasis: width,
        margin: '0px 5px'
    }))
}

function DuplicateTableCell(props:any){
    return <TableCell classes={{root: 'duplicateCell'}} {...props}/>;
}

function renderDuplicates(duplicates:DuplicateModel[]){
    return duplicates.map((duplicate:DuplicateModel)=><TableRow>
        <DuplicateTableCell style={styles.cells[0]}>{duplicate.agencyName}</DuplicateTableCell>
        <DuplicateTableCell style={styles.cells[1]}>{duplicate.partnerName}</DuplicateTableCell>
        <DuplicateTableCell style={styles.cells[2]}>{duplicate.mechanismNumber}</DuplicateTableCell>
        <DuplicateTableCell style={styles.cells[3]}>{duplicate.value}</DuplicateTableCell>
    </TableRow>);
}

export function DuplicatesCell({dedupe}:{dedupe:DedupeModel}) {
    return <Table size="small" style={styles.root}>
        <TableBody>
            {renderDuplicates(dedupe.duplicates)}
        </TableBody>
    </Table>
}

export function DuplicatesCellHeader(){
    return <div style={styles.duplicateCellHeader}>
        <div style={styles.duplicateCellHeaderItem[0]}>Agency</div>
        <div style={styles.duplicateCellHeaderItem[1]}>Partner</div>
        <div style={styles.duplicateCellHeaderItem[2]}>Mechanism</div>
        <div style={styles.duplicateCellHeaderItem[3]}>Value</div>
    </div>;
}