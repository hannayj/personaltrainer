import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function Addtraining(props) {
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState({open: false, message: ''});
    const [training, setTraining] = useState({
        date: '', activity:'', duration: '', customer: '',
    });
    const [date, setDate] = useState(new Date());

    const handleClickOpen = () => {
        setOpen(true);
        //console.log(props.customer);
    };

    const handleClose = () => {
        setOpen(false);
        setSuccess(false);
    };
    
    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    };

    const addTraining = () => {
        const dateFormatted = date.format();
        const wholeTraining = {...training, date: dateFormatted, customer: props.customer.links[0].href}
        //console.log(wholeTraining)
        props.addTraining(wholeTraining);
        handleClose();
        setSuccess({open: true, message: 'New training added for ' + props.customer.firstname + ' ' + props.customer.lastname});
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
                        label="DateTimePicker"
                        name="date"
                        inputVariant="outlined"
                        value={date}
                        onChange={setDate}
                        
                    />
                </MuiPickersUtilsProvider>

                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration"
                        fullWidth
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
            <Snackbar open={success.open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {success.message}
                </Alert>
            </Snackbar>
        </div>
    );
}