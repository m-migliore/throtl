import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Moment from 'react-moment'
import {NATIONS} from '../../helpers/nations.js'
import DriverSeasonResultContainer from './DriverSeasonResultContainer'

class DriverContainer extends Component {

  componentWillUnmount() {
    this.props.clearDriverView()
  }

  render() {
    if (this.props.driverData.driverId) {
      const driver = this.props.driverData
      const flag = NATIONS[driver.nationality]
      
      return (
        <div className="container mx-auto">
          <h1>{driver.givenName + " " + driver.familyName} {driver.permanentNumber ? <span>{driver.permanentNumber }</span> : null}</h1>
          <img src={process.env.PUBLIC_URL + `/imgs/flags/${flag}.png`} alt={`${driver.nationality} Flag`} />
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

const mapDispatchToProps = dispatch => {
  return {
    clearDriverView: () => dispatch({type: "CLEAR_DRIVER_VIEW"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverContainer);
