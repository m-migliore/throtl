import React, { Component } from 'react';
import {connect} from 'react-redux'

class ContructorStandings extends Component {
  componentDidMount(){
    console.log(this.props.constructorStandings);
  }

  render() {
    return (
      <div>ContructorStandings</div>
    );
  }

}

const mapStateToProps = state => {
  return {
    constructorStandings: state.constructorStandings
  }
}

export default connect(mapStateToProps)(ContructorStandings);
