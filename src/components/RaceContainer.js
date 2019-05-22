import React, { Component } from 'react';
import {connect} from 'react-redux'
import RaceLink from './RaceLink'

class RaceContainer extends Component {
  renderRaces() {
    if (this.props.seasonData.Races) {
      return this.props.seasonData.Races.map(race => <RaceLink key={race.raceName} raceData={race} />)
    }
  }



  render() {
    return (
      <div>
        <ul>
          {this.renderRaces()}
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

export default connect(mapStateToProps)(RaceContainer);
