import React, { Component } from 'react';
import { connect } from 'react-redux'

class EventView extends Component {
  componentDidMount() {
    let eventId = this.props.eventId
    fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?id=${eventId}`)
    .then(r => r.json())
    .then(data => console.log(data.events[0]))
  }

  render() {
    return (
      <div><h1>EventView</h1></div>
    );
  }

}

const mapStateToProps = state => {
  return {
    eventId: state.eventId
  }
}

export default connect(mapStateToProps)(EventView);
