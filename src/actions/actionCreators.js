export function fetchAllSeasonData(season) {
  return dispatch => {
    dispatch({
      type: "START_ALL_SEASON_FETCH"
    })
    return Promise.all([
      dispatch(setSeason(season)),
      dispatch(fetchSeasonData(season)),
      dispatch(fetchDriverStandings(season)),
      dispatch(fetchConstructorStandings(season))
    ]).then(() => dispatch({
      type: "COMPLETE_ALL_SEASON_FETCH"
    }))
  }
}

export function setSeason(season) {
  return dispatch => dispatch({
    type: "SET_SEASON",
    payload: season
  })
}

export function fetchSeasonData(season) {
  return dispatch => {
    dispatch({
      type: "FETCH_SEASON_DATA"
    })
    return fetch(`http://ergast.com/api/f1/${season}.json`)
      .then(r => r.json())
      .then(data => {
        
        
        const rawRaces = data.MRData.RaceTable.Races
        const timeCheckedRaces = timeCheckRaces(rawRaces)

        // OG data fetch would contain object with season and races array
        // use og season, with time checked races array
        return dispatch({
          type: 'LOAD_SEASON_DATA',
          payload: {
            season: data.MRData.RaceTable.season,
            Races: timeCheckedRaces
          }
        })
      })
  }

}

// check if race is in the future and add bool value,
// makes conditonal on RaceCheck dependent on obj value,
// instead of a value within the store
function timeCheckRaces(races) {
  const timeCheckedRaces = races.map(race => {
    if (new Date(race.date) < new Date()) {
      return {
        ...race,
        future: false
      }
    } else {
      return {
        ...race,
        future: true
      }
    }
  })

  return timeCheckedRaces
}

export function fetchDriverStandings(season) {
  return dispatch => {
    dispatch({
      type: "FETCH_DRIVER_STANDINGS"
    })
    return fetch(`http://ergast.com/api/f1/${season}/driverStandings.json`)
      .then(r => r.json())
      .then(data => dispatch({
        type: "LOAD_DRIVER_STANDINGS",
        payload: data.MRData.StandingsTable
      }))
  }
}

export function fetchConstructorStandings(season) {
  return dispatch => {
    dispatch({
      type: "FETCH_CONSTRUCTOR_STANDINGS"
    })
    if (season > 1957) {
      return fetch(`http://ergast.com/api/f1/${season}/constructorStandings.json`)
        .then(r => r.json())
        .then(data => dispatch({
          type: "LOAD_CONSTRUCTOR_STANDINGS",
          payload: data.MRData.StandingsTable
        }))
    } else {
      return dispatch({
        type: "LOAD_CONSTRUCTOR_STANDINGS",
        payload: "Constructor standings not available prior to 1958 season."
      })
    }
  }
}

// Fetch race results, qualifying results, pit data, and set circuit info for specific race in specific season
export function fetchEventData(season, round) {
  return dispatch => {
    dispatch({
      type: "FETCH_EVENT_DATA",
      payload: parseInt(round)
    })
    return Promise.all([
      dispatch(fetchRaceData(season, round)),
      dispatch(setCircuitData(round)),
      dispatch(fetchQualData(season, round)),
      dispatch(fetchRacePitData(season, round))
    ]).then(() => dispatch({
      type: "COMPLETE_EVENT_DATA_FETCH"
    }))
  }
}

export function fetchRaceData(season, round) {
  return dispatch => {
    dispatch({
      type: "RACE_FETCH"
    })
    return fetch(`http://ergast.com/api/f1/${season}/${round}/results.json`)
      .then(r => r.json())
      .then(data => {
        return dispatch({
          type: "LOAD_RACE_DATA",
          payload: data.MRData.RaceTable.Races[0]
        })
      })
  }
}

export function fetchQualData(season, round) {
  return dispatch => {
    if (season > 2002) {
      dispatch({
        type: "QUAL_FETCH"
      })
      return fetch(`http://ergast.com/api/f1/${season}/${round}/qualifying.json`)
        .then(r => r.json())
        .then(data => {
          return dispatch({
            type: "LOAD_QUAL_DATA",
            payload: data.MRData.RaceTable.Races[0].QualifyingResults
          })
        })
    } else {
      return dispatch({
        type: "LOAD_QUAL_DATA",
        payload: ["Qualifying data not available prior to 2003 season."]
      })
    }

  }
}

export function fetchRacePitData(season, round) {
  return dispatch => {
    if (season > 2011) {
      return fetch(`http://ergast.com/api/f1/${season}/${round}/pitstops.json`)
        .then(r => r.json())
        .then(data => {
          return dispatch({
            type: "LOAD_PIT_DATA",
            payload: data.MRData.RaceTable.Races[0].PitStops
          })
        })
    } else {
      return dispatch({
        type: "LOAD_PIT_DATA",
        payload: ["Pit data not available prior to 2012 season."]
      })
    }

  }
}

export function fetchLapData(season, round) {
  return dispatch => {
    dispatch({type: "START_LAP_DATA_FETCH"})
    return fetch(`http://ergast.com/api/f1/${season}/${round}/laps.json?limit=1500`)
    .then(r => r.json())
    .then(data => {
      return dispatch({
        type: "LOAD_LAP_DATA",
        payload: data.MRData.RaceTable.Races[0].Laps
      })
    })
  }
}

export function setCircuitData(round) {
  return (dispatch, getState) => {
    dispatch({
      type: "LOAD_CIRCUIT_DATA",
      payload: getState().seasonData.Races[round - 1].Circuit
    })
  }
}

export function loadRacePreview(previewData) {
  return dispatch => {
    dispatch({
      type: "LOAD_RACE_PREVIEW",
      payload: previewData
    })
  }
}

// Replaces raceData with the preview information listed in fetchSeasonData
// Consistent data for RaceContainer title information
export function createRacePreview(previewData) {
  //return dispatch => dispatch({type: "CREATE_RACE_PREVIEW", payload: previewData})
  return dispatch => {
    dispatch({
      type: "CREATE_RACE_PREVIEW"
    })
    return Promise.all([
      dispatch(loadRacePreview(previewData)),
      dispatch(setCircuitData(previewData.round))
    ])
  }
}

// Fetches GrandPrix races and qualifying results for a driver or constructor
// combines both resultsd into the same array for easier display

export function fetchGrandPrixData(data, type) {
  return (dispatch, getState) => {
    dispatch({
      type: `LOAD_${type.toUpperCase()}_DATA`,
      payload: data
    })
    let typeId
    type === "driver" ? typeId = data.driverId : typeId = data.constructorId
    return dispatch(fetchGrandPrixSeasonData(getState().season, typeId, type))
  }
}

export function fetchGrandPrixSeasonData(season, id, type) {
  return dispatch => {
    return Promise.all([
      loadRaceResults(season, id, type),
      loadQualResults(season, id, type)
    ]).then(values => {
      return dispatch(combineRaceAndQualResults(values[0], values[1], type, id))
    })

  }
}

function loadRaceResults(season, id, type) {
  return fetch(`http://ergast.com/api/f1/${season}/${type}s/${id}/results.json`)
    .then(r => r.json())
    .then(data => {
      const timeCheckedRaces = timeCheckRaces(data.MRData.RaceTable.Races)
      return timeCheckedRaces
    })
}

function loadQualResults(season, id, type) {
  return fetch(`http://ergast.com/api/f1/${season}/${type}s/${id}/qualifying.json`)
    .then(r => r.json())
    .then(data => data.MRData.RaceTable.Races)
}

function combineRaceAndQualResults(raceResults, qualResults, type, id) {
  return (dispatch, getState) => {
    let combinedResults = []
    let points 

    for (let i = 0; i < raceResults.length; i++) {
      let raceObj = Object.assign(raceResults[i], qualResults[i])
      combinedResults.push(raceObj)
    }

    if (raceResults.length !== qualResults.length) {
      combinedResults.push(qualResults.length - 1)
    }

    let standings
    if (type === "constructor") {
      standings = getState().constructorStandings.StandingsLists[0].ConstructorStandings
      points = standings.find(standing => standing.Constructor.constructorId === id).points
    } else {
      standings = getState().driverStandings.StandingsLists[0].DriverStandings
      points = standings.find(standing => standing.Driver.driverId === id).points
    }

    return dispatch({
      type: `LOAD_${type.toUpperCase()}_SEASON_DATA`,
      payload: {
        results: combinedResults,
        points: points
      }
    })
  }
}

export function fetchDriverLapAndPitData(season, round, driverId) {
  return dispatch => {
    return Promise.all([
      dispatch(fetchDriverLapData(season, round, driverId)),
      dispatch(fetchDriverPitData(season, round, driverId))
    ])
  }
}

function fetchDriverLapData(season, round, driverId) {
  return dispatch => {
    dispatch({type: "START_DRIVER_LAP_FETCH"})
  
    return fetch(`http://ergast.com/api/f1/${season}/${round}/drivers/${driverId}/laps.json?limit=80`)
    .then(r => r.json())
    .then(data => {
      const rawDriverLaps = data.MRData.RaceTable.Races[0].Laps
      const driverLaps = rawDriverLaps.map(lap => {
        return {
          lapNumber: lap.number,
          lapInfo: lap.Timings[0]
        }
      })
      return dispatch({
        type: "LOAD_DRIVER_LAP_DATA",
        payload: driverLaps
      })
    })
  }
}

function fetchDriverPitData(season, round, driverId) {
  return dispatch => {
    dispatch({type: "START_DRIVER_PIT_FETCH"})
   
    return fetch(`http://ergast.com/api/f1/${season}/${round}/drivers/${driverId}/pitstops.json`)
    .then(r => r.json())
    .then(data => {
      let driverPits = ["No Pit Data Available"]

      if (data.MRData.RaceTable.Races.length !== 0) {
        driverPits = data.MRData.RaceTable.Races[0].PitStops
      }
    
      return dispatch({
        type: "LOAD_DRIVER_PIT_DATA",
        payload: driverPits
      })
    })
  }
}
