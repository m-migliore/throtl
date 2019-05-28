import React, { Component } from 'react';

class QualRow extends Component {

  render() {
    const result = this.props.qualData
    const driver = result.Driver
    const constructor = result.Constructor

    return (
      <tr>
        <td>{result.position}</td>
        <td>{driver.givenName + " " + driver.familyName}</td>
        <td>{constructor.name}</td>
        <td>{result.Q1}</td>
        <td>{result.Q2 ? result.Q2 : ""}</td>
        <td>{result.Q3 ? result.Q3 : ""}</td>
      </tr>
    );
  }

}

export default QualRow;
