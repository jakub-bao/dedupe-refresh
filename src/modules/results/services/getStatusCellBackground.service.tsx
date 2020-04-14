import React from "react";
import {DedupeInternalStatusName, DedupeModel} from "../models/dedupe.model";
import {CSSProperties} from "react";

export default function getStatusCellBackground(allDedupes: DedupeModel[], dedupe: DedupeModel):CSSProperties{
    let color:string;
    switch (dedupe.internalStatus.statusName) {
        case DedupeInternalStatusName.readyToEdit:  color = '#A09EBB'; break; //#DCD6F7
        case DedupeInternalStatusName.alreadyResolved: color = '#A2FAA3'; break;
        case DedupeInternalStatusName.readyToSave: color = '#FFAD05'; break;
    }
    return {backgroundColor: color};
}