import React, { Component } from 'react';
import {connect} from 'react-redux'
import DriverStandings from './DriverStandings'
import ContructorStandings from './ConstructorStandings'

class StandingsContainer extends Component {

  render() {
    return (
      <div>
        <h2>Current Standing for the {this.props.seasonData.season} Season</h2>
        {/* <h4>Last Race: {this.prs.}</h4>
        <h4></h4> */}
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
