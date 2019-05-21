import React, { Component } from 'react';
import QualRow from './QualRow'

class QualTable extends Component {
  
  render() {
    return (
      <div>
        <h1>QualTable</h1>
        <p><strong>{this.props.results[0]}</strong></p>
        {this.props.results.slice(1,this.props.results.length).map(row => <QualRow rowData={row} />)}
      </div>
    );
  }

}

export default QualTable;
