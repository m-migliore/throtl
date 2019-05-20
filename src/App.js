import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import About from './components/About'
import EventsContainer from './components/EventsContainer'
import EventView from './components/EventView'

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
        {this.props.eventId ? <EventView /> : <><About /> <EventsContainer /></>}
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
