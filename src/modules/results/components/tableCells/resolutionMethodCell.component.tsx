import React from "react";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {DedupeModel, DedupeResolvedByModel, ResolutionMethodType} from "../../models/dedupe.model";
import "./resolutionMethodCell.component.css";
import CustomValueInput from "./customValueInput.component";

const classes = {label: 'dedupe_resolutionMethodCell_label'}

export default class ResolutionMethodCell extends React.Component<{dedupe:DedupeModel}, {
    resolvedBy: DedupeResolvedByModel,
}>{
    constructor(props) {
        super(props);
        this.state = {
            resolvedBy: this.props.dedupe.resolution.resolvedBy
        };
    }

    countAdjustmentValue(dedupe:DedupeModel, method: ResolutionMethodType):number{
        if (method===ResolutionMethodType.maximum) return dedupe.resolution.availableValues.max - dedupe.resolution.availableValues.sum;
        if (method===ResolutionMethodType.sum) return 0;
        if (method===ResolutionMethodType.custom) throw new Error('todo custom value');
    }

    onResolutionMethodChange = (event)=>{
        let newMethod: ResolutionMethodType = event.target.value;
        if (newMethod===ResolutionMethodType.maximum || newMethod===ResolutionMethodType.sum) {
            this.setState({resolvedBy:{
                    resolutionValue: this.props.dedupe.resolution.availableValues[newMethod as string],
                    resolutionMethod: newMethod,
                    deduplicationAdjustmentValue: this.countAdjustmentValue(this.props.dedupe, newMethod)
                }
            });
        }
    };

    render() {
        const resolutionSum = this.props.dedupe.resolution.availableValues.sum;
        const resolutionMax = this.props.dedupe.resolution.availableValues.max;
        const customValue = this.props.dedupe.resolution.resolvedBy.resolutionValue;
        return <RadioGroup value={this.state.resolvedBy?this.state.resolvedBy.resolutionMethod:''} onChange={this.onResolutionMethodChange} className='cypress_resolutionMethodCell'>
            <FormControlLabel classes={classes} value="maximum" control={<Radio size='small'/>} label={`Maximum (${resolutionMax})`} className='cypress__maximum'/>
            <FormControlLabel classes={classes} value="sum" control={<Radio size='small'/>} label={`Sum (${resolutionSum})`} className='cypress__sum'/>
            <FormControlLabel classes={classes} value="custom" control={<Radio size='small'/>} label={<CustomValueInput/>} className='cypress__custom'/>
        </RadioGroup>
    }
}