import React from 'react'
import { trackpaths } from '../../helpers/trackpaths'

const TrackSVG = (props) => {
  const parser = new DOMParser()
  const trackPath = parser.parseFromString(trackpaths[props.trackName], "text/html")
  return (
     <svg width="600" height="300" viewBox="0 0 500 350">
       {trackPath}
     </svg>
  )
}

export default TrackSVG