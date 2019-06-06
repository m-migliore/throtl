import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Moment from 'react-moment'
import {NATIONS} from '../../helpers/nations.js'
import DriverSeasonResultContainer from './DriverSeasonResultContainer'
import FlagImage from '../Image/FlagImage'

class DriverContainer extends Component {

  componentWillUnmount() {
    this.props.clearDriverView()
  }

  render() {
    if (this.props.driverData.driverId && this.props.driverView) {
      const driver = this.props.driverData
      const flag = NATIONS[driver.nationality]
      
      return (
        <div className="container mx-auto">
          <button onClick={this.props.clearDriverView}>Close</button>
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
    driverSeasonData: state.driverSeasonData,
    driverView: state.driverView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearDriverView: () => dispatch({type: "CLEAR_DRIVER_VIEW"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverContainer);
