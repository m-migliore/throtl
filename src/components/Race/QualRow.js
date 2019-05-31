import React, { Component } from 'react';
import DriverLink from '../Driver/DriverLink'

class QualRow extends Component {

  render() {
    const result = this.props.qualData
    const driver = result.Driver
    const constructor = result.Constructor

    return (
      <tr>
        <td>{result.position}</td>
        <td>{window.location.pathname !== "/driver" ?
          <DriverLink driverData={driver} />
          :
          driver.givenName + " " + driver.familyName}
        </td>
        <td>{constructor.name}</td>
        <td>{result.Q1}</td>
        <td>{result.Q2 ? result.Q2 : ""}</td>
        <td>{result.Q3 ? result.Q3 : ""}</td>
      </tr>
    );
  }

}

export default QualRow;
