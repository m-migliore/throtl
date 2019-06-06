import React, { Component } from 'react'

 class Flag extends Component {
  render() {
    return (
      <div>
        <img 
          src={process.env.PUBLIC_URL + `/imgs/flags/${this.props.flagName}.png`} 
          alt={`${this.props.flagName} Flag`} 
          className="c-flag"
        />
      </div>
    )
  }
}

export default Flag
