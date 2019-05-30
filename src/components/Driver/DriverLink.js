import React, { Component } from 'react';
import {connect} from 'react-redux'

class DriverLink extends Component {
  handleClick() {
    console.log(this.props.driverData);
    this.loadDriverData(this.props.driverData)
  }

  render() {
    const driver = this.props.driverData
    return (
      <span onClick={this.handleClick.bind(this)}>{driver.givenName + " " + driver.familyName}</span>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    loadDriverData: driverData => dispatch({type: "LOAD_DRIVER_DATA", payload: driverData})
  }
}

export default connect(null, mapDispatchToProps)(DriverLink);
