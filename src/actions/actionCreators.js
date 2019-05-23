export function fetchSeason() {
  return (dispatch) => {
    dispatch({type:"START_SEASON_FETCH"})
    return fetch('http://ergast.com/api/f1/current.json')
    .then(r => r.json())
    .then(data => dispatch({ type: 'LOAD_SEASON', payload:  data.MRData.RaceTable}));
  }
}

export function selectRound(round) {
  return {
    type: "SELECT_ROUND",
    payload: round
  }
}

export function loadRaceData(raceData) {
  return {
    type: "LOAD_RACE_DATA",
    payload: raceData
  }
}

export function loadRaceResults(raceResults) {
  return {
    type: "LOAD_RACE_RESULTS",
    payload: raceResults
  }
}
