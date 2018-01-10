// SETTINGS

var stream_url = "http://flux.nina.fm/nina.mp3";
var mute = true;
var equalizer = {
  min: 1,
  max: 11,
  current: 1,
  prefix: "equalizer/step",
  suffix: ".png",
  update: 80, // ms
}


// SCRIPT

// Initialize the player
var ninaPlayer = new Audio(stream_url);
ninaPlayer.pause();

// Launch the icon periodical update
updateIcon();

// Handle the click on extension icon
chrome.browserAction.onClicked.addListener(toggleAudio);


// FUNCTIONS

/**
 * Callback function to toggle the mute status
 * @param tab
 */
function toggleAudio(tab) {
  if (ninaPlayer.paused) {
    ninaPlayer.play();
  } else {
    ninaPlayer.pause();
  }
  mute = ninaPlayer.paused;
}

/**
 * Function to update the extension icon
 * depending on the mute status
 */
function updateIcon() {
  // Default icon is the off one
  let icon = equalizer.prefix + 'off' + equalizer.suffix;
  
  // If player is on, loop on the equalizer images
  if (!mute) {
    if (equalizer.current > equalizer.max) {
      equalizer.current = equalizer.min;
    }
    icon = equalizer.prefix + equalizer.current + equalizer.suffix;
    equalizer.current++;
  }
  
  // Update the icon
  chrome.browserAction.setIcon({
      path: icon,
    },
    function() {
      chrome.runtime.lastError;
    }
  );
  
  // Call this function again after a timeout
  window.setTimeout(updateIcon, equalizer.update);
}