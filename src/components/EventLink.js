import React, { Component } from 'react';
import { connect } from 'react-redux'

class EventLink extends Component {

  handleClick() {
    console.log(this.props.eventId);
    this.props.addEventId(this.props.eventId)
  }

  render() {
    return (
      <li onClick={this.handleClick.bind(this)}>
        <img src={this.props.thumb} alt={this.props.title}/>
      </li>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    addEventId: eventId => dispatch({type:"ADD_EVENT_ID", payload: eventId})
  }
}

export default connect(null,mapDispatchToProps)(EventLink)
