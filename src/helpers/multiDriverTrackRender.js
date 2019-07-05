// constants for each track, with a parameter for the animation time, and a delay to simulate pitstop
//import { trackpaths } from './trackpaths'

const multiDriverTrackRender = (trackName, driverNumber) => {
  const driverColors = {
    1: "red",
    2 :"blue",
    3: "yellow",
    4: "orange",
    5: "purple",
    6: "magenta",
    7: "green",
    8: "slategray",
    9: "coral",
    10: "steelblue",
    11: "moccasin",
    12: "tomato",
    13: "maroon",
    14: "rosybrown",
    15: "springgreen",
    16: "navy",
    17: "lavender",
    18: "gold",
    19: "darkred",
    20: "dodgerblue"
  }
  let color = driverColors[driverNumber]
  
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