// import 'date-fns';

import React, { Component } from 'react'

import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';

import Button from '@material-ui/core/Button';

/*
advisor_id,
start_day,
session_length,
num_sessions_in_day

*/

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = {
    grid: {
      width: '60%',
    },
  };

class NewBlockForm extends Component {

    state = {
        selectedDate: new Date('2014-08-18T21:11:54'),
        age: '',
        sessionLength: '',
        numSession: ''
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };

    render() {
        const { classes } = this.props;
        const { selectedDate } = this.state;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', height: '100%', marginTop: '10px', border: '1px solid black' }}>
                    <div
                        style={{ marginTop: '5px', textTransform: 'uppercase', fontSize: '1.3em' }}> 
                        Create Block 
                    </div>
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
                            <InputLabel htmlFor="session-length-native-simple">Session L</InputLabel>
                            <Select
                                native
                                value={this.state.sessionLength}
                                onChange={this.handleChange('sessionLength')}
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
                            <InputLabel htmlFor="age-native-simple"># Sess</InputLabel>
                            <Select
                                native
                                value={this.state.numSession}
                                onChange={this.handleChange('numSession')}
                                inputProps={{
                                name: '#asdfasdfas',
                                id: 'age-native-simple',
                                }}
                            >
                                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((item, idx) => {
                                    if ( idx == 0)
                                        return <option value="" />

                                    return <option value={item}>{item}</option>
                                })}
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" style={{ fontSize: '10px' }}>
                            Create
                        </Button>
                    </div>
                </div>
            </MuiPickersUtilsProvider>
            )
    }
}

export default withStyles(styles)(NewBlockForm);

// export default NewBlockForm