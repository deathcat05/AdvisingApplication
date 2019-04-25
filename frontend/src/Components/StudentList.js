import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: '86%',
    overflow: 'auto',
  },
});

class StudentList extends React.Component {
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

StudentList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentList);