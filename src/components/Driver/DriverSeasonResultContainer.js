import React, { Component } from 'react';
import {connect} from 'react-redux'

class DriverSeasonResultContainer extends Component {

  render() {
    if (this.props.driverSeasonData.length > 0) {
      return (
        <div>yoyo</div>
      );
    } else {
      return <p>Loading season results</p>
    }

  }

}

const mapStateToProps = state => {
  return {
    driverSeasonData: state.driverSeasonData
  }
}
export default connect(mapStateToProps)(DriverSeasonResultContainer);
