const defaultState = {
  raceSeason: "current",
  seasonData: {},
  selectedRound: "last",
  resultView: false,
  raceResults: []
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "LOAD_SEASON":
    return {
      ...state,
      seasonData: action.payload
    }
    case "SELECT_ROUND":
    return {
      ...state,
      selectedRound: action.payload,
      resultView: true
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
