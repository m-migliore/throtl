import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import EventsContainer from './components/EventsContainer'

class App extends Component {
  componentDidMount() {
    fetch('https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=4370')
    .then(r => r.json())
    .then(data => {
      this.props.loadAbout(data.leagues[0])
      console.log(data.leagues[0])
    })

    fetch('https://www.thesportsdb.com/api/v1/json/1/eventsseason.php?id=4370')
    .then(r => r.json())
    .then(data => {
      this.props.loadEvents(data.events)
      console.log(data.events)
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
        <h1>{this.props.about.strLeague}</h1>
        <h2>About</h2>
        <p>{this.props.about.strDescriptionEN}</p>
        <br />
        <br />
        <EventsContainer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    about: state.about,
    eventId: state.eventId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadAbout: data => dispatch({type: "LOAD_ABOUT", payload: data}),
    loadEvents: data =>  dispatch({type: "LOAD_EVENTS", payload: data})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
