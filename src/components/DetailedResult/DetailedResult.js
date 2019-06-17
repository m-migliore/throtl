import React, { Component } from 'react';
import {connect} from 'react-redux'
import { fetchDriverLapAndPitData } from '../../actions/actionCreators'
import FastestLap from './FastestLap'
import PitDetail from './PitDetail'
import {NATIONS} from '../../helpers/nations.js'
import FlagImage from '../Image/FlagImage'
import ReplayStart from '../RaceReplay/ReplayStart'
import DriverLapAnimation from '../LapAnimations/DriverLapAnimation'

class DetailedResult extends Component {

  componentDidMount() {
    this.props.fetchDriverLapAndPitData(this.props.season, this.props.round, this.props.driverId)
  }

  componentDidUpdate() {
    if (this.props.replayLap === this.props.driverLapData.length - 1) {
      clearInterval(this.lapInterval);
    }
  
    if (this.props.replayCountdown === 0 && this.props.replayLap === 0 && this.props.replayStart) {
      this.lapInterval = setInterval(() => this.props.nextLap(this.props.replayLap + 1), 3000);
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.lapInterval)
  }

  pitLoad() {
    const pitData = this.props.driverPitData

    if (pitData.length === 0) {
      return <p>Loading</p>
    } else if (typeof pitData[0] === "object") {
      return pitData.map(pit => <PitDetail key={pit.stop} pitData={pit} />)
    } else {
      return <p>{pitData[0]}</p>
    }
  }

  render() {
    const result = this.props.detailedResultData
    const driver = this.props.detailedResultData.Driver
    const constructor = this.props.detailedResultData.Constructor
    const fastestLap = this.props.detailedResultData.FastestLap
    const flag = NATIONS[driver.nationality]

    return (
      <div className="modal-container">
        <div className="modal-content container p-5">
          <button onClick={this.props.closeDetailedResult} className="btn btn-default">Close</button>
          <h2>{driver.givenName + " " + driver.familyName} <span>{driver.permanentNumber}</span></h2>
          <FlagImage flagName={flag} />
          <h4>{constructor.name}</h4>
          <div className="my-3">
            <h3>Results</h3>
            <p><strong>Position: </strong> {result.position}</p>
            <p><strong>Grid:</strong> {result.grid}</p>
            <p><strong>Points:</strong> {result.points}</p>
            <p><strong>Laps:</strong> {result.laps}</p>
            <p><strong>Time:</strong> {result.status === "Finished" ? result.Time.time : "DNF"}</p>
            <p><strong>Status:</strong> {result.status}</p>
          </div>
          {this.props.season > 2003 ? <FastestLap fastestLap={fastestLap}/> : null}
          <div className="my-3">
            <h3>Pit Stops</h3>
            {this.pitLoad()}
          </div>
          <div className="my-3">
            <h3>Race Replay</h3>
            {this.props.driverLapLoading ? <p>Loading</p> : <ReplayStart />}
            {this.props.replayLap}
            <svg width="565" height="800" viewBox="0 0 500 350">
              <path
                id="catalunya"
                d="
                  M 461.1627502441406 510.6198425292969
                  C 427.1986389160156 521.9412231445312 283.5194396972656 512.7298583984375 237.5028076171875 512.7298583984375
                  C 228.81369018554688 512.7298583984375 170.88800048828125 514.6900024414062 167.87283325195312 511.67486572265625
                  C 162.8277130126953 506.6297302246094 168.0692901611328 488.66131591796875 162.59783935546875 483.1898498535156
                  C 147.27574157714844 467.86773681640625 117.23284912109375 479.4422912597656 117.23284912109375 451.53985595703125
                  C 117.23284912109375 448.1001281738281 116.51448822021484 442.76324462890625 118.28784942626953 440.9898681640625
                  C 120.5653305053711 438.71240234375 117.90516662597656 429.0952453613281 119.34284973144531 426.2198791503906
                  C 124.8152084350586 415.2751159667969 134.56468200683594 414.1630554199219 141.4978485107422 407.2298889160156
                  C 146.46755981445312 402.2601623535156 238.50668334960938 397.6837463378906 243.8328094482422 403.0098876953125
                  C 246.62652587890625 405.8036193847656 246.99781799316406 415.83929443359375 246.99781799316406 420.94488525390625
                  C 246.99781799316406 422.9620361328125 248.28152465820312 432.3211975097656 246.99781799316406 433.6048889160156
                  C 231.93978881835938 448.6628723144531 169.81419372558594 441.1585388183594 166.81784057617188 444.1548767089844
                  C 166.1807403564453 444.7919616699219 166.81784057617188 449.484375 166.81784057617188 450.48486328125
                  C 166.81784057617188 451.4853515625 166.1807403564453 456.1777648925781 166.81784057617188 456.81488037109375
                  C 174.02833557128906 464.0253601074219 180.53643798828125 463.8505859375 188.9728240966797 469.474853515625
                  C 195.1111297607422 473.5670471191406 194.28150939941406 478.9866943359375 200.57781982421875 482.1348571777344
                  C 205.23426818847656 484.46307373046875 255.63633728027344 489.32135009765625 258.6028137207031 486.3548583984375
                  C 263.8352355957031 481.1224365234375 258.35394287109375 466.80767822265625 261.767822265625 459.9798583984375
                  C 267.7312927246094 448.0529479980469 289.1977844238281 445.3808288574219 289.1977844238281 428.3298645019531
                  C 289.1977844238281 426.99957275390625 289.5538330078125 423.40435791015625 290.2528076171875 423.05487060546875
                  C 294.4163818359375 420.97308349609375 317.8939208984375 415.4587097167969 318.73779296875 414.6148681640625
                  C 324.70904541015625 408.64361572265625 354.4001770019531 419.47467041015625 356.7177734375 424.10986328125
                  C 362.6000671386719 435.87445068359375 419.243896484375 465.5359802246094 429.51275634765625 475.80487060546875
                  C 431.41876220703125 477.7108154296875 450.9232482910156 482.87939453125 453.7777404785156 480.0248718261719
                  C 456.68878173828125 477.1138610839844 456.9427490234375 469.8526306152344 456.9427490234375 464.1998596191406
                  C 456.9427490234375 460.3639221191406 458.6209411621094 451.7313537597656 456.9427490234375 448.3748779296875
                  C 451.51177978515625 437.5129699707031 397.11041259765625 428.1785583496094 428.457763671875 412.5048828125
                  C 442.8951110839844 405.2862548828125 468.87652587890625 416.327392578125 473.82275390625 426.2198791503906
                  C 477.3838806152344 433.34222412109375 468.4098205566406 454.5668640136719 473.82275390625 459.9798583984375
                  C 476.9822082519531 463.139404296875 484.5243225097656 463.2964782714844 487.5377502441406 466.30987548828125
                  C 488.82147216796875 467.59356689453125 487.5377502441406 476.9527282714844 487.5377502441406 478.9698486328125
                  C 487.5377502441406 487.2390441894531 490.97100830078125 497.69158935546875 485.427734375 503.23486328125
                  C 481.47406005859375 507.18853759765625 472.3448181152344 504.5013122558594 466.437744140625 507.4548645019531
                  C 462.91009521484375 509.21868896484375 460.91986083984375 511.67486572265625 456.9427490234375 511.67486572265625"
                fill="none"
                stroke="#0047ff"
                stoke-miterlimit="10"
              >
              </path>
            
              <circle id="circle" r="10" cx="0" cy="0" fill="tomato" />
              {this.props.replayStart && <DriverLapAnimation />}
            
            </svg>

          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    season: state.season,
    detailedResultData: state.detailedResultData,
    round: state.detailedResultData.round,
    driverId: state.detailedResultData.Driver.driverId,
    driverLapLoading: state.driverLapLoading,
    driverLapData: state.driverLapData,
    driverPitLoading: state.driverPitLoading,
    driverPitData: state.driverPitData,
    replayLap: state.replayLap,
    replayCountdown: state.replayCountdown,
    replayStart: state.replayStart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeDetailedResult: () =>  dispatch({type: "CLOSE_DETAILED_RESULT"}),
    fetchDriverLapAndPitData: (season, round, driverId) => dispatch(fetchDriverLapAndPitData(season, round, driverId)),
    nextLap: lapNumber => dispatch({ type: "NEXT_LAP", payload: lapNumber }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedResult);
