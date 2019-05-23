import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
// import About from './components/About'
// import EventsContainer from './components/EventsContainer'
// import EventView from './components/EventView'
import SeasonContainer from './components/SeasonContainer'
//import RaceResults from './components/RaceResults'\
import {fetchSeason} from './actions/actionCreators'

class App extends Component {
  componentDidMount() {
    // fetch('http://ergast.com/api/f1/current.json')
    // .then(r => r.json())
    // .then(data => {
    //   this.props.loadSeason(data.MRData.RaceTable)
    //   console.log(data.MRData.RaceTable)
    // })
    this.props.fetchSeason("current")
  }

  componentDidUpdate() {
    if (this.props.eventId) {
      console.log("event id added:", this.props.eventId);
    }
  }

  render() {
    return (
      <div className={"container mx-auto"}>
        {this.props.loading ? <p>loading</p> :
          <>
            <h1>Formula 1 {this.props.seasonData.season} Season</h1>
            <SeasonContainer />
          </>
        }

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    seasonData: state.seasonData,
    resultView: state.resultView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSeason: season => dispatch(fetchSeason(season))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
