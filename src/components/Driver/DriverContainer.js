import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import Moment from 'react-moment'
import {NATIONS} from '../../helpers/nations.js'
import DriverSeasonResultContainer from './DriverSeasonResultContainer'
import FlagImage from '../Image/FlagImage'
// import TrackTrace from '../LapAnimations/TrackTrace'

class DriverContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    if (this.props.driverData.driverId) {
      const driver = this.props.driverData
      const flag = NATIONS[driver.nationality]
      
      return (
        <div className="container mx-auto my-5">
          <Link to="/" className="btn btn-default">Close</Link>
          <h1>{driver.givenName + " " + driver.familyName} {driver.permanentNumber ? <span>{driver.permanentNumber }</span> : null}</h1>
          <FlagImage flagName={flag} />
          <p><strong>DOB:</strong> <Moment date={driver.dateOfBrith} format="LLL"/></p>
          <DriverSeasonResultContainer />
        </div>
      );
    } else {
      return <Redirect to="/" />
    }

  }

}

const mapStateToProps = state => {
  return {
    season: state.season,
    driverData: state.driverData,
    driverSeasonData: state.driverSeasonData
  }
}

export default connect(mapStateToProps)(DriverContainer);
