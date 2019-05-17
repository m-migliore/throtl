const defaultState = {
  meh: "heh"
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "TEST":
    return {
      ...state,
      meh: action.payload
    }
    default:
      return defaultState
  }
}
