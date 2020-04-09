import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";

export default function ResolvedCheckbox({includeResolved, onChange}:{includeResolved:boolean, onChange:()=>void}) {
    return <FormControlLabel
        control={<Checkbox checked={includeResolved} onChange={onChange} name="includeResolved" />}
        label="Include Resolved"
    />;
}