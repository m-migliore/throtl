import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLapData } from "../../actions/actionCreators";
import RaceReplayModal from './RaceReplayModal'

class RaceReplayContainer extends Component {
	
	componentDidMount() {
		this.props.fetchLapData(this.props.season, this.props.selectedRound);
	}

	render() {
		return (
			<>
				{this.props.replayView ? <RaceReplayModal /> : <button onClick={this.props.viewRaceReplay}>Watch Replay</button>  }
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		season: state.season,
		selectedRound: state.selectedRound,
		replayView: state.replayView
	};
};

const mapDispatchToProps = dispatch => {
	return {
		nextLap: lapNumber => dispatch({ type: "NEXT_LAP", payload: lapNumber }),
		fetchLapData: (season, round) => dispatch(fetchLapData(season, round)),
		viewRaceReplay: () => dispatch({type:	"VIEW_RACE_REPLAY"})
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(RaceReplayContainer);
