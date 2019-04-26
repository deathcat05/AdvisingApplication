import React, { Component, useState } from 'react'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SingleLineGridList from './GridList'
import { StudentList, StudentPending } from './StudentList'
import NewBlockForm  from './NewBlockForm'
import CalendarComponent from './Calendar'

import { logout } from '../../store/actions/auth'

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    btnClr: {
        color: 'white',
        textDecoration: 'none'
    },
    flexBox: {
        backgroundColor: "",
        display: 'flex',
        height: '73vh'
    },
    upperFlexBox: {
        display: 'flex'
    },
    button: {
        margin: 'auto'
      },
      input: {
        display: 'none',
      },
};

function DialogComponent({ open, handleClose }) {
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
          <NewBlockForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(0)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(0)} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )   
}

function ButtonAppBar({ styles, first_name, last_name }) {

    const [ isOpen, setOpen ] = useState(0)

    const onChange = (newValue, source = "null") => {
        if ( source == "appBar" && isOpen > 0 )
            return 
        setOpen(newValue) 
    }

    return (
        <div className={styles.root}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" color="inherit" className={styles.grow}>
                    Advisor Portal - {`${first_name} ${last_name}`}
                </Typography>
                <Button style={{ color: 'white' }} onClick={() => onChange(isOpen + 1, "appBar")}>
                    Create Block
                    <DialogComponent open={isOpen} handleClose={onChange} />
                </Button>
                <Button component={Link} to="/signIn" style={{ color: 'white' }} onClick={() => logout()}> 
                    Logout
                </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

class AdvisorView extends Component {

    state = {
        upcomingAppointments: true //Appointment Bar - upcoming or previous!
    }

    render() {

        console.log(this.props)

        const { classes } = this.props
        const { upcomingAppointments } = this.state
        const { first_name, last_name } = this.props
        return (
            <div>
                <ButtonAppBar 
                    styles={classes} 
                    first_name={first_name} 
                    last_name={last_name} 
                />
                <div style={{ display: 'flex' }}>
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderStyle: 'inset',
                        borderWidth: '1.5px'
                    }}>
                        <Button 
                            variant="contained" 
                            color={!upcomingAppointments ? "primary" : ""} 
                            className={classes.button}
                            onClick={() => this.setState({ upcomingAppointments: false })}
                        >
                            Previous
                        </Button>

                        <Button 
                            variant="contained" 
                            color={upcomingAppointments ? "primary" : ""} 
                            className={classes.button} style={{ marginLeft: '10px', marginRight: '10px' }}
                            onClick={() => this.setState({ upcomingAppointments: true })}
                        >
                            Upcoming
                        </Button>
                    </div>
                    <SingleLineGridList upcoming={upcomingAppointments} />
                </div>
                <div className={classes.flexBox}>
                    <div 
                        style={{ 
                            backgroundColor: '', 
                            border: '1px solid black',
                            margin: '10px',flex: 1 
                    }}>
                        <p
                            style={{ 
                                display: 'flex', 
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: '10px',
                                textTransform: 'uppercase',
                                borderBottom: '1px solid black'
                        }}> 
                            Apt Requests 
                        </p>
                        <StudentPending />
                    </div>
                    <div style={{backgroundColor: '', flex: 4, display: 'flex', flexDirection: 'column', paddingTop: '10px' }}>
                        <CalendarComponent />
                        
                    </div>
                    <div style={{ 
                        backgroundColor: '', 
                        border: '1px solid black',
                        borderBottom: '5px solid black',
                        margin: '10px',
                        flex: 1
                    }}>
                        <p
                            style={{ 
                                display: 'flex', 
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: '10px',
                                textTransform: 'uppercase',
                                borderBottom: '1px solid black'
                             }}
                        > 
                            Advisees 
                        </p>
                        <StudentList />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ userReducer: { user } }) {

    let { first_name, last_name } = user
    return { first_name, last_name }
}

export default connect(mapStateToProps, {})(withStyles(styles)(AdvisorView))