import React, { Component } from 'react';
import {connect} from 'react-redux'
import GrandPrixResult from '../GrandPrixResult/GrandPrixResult'
import DetailedResult from '../DetailedResult/DetailedResult'

class DriverSeasonResultContainer extends Component {
  componentDidUpdate() {
    console.log(this.props.driverSeasonData);
  }

  render() {
    if (this.props.driverSeasonData.results) {
      const results = this.props.driverSeasonData.results
      const points = this.props.driverSeasonData.points

      return (
        <div>
          <h3>{results[0].season} Season Results</h3>
          <h4>Points: {points}</h4>
          {results.map(result => <GrandPrixResult key={result.round} resultData={result} />)}
          {this.props.detailedResultView ? <DetailedResult /> : null}
        </div>
      );
    } else {
      return <p>Loading season results</p>
    }

  }

}

const mapStateToProps = state => {
  return {
    driverSeasonData: state.driverSeasonData,
    detailedResultView: state.detailedResultView
  }
}

export default connect(mapStateToProps)(DriverSeasonResultContainer);
