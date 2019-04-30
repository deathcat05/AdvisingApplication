import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';


const styles = {
  root: {
    flexGrow: 0,
  },
};

function TabContainer({ children, dir }) {
    return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {children}
      </Typography>
    );
  }


class CenteredTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Upcoming Apt" />
          <Tab label="Pending Apt" />
        </Tabs>
        {
            this.state.value === 0 ? ( 
            <TabContainer>
                Suzanne Rivoire - 04/30/19 - 12:00:00
                <ClearIcon />
            </TabContainer> ) : (
                <TabContainer>
                    You Have No Pending Appointments 
                </TabContainer>
            )
        }
      </Paper>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);