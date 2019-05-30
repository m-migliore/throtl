export function fetchAllSeasonData(season) {
  return dispatch => {
    dispatch({type: "START_ALL_SEASON_FETCH"})
    return Promise.all([
      dispatch(setSeason(season)),
      dispatch(fetchSeasonData(season)),
      dispatch(fetchDriverStandings(season)),
      dispatch(fetchConstructorStandings(season))
    ]).then(() => dispatch({type:"COMPLETE_ALL_SEASON_FETCH"}))
  }
}

export function setSeason(season) {
  return dispatch => dispatch({type: "SET_SEASON", payload: season})
}

export function fetchSeasonData(season) {
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
  return dispatch => {
    dispatch({type: "FETCH_CONSTRUCTOR_STANDINGS"})
    if (season === "current" || season > 1957) {
      return fetch(`http://ergast.com/api/f1/${season}/constructorStandings.json`)
      .then(r => r.json())
      .then(data =>  dispatch({
        type: "LOAD_CONSTRUCTOR_STANDINGS",
        payload: data.MRData.StandingsTable
      }))
    } else {
      return dispatch({type: "LOAD_CONSTRUCTOR_STANDINGS", payload: "Constructor standings not available prior to 1958 season."})
    }
  }
}

// Fetch race results, qualifying results, pit data, and set circuit info for specific race in specific season
export function fetchEventData(season, round) {
  return dispatch => {
    dispatch({type: "FETCH_EVENT_DATA"})
    return Promise.all([
      dispatch(fetchRaceData(season, round)),
      dispatch(setCircuitData(round)),
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
    if (season === "current" || season > 2002) {
      dispatch({type:"QUAL_FETCH"})
      return fetch(`http://ergast.com/api/f1/${season}/${round}/qualifying.json`)
      .then(r => r.json())
      .then(data => {
        return dispatch({type: "LOAD_QUAL_DATA", payload: data.MRData.RaceTable.Races[0].QualifyingResults})
      })
    } else {
      return dispatch({type: "LOAD_QUAL_DATA", payload: ["Qualifying data not available prior to 2003 season."]})
    }

  }
}

export function fetchPitData(season, round) {
  return dispatch => {
    dispatch({type: "PIT_FETCH"})
    if (season === "current" || season > 2011) {
      return fetch(`http://ergast.com/api/f1/${season}/${round}/pitstops.json`)
      .then(r => r.json())
      .then(data => {
        return dispatch({type: "LOAD_PIT_DATA", payload: data.MRData.RaceTable.Races[0].PitStops})
      })
    } else {
      return dispatch({type: "LOAD_PIT_DATA", payload: ["Pit data not available prior to 2012 season."]})
    }

  }
}

export function setCircuitData(round) {
  return (dispatch, getState) => {
    dispatch({type: "LOAD_CIRCUIT_DATA", payload: getState().seasonData.Races[round - 1].Circuit})
  }
}

export function loadRacePreview(previewData) {
  return dispatch => {
    dispatch({type: "LOAD_RACE_PREVIEW", payload: previewData})
  }
}

// Replaces raceData with the preview information listed in fetchSeasonData
// Consistent data for RaceContainer title information
export function createRacePreview(previewData) {
  //return dispatch => dispatch({type: "CREATE_RACE_PREVIEW", payload: previewData})
  return dispatch => {
    dispatch({type: "CREATE_RACE_PREVIEW"})
    return Promise.all([
      dispatch(loadRacePreview(previewData)),
      dispatch(setCircuitData(previewData.round))
    ])
  }
}
