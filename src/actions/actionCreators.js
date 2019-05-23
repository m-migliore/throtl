export function fetchSeason(season) {
  console.log(season)
  return (dispatch) => {
    dispatch({type:"START_SEASON_FETCH"})
    return fetch(`http://ergast.com/api/f1/${season}.json`)
    .then(r => r.json())
    .then(data => dispatch({ type: 'LOAD_SEASON', payload:  data.MRData.RaceTable}));
  }
}

// export function fetchRound(round) {
//   return dispatch => {
//     dispatch({type: "START_ROUND_FETCH"})
//     return
//   }
// }

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
