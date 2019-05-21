import React, { Component } from 'react';
import { connect } from 'react-redux'
import Moment from 'react-moment'
import QualTable from './QualTable'

class EventView extends Component {
  componentDidMount() {
    let eventId = this.props.eventId
    fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?id=${eventId}`)
    .then(r => r.json())
    .then(data => this.props.loadEventData(data.events[0]))
  }

  render() {
    const eventData = this.props.eventData
    let results = []

    // if event has results, separate string on line break to creat each row
    // cleaned removes "↵" elements in array and extra spaces between entries for table rows
    if (Object.keys(eventData).length !== 0) {
      console.log(eventData);
      const regex = /(\r\n|\r|\n)/
      // filtered to remove  "↵" elements in array
      const rawResults = eventData.strResult.split(regex)
      const cleanedResults = rawResults.map(row => {
        if (row.length > 1) {
          return row.replace(/\s+/g, ' ').trim()
        }
      })

      results = cleanedResults
    }

    return (
      <div className="event-view">
        <button onClick={this.props.clearEventId}>ClearEvent</button>
        <h1>{eventData.strEvent}</h1>
        <h3><Moment date={eventData.dateEvent} format="MMMM Do YYYY"/></h3>
        {results.length > 0 ? <QualTable results={results}/> : null}
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
    loadEventData: eventData => dispatch({type: "LOAD_EVENT_DATA", payload: eventData}),
    clearEventId: () => dispatch({type: "CLEAR_EVENT_ID"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventView);
