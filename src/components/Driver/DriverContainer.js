import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Moment from 'react-moment'

class DriverContainer extends Component {

  render() {
    if (this.props.driverData.driverId) {
      const driver = this.props.driverData
      return (
        <div>
          <h1>{driver.givenName + " " + driver.familyName} {driver.permanentNumber ? <span>{driver.permanentNumber }</span> : null}</h1>
          <p><strong>DOB:</strong> <Moment date={driver.dateOfBrith} format="LLL"/></p>
          <p><strong>Nationality:</strong> {driver.nationality}</p>
        </div>
      );
    } else {
      return <Redirect to="/" />
    }

  }

}

const mapStateToProps = state => {
  return {
    driverData: state.driverData
  }
}

export default connect(mapStateToProps)(DriverContainer);
