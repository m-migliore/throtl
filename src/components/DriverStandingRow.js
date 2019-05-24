import React, { Component } from 'react';

class DriverStandingRow extends Component {

  render() {
    const standing = this.props.standingData
    const driver = standing.Driver
    const constructor = standing.Constructors[0]

    return (
      <tr>
        <td>{standing.position}</td>
        <td>{driver.givenName + " " + driver.familyName}</td>
        <td>{constructor.name}</td>
        <td>{standing.points}</td>
        <td>{standing.wins}</td>
      </tr>
    );
  }

}

export default DriverStandingRow;
