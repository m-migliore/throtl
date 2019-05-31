import React, { Component } from 'react';
import ConstructorLink from '../Constructor/ConstructorLink'

class ConstructorStandingRow extends Component {

  render() {
    const standing = this.props.standingData
    const constructor = standing.Constructor

    return (
      <tr>
        <td>{standing.position}</td>
        <td><ConstructorLink constructorData={constructor} /></td>
        <td>{standing.points}</td>
        <td>{standing.wins}</td>
      </tr>
    );
  }

}

export default ConstructorStandingRow;
