import React, { Component } from 'react';
import {connect} from 'react-redux'

class DetailedResult extends Component {

  render() {
    const result = this.props.detailedResultData
    const race = this.props.raceData

    return (
      <div>
        Detailed Results for {result.Driver.familyName} in {race.raceName}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    detailedResultData: state.detailedResultData,
    raceData: state.raceData
  }
}

export default connect(mapStateToProps)(DetailedResult);
