import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class DriverLink extends Component {
  handleClick() {
    console.log(this.props.driverData);
    this.props.loadDriverData(this.props.driverData)
  }

  render() {
    if (this.props.driverView) {
      return <Redirect to="/driver" />
    } else {
      const driver = this.props.driverData
      return (
        <span onClick={this.handleClick.bind(this)}>{driver.givenName + " " + driver.familyName}</span>
      );
    }
  }

}

const mapStateToProps = state => {
  return {
    driverView: state.driverView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDriverData: driverData => dispatch({type: "LOAD_DRIVER_DATA", payload: driverData})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverLink);
