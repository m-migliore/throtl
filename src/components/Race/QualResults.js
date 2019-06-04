import React, { Component } from 'react';
import {connect} from 'react-redux'
import QualRow from './QualRow'

class QualResults extends Component {

  render() {
    return (
      <div className="my-5">
        <h2>Qualifying Results</h2>
        <table>
          <tbody>
            <tr>
              <th>Position</th>
              <th>Driver</th>
              <th>Constructor</th>
              <th>Q1</th>
              <th>Q2</th>
              <th>Q3</th>
            </tr>
            {this.props.qualData.map(row => <QualRow key={row.number} qualData={row} />)}
          </tbody>
        </table>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    qualData: state.qualData
  }
}

export default connect(mapStateToProps)(QualResults);
