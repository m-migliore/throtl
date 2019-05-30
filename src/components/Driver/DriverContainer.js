import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Moment from 'react-moment'
import {fetchDriverSeasonData} from '../../actions/actionCreators'

class DriverContainer extends Component {
  componentDidMount() {
    this.props.fetchDriverSeasonData(
      this.props.season,
      this.props.driverData.driverId
    )
  }
  //
  // componentDidUpdate() {
  //   if(this.props.driverSeasonData.length > 0) {
  //     debugger
  //   }
  // }

  render() {
    if (this.props.driverData.driverId) {
      const driver = this.props.driverData
      return (
        <div>
          <h1>{driver.givenName + " " + driver.familyName} {driver.permanentNumber ? <span>{driver.permanentNumber }</span> : null}</h1>
          <p><strong>DOB:</strong> <Moment date={driver.dateOfBrith} format="LLL"/></p>
          <p><strong>Nationality:</strong> {driver.nationality}</p>

          <h2>{this.props.driverSeasonData[0].season} Season Results</h2>
        </div>
      );
    } else {
      return <Redirect to="/" />
    }

  }

}

const mapStateToProps = state => {
  return {
    season: state.season,
    driverData: state.driverData,
    driverSeasonData: state.driverSeasonData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDriverSeasonData: (season, driverId) => dispatch(fetchDriverSeasonData(season, driverId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverContainer);
