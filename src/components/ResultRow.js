import React, { Component } from 'react';

class ResultRow extends Component {

  render() {
    return (
      <div>{this.props.resultData.Driver.familyName}</div>
    );
  }

}

export default ResultRow;
