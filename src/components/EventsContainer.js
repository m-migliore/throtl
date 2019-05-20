import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventLink from './EventLink'

class EventsContainer extends Component {
  render() {
    return (
      <div>
        <h2>Events</h2>
        <ul>
          {this.props.events.map(event => <EventLink key={event.idEvent} eventId={event.idEvent} title={event.strEvent} thumb={event.strThumb}/>)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps)(EventsContainer)
