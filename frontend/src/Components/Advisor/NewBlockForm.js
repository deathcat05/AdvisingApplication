// import 'date-fns';

import React, { Component } from 'react'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';


/*
advisor_id,
start_day,
session_length,
num_sessions_in_day

*/

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { 
    MuiPickersUtilsProvider, 
    TimePicker, 
    DatePicker 
} from 'material-ui-pickers';


const styles = {
    grid: {
      width: '60%',
    },
  };

class NewBlockForm extends Component {

    state = {
        selectedDate: new Date(),
        sessionLength: '',
        numSession: ''
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    onCreateBlock = async (event) => {

        let { selectedDate, sessionLength, numSession } = this.state
        console.log(this.state)
        // if ( !selectedDate || !sessionLength || !numSessions )
        //     return 

        console.log('hit')
        try {

            let { data } = await axios.post(`http://localhost:8239/v1/createBlock`, {
                advisor_id: 12345, 
                start_day: selectedDate,
                session_length: parseInt(sessionLength),
                num_sessions_in_day: parseInt(numSession)
            })

            console.log(data)
            console.log('finished')

        } catch (e) {
            console.log('after')
        }

        this.props.handleClose(0)
    }

    render() {
        const { classes } = this.props;
        const { selectedDate } = this.state;
        let { open, handleClose } = this.props 
        return (
            <Dialog
            open={open > 0 ? true : false}
            onClose={() => /*handleClose(false)*/ {}}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create Block</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To create a new advising block - please fill in this form and submit!
              </DialogContentText>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', height: '100%', marginTop: '10px' }}>
                    <div style={{ display: 'flex'}}>
                        <DatePicker
                            margin="normal"
                            label="Date picker"
                            value={selectedDate}
                            style={{ margin: '10px'}}
                            onChange={this.handleDateChange}
                        />
                        <TimePicker
                            margin="normal"
                            label="Time picker"
                            value={selectedDate}
                            style={{ margin: '10px' }}
                            onChange={this.handleDateChange}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FormControl className={classes.formControl} style={{ margin: '20px' }}>
                            <InputLabel htmlFor="session-length-native-simple">Session Length</InputLabel>
                            <Select
                                native
                                value={this.state.sessionLength}
                                onChange={this.handleChange('sessionLength')}
                                style={{ width: '130px' }}
                                inputProps={{
                                name: 'Session Length',
                                id: 'session-length-native-simple',
                                }}
                            >
                                <option value="" />
                                <option value={10}>10 Min</option>
                                <option value={20}>20 Min</option>
                                <option value={30}>30 Min</option>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl} style={{ margin: '20px' }}>
                            <InputLabel htmlFor="age-native-simple"># Sessions</InputLabel>
                            <Select
                                native
                                autoWidth={false}
                                value={this.state.numSession}
                                onChange={this.handleChange('numSession')}
                                style={{ width: '100px' }}
                                inputProps={{
                                name: '#asdfasdfas',
                                id: 'age-native-simple',
                                }}
                            >
                                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((item, idx) => {
                                    if ( idx == 0)
                                        return <option key={idx} value="" />

                                    return <option key={idx} value={item}>{item}</option>
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose(0)} color="primary">
                Cancel
              </Button>
              <Button onClick={this.onCreateBlock} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        )
    }
}

export default withStyles(styles)(NewBlockForm);

// export default NewBlockForm