import React, { Component } from 'react';
import {connect} from 'react-redux'


class DriverStandings extends Component {
  componentDidMount(){
    console.log(this.props.driverStandings);
  }

  render() {
    //const standings = this.props.driverStandings.StandingsLists

    return (
      <div>
        DriverStandings
        <table>
          <tbody>
            <tr>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    driverStandings: state.driverStandings
  }
}

export default connect(mapStateToProps)(DriverStandings);
