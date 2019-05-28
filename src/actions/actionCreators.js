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

// Fetch race and qualifying results for specific race in specific season

export function fetchEventData(season, round) {
  return dispatch => {
    dispatch({type: "FETCH_EVENT_DATA"})
    return Promise.all([
      dispatch(fetchRaceData(season, round)),
      dispatch(fetchQualData(season, round)),
      dispatch(fetchPitData(season, round))
    ]).then(() => dispatch({type:"COMPLETE_EVENT_DATA_FETCH"}))
  }
}

export function fetchRaceData(season, round) {
  return dispatch => {
    dispatch({type: "RACE_FETCH"})
    return fetch(`http://ergast.com/api/f1/${season}/${round}/results.json`)
    .then(r => r.json())
    .then(data => {
      return dispatch({type: "LOAD_RACE_DATA", payload: data.MRData.RaceTable.Races[0]})
    })
  }
}

export function fetchQualData(season, round) {
  return dispatch => {
    dispatch({type:"QUAL_FETCH"})
    return fetch(`http://ergast.com/api/f1/${season}/${round}/qualifying.json`)
    .then(r => r.json())
    .then(data => {
      return dispatch({type: "LOAD_QUAL_DATA", payload: data.MRData.RaceTable.Races[0].QualifyingResults})
    })
  }
}

export function fetchPitData(season, round) {
  return dispatch => {
    dispatch({type: "PIT_FETCH"})
    return fetch(`http://ergast.com/api/f1/${season}/${round}/pitstops.json`)
    .then(r => r.json())
    .then(data => {
      return dispatch({type: "LOAD_PIT_DATA", payload: data.MRData.RaceTable.Races[0].PitStops})
    })
  }
}

export function createRacePreview(previewData) {
  // console.log("preview", previewData);
  return dispatch => dispatch({type: "CREATE_RACE_PREVIEW", payload: previewData})
}
