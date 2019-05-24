import React, { Component } from 'react';
import {connect} from 'react-redux'
import DriverStandingRow from './DriverStandingRow'


class DriverStandings extends Component {


  render() {
    // const standings = this.props.driverStandings.StandingsLists[0]

    if (!this.props.driverStandings.StandingsLists) {
      return null
    } else {
      const standings = this.props.driverStandings.StandingsLists[0].DriverStandings
      console.log(standings);
      return (
        <div>
          <h3>Driver Standings</h3>
          <table>
            <tbody>
              <tr>
                <th>Position</th>
                <th>Driver</th>
                <th>Constructor</th>
                <th>Points</th>
                <th>Wins</th>
              </tr>
              {standings.map(standing => <DriverStandingRow key={standing.Driver.code} standingData={standing}/>)}
            </tbody>
          </table>
        </div>
      );
    }

  }

}

const mapStateToProps = state => {
  return {
    driverStandings: state.driverStandings
  }
}

export default connect(mapStateToProps)(DriverStandings);
