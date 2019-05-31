import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class ConstructorContainer extends Component {
  componentDidUpdate() {
    console.log(this.props.constructorSeasonData);
  }

  render() {
    if (this.props.constructorData.name) {
      const constructor = this.props.constructorData
      return (
        <div>
          <h1>{constructor.name}</h1>
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
