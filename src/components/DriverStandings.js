import React, { Component } from 'react';
import {connect} from 'react-redux'


class DriverStandings extends Component {


  render() {
    // const standings = this.props.driverStandings.StandingsLists[0]
    // console.log(standings);
    if (!this.props.driverStandings.StandingsLists) {
      return null
    } else {
      const standings = this.props.driverStandings.StandingsLists[0].DriverStandings

      return (
        <div>
          DriverStandings
          <table>
            <tbody>
              <tr>
                <th>{standings[0].points}</th>
              </tr>
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
