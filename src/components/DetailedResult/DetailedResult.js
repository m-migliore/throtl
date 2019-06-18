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
      this.lapInterval = setInterval(() => this.props.nextLap(this.props.replayLap + 1), 2000);
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
            <svg width="600" height="300" viewBox="0 0 500 350">
              <path
                id="catalunya"
                d="
                M 488.08795166015625 274.4076843261719 
                C 444.6513977050781 274.4076843261719 400.2328796386719 274.9728088378906 356.4161682128906 274.9728088378906 
                C 336.3284912109375 274.9728088378906 313.1289367675781 271.64984130859375 293.68841552734375 275.5379333496094 
                C 286.0624694824219 277.0631103515625 277.1284484863281 275.13055419921875 269.3884582519531 275.5379333496094 
                C 249.8488311767578 276.56634521484375 229.46034240722656 275.2923889160156 210.0513916015625 277.2332763671875 
                C 198.61514282226562 278.37689208984375 111.48634338378906 278.81109619140625 100.41910552978516 273.2774658203125 
                C 99.27759552001953 272.7066955566406 99.85398864746094 270.91070556640625 99.85398864746094 269.88677978515625 
                C 99.85398864746094 258.02545166015625 92.05321502685547 244.89999389648438 89.11680603027344 233.15432739257812 
                C 88.84864807128906 232.08169555664062 87.99248504638672 232.87472534179688 87.42145538330078 232.58920288085938 
                C 80.61924743652344 229.18807983398438 72.66339874267578 225.06265258789062 65.38197326660156 222.98223876953125 
                C 60.28843688964844 221.52694702148438 56.815555572509766 217.64804077148438 52.94944763183594 215.07064819335938 
                C 34.88059997558594 203.02471923828125 32.040191650390625 194.98809814453125 32.040191650390625 172.68701171875 
                C 32.040191650390625 169.87945556640625 30.791776657104492 163.31643676757812 32.040191650390625 160.81959533691406 
                C 48.17385482788086 128.55227661132812 119.33379364013672 128.04293823242188 152.40966796875 128.04293823242188 
                C 165.0288543701172 128.04293823242188 190.32608032226562 125.32473754882812 196.4886474609375 137.64988708496094 
                C 199.85179138183594 144.3760986328125 199.9107208251953 155.37255859375 197.0537567138672 162.5149383544922 
                C 195.41339111328125 166.61585998535156 194.3277587890625 172.02232360839844 191.96771240234375 174.38235473632812 
                C 179.8590087890625 186.49107360839844 102.65751647949219 173.29620361328125 91.94237518310547 194.72650146484375 
                C 85.51634979248047 207.57855224609375 115.85994720458984 213.1756591796875 119.63301086425781 220.72177124023438 
                C 121.29779815673828 224.05136108398438 141.80030822753906 237.70721435546875 146.1934051513672 238.80545043945312 
                C 156.7137908935547 241.43551635742188 203.76588439941406 246.78631591796875 211.181640625 239.37057495117188 
                C 217.96522521972656 232.58697509765625 214.481201171875 223.25558471679688 217.39788818359375 214.50552368164062 
                C 221.84144592285156 201.17483520507812 235.66653442382812 191.9060516357422 242.8280792236328 181.16372680664062 
                C 251.1416473388672 168.69337463378906 271.7257995605469 135.60342407226562 291.4279479980469 142.17080688476562 
                C 297.0395202636719 144.0413055419922 303.5450134277344 144.06983947753906 309.5116271972656 145.56149291992188 
                C 311.18603515625 145.9801025390625 313.6173400878906 149.02713012695312 315.7279052734375 150.08241271972656 
                C 329.59173583984375 157.0143280029297 344.99444580078125 164.54566955566406 359.2417297363281 172.68701171875 
                C 366.32574462890625 176.73500061035156 372.04547119140625 183.52455139160156 378.4556579589844 188.51022338867188 
                C 389.8916320800781 197.4049072265625 408.6088562011719 203.97042846679688 418.0137023925781 213.37527465820312 
                C 421.5613098144531 216.92291259765625 427.3770751953125 221.44769287109375 431.5764465332031 223.54736328125 
                C 438.93731689453125 227.227783203125 467.1191101074219 243.95114135742188 475.65545654296875 235.41476440429688 
                C 479.6457214355469 231.4244384765625 475.1624755859375 215.21493530273438 473.39495849609375 211.679931640625 
                C 469.977294921875 204.8446044921875 469.56719970703125 190.83470153808594 461.5275573730469 186.81488037109375 
                C 451.0016784667969 181.5519561767578 437.83721923828125 179.77320861816406 427.0555419921875 174.38235473632812 
                C 424.425048828125 173.0670928955078 416.3203125 148.66864013671875 422.5346374511719 145.56149291992188 
                C 449.58709716796875 132.03526306152344 480.52825927734375 153.0839080810547 502.78094482421875 164.21029663085938 
                C 503.6400451660156 164.6398468017578 503.15765380859375 166.09400939941406 503.3460693359375 167.03587341308594 
                C 506.4034729003906 182.32284545898438 501.41217041015625 199.18484497070312 504.4762878417969 214.50552368164062 
                C 505.3023681640625 218.63580322265625 513.9810791015625 215.70037841796875 516.9088134765625 217.89620971679688 
                C 524.430419921875 223.53741455078125 524.3056030273438 239.80996704101562 520.8646240234375 248.41241455078125 
                C 516.0050048828125 260.5614013671875 504.8296203613281 267.44964599609375 493.1739807128906 273.2774658203125 
                C 490.8252868652344 274.4518127441406 486.1463623046875 272.3935546875 488.08795166015625 274.4076843261719 Z" 
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
