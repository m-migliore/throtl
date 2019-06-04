import React, {Component} from 'react';
import {connect} from 'react-redux'
import ResultRow from './ResultRow'

class RaceResults extends Component {
  render() {
    const results = this.props.raceData.Results

    return (
      <div className="my-5">
        <h2>Race Results</h2>
        <table>
          <tbody>
            <tr>
              <th>Position</th>
              <th>Driver</th>
              <th>Contructor</th>
              <th>Points</th>
              {this.props.season === "current" || this.props.season > 2003 ? <th>Fastest Lap</th> : null}
              <th>Status</th>
              <th>Detailed Results</th>
            </tr>
            {results.map(result => <ResultRow key={result.number} resultData={result} />)}
          </tbody>
        </table>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    season: state.season,
    raceData: state.raceData
  }
}

export default connect(mapStateToProps)(RaceResults);
