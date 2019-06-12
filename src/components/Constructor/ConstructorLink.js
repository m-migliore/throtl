import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchGrandPrixData} from "../../actions/actionCreators"

class ConstructorLink extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {

    if (window.location !== '/constructor' ) {
      this.props.fetchGrandPrixData(this.props.constructorData, "constructor")
    }
  }

  render() {
    const constructor = this.props.constructorData

    return (
      <Link to="/constructor" onClick={this.handleClick}>{constructor.name}</Link>
    );
  }

}


const mapDispatchToProps = dispatch => {
  return {
    fetchGrandPrixData: (data, type) => dispatch(fetchGrandPrixData(data, type))
  }
}

export default connect(null, mapDispatchToProps)(ConstructorLink);
