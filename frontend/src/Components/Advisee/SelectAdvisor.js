import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import tileData from './tileData';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});


/*//  The example data is structured as follows:

  import image from 'path/to/image.jpg';
  [etc...]

  const tileData = [
    {
      img: image,
      title: 'Image',
      author: 'author',
    },
    {
      [etc...]
    },
  ];*/

//TODO:  Create Media Card and map advisors to it

class SelectAdvisor extends Component{

    state = {
        advisors: [
            {name:  'Ali Kooshesh', pic: './images/Kooshesh.jpeg'},
            {name: 'Suzanne Rivoire', pic: './images/Rivoire.jpeg'},
            {name: 'Gurman Gill', pic: './images/Gill.jpeg'},
            {name: 'Mark Gondree', pic: './images/Gondree.jpeg'}
        ]
    }
    return (
        <div className={classes.root}>
            <SelectAdvisor>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile {this.state.advisors.map(({ name, pic }, idx) => }}>
                    <ListSubheader component="div">Select Advisor</ListSubheader>
                </GridListTile>
                {tileData.map(tile => (
                    <GridListTile key={idx}>
                        <img src={pic} alt={this.state.pic} />
                        <GridListTileBar
                            title={this.state.pic}
                            actionIcon={
                                <IconButton className={classes.icon}>
                                    <PersonIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </SelectAdvisor>
        </div>
    );
}

SelectAdvisor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectAdvisor);









