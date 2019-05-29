import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SeasonContainer from './components/Season/SeasonContainer'
import RaceContainer from './components/Race/RaceContainer'

class App extends Component {

  render() {
    return (
      <Router>
        <Route path="/" exact component={SeasonContainer} />
        <Route path="/race" component={RaceContainer}/>
      </Router>
    )
  }
}


export default App;
