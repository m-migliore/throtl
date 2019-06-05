import React, { Component } from 'react';
import { connect } from 'react-redux'
import {fetchPitData} from '../../actions/actionCreators'


class PitDetail extends Component {
  componentDidMount() {
    this.props.fetchPitData(this.props.season, this.props.round, this.props.driverId)
  }


  render() {
    const pit = this.props.pitData
    debugger

    return (
      <div>
        <h3>Pitstops</h3>
        {/* <p><strong>Stop:</strong> {pit.stop}</p>
        <p><strong>Lap:</strong> {pit.lap}</p>
        <p><strong>Duration:</strong> {pit.duration}</p>
        <p><strong>Time:</strong> {pit.time}</p> */}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    season: state.season,
    round: state.detailedResultData.round,
    driverId: state.detailedResultData.Driver.driverId,
    pitData: state.pitData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPitData: (season, round, driverId) => dispatch(fetchPitData(season, round, driverId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PitDetail);
