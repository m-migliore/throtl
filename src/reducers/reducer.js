const defaultState = {
  season: "current",
  seasonData: {},
  selectedRound: "last",
  raceView: false,
  futureRace: false,
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
  driverView: false,
  driverData: {}
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "START_ALL_SEASON_FETCH":
    return {
      ...state,
      loading: true,
      raceView: false,
      raceData: {},
      qualData: [],
      previewData: {},
      pitData: [],
      driverStandings: {},
      constructorStandings: {}
    }
    case "SET_SEASON":
    return {
      ...state,
      season: action.payload
    }
    case "FETCH_SEASON_DATA":
    return {
      ...state
    }
    case "FETCH_DRIVER_STANDINGS":
    return {
      ...state
    }
    case "FETCH_CONSTRUCTOR_STANDINGS":
    return {
      ...state
    }
    case "COMPLETE_ALL_SEASON_FETCH":
    return {
      ...state,
      loading: false
    }
    case "LOAD_SEASON_DATA":
    return {
      ...state,
      seasonData: action.payload,
    }
    case "FETCH_EVENT_DATA":
    return {
      ...state,
      raceView: true,
      loading:true
    }
    case "RACE_FETCH":
    return {
      ...state
    }
    case "LOAD_RACE_DATA":
    return {
      ...state,
      raceData: action.payload,
    }
    case "QUAL_FETCH":
    return {
      ...state
    }
    case "LOAD_QUAL_DATA":
    return {
      ...state,
      qualData: action.payload
    }
    case "LOAD_CIRCUIT_DATA":
    return {
      ...state,
      circuitData: action.payload
    }
    case "COMPLETE_EVENT_DATA_FETCH":
    return {
      ...state,
      loading: false
    }
    case "CREATE_RACE_PREVIEW":
    return {
      ...state,
      futureRace: true,
    }
    case "LOAD_RACE_PREVIEW":
    return {
      ...state,
      raceView: true,
      raceData: action.payload
    }
    case "CLOSE_RACE":
    return {
      ...state,
      raceView: false,
      raceData: {},
      raceResults: []
    }
    case "LOAD_DETAILED_RESULT":
    return {
      ...state,
      detailedResultData: action.payload,
      detailedResultView: true
    }
    case "CLOSE_DETAILED_RESULT":
    return {
      ...state,
      detailedResultView: false,
      detailedResultData: {}
    }
    case "LOAD_DRIVER_STANDINGS":
    return {
      ...state,
      driverStandings: action.payload
    }
    case "LOAD_CONSTRUCTOR_STANDINGS":
    return {
      ...state,
      constructorStandings: action.payload
    }
    case "PIT_FETCH":
    return {
      ...state
    }
    case "LOAD_PIT_DATA":
    return {
      ...state,
      pitData: action.payload
    }
    case "LOAD_DRIVER_DATA":
    return {
      ...state,
      driverData: action.payload,
      driverView: true
    }
    default:
      return defaultState
  }
}
