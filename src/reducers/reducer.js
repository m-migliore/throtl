const defaultState = {
  raceSeason: "current",
  seasonData: {},
  selectedRound: "last",
  raceView: false,
  loading: false,
  raceData: {},
  raceResults: []
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "START_LOADING":
    return {
      ...state,
      loading: true
    }
    case "REMOVE_LOADING":
    return {
      ...state,
      loading: false
    }
    case "START_SEASON_FETCH":
    return {
      ...state,
      loading: true
    }
    case "LOAD_SEASON":
    return {
      ...state,
      loading: false,
      seasonData: action.payload
    }
    case "SELECT_ROUND":
    return {
      ...state,
      selectedRound: action.payload,
      raceView: true,
      loading:true
    }
    case "LOAD_RACE_DATA":
    return {
      ...state,
      raceData: action.payload
    }
    case "LOAD_RACE_RESULTS":
    return {
      ...state,
      raceResults: action.payload
    }
    default:
      return defaultState
  }
}
