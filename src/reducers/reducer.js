const defaultState = {
  about: [],
  events: []
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "LOAD_ABOUT":
    return {
      ...state,
      about: action.payload
    }
    case "LOAD_EVENTS":
    return {
      ...state,
      events: action.payload
    }
    default:
      return defaultState
  }
}
