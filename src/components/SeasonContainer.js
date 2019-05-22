import React, { Component } from 'react';
import {connect} from 'react-redux'
import RaceList from './RaceList'

class SeasonContainer extends Component {
  render() {
    return (
      <div>
        <RaceList />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    seasonData: state.seasonData
  }
}

export default connect(mapStateToProps)(SeasonContainer);
