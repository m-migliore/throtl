import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {fetchConstructorData} from "../../actions/actionCreators"

class ConstructorLink extends Component {

  handleClick() {
    this.props.fetchConstructorData(this.props.constructorData)
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
    fetchConstructorData: constructorData => dispatch(fetchConstructorData(constructorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorLink);
