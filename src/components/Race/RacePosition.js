import React, { Component } from 'react'

class RacePosition extends Component {
  componentDidMount() {
    console.log(this.props.lapData)
    
  }

  render() {
    const lapData = this.props.lapData
    const lapInfo = lapData.lapInfo
  
    let posStyle
    if (lapInfo[this.props.lapNumber - 1]) {
      posStyle = {
        top: `${parseInt(lapInfo[this.props.lapNumber - 1].position) * 20}px`
      }
    } else {
      const finalPos = lapData.result.position
      posStyle = {
        top: `${parseInt(finalPos) * 20}px`
      }
    }

    return (
      <div className="race-pos" style={posStyle}>
        {lapData.driverId}
      </div>
    )
  }
}

export default RacePosition