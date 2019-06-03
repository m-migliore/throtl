import React, { Component } from 'react';
import {connect} from 'react-redux'
import GrandPrixResult from '../GrandPrixResult/GrandPrixResult'
import DetailedResult from '../DetailedResult/DetailedResult'



class ConstructorSeasonResultContainer extends Component {
  componentDidUpdate() {
    console.log(this.props.constructorSeasonData);
  }

  render() {
    if (this.props.constructorSeasonData.length > 0) {
      const seasonData = this.props.constructorSeasonData
      return (
        <div>
          <h3>{seasonData[0].season} Season Results</h3>
          {seasonData.map(result => <GrandPrixResult key={result.round} resultData={result} />)}
          {this.props.detailedResultView ? <DetailedResult /> : null}
        </div>
      );
    } else {
      return <p>Loading season results</p>
    }

  }

}

const mapStateToProps = state => {
  return {
    constructorSeasonData: state.constructorSeasonData,
    detailedResultView: state.detailedResultView
  }
}

export default connect(mapStateToProps)(ConstructorSeasonResultContainer);
