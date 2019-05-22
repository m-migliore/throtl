const defaultState = {
  seasonData: {}
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "LOAD_SEASON":
    return {
      ...state,
      seasonData: action.payload
    }
    default:
      return defaultState
  }
}
