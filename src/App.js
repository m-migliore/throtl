import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount() {
    // fetch('https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=4370')
    // .then(r => r.json())
    // .then(data => this.props.loadf1Data(data))
    fetch('https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=4370')
    .then(r => r.json())
    .then(data => {
      this.props.loadf1Data(data.leagues[0])
      console.log(data.leagues[0])
    })
  }
  render() {
    return (
      <div className={"container mx-auto"}>
        <h1>{this.props.f1Data.strLeague}</h1>
        <h2>About</h2>
        <p>{this.props.f1Data.strDescriptionEN}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    f1Data: state.f1Data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadf1Data: data => dispatch({type: "LOAD_F1_DATA", payload: data})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
