import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchAllSeasonData} from '../actions/actionCreators'
import StandingsContainer from './StandingsContainer'
import RaceContainer from './RaceContainer'
import RaceList from './RaceList'

class SeasonContainer extends Component {
  state = {
    season: "",
    error: ""
  }

  handleChange = e => {
    this.setState({
      season: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    debugger
    if (this.state.season === "current" || (this.state.season <= new Date().getFullYear() &&  this.state.season > 1951)) {
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

  componentDidMount() {
    this.props.fetchAllSeasonData("current")
  }

  render() {
    return (
      <div className={"container mx-auto"}>
        <form onSubmit={this.handleSubmit}>
          <input type="number" name="season" value={this.state.season} onChange={this.handleChange} />
          {this.state.error.length > 0 ? <p>{this.state.error}</p> : null}
          <button type="submit">Load Season</button>
        </form>
        {this.props.loading ? <p>loading</p> :
          <>
            <h1>Formula 1 {this.props.seasonData.season} Season</h1>
            <StandingsContainer />
            {this.props.raceView ? <RaceContainer /> : <RaceList />}
          </>
        }

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    loading: state.loading,
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
