import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchAllSeasonData} from '../../actions/actionCreators'
import StandingsContainer from '../Standings/StandingsContainer'
import RaceList from './RaceList'

class SeasonContainer extends Component {
  state = {
    season: "",
    error: ""
  }

  componentDidMount() {
    if (this.props.season !== parseInt(this.props.seasonData.season)) {
      this.props.fetchAllSeasonData(this.props.season)
    }
  }

  handleChange = e => {
    this.setState({
      season: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.season <= new Date().getFullYear() &&  this.state.season > 1951) {
      this.props.fetchAllSeasonData(this.state.season)
      this.setState({
        season: "",
        error: ""
      })
    } else {
      this.setState({
        error: `Enter year between 1952 and ${new Date().getFullYear()}`
      })
    }

  }

  render() {
    return (
      <div className="container mx-auto">
        {/* <form onSubmit={this.handleSubmit}>
          <input type="number" name="season" value={this.state.season} onChange={this.handleChange} />
          {this.state.error.length > 0 ? <p>{this.state.error}</p> : null}
          <button type="submit">Load Season</button>
        </form> */}
        <h1>Formula 1 {this.props.seasonData.season} Season</h1>
        <RaceList />
        <StandingsContainer />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    season: state.season,
    seasonData: state.seasonData,
    raceView: state.raceView
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSeasonData: season => dispatch(fetchAllSeasonData(season))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonContainer);
