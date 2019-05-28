import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import SeasonContainer from './components/SeasonContainer'
import {fetchAllSeasonData} from './actions/actionCreators'

class App extends Component {
  state = {
    season: ""
  }

  handleChange = e => {
    this.setState({
      season: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state.season);
    this.props.fetchAllSeasonData(this.state.season)
  }

  componentDidMount() {
    this.props.fetchAllSeasonData("current")
  }

  render() {
    return (
      <div className={"container mx-auto"}>
        <form onSubmit={this.handleSubmit}>
          <input type="number" name="season" value={this.state.season} onChange={this.handleChange} />
          <button type="submit">Load Season</button>
        </form>
        {this.props.loading ? <p>loading</p> :
          <>
            <h1>Formula 1 {this.props.seasonData.season} Season</h1>
            <SeasonContainer />
          </>
        }

      </div>
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
