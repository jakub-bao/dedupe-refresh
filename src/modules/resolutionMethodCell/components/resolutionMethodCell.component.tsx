import React from "react";
import {DedupeModel, ResolutionMethodType} from "../../results/models/dedupe.model";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";

export default class ResolutionMethodCell extends React.Component<{dedupe:DedupeModel}, {
    resolutionMethod: ResolutionMethodType,
}>{
    constructor(props) {
        super(props);
        this.state = {
            resolutionMethod: this.props.dedupe.resolution.resolvedBy.resolutionMethod
        };
    }


    onResolutionChange = (event)=>{
        this.setState({resolutionMethod: event.target.value as ResolutionMethodType});
    };

    render() {
        const resolutionSum = this.props.dedupe.resolution.availableValues.sum;
        const resolutionMax = this.props.dedupe.resolution.availableValues.max;
        return <RadioGroup value={this.state.resolutionMethod} onChange={this.onResolutionChange}>
            <FormControlLabel value="maximum" control={<Radio/>} label={`Maximum (${resolutionMax})`}/>
            <FormControlLabel value="sum" control={<Radio/>} label={`Sum (${resolutionSum})`}/>
            <FormControlLabel value="custom" control={<Radio/>} label={`Custom Value`}/>
        </RadioGroup>
    }
}