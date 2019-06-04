import React, { Component } from 'react';
import {connect} from 'react-redux'
import DriverStandings from './DriverStandings'
import ContructorStandings from './ConstructorStandings'

class StandingsContainer extends Component {

  render() {
    return (
      <div className="container mx-auto my-5">
        <h2>{this.props.seasonData.season} Season Standings</h2>
        <div className="flex">
          <DriverStandings />
          <ContructorStandings />
        </div>
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
