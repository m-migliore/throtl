import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import RaceResults from "./RaceResults";
import QualResults from "./QualResults";
import CircuitInfo from "../Circuit/CircuitInfo";
// import RacePreview from './RacePreview'
import DetailedResult from "../DetailedResult/DetailedResult";
import { Redirect, Link } from "react-router-dom";
import RaceReplayContainer from "../RaceReplay/RaceReplayContainer";
import MultiDriverAnimationContainer from '../LapAnimations/MultiDriverAnimationContainer'

class RaceContainer extends Component {

	componentDidUpdate() {
		console.log(this.props)
	}

	render() {
		if (this.props.loading) {
			return (
				<div className="container mx-auto my-5">
					<h1>Loading</h1>
				</div>
			);
		} else if (this.props.raceData.raceName) {
			return (
				<div className="container mx-auto my-5">
					<Link to="/" className="btn btn-default">Close</Link>
					<h1>{this.props.season + " " + this.props.raceData.raceName}</h1>
					<p>
						<Moment date={this.props.raceData.date} format="LLL" />
					</p>
					<CircuitInfo />
					{this.props.raceData.Results && <RaceReplayContainer />}
					{this.props.raceData.Results && <RaceResults />}
					{this.props.qualData.length > 1 && <QualResults />}
					{this.props.detailedResultView && <DetailedResult />}
					<MultiDriverAnimationContainer />
				</div>
			);
		} else {
			return <Redirect to="/" />;
		}
	}
}

const mapStateToProps = state => {
	return {
		loading: state.loading,
		season: state.season,
		selectedRound: state.selectedRound,
		raceData: state.raceData,
		qualData: state.qualData,
		detailedResultView: state.detailedResultView,
	};
};

export default connect(mapStateToProps)(RaceContainer);
