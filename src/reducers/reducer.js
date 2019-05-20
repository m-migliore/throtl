const defaultState = {
  about: [],
  events: [],
  eventId: null,
  eventData: {}
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
    case "ADD_EVENT_ID":
    return {
      ...state,
      eventId: action.payload
    }
    case "CLEAR_EVENT_ID":
    return {
      ...state,
      eventId: null
    }
    case "LOAD_EVENT_DATA":
    return {
      ...state,
      eventData: action.payload
    }
    default:
      return defaultState
  }
}
