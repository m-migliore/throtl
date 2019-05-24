export function fetchSeason(season) {
  // console.log(season)
  return (dispatch) => {
    dispatch({type:"SEASON_FETCH"})
    return fetch(`http://ergast.com/api/f1/${season}.json`)
    .then(r => r.json())
    .then(data => dispatch({
      type: 'LOAD_SEASON',
      payload:  data.MRData.RaceTable
    }))
    .then(seasonAction => {
      fetch(`http://ergast.com/api/f1/${seasonAction.payload.season}/driverStandings.json`)
      .then(r => r.json())
      .then(data =>  dispatch({
        type: "LOAD_DRIVER_STANDINGS",
        payload: data.MRData.StandingsTable
      }))

      fetch(`http://ergast.com/api/f1/${seasonAction.payload.season}/constructorStandings.json`)
      .then(r => r.json())
      .then(data =>  dispatch({
        type: "LOAD_CONSTRUCTOR_STANDINGS",
        payload: data.MRData.StandingsTable
      }))
    })
  }
}

export function fetchRaceData(season, round) {
  return dispatch => {
    dispatch({type: "RACE_FETCH"})
    // console.log(`http://ergast.com/api/f1/${season}/${round}/results.json`);
    return fetch(`http://ergast.com/api/f1/${season}/${round}/results.json`)
    .then(r => r.json())
    .then(data => {
      // console.log(data.MRData.RaceTable.Races[0]);
      return dispatch({type: "LOAD_RACE_DATA", payload: data.MRData.RaceTable.Races[0]})
    })
  }
}

export function createRacePreview(previewData) {
  // console.log("preview", previewData);
  return dispatch => dispatch({type: "CREATE_RACE_PREVIEW", payload: previewData})
}
