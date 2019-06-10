import React, { Component } from 'react';
import {connect} from 'react-redux'
import Moment from 'react-moment'
import RaceResults from './RaceResults'
import QualResults from './QualResults'
import CircuitInfo from '../Circuit/CircuitInfo'
// import RacePreview from './RacePreview'
import DetailedResult from '../DetailedResult/DetailedResult'
import {Redirect, Link} from 'react-router-dom'
import WatchRace from './WatchRace'


class RaceContainer extends Component {
  componentDidMount() {
    debugger
    console.log("hi")
  }
  
  render() {
    if (this.props.loading) {
      return (
        <div className="container mx-auto">
          <h1>Loading</h1>
        </div>
      )
    } else if (this.props.raceData.raceName) {
      return (
        <div className="container mx-auto">
          <Link to="/">Close</Link>
          <h1>{this.props.season + " " + this.props.raceData.raceName}</h1>
          <p><Moment date={this.props.raceData.date} format="LLL"/></p>
          <CircuitInfo />
          <WatchRace />
          {this.props.raceData.Results ? <RaceResults /> : null}
          {this.props.qualData.length > 1 ? <QualResults /> : null}
          {this.props.detailedResultView ? <DetailedResult /> : null}
          {/* {this.props.raceData.raceName === "Spanish Grand Prix" ? <WatchRace /> : null} */}
          
        </div>
      )
    } else {
      return <Redirect to="/" />
    }
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    season: state.season,
    selectedRound: state.selectedRound,
    raceData: state.raceData,
    qualData: state.qualData,
    detailedResultView: state.detailedResultView
  }
}

export default connect(mapStateToProps)(RaceContainer);
