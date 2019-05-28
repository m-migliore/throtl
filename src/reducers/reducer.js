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
  detailedResultView: false,
  detailedResultData: {},
  driverStandings: {},
  constructorStandings: {}
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "START_ALL_SEASON_FETCH":
    return {
      ...state,
      loading: true
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
    case "COMPLETE_EVENT_DATA_FETCH":
    return {
      ...state,
      loading: false
    }
    case "CREATE_RACE_PREVIEW":
    return {
      ...state,
      raceView: true,
      futureRace: true,
      previewData: action.payload
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
    default:
      return defaultState
  }
}
