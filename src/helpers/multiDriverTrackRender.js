// constants for each track, with a parameter for the animation time, and a delay to simulate pitstop
import { trackpaths } from './trackpaths'

const multiDriverTrackRender = (trackName, driverNumber) => {
  let color
  switch (driverNumber) {
    case 1:
      color = "red"
      break
    case 2: 
      color = "blue"
      break
    case 3: 
      color = "yellow"
      break
    case 4: 
      color = "orange"
      break
    case 5: 
      color = "purple"
      break
    case 6: 
      color = "magenta"
      break
    case 7: 
      color = "green"
      break
    case 8: 
      color = "slategray"
      break
    case 9: 
      color = "coral"
      break
    case 10: 
      color = "steelblue"
      break
    case 11: 
      color = "moccasin"
      break
    case 12: 
      color = "tomato"
      break
    case 13: 
      color = "maroon"
      break
    case 14: 
      color = "rosybrown"
      break
    case 15: 
      color = "springgreen"
      break
    case 16: 
      color = "navy"
      break
    case 17: 
      color = "lavender"
      break
    case 18: 
      color = "gold"
      break
    case 19: 
      color = "darkred"
      break
    case 20: 
      color = "dodgerblue"
      break
    default:
      color = "ivory"
  }
  console.log(trackName);
  
  return animationObj => {
    
   return `
      <svg width="600" height="300" viewBox="0 0 500 350">
        <circle id="circle${driverNumber}" r="10" cx="0" cy="0" fill="${color}" />
        <animateMotion
          id="animation${driverNumber}"
          href="#circle${driverNumber}"
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

export {multiDriverTrackRender}