import React, { Component } from 'react';
import { connect } from 'react-redux'

class EventView extends Component {
  componentDidMount() {
    let eventId = this.props.eventId
    fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?id=${eventId}`)
    .then(r => r.json())
    .then(data => this.props.loadEventData(data.events[0]))
  }

  render() {
    const eventData = this.props.eventData

    return (
      <div className="event-view">
        <h1>{eventData.strEvent}</h1>
        <h3>{eventData.dateEvent} {eventData.strTime}</h3>
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
