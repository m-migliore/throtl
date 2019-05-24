export function fetchAllSeasonData(season) {
  return dispatch => {
    dispatch({type: "START_ALL_SEASON_FETCH"})
    return Promise.all([
      dispatch(fetchSeasonData(season)),
      dispatch(fetchDriverStandings(season)),
      dispatch(fetchConstructorStandings(season))
    ]).then(() => dispatch({type:"COMPLETE_ALL_SEASON_FETCH"}))
  }
}

export function fetchSeasonData(season) {
  console.log("FETCH_SEASON_DATA")
  return dispatch => {
    dispatch({type: "FETCH_SEASON_DATA"})
    return fetch(`http://ergast.com/api/f1/${season}.json`)
    .then(r => r.json())
    .then(data => {
      return dispatch({
        type: 'LOAD_SEASON_DATA',
        payload:  data.MRData.RaceTable
      })
    })
  }

}

export function fetchDriverStandings(season) {
  console.log("FETCH_DRIVER_STANDINGS");
  return dispatch => {
    dispatch({type: "FETCH_DRIVER_STANDINGS"})
    return fetch(`http://ergast.com/api/f1/${season}/driverStandings.json`)
    .then(r => r.json())
    .then(data =>  dispatch({
      type: "LOAD_DRIVER_STANDINGS",
      payload: data.MRData.StandingsTable
    }))
  }
}

export function fetchConstructorStandings(season) {
  console.log("FETCH_CONSTRUCTOR_STANDINGS");
  return dispatch => {
    dispatch({type: "FETCH_CONSTRUCTOR_STANDINGS"})
    return fetch(`http://ergast.com/api/f1/${season}/constructorStandings.json`)
    .then(r => r.json())
    .then(data =>  dispatch({
      type: "LOAD_CONSTRUCTOR_STANDINGS",
      payload: data.MRData.StandingsTable
    }))
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
