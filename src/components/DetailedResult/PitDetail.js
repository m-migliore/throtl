import React, { Component } from 'react';
import { connect } from 'react-redux'


class PitDetail extends Component {
  componentDidMount() {
    debugger
    console.log("hit");
    
  }

  render() {
    // const pit = this.props.pitData

    return (
      <div>
        <h3>Pitstops</h3>
        {/* <p><strong>Stop:</strong> {pit.stop}</p>
        <p><strong>Lap:</strong> {pit.lap}</p>
        <p><strong>Duration:</strong> {pit.duration}</p>
        <p><strong>Time:</strong> {pit.time}</p> */}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    season: state.season,
    detailedResultData: state.detailedResultData
  }
}

// const mapDispatchToProps = {
  
// }


export default connect(mapStateToProps)(PitDetail);
