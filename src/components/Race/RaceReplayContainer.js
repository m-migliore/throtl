import React, { Component } from "react";
import { connect } from "react-redux";
import RaceReplayRace from "./RaceReplayRace";
import { fetchLapData } from "../../actions/actionCreators";

class RaceReplayContainer extends Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}

	componentDidMount() {
		this.props.fetchLapData(this.props.season, this.props.selectedRound);
	}

	componentDidUpdate() {
		if (this.props.replayLap === this.props.lapData.length - 1) {
			clearInterval(this.interval);
		}
	}

	handleClick() {
		this.interval = setInterval(() => this.props.nextLap(this.props.replayLap + 1), 1000);
	}

	render() {
		if (this.props.lapData.length > 0) {
			return (
				<div>
					{this.props.replayLap === 0 ? <button onClick={this.handleClick}>Watch Replay</button> : null}
					{this.props.replayLap !== this.props.lapData.length - 1 && this.props.replayLap === 0 ? <h2>Start</h2> : <h2>{`Lap ${this.props.replayLap}`}</h2>}
					{this.props.replayLap === this.props.lapData.length - 1 ? <h2 className="fade-in">Finished</h2> : null}
					<RaceReplayRace />
				</div>
			);
		} else if (this.props.lapDataLoading) {
			return <h2>Loading Lap Data</h2>;
		} else {
			return <h2>Lap Data Not Found</h2>;
		}
	}
}

const mapStateToProps = state => {
	return {
		season: state.season,
		selectedRound: state.selectedRound,
		replayLap: state.replayLap,
		lapData: state.lapData,
		lapDataLoading: state.lapDataLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		nextLap: lapNumber => dispatch({ type: "NEXT_LAP", payload: lapNumber }),
		fetchLapData: (season, round) => dispatch(fetchLapData(season, round)),
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(RaceReplayContainer);
