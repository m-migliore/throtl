import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className={"app"}>
        <h1>App</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    meh: state.meh
  }
}

export default connect(mapStateToProps)(App)
