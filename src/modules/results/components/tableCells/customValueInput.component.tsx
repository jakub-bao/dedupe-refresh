import React from "react";
import {Input, Typography} from "@material-ui/core";

const styles = {
    label: {fontSize: '0.875rem'}
};

export default function CustomValueInput({}:{}) {
    return <React.Fragment>
        <Typography style={styles.label}>Custom Value</Typography>
        <Input/>
    </React.Fragment>
}