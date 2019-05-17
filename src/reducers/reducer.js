const defaultState = {
  f1Data: []
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "LOAD_F1_DATA":
    return {
      ...state,
      f1Data: action.payload
    }
    default:
      return defaultState
  }
}
