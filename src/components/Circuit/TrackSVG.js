import React, { Component } from 'react'
import {trackpaths} from '../../helpers/trackpaths'

class TrackSVG extends Component {
  componentDidMount() {
    const holder = document.getElementById("svg-holder")
    holder.innerHTML = `
    <svg width="600" height="300" viewBox="0 0 500 350">
     ${trackpaths[this.props.trackName]}
    </svg>`
  }
  render() {
    return (
      <div id="svg-holder"></div>
    )
  }
}

export default TrackSVG