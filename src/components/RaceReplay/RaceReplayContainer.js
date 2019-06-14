import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLapData } from "../../actions/actionCreators";
import RaceReplayRace from "./RaceReplayRace";
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
			clearInterval(this.lapInterval);
		}

		if (this.props.replayCountdown === 0 && !this.props.replayStart) {
			clearInterval(this.countdownInterval)
			this.lapInterval = setInterval(() => this.props.nextLap(this.props.replayLap + 1), 1000);
			this.props.startReplay()
		}
	}

	componentWillUnmount() {
		clearInterval(this.lapInterval);
		clearInterval(this.countdownInterval)
	}

	handleClick() {
		this.countdownInterval = setInterval(() => this.props.replayCountdownLight(this.props.replayCountdown - 1), 1000)
	}

	render() {
		const replayLap = this.props.replayLap
		const replayCountdown = this.props.replayCountdown

		if (this.props.lapData.length > 0) {
			return (
				<div className="my-5">
					{replayCountdown === 6 && <button onClick={this.handleClick} className="btn btn-defualt">Watch Replay</button>}
					{(replayLap === 0 && replayCountdown !== 6) && <StartLightContainer />}
					{replayLap > 0 && replayLap !== this.props.lapData.length - 1  ? <h2>{`Lap ${replayLap}`}</h2> : null}
					{replayLap === this.props.lapData.length - 1 ? <h2 className="animate-pulse">Finished</h2> : null}
					<RaceReplayRace />
				</div>
			);
		} else if (this.props.lapDataLoading) {
			return <h2 className="my-5">Loading Lap Data</h2>;
		} else {
			return <h2 className="my-5">Lap Data Not Found</h2>;
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
