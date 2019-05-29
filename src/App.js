import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import SeasonContainer from './components/SeasonContainer'

class App extends Component {

  render() {
    return (
      <Router>
        <Route path="/" exact component={SeasonContainer} />
      </Router>
    )
  }
}


export default App;
