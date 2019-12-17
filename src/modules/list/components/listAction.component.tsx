import React from 'react';
import {Button, Divider, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import MechanismModel from "../../shared/models/mechanism.model";

const styles = {
    infoText: {
        display: 'inline-block',
        marginLeft: 15
    }
};

function checkMechanismStates(mechanisms: MechanismModel[]):boolean {
    let firstStatus = mechanisms[0].state.status;
    return mechanisms.every(m=>m.state.status===firstStatus);
}

function renderSameStatusError(mechanisms: MechanismModel[]){
    if (!checkMechanismStates(mechanisms)) return <Typography>All selected mechanisms must have the same status to proceed.</Typography>;
}

export default function ListAction({selectedAction, selectedMechanisms, actionUrl}:{selectedAction: string, selectedMechanisms: MechanismModel[], actionUrl: string}){
    if (!selectedAction || !selectedMechanisms || selectedMechanisms.length===0) return null;
    return <React.Fragment>
        <Link to={actionUrl}>
            <Button disabled={!checkMechanismStates(selectedMechanisms)} id='cy_list_mechanismAction' variant="contained" color="secondary">
                {selectedAction}
            </Button>
        </Link>
        <Typography style={styles.infoText}>{selectedMechanisms.length} selected mechanism(s)</Typography>
        {renderSameStatusError(selectedMechanisms)}
        <br/>
        <Divider/>
    </React.Fragment>;
}