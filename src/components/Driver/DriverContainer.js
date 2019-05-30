import React, { Component } from 'react';

class DriverContainer extends Component {

  render() {
    return (
      <div>Driver {this.props.driverData.familyName}</div>
    );
  }

}

export default DriverContainer;
