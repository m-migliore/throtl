import React, { Component } from 'react';
import {connect} from 'react-redux'

class RacePreview extends Component {

  render() {
    return (
      <div>
        RacePreview
      </div>
    );
  }

}
const mapStateToProps = state => {
  return {
    previewData: state.previewData
  }
}

export default connect(mapStateToProps)(RacePreview);
