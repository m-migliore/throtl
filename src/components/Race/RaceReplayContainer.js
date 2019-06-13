import React, { Component } from "react";
import { connect } from "react-redux";
import RaceReplayRace from "./RaceReplayRace";
import { fetchLapData } from "../../actions/actionCreators";
import StartLightContainer from "../StartLight/StartLightContainer";

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

		if (this.props.replayCountdown === 0 && !this.props.replayStart) {
			clearInterval(this.countdownInterval)
			this.interval = setInterval(() => this.props.nextLap(this.props.replayLap + 1), 1000);
			this.props.startReplay()
		}
	}

	handleClick() {
		this.countdownInterval = setInterval(() => this.props.replayCountdownLight(this.props.replayCountdown - 1), 1000)
	}

	render() {
		if (this.props.lapData.length > 0) {
			return (
				<div>
					{this.props.replayCountdown === 6 ? <button onClick={this.handleClick}>Watch Replay</button> : <StartLightContainer />}
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
		replayStart: state.replayStart,
		replayCountdown: state.replayCountdown,
		replayLap: state.replayLap,
		lapData: state.lapData,
		lapDataLoading: state.lapDataLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		startReplay: () => dispatch({type: "START_REPLAY"}),
		replayCountdownLight: countdownNumber => dispatch({type: "REPLAY_COUNTDOWN_LIGHT", payload: countdownNumber}),
		nextLap: lapNumber => dispatch({ type: "NEXT_LAP", payload: lapNumber }),
		fetchLapData: (season, round) => dispatch(fetchLapData(season, round)),
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(RaceReplayContainer);
