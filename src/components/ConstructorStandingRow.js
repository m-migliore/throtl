import React, { Component } from 'react';

class ConstructorStandingRow extends Component {

  render() {
    const standing = this.props.standingData
    const constructor = standing.Constructor

    return (
      <tr>
        <td>{standing.position}</td>
        <td>{constructor.name}</td>
        <td>{standing.points}</td>
        <td>{standing.wins}</td>
      </tr>
    );
  }

}

export default ConstructorStandingRow;
