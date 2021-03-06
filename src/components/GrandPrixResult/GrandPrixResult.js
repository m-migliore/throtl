import React, { Component } from 'react';
import { connect } from 'react-redux'
import QualRow from '../Race/QualRow'
import ResultRow from '../Race/ResultRow'
import RaceLink from '../Season/RaceLink'

class GrandPrixResult extends Component {

  render() {
    if (this.props.resultData.Circuit) {
      const result = this.props.resultData
      return (

        <div className="my-10">
          <h3 className="gp-race-title"><RaceLink raceData={result}/></h3>
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
              {result.QualifyingResults.map(qualRow => <QualRow key={qualRow.position} qualData={qualRow}/>)}
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
                {result.season > 2003 ? <th>Fastest Lap</th> : null}
                <th>Status</th>
                <th>Detailed Results</th>
              </tr>
              {result.Results.map(resultRow => 
                <ResultRow 
                  key={resultRow.position} 
                  resultData={{
                    ...resultRow,
                    round: parseInt(result.round),
                    circuitId: result.Circuit.circuitId
                  }}
                />)}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <p>Loading</p>
    }
  }

}

const mapStateToProps = state => {
  return {
    season: state.season
  }
}

export default connect(mapStateToProps)(GrandPrixResult);
