import React, { Component } from 'react';
import {connect} from 'react-redux'

class ResultRow extends Component {

  handleClick() {
    this.props.loadDetailedResult(this.props.resultData)
  }

  render() {
    const result = this.props.resultData

    return (
      <tr>
        <td>{result.position}</td>
        <td>{result.Driver.givenName + " " + result.Driver.familyName}</td>
        <td>{result.Constructor.name}</td>
        <td>{result.points}</td>
        <td>{result.FastestLap.Time.time}</td>
        <td>{result.status}</td>
        <td><button onClick={this.handleClick.bind(this)}>Full Details</button></td>
      </tr>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    loadDetailedResult: resultData => dispatch({type: "LOAD_DETAILED_RESULT", payload: resultData})
  }
}

export default connect(null, mapDispatchToProps)(ResultRow);
