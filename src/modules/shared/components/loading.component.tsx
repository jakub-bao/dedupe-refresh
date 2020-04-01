import React from 'react';
import {CircularProgress, LinearProgress, Typography} from "@material-ui/core";
import { TextAlignProperty } from 'csstype';

const styles = {
    root: {
        marginTop: 100,
        textAlign: 'center' as TextAlignProperty
    },
    message: {

    }
};

export default function Loading({message}:{message:string}) {
    return <div style={styles.root}>
        <CircularProgress/>
        <br/>
        <Typography className='cy_loading' color="primary" style={styles.message}>{message}</Typography>
    </div>;
}