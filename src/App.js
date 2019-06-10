import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SeasonContainer from './components/Season/SeasonContainer'
import RaceContainer from './components/Race/RaceContainer'
import DriverContainer from './components/Driver/DriverContainer'
import ConstructorContainer from './components/Constructor/ConstructorContainer'
// import WatchRace from './components/Race/WatchRace'

class App extends Component {

  render() {
    return (
      <Router>
        <Route path="/" exact component={SeasonContainer} />
        <Route path="/race" component={RaceContainer}/>
        <Route path="/driver" component={DriverContainer} />
        <Route path="/constructor" component={ConstructorContainer} />
      </Router>
      // <WatchRace />
    )
  }
}

export default App;
