import React from "react";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {DedupeInternalStatusName, DedupeModel, ResolutionMethodType} from "../../models/dedupe.model";
import "./resolutionMethodCell.component.css";
import CustomValueInput from "./customValueInput.component";

const classes = {label: 'dedupe_resolutionMethodCell_label'}

function countAdjustmentValue(dedupe:DedupeModel, method: ResolutionMethodType):number{
    if (method===ResolutionMethodType.maximum) return dedupe.resolution.availableValues.max - dedupe.resolution.availableValues.sum;
    if (method===ResolutionMethodType.sum) return 0;
    if (method===ResolutionMethodType.custom) return null;
}

function resolutionMethodChangeFactory(dedupe:DedupeModel){
    return (event)=>{
        let newMethod: ResolutionMethodType = event.target.value;
        dedupe.resolution.resolvedBy = {
            resolutionValue: dedupe.resolution.availableValues[newMethod as string],
            resolutionMethod: newMethod,
            deduplicationAdjustmentValue: countAdjustmentValue(dedupe, newMethod)
        };
        dedupe.internalStatus.statusName = DedupeInternalStatusName.readyToSave;
    }
}

function customValueChangeFactory(dedupe:DedupeModel){
    return (newValue:number)=>{
        dedupe.resolution.resolvedBy.resolutionValue = newValue;
        dedupe.resolution.resolvedBy.deduplicationAdjustmentValue = newValue - dedupe.resolution.availableValues.sum;
        dedupe.internalStatus.statusName = DedupeInternalStatusName.readyToSave;
    }
}

export default function ResolutionMethodCell({dedupe}:{dedupe:DedupeModel}) {
    const resolutionSum = dedupe.resolution.availableValues.sum;
    const resolutionMax = dedupe.resolution.availableValues.max;
    const resolvedBy = dedupe.resolution.resolvedBy;
    let customValue;
    if (resolvedBy && resolvedBy.resolutionMethod===ResolutionMethodType.custom) customValue = resolvedBy.resolutionValue;
    return <RadioGroup value={resolvedBy?resolvedBy.resolutionMethod:''} onChange={resolutionMethodChangeFactory(dedupe)} className='cypress_resolutionMethodCell'>
        <FormControlLabel classes={classes} value="maximum" control={<Radio size='small'/>} label={`Maximum (${resolutionMax})`} className='cypress_resolutionMethod_maximum'/>
        <FormControlLabel classes={classes} value="sum" control={<Radio size='small'/>} label={`Sum (${resolutionSum})`} className='cypress_resolutionMethod_sum'/>
        <FormControlLabel classes={classes} value="custom" control={<Radio size='small'/>} label={<CustomValueInput value={customValue} onChange={customValueChangeFactory(dedupe)}/>} className='cypress_resolutionMethod_custom'/>
    </RadioGroup>
}