import React, { Component } from 'react';

class ResultRow extends Component {

  render() {
    const result = this.props.resultData

    return (
      <tr>
        <td>{result.position}</td>
        <td>{result.Driver.givenName + " " + result.Driver.familyName}</td>
        <td>{result.Constructor.name}</td>
        <td>{result.points}</td>
        <td>{result.FastestLap.Time.time}</td>
      </tr>
    );
  }

}

export default ResultRow;
