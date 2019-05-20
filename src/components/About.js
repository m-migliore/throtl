import React, { Component } from 'react';
import { connect } from "react-redux"

class About extends Component {

  render() {
    return (
      <div className="about-container">
        <h1>{this.props.about.strLeague}</h1>
        <h2>About</h2>
        <p>{this.props.about.strDescriptionEN}</p>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    about: state.about
  }
}

export default connect(mapStateToProps)(About);
