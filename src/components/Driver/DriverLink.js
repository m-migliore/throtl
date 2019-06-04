import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {fetchGrandPrixData} from '../../actions/actionCreators'

class DriverLink extends Component {
  handleClick() {
    console.log(this.props.driverData)

    if (window.location !== '/driver' ) {
      this.props.fetchGrandPrixData(this.props.driverData, "driver")
    }
  }

  render() {
    if (this.props.driverView) {
      return <Redirect to="/driver" />
    } else {
      const driver = this.props.driverData
      return (
        <span onClick={this.handleClick.bind(this)} className="cursor-pointer">{driver.givenName + " " + driver.familyName}</span>
      );
    }
  }

}

const mapStateToProps = state => {
  return {
    driverView: state.driverView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGrandPrixData: (data, type) => dispatch(fetchGrandPrixData(data, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriverLink);
