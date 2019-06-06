import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NATIONS} from '../../helpers/nations.js'
import ConstructorSeasonResultContainer from './ConstructorSeasonResultContainer'
import Flag from '../Image/Flag'

class ConstructorContainer extends Component {

  componentWillUnmount() {
    this.props.clearConstructorView()
  }

  componentDidUpdate() {
    console.log(this.props.constructorData, this.props.constructorSeasonData);
  }

  render() {
    if (this.props.constructorData.name && this.props.constructorView) {
      const constructor = this.props.constructorData
      const flag = NATIONS[constructor.nationality]

      return (
        <div className="container mx-auto">
          <button onClick={this.props.clearConstructorView}>Close</button>
          <h1>{constructor.name}</h1>
          <Flag flagName={flag} />
          <ConstructorSeasonResultContainer />
        </div>
      );
    } else {
      return <Redirect to="/" />
    }
  }

}

const mapStateToProps = state => {
  return {
    constructorData: state.constructorData,
    constructorSeasonData: state.constructorSeasonData,
    constructorView: state.constructorView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearConstructorView: () => dispatch({type: "CLEAR_CONSTRUCTOR_VIEW"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorContainer);
