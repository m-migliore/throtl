import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class DriverContainer extends Component {

  render() {
    if (this.props.driverData.driverId) {
      return (
        <div>Driver {this.props.driverData.familyName}</div>
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
