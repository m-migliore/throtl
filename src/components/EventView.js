import React, { Component } from 'react';
import { connect } from 'react-redux'
import Moment from 'react-moment'
//import DRIVERS from '../constants/constants'

class EventView extends Component {
  componentDidMount() {
    let eventId = this.props.eventId
    fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?id=${eventId}`)
    .then(r => r.json())
    .then(data => this.props.loadEventData(data.events[0]))
  }

  render() {
    const eventData = this.props.eventData

    // if (Object.keys(eventData).length !== 0) {
    //   const regex = /\b(44 Lewis Hamilton|77 Valtteri Bottas|5 Sebastian Vettel|33 Max Verstappen|8 Romain Grosjean|16 Charles Leclerc|20 Kevin Magnussen|'4 Lando Norris|7 Kimi Räikkönen|11 Sergio Perez|27 Nico Hulkenberg|3 Daniel Ricciardo|23 Alexander Albon|99 Antonio Giovinazzi|26 Daniil Kvyat|18 Lance Stroll|10 Pierre Gasly|55 Carlos Sainz|63 George Russell|88 Robert Kubica)\b/
    //   let splitResults = eventData.strResult.split(regex)
    //   console.log(splitResults);
    //   let rows = []
    //
    //   for (let i=0; rows.length < 20; i++) {
    //     if (DRIVERS.includes(splitResults[i])) {
    //       rows.push(splitResults[i] + splitResults[i+1])
    //     }
    //   }
    // }

    if (Object.keys(eventData).length !== 0) {
      console.log(eventData);
      const regex = /(\r\n|\r|\n)/
      const splitResults = eventData.strResult.split(regex)
      console.log("split", splitResults);
    }

    return (
      <div className="event-view">
        <h1>{eventData.strEvent}</h1>
        <h3><Moment date={eventData.dateEvent} format="MMMM Do YYYY"/></h3>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    eventId: state.eventId,
    eventData: state.eventData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadEventData: eventData => dispatch({type: "LOAD_EVENT_DATA", payload: eventData})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventView);
