import React, { Component } from "react";
import { connect } from "react-redux";
import RaceReplayRace from "./RaceReplayRace";
import { fetchLapData } from "../../actions/actionCreators";

class RaceReplayContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			replayStart: false,
			replayCountdown: 6
		}

		this.handleClick = this.handleClick.bind(this)
	}

	componentDidMount() {
		this.props.fetchLapData(this.props.season, this.props.selectedRound);
	}

	componentDidUpdate() {
		console.log(this.state.replayCountdown)
		if (this.props.replayLap === this.props.lapData.length - 1) {
			clearInterval(this.interval);
		}

		if (this.state.replayCountdown === 0 && !this.state.replayStart) {
			clearInterval(this.countdownInterval)
			this.interval = setInterval(() => this.props.nextLap(this.props.replayLap + 1), 1000);
			this.setState({
				replayStart: true
			})

			
		}

	}

	handleClick() {
		// this.setState({
		// 	replayStart: true
		// })
	
		this.countdownInterval = setInterval(() => this.countdown(), 1000)
	}

	countdown() {
		this.setState((prevState) => ({
			replayCountdown: prevState.replayCountdown - 1
		}));
	}

	render() {
		if (this.props.lapData.length > 0) {
			return (
				<div>
					{this.props.replayLap === 0 ? <button onClick={this.handleClick}>Watch Replay</button> : null}
					<div className="start-lights">
						<span className={`start-light ${this.state.replayCountdown === 1 && this.state.replayCountdown > 0 ? "countdown" : null}`}></span>
						<span className={`start-light ${this.state.replayCountdown === 2 && this.state.replayCountdown > 0 ? "countdown" : null}`}></span>
						<span className={`start-light ${this.state.replayCountdown === 3 && this.state.replayCountdown > 0 ? "countdown" : null}`}></span>
						<span className={`start-light ${this.state.replayCountdown === 4 && this.state.replayCountdown > 0 ? "countdown" : null}`}></span>
						<span className={`start-light ${this.state.replayCountdown === 5 && this.state.replayCountdown > 0 ? "countdown" : null}`}></span>
					</div>
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
