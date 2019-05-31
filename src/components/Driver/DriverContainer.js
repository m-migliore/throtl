import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Moment from 'react-moment'
import DriverSeasonResultContainer from './DriverSeasonResultContainer'

class DriverContainer extends Component {

  componentWillUnmount() {
    this.props.clearDriverView()
  }

  render() {
    if (this.props.driverData.driverId) {
      const driver = this.props.driverData
      return (
        <div>
          <h1>{driver.givenName + " " + driver.familyName} {driver.permanentNumber ? <span>{driver.permanentNumber }</span> : null}</h1>
          <p><strong>DOB:</strong> <Moment date={driver.dateOfBrith} format="LLL"/></p>
          <p><strong>Nationality:</strong> {driver.nationality}</p>
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

const mapDispatchToProps = dispatch => {
  return {
    clearDriverView: () => dispatch({type: "CLEAR_DRIVER_VIEW"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverContainer);
