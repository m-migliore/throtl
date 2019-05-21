import React, { Component } from 'react';
import { connect } from 'react-redux'
import QualRow from './QualRow'

class QualTable extends Component {
  //line 12 holder:
  render() {
    return (
      <div>
        <h1>QualTable</h1>
        <p><strong>{this.props.eventResults[0]}</strong></p>
        {this.props.eventResults.slice(1,this.props.eventResults.length).map(row => <QualRow rowData={row} />)}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    eventResults: state.eventResults
  }
}

export default connect(mapStateToProps)(QualTable);
