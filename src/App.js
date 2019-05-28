import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import SeasonContainer from './components/SeasonContainer'
import {fetchAllSeasonData} from './actions/actionCreators'

class App extends Component {
  // componentDidMount() {
  //   this.props.fetchAllSeasonData("current")
  // }
  //
  // render() {
  //   return (
  //     <div className={"container mx-auto"}>
  //       {this.props.loading ? <p>loading</p> :
  //         <>
  //           <h1>Formula 1 {this.props.seasonData.season} Season</h1>
  //           <SeasonContainer />
  //         </>
  //       }
  //
  //     </div>
  //   )
  // }

  componentDidMount() {
    var osmosis = require('osmosis')
    osmosis
    .get('http://en.wikipedia.org/wiki/Circuit_de_Monaco')
    .find('.infobox.vcard')
    .set('stuff')
    .data(function(listing) {
      debugger
    })

  }

  render() {
    return (
      <div>scrape</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    seasonData: state.seasonData,
    resultView: state.resultView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSeasonData: season => dispatch(fetchAllSeasonData(season))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
