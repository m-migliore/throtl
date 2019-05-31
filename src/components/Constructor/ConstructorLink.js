import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {fetchGrandPrixData} from "../../actions/actionCreators"

class ConstructorLink extends Component {

  handleClick() {

    if (window.location !== '/constructor' ) {
      this.props.fetchGrandPrixData(this.props.constructorData, "constructor")
    }
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
    fetchGrandPrixData: (data, type) => dispatch(fetchGrandPrixData(data, type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstructorLink);
