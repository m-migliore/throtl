import React, { Component } from 'react';

class QualTable extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>QualTable</h1>
        {this.props.results.map(row => <p>{row}</p>)}
      </div>
    );
  }

}

export default QualTable;
