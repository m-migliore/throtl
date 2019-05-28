import React, { Component } from 'react';
import {connect} from 'react-redux'
import ConstructorStandingRow from './ConstructorStandingRow'

class ContructorStandings extends Component {

  render() {
    if (!this.props.constructorStandings.StandingsLists) {
      return null
    } else {
      const standings = this.props.constructorStandings.StandingsLists[0].ConstructorStandings

      return (
        <div>
          <h3>Driver Standings</h3>
          <table>
            <tbody>
              <tr>
                <th>Position</th>
                <th>Constructor</th>
                <th>Points</th>
                <th>Wins</th>
              </tr>
              {standings.map(standing => <ConstructorStandingRow key={standing.Constructor.constructorId} standingData={standing}/>)}
            </tbody>
          </table>
        </div>
      );
    }

  }

}

const mapStateToProps = state => {
  return {
    constructorStandings: state.constructorStandings
  }
}

export default connect(mapStateToProps)(ContructorStandings);
