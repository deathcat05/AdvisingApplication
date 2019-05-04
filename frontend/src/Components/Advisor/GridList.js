import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import GridList from '@material-ui/core/GridList';
import axios from 'axios'
import Card from '@material-ui/core/Card';
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
    fontSize: 14
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
    pos: {
        marginBottom: 12,
    }
});



function SimpleCard({ styles, data, upcoming }) {
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

function SingleLineGridList(props) {
  const { classes, upcoming } = props;
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map((tile, idx) => (
            <SimpleCard key={idx} styles={classes} data={tile} upcoming={upcoming}/>
        ))}
      </GridList>
    </div>
  );
}

class UpcomingAppointments extends Component {

  state = {
    upcomingAppointments: tileData,
    pastAppointments: tileData
  }

  async refreshAppointments(type) {
  
    let { advisor_id } = this.props
    try {
      const { data } = await axios
        .get(`http://localhost:8239/v1/advisingSession/${type}/${advisor_id}`)

      const newData = data.data.map(item => {
        return { name: "Update Join", year: "Senior", id: item.student_id, date: new Date(item.start_time).toString().slice(0, 25) }
      })

      if (type === 'upcoming')
        this.setState({ upcomingAppointments: [...this.state.upcomingAppointments, ...newData] })
      else 
        this.setState({ pastAppointments: [...this.state.pastAppointments, ...newData] })

    // localStorage.setItem(`${upcoming===true ? 'upcoming': 'past'}appointments`, JSON.stringify({ ...newData, date: new Date() }))

    } catch (e) {
      console.log('monkaS')
    }
  }

  // async componentDidUpdate(prevProps, prevState) {

  //   // if (prevState.rerenders !== 1)
  //     // await this.refreshAppointments()


  //   // let { upcoming, advisor_id } = this.props

  //   // const lsData = localStorage.getItem('upcomingAppointments')

  //   // if ( lsData === null ) {
  //   //   await this.refreshAppointments()
  //   // } else {
  //   //   let { date, data } = JSON.parse(lsData)

  //   //   let convertedDate = new Date(date)
  //   //   let hourLater = new Date()
  //   //   hourLater.setMinutes(hourLater.getMinutes() + 20)

  //   //   //Within 20 minutes we don't need to make another request
  //   //   if (hourLater > convertedDate) {
  //   //   } else {
  //   //     // we need to make another request
  //   //     await this.refreshAppointments()
  //   //   }

  //   // }
  // }

  async componentWillMount(){
    await this.refreshAppointments('upcoming')
    await this.refreshAppointments('past')
  }

  render() {
    const { classes, upcoming } = this.props
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
        {this.state.upcoming ?
          (this.state.upcomingAppointments.map((tile, idx) => (
            <SimpleCard key={idx} styles={classes} data={tile} upcoming={upcoming} />
          )))
          :
          (this.state.pastAppointments.map((tile, idx) => (
            <SimpleCard key={idx} styles={classes} data={tile} upcoming={upcoming} />
          )))
        }
        </GridList>
      </div>
    )
  }

}


SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({ userReducer: { user } }) {
  let { advisor_id } = user
  return { advisor_id }
}

export default connect(mapStateToProps, {})(withStyles(styles)(UpcomingAppointments))