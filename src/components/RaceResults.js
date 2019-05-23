import React, {Component} from 'react';
import {connect} from 'react-redux'
import RaceTitle from './RaceTitle'
import ResultRow from './ResultRow'

class RaceResults extends Component {
  componentDidMount() {
    console.log(this.props.results);
  }

  render() {
    const results = this.props.raceData.Results

    return (
      <div>
        <RaceTitle titleData={this.props.raceData} />
        <table>
          <tbody>
            <tr>
              <th>Position</th>
              <th>Driver</th>
              <th>Contructor</th>
              <th>Points</th>
              <th>Fastest Lap</th>
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
    raceData: state.raceData
  }
}

export default connect(mapStateToProps)(RaceResults);
