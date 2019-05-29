import React, { Component } from 'react';
import {connect} from 'react-redux'
import RaceLink from './RaceLink'

class RaceList extends Component {

  render() {
    return (
      <div>
        <ul>
          {this.props.seasonData.Races ? this.props.seasonData.Races.map(race => <RaceLink key={race.raceName} raceData={race} />): null}
        </ul>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    seasonData: state.seasonData
  }
}

export default connect(mapStateToProps)(RaceList);
