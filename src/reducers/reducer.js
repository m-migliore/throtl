const currentYear = new Date().getFullYear();

const defaultState = {
	season: currentYear,
	selectedRound: null,
	seasonData: {},
	loading: false,
	raceData: {},
	qualData: [],
	previewData: {},
	pitData: [],
	circuitData: {},
	detailedResultView: false,
	detailedResultData: {},
	driverStandings: {},
	constructorStandings: {},
	driverData: {},
	driverSeasonData: {},
	constructorData: {},
	constructorSeasonData: {},
	replayView: false,
	replayStart: false,
	replayCountdown: 6,
	replayLap: 0,
	lapData: [],
	driverLapData: [],
	driverLapLoading: false,
	driverPitData: [],
	driverPitLoading: false,
	driverLapAnimations: [],
	driverLapAnimationCount: 0,

	driver1LapAnimationCount: 0,
	driver2LapAnimationCount: 0,
	driver3LapAnimationCount: 0,
	driver4LapAnimationCount: 0,
	driver5LapAnimationCount: 0,
	driver6LapAnimationCount: 0,
	driver7LapAnimationCount: 0,
	driver8LapAnimationCount: 0,
	driver9LapAnimationCount: 0,
	driver10LapAnimationCount: 0,
	driver11LapAnimationCount: 0,
	driver12LapAnimationCount: 0,
	driver13LapAnimationCount: 0,
	driver14LapAnimationCount: 0,
	driver15LapAnimationCount: 0,
	driver16LapAnimationCount: 0,
	driver17LapAnimationCount: 0,
	driver18LapAnimationCount: 0,
	driver19LapAnimationCount: 0,
	driver20LapAnimationCount: 0,
	driver1LapAnimations: [],
	driver2LapAnimations: [],
	driver3LapAnimations: [],
	driver4LapAnimations: [],
	driver5LapAnimations: [],
	driver6LapAnimations: [],
	driver7LapAnimations: [],
	driver8LapAnimations: [],
	driver9LapAnimations: [],
	driver10LapAnimations: [],
	driver11LapAnimations: [],
	driver12LapAnimations: [],
	driver13LapAnimations: [],
	driver14LapAnimations: [],
	driver15LapAnimations: [],
	driver16LapAnimations: [],
	driver17LapAnimations: [],
	driver18LapAnimations: [],
	driver19LapAnimations: [],
	driver20LapAnimations: []




};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		case "START_ALL_SEASON_FETCH":
			return {
				...state,
				loading: true,
				raceData: {},
				qualData: [],
				previewData: {},
				pitData: [],
				driverStandings: {},
				constructorStandings: {},
			};
		case "SET_SEASON":
			return {
				...state,
				season: action.payload,
			};
		case "FETCH_SEASON_DATA":
			return {
				...state,
			};
		case "FETCH_DRIVER_STANDINGS":
			return {
				...state,
			};
		case "FETCH_CONSTRUCTOR_STANDINGS":
			return {
				...state,
			};
		case "COMPLETE_ALL_SEASON_FETCH":
			return {
				...state,
				loading: false,
			};
		case "LOAD_SEASON_DATA":
			return {
				...state,
				seasonData: action.payload,
			};
		case "FETCH_EVENT_DATA":
			return {
				...state,
				loading: true,
				selectedRound: action.payload,
				lapData: [],
				replayStart: false,
				replayCountdown: 6,
				replayLap: 0
			};
		case "RACE_FETCH":
			return {
				...state,
			};
		case "LOAD_RACE_DATA":
			return {
				...state,
				raceData: action.payload,
			};
		case "QUAL_FETCH":
			return {
				...state,
			};
		case "LOAD_QUAL_DATA":
			return {
				...state,
				qualData: action.payload,
			};
		case "LOAD_CIRCUIT_DATA":
			return {
				...state,
				circuitData: action.payload,
			};
		case "COMPLETE_EVENT_DATA_FETCH":
			return {
				...state,
				loading: false,
			};
		case "CREATE_RACE_PREVIEW":
			return {
				...state,
				raceData: {},
				qualData: [],
			};
		case "LOAD_RACE_PREVIEW":
			return {
				...state,
				raceData: action.payload,
			};
		case "LOAD_DETAILED_RESULT":
			return {
				...state,
				detailedResultData: action.payload,
				detailedResultView: true,
			};
		case "CLOSE_DETAILED_RESULT":
			return {
				...state,
				detailedResultView: false,
				detailedResultData: {},
			};
		case "LOAD_DRIVER_STANDINGS":
			return {
				...state,
				driverStandings: action.payload,
			};
		case "LOAD_CONSTRUCTOR_STANDINGS":
			return {
				...state,
				constructorStandings: action.payload,
			};
		case "LOAD_PIT_DATA":
			return {
				...state,
				pitData: action.payload,
			};
		case "LOAD_DRIVER_DATA":
			return {
				...state,
				driverData: action.payload,
			};

		case "LOAD_DRIVER_SEASON_DATA":
			return {
				...state,
				driverSeasonData: action.payload,
			};
		case "LOAD_CONSTRUCTOR_DATA":
			return {
				...state,
				constructorData: action.payload,
			};
		case "LOAD_CONSTRUCTOR_SEASON_DATA":
			return {
				...state,
				constructorSeasonData: action.payload,
			};
		case "NEXT_LAP":
			return {
				...state,
				replayLap: action.payload,
			};
		case "START_LAP_DATA_FETCH":
			return {
				...state,
				lapDataLoading: true,
			};
		case "LOAD_LAP_DATA":
			return {
				...state,
				lapDataLoading: false,
				lapData: action.payload,
			};
		case "VIEW_RACE_REPLAY": 
			return {
				...state,
				replayView: true
			}
		case "CLOSE_RACE_REPLAY": 
			return {
				...state,
				replayView: false,
				replayStart: false,
				replayCountdown: 6,
				replayLap: 0,
			}
		case "START_REPLAY":
			return {
				...state,
				replayStart: true
			}
		case "REPLAY_COUNTDOWN_LIGHT":
			return {
				...state,
				replayCountdown: action.payload
			}
		case "START_DRIVER_LAP_FETCH":
			return {
				...state,
				driverLapLoading: true
			}
		case "LOAD_DRIVER_LAP_DATA":
			return {
				...state,
				driverLapData: action.payload,
				driverLapLoading: false
			}
		case "START_DRIVER_PIT_FETCH":
			return {
				...state,
				driverPitLoading: true
			}
		case "LOAD_DRIVER_PIT_DATA":
			return {
				...state,
				driverPitData: action.payload,
				driverPitLoading: false
			}
		case "LOAD_DRIVER_LAP_ANIMATIONS":
			return {
				...state,
				driverLapAnimations: action.payload
			}
		case "NEXT_DRIVER_LAP_ANIMATION":
			state.driverLapAnimationCount++
			return {
				...state
			}
		default:
			return defaultState;
	}
}
