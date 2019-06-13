import React, { Component } from 'react';
import {connect} from 'react-redux'
import DriverLink from '../Driver/DriverLink'
import ConstructorLink from '../Constructor/ConstructorLink'

class ResultRow extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.loadDetailedResult(this.props.resultData)
  }

  render() {
    const result = this.props.resultData

    return (
      <tr>
        <td>{result.position}</td>
        <td>{window.location.pathname !== "/driver" ?
          <DriverLink driverData={result.Driver} />
          :
          result.Driver.givenName + " " + result.Driver.familyName}
        </td>
        <td>{window.location.pathname !== "/constructor" ?
          <ConstructorLink constructorData={result.Constructor} />
          :
          result.Constructor.name}
        </td>
        <td>{result.points}</td>
        {this.props.season > 2003 ?
          result.FastestLap ? <td>{result.FastestLap.Time.time}</td> : "-"
          :
          null
        }
        <td>{result.status}</td>
        <td><button onClick={this.handleClick} className="btn btn-default">Full Details</button></td>
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
