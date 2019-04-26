import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import DoneIcon from '@material-ui/icons/Done';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: '86%',
    overflow: 'auto',
  },
});

class PureStudentList extends React.Component {
  state = {
    students: [
      { name: 'Thomas Kamm', email: 'foo@foobar.com' },
      { name: 'Nathan Kamm', email: 'foo@foobar.com' },
      { name: 'Matt Kamm', email: 'foo@foobar.com' },
      { name: 'Darin Brown', email: 'foo@foobar.com' },
      { name: 'Ali Kooshesh', email: 'foo@foobar.com' },
      { name: 'S. Rivoire', email: 'foo@foobar.com' },
      { name: 'Ravi Kumar', email: 'foo@foobar.com' },
      { name: 'A Leal', email: 'foo@foobar.com' },
      { name: 'Tia Watts', email: 'foo@foobar.com' },
      { name: 'Ali Kooshesh II', email: 'foo@foobar.com' },
      { name: 'S. Rivoire II', email: 'foo@foobar.com' },
      { name: 'Ravi Kumar II', email: 'foo@foobar.com' },
      { name: 'A Leal II', email: 'foo@foobar.com' },
      { name: 'Tia Watts II', email: 'foo@foobar.com' },
      { name: 'Tia Watts III', email: 'foo@foobar.com' },
      { name: 'Ali Kooshesh III', email: 'foo@foobar.com' },
      { name: 'S. Rivoire III', email: 'foo@foobar.com' },
      { name: 'Ravi Kumar III', email: 'foo@foobar.com' },
      { name: 'A Leal III', email: 'foo@foobar.com' },
      { name: 'Tia Watts III', email: 'foo@foobar.com' },
    ]
  };

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
        {this.state.students.map(({ name, email }, idx) => (
          <ListItem key={idx} dense button >
            <ListItemText primary={name} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Email">
                <a
                style={{ textDecoration: 'none', color: 'gray', fontSize: 1 }}
                href={`mailto:${email}`}
                >
                <EmailIcon />
                </a>
              
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}


class PureStudentPending extends React.Component {
  state = {
    pendingAppointment: [
      { name: 'Thomas Kamm', date: '04/15/2019 - 10:00 AM', student_id: 4564534 },
      { name: 'Nathan Kamm', date: '04/15/2019 - 10:20 AM', student_id: 2345 },
      { name: 'Thomas Kamm', date: '04/15/2019 - 10:40 AM', student_id: 4564534 },
      { name: 'Nathan Kamm', date: '04/15/2019 - 11:00 AM', student_id: 2345 },
    ]
  };

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
        {this.state.pendingAppointment.map(({ name, date }, idx) => (
          <ListItem key={idx} dense button >
            <ListItemText primary={`${name} ------ ${date}`} />
            <ListItemSecondaryAction>
              <span style={{color: 'green'}}>
                <IconButton aria-label="Done" color="inherit">
                  <DoneIcon/>              
                </IconButton>
              </span>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

PureStudentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

PureStudentPending.propTypes = {
  classes: PropTypes.object.isRequired
}

// export default withStyles(styles)(StudentList);
// export default withStyles(styles)(StudentPending)

const StudentList = withStyles(styles)(PureStudentList)
const StudentPending = withStyles(styles)(PureStudentPending)

export  { StudentList, StudentPending }

