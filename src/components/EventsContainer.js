import React, { Component } from 'react'
import { connect } from 'react-redux'

class EventsContainer extends Component {
  render() {
    return (
      <div>
        <h2>Events</h2>
        <ul>
          {this.props.events.map(event => <li key={event.idEvent}>{event.strEvent}</li>)}
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
