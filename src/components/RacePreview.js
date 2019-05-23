import React, { Component } from 'react';
import {connect} from 'react-redux'
import RaceTitle from './RaceTitle'

class RacePreview extends Component {

  render() {
    return (
      <div>
        <RaceTitle titleData={this.props.previewData} />
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
