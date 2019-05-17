const defaultState = {
  about: [],
  events: [],
  event: null
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
    case "LOAD_EVENT":
    return {
      ...state,
      event: action.payload
    }
    case "CLEAR_EVENT":
    return {
      ...state,
      event: null
    }
    default:
      return defaultState
  }
}
