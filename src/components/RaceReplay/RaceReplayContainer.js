import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLapData } from "../../actions/actionCreators";
import RaceReplayRace from "./RaceReplayRace";
import ReplayStart from './ReplayStart'

class RaceReplayContainer extends Component {
	
	componentDidMount() {
		this.props.fetchLapData(this.props.season, this.props.selectedRound);
	}

	componentDidUpdate() {
		if (this.props.replayLap === this.props.lapData.length - 1) {
			clearInterval(this.lapInterval);
		}

		if (this.props.replayCountdown === 0 && this.props.replayLap === 0 && this.props.replayStart) {
			this.lapInterval = setInterval(() => this.props.nextLap(this.props.replayLap + 1), 1000);
			console.log("hit")
		}
	}

	componentWillUnmount() {
		clearInterval(this.lapInterval)
	}


	render() {
		const replayLap = this.props.replayLap

		if (this.props.lapData.length > 0) {
			return (
				<div className="my-5">
					<ReplayStart />
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
		replayLap: state.replayLap,
		replayCountdown: state.replayCountdown,
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
