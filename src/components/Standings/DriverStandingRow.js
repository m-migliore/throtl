import React, { Component } from 'react';
import DriverLink from '../Driver/DriverLink'
import ConstructorLink from '../Constructor/ConstructorLink'

class DriverStandingRow extends Component {

  render() {
    const standing = this.props.standingData
    const driver = standing.Driver
    const constructor = standing.Constructors[0]

    return (
      <tr>
        <td>{standing.position}</td>
        <td><DriverLink driverData={driver} /></td>
        <td><ConstructorLink constructorData={constructor} /></td>
        <td>{standing.points}</td>
        <td>{standing.wins}</td>
      </tr>
    );
  }

}

export default DriverStandingRow;
