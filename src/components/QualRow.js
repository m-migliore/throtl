import React, { Component } from 'react';
import { DRIVERS, CONSTRUCTORS } from '../constants/constants'

class QualRow extends Component {

  componentDidMount() {
    console.log(DRIVERS);
    console.log(CONSTRUCTORS);
    
  }

  render() {
    return (
      <div>
        <span>place</span>
        <span>number</span>
        <span>driver</span>
        <span>constructor</span>
        <span>q1</span>
        <span>q2</span>
        <span>q3</span>
        <span>laps</span>
      </div>
    );
  }

}

export default QualRow;
