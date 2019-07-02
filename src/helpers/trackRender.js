// constants for each track, with a parameter for the animation time, and a delay to simulate pitstop
import { trackpaths } from './trackpaths'

const trackRender = trackName => {
  
  return animationObj => {
    let lapTitle

    if (animationObj.lapNumber === 0) {
      lapTitle = ""
    } else if (animationObj.lapNumber === "Finished") {
      lapTitle = "<h3>Finished</h3>"
    } else if (animationObj.pitTime === "0ms") {
      lapTitle = `
        <h3>Lap ${animationObj.lapNumber}</h3>
        <h4>Position: ${animationObj.position}</h4>
        <h4>Time: ${animationObj.lapTime}</h4>
      `
    } else {
      lapTitle = `
        <h3>Pit Stop</h3>
        <h3>Lap ${animationObj.lapNumber}</h3>
        <h4>Position: ${animationObj.position}</h4>
        <h4>Time: ${animationObj.lapTime}</h4>
      `
    }
  
   return `
      ${lapTitle}
      <svg width="600" height="300" viewBox="0 0 500 350">
        ${trackpaths[trackName]}
        <circle id="circle" r="10" cx="0" cy="0" fill="tomato" />
        <animateMotion
          href="#circle"
          dur=${animationObj.animationDuration}
          begin=${animationObj.pitTime}
          fill="freeze"
          repeatCount="1">
          <mpath href="#${trackName}" />
        </animateMotion>   
      </svg>
    `
  }
}

export {trackRender}