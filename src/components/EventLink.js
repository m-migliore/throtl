import React, { Component } from 'react';
// import { connect } from 'react-redux'

class EventLink extends Component {

  render() {
    return (
      <li>{this.props.title}</li>
    );
  }

}

// const mapStateToProps = state => {
//   return {
//     event: state.event
//   }
// }

// export default connect(mapStateToProps)(EventLink)
export default EventLink
