import React, { Component } from 'react';
import {connect} from 'react-redux'
import DriverStandings from './DriverStandings'
import ContructorStandings from './ConstructorStandings'

class StandingsContainer extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.seasonData.season} Season Standings</h2>
        <DriverStandings />
        <ContructorStandings />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    seasonData: state.seasonData
  }
}

export default connect(mapStateToProps)(StandingsContainer);
