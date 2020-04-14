import {DedupeInternalStatusName, DedupeModel} from "../models/dedupe.model";
import {CSSProperties} from "react";

export default function getStatusCellBackground(allDedupes: DedupeModel[], dedupe: DedupeModel):CSSProperties{
    let color:string;
    switch (dedupe.internalStatus.statusName) {
        case DedupeInternalStatusName.readyToResolve:  color = '#DBE4EE'; break;
        case DedupeInternalStatusName.alreadyResolved: color = '#A2FAA3'; break;
        case DedupeInternalStatusName.readyToSave: color = '#FFAD05'; break;
        case DedupeInternalStatusName.error: color = '#DF3B57'; break;
    }
    return {backgroundColor: color, textAlign: 'center'};
}