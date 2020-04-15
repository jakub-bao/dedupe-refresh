import React from "react";
import {DedupeInternalStatusName, DedupeModel} from "../../models/dedupe.model";
import {Button, Typography} from "@material-ui/core";

function showRightButton(dedupe:DedupeModel, resolveDedupe: (DedupeModel)=>void){
    let buttonText;
    let infoText;
    let method;
    switch(dedupe.internalStatus.statusName){
        case DedupeInternalStatusName.alreadyResolved: buttonText = 'Unresolve'; break;
        case DedupeInternalStatusName.readyToSave: buttonText = 'Save'; method = resolveDedupe; break;

        case DedupeInternalStatusName.readyToResolve: infoText='Please select resolution method'; break;
        case DedupeInternalStatusName.error: return infoText='Please resolve issues'; break;
    }
    if (buttonText) return <Button variant="outlined" color="secondary" onClick={method}>
        {buttonText}
    </Button>
    if (infoText) return <Typography>{infoText}</Typography>;
    console.error(new Error('Undefined status'));
}

export default function ActionCell({dedupe, resolveDedupe}:{dedupe:DedupeModel, resolveDedupe: (DedupeModel)=>void}) {
    return <React.Fragment>{showRightButton(dedupe, resolveDedupe)}</React.Fragment>;
}