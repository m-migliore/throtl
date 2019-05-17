import React, { Component } from 'react'
import { connect } from 'react-redux'

class EventsContainer extends Component {
  render() {
    return (
      <h2>Events Container</h2>
    )
  }
}

const mapStateToProps = state => {
  return {
    eventDetails: state.eventDetails
  }
}

export default connect(mapStateToProps)(EventsContainer)
