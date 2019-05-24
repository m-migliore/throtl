const defaultState = {
  raceSeason: "current",
  seasonData: {},
  selectedRound: "last",
  raceView: false,
  futureRace: false,
  loading: false,
  raceData: {},
  raceResults: [],
  previewData: {},
  detailedResultView: false,
  detailedResultData: {},
  driverStandings: {},
  constructorStandings: {}
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "SEASON_FETCH":
    return {
      ...state,
      loading: true
    }
    case "LOAD_SEASON":
    return {
      ...state,
      seasonData: action.payload
    }
    case "RACE_FETCH":
    return {
      ...state,
      raceView: true,
      loading:true
    }
    case "LOAD_RACE_DATA":
    return {
      ...state,
      raceData: action.payload,
      loading: false
    }
    case "LOAD_RACE_RESULTS":
    return {
      ...state,
      raceResults: action.payload
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
      constructorStandings: action.payload,
      loading: false
    }
    default:
      return defaultState
  }
}
