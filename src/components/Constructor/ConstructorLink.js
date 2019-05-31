import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class ConstructorLink extends Component {

  handleClick() {
    this.props.loadConstructorData(this.props.constructorData)
  }

  render() {
    if (this.props.constructorView) {
      return <Redirect to="/constructor" />
    } else {
      const constructor = this.props.constructorData

      return (
        <span onClick={this.handleClick.bind(this)}>{constructor.name}</span>
      );
    }
  }

}

const mapStateToProps = state => {
  return {
    constructorView: state.constructorView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadConstructorData: constructorData => dispatch({type: "LOAD_CONSTRUCTOR_DATA", payload: constructorData})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorLink);
