import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
// import About from './components/About'
// import EventsContainer from './components/EventsContainer'
// import EventView from './components/EventView'
import RaceContainer from './components/RaceContainer'
import RaceResults from './components/RaceResults'

class App extends Component {
  componentDidMount() {
    fetch('http://ergast.com/api/f1/current.json')
    .then(r => r.json())
    .then(data => {
      this.props.loadSeason(data.MRData.RaceTable)
      console.log(data.MRData.RaceTable)
    })
  }

  componentDidUpdate() {
    if (this.props.eventId) {
      console.log("event id added:", this.props.eventId);
    }
  }

  render() {
    return (
      <div className={"container mx-auto"}>
        <h1>Formula 1 {this.props.seasonData.season} Season</h1>
        {this.props.resultView ? <RaceResults /> : <RaceContainer />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    seasonData: state.seasonData,
    resultView: state.resultView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSeason: seasonData => dispatch({type: "LOAD_SEASON", payload: seasonData}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
