import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {NATIONS} from '../../helpers/nations.js'
import ConstructorSeasonResultContainer from './ConstructorSeasonResultContainer'
import FlagImage from '../Image/FlagImage'

class ConstructorContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    console.log(this.props.constructorData, this.props.constructorSeasonData);
  }

  render() {
    if (this.props.constructorData.name) {
      const constructor = this.props.constructorData
      const flag = NATIONS[constructor.nationality]

      return (
        <div className="container mx-auto">
          <Link to="/">Close</Link>
          <h1>{constructor.name}</h1>
          <FlagImage flagName={flag} />
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
    constructorSeasonData: state.constructorSeasonData
  }
}

export default connect(mapStateToProps)(ConstructorContainer);
