import React, { Component } from 'react';
import {connect} from 'react-redux'

class QualResults extends Component {
  componentDidMount() {
    console.log("qual", this.props.qualData);
  }

  render() {
    return (
      <div>
        <h2>Qualifying Results</h2>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    qualData: state.qualData
  }
}

export default connect(mapStateToProps)(QualResults);
