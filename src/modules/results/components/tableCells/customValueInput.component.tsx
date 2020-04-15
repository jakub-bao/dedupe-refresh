import React from "react";
import {Input, Typography} from "@material-ui/core";

const styles = {
    label: {fontSize: '0.875rem'}
};

export default function CustomValueInput({value, onChange}:{
    value:number,
    onChange: (newCustomValue:number) => void
}) {
    return <React.Fragment>
        <Typography style={styles.label}>Custom Value</Typography>
        <Input value={value} onChange={(event)=>onChange(parseInt(event.target.value))} type='number' className='cypress_customValueInput'/>
    </React.Fragment>
}