import React, { Component } from 'react';

class QualRow extends Component {
  componentDidMount() {
    console.log(this.props.rowData);
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
