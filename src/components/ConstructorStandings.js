import React, { Component } from 'react';
import {connect} from 'react-redux'

class ContructorStandings extends Component {

  render() {
    return (
      <div>ContructorStandings</div>
    );
  }

}

const mapStateToProps = state => {
  return {
    seasonData: state.seasonData
  }
}

export default connect(mapStateToProps)(ContructorStandings);
