import React, { Component } from 'react'

 class FlagImage extends Component {
  render() {
    return (
      <div>
        <img src={process.env.PUBLIC_URL + `/imgs/flags/${this.props.flagName}.png`} alt={`${this.props.flagName} Flag`} />
      </div>
    )
  }
}

export default FlagImage
