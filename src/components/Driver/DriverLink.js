import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchGrandPrixData} from '../../actions/actionCreators'

class DriverLink extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    if (window.location.pathname !== '/driver' ) {
      this.props.fetchGrandPrixData(this.props.driverData, "driver")
    }
  }

  render() {
    const driver = this.props.driverData
      return (
        <Link to="/driver" onClick={this.handleClick}>{driver.givenName + " " + driver.familyName}</Link>
      );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    fetchGrandPrixData: (data, type) => dispatch(fetchGrandPrixData(data, type))
  }
}

export default connect(null, mapDispatchToProps)(DriverLink);
