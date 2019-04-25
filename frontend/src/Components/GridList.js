import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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
    }
});



function SimpleCard({ styles, data, upcoming }) {
console.log(data)
    return (
      <Card className={styles.card}>
        <CardContent>
          <Typography className={styles.title} color="textSecondary" gutterBottom>
            {upcoming ? "Upcoming" : "Past"} Appointment
          </Typography>
          <Typography variant="h5" component="h2">
            { data.name }
          </Typography>
          <Typography className={styles.pos} color="textSecondary">
            {data.year} ID #{data.id}
          </Typography>
          <Typography component="p">
            {data.date}
          </Typography>
        </CardContent>
      </Card>
    );
  }

const tileData = [
    {
        name: 'Nathan Kamm',
        year: 'Senior',
        id: 4793287,
        date: 'January 5, 2017 @ 10:30am'
    },
    {
        name: 'Darin Brown',
        year: 'Senior',
        id: 23452345,
        date: 'January 5, 2017 @ 11:00am'
    },
    {
        name: 'Alex L',
        year: 'Senior',
        id: 4534656,
        date: 'January 5, 2017 @ 11:30am'
    },
    {
        name: 'Thomas future Bruin',
        year: 'Senior',
        id: 4793287,
        date: 'January 5, 2017 @ 12:00am'
    },
    {
        name: 'Matthias Kamm',
        year: 'Senior',
        id: 2463456,
        date: 'January 5, 2017 @ 12:30am'
    },
    {
        name: 'Annelise Kamm',
        year: 'Senior',
        id: 23452345,
        date: 'January 5, 2017 @ 1:00am'
    }
]

// We will render different data
//but for now we will just change the text
function SingleLineGridList(props) {
  const { classes, upcoming } = props;
    console.log(`Upcoming is ${upcoming}`)
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map(tile => (
            <SimpleCard styles={classes} data={tile} upcoming={upcoming}/>
        ))}
      </GridList>
    </div>
  );
}


{/* <div className={classes.root}>
<GridList className={classes.gridList} cols={2.5}>
  {tileData.map(tile => (
    <GridListTile key={tile.img}>
      <img src={tile.img} alt={tile.title} />
      <GridListTileBar
        title={tile.title}
        classes={{
          root: classes.titleBar,
          title: classes.title,
        }}
        actionIcon={
          <IconButton>
            <StarBorderIcon className={classes.title} />
          </IconButton>
        }
      />
    </GridListTile>
  ))}
</GridList>
</div> */}
SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);