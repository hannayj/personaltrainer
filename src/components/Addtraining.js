import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import validator from 'validator';

export default function Addtraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '', activity:'', duration: '', customer: '',
    });
    const [date, setDate] = useState(null);
    const [dateError, setDateError] = useState(false);
    const [activityError, setActivityError] = useState(false);
    const [durationError, setDurationError] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        //console.log(props.customer);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    };

    const addTraining = () => {
        console.log(date)
        if (date === null){
            setDateError(true);
        } else if (training.activity === '') {
            setActivityError(true);
        } else {
        const dateFormatted = date.format();
        const wholeTraining = {...training, date: dateFormatted, customer: props.customer.links[0].href}
        //console.log(wholeTraining)
        if(validator.isInt(training.duration,{ min: 15, max: 120 })){
            props.addTraining(wholeTraining);
            handleClose();
        } else {
            setDurationError(true);
        }
    }
    }

    return(
        <div>
            <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New training</DialogTitle>
                <DialogContent>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker
                        label="Date and time"
                        name="date"
                        value={date}
                        onChange={setDate}
                        error={dateError}
                        helperText={dateError ? 'Please give date and time of training':''}
                    />
                </MuiPickersUtilsProvider>
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                        error={activityError}
                        helperText={activityError ? 'Please give the name of the activity':''}
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration (min)"
                        fullWidth
                        error={durationError}
                        helperText={durationError ? 'Duration needs to be a number between 15-120.':''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addTraining} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}