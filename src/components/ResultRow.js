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
        {this.props.season === "current" || this.props.season > 2003 ? <td>{result.FastestLap.Time.time}</td> : null}
        <td>{result.status}</td>
        <td><button onClick={this.handleClick.bind(this)}>Full Details</button></td>
      </tr>
    );
  }

}
const mapStateToProps = state => {
  return {
    season: state.season
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDetailedResult: resultData => dispatch({type: "LOAD_DETAILED_RESULT", payload: resultData})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultRow);
