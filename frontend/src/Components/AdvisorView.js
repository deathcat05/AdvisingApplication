import React, { Component } from 'react'

import { Link } from 'react-router-dom'


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import SingleLineGridList from './GridList'

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
        backgroundColor: "blue",
        display: 'flex',
        height: '100vh'
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



// function SimpleCard({ styles }) {
//     const bull = <span className={styles.bullet}>•</span>;
  
//     return (
//       <Card className={styles.card}>
//         <CardContent>
//           <Typography className={styles.title} color="textSecondary" gutterBottom>
//             Upcoming Appointment
//           </Typography>
//           <Typography variant="h5" component="h2">
//             Nathan Kamm
//           </Typography>
//           <Typography className={styles.pos} color="textSecondary">
//             Senior ID #4793287
//           </Typography>
//           <Typography component="p">
//             January 5, 2017 @ 10:30am
//           </Typography>
//         </CardContent>
//       </Card>
//     );
//   }

function ButtonAppBar({ styles }) {
    return (
        <div className={styles.root}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" color="inherit" className={styles.grow}>
                    Advisor Portal - Welcome {'{{ advisorname }}'}
                </Typography>
                {/* <Link to="/main" className={styles.btnClr}>
                    <Button color="inherit">Add Comments</Button>
                </Link> */}
                
                <Link to="/main" className={styles.btnClr}>
                    <Button color="inherit">
                        Logout
                    </Button>
                </Link>
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

        const { classes } = this.props
        const { upcomingAppointments } = this.state
        return (
            <div>
                <ButtonAppBar styles={classes}/>
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
                    <div style={{backgroundColor: 'pink', flex: 1}}>foo</div>
                    <div style={{ backgroundColor: 'orange', flex: 1}}>bar</div>
                </div>
            </div>
        )
    }
}




 
  
//   SimpleCard.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };
  
//   export default withStyles(styles)(SimpleCard);

// export default AdvisorView;





// function ButtonAppBar(props) {
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" color="inherit" className={classes.grow}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

// AdvisorView.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(AdvisorView);