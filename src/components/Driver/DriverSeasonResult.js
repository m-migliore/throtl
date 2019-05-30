import React, { Component } from 'react';
import {connect} from 'react-redux'
import QualRow from '../Race/QualRow'
import ResultRow from '../Race/ResultRow'
import DetailedResult from '../DetailedResult/DetailedResult'

class DriverSeasonResult extends Component {

  render() {
    if (this.props.resultData.Circuit) {
      const result = this.props.resultData
      return (

        <div>
          <h3>{result.raceName}</h3>
          <h4>Qualifying Results</h4>
          <table>
            <tbody>
              <tr>
                <th>Position</th>
                <th>Driver</th>
                <th>Constructor</th>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
              </tr>
              <QualRow qualData={result.QualifyingResults[0]}/>
            </tbody>
          </table>
          <h4>Race Results</h4>
          <table>
            <tbody>
              <tr>
                <th>Position</th>
                <th>Driver</th>
                <th>Contructor</th>
                <th>Points</th>
                {result.season === "current" || result.season > 2003 ? <th>Fastest Lap</th> : null}
                <th>Status</th>
                <th>Detailed Results</th>
              </tr>
              <ResultRow resultData={result.Results[0]} />
            </tbody>
          </table>

          {this.props.detailedResultView ? <DetailedResult /> : null}
        </div>
      );
    } else {
      return <p>Loading</p>
    }
  }

}

const mapStateToProps = state => {
  return {
    detailedResultView: state.detailedResultView
  }
}

export default connect(mapStateToProps)(DriverSeasonResult);
