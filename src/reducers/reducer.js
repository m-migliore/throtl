const defaultState = {
  raceSeason: "current",
  seasonData: {},
  selectedRound: 1,
  raceResults: {}
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "LOAD_SEASON":
    return {
      ...state,
      seasonData: action.payload
    }
    case "RACE_RESULTS":
    return {
      ...state,
      raceResults: action.payload
    }
    default:
      return defaultState
  }
}
