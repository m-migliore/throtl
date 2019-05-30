import React, { Component } from 'react';
import {connect} from 'react-redux'
import DriverSeasonResult from './DriverSeasonResult'

class DriverSeasonResultContainer extends Component {
  componentDidUpdate() {
    console.log(this.props.driverSeasonData);
  }

  render() {
    if (this.props.driverSeasonData.length > 0) {
      const seasonData = this.props.driverSeasonData
      return (
        <div>
          <h3>{seasonData[0].season} Season Results</h3>
          {seasonData.map(result => <DriverSeasonResult raceData={result} />)}
        </div>
      );
    } else {
      return <p>Loading season results</p>
    }

  }

}

const mapStateToProps = state => {
  return {
    driverSeasonData: state.driverSeasonData
  }
}

export default connect(mapStateToProps)(DriverSeasonResultContainer);
