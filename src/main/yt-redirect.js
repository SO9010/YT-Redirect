let FrontEnd;
let run;
let ytHomeValue;

async function getValue(key) {
  let storedValues = await browser.storage.local.get(key);
  return storedValues[key];
}

async function loadVals(){
  FrontEnd = await getValue("value");
  run = await getValue("enable");
  ytHomeValue = await getValue("ytHome");
}

let isRedirected = false; // Flag to track if redirection has already occurred

function redirect() {
  if (isRedirected) {
    return; // If redirection has already occurred, exit the function
  }

  let url = window.location.href;
  let newUrl = "https://";

  if (FrontEnd != "CHANGE ME" && url.includes('youtube.com/watch?v=')) {
    // Redirect to the specified webpage
    let tmp = url;
    newUrl = newUrl + FrontEnd + url.slice(23, tmp.length);
    window.location.href = newUrl;
    isRedirected = true; // Set flag to true to indicate redirection has occurred
  }
  else if (FrontEnd != "CHANGE ME" && ytHomeValue && url.includes(FrontEnd) && !url.includes("watch?v=")){
    window.location.href = "https://www.youtube.com";
    isRedirected = true; // Set flag to true to indicate redirection has occurred
  }
}

// Listen to background which asks this to run again.
loadVals().then(() => {
  if(run){
    browser.runtime.onMessage.addListener(redirect);
  }
});

browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && 'value' in changes){
    loadVals().then(() => {
      if(run){
        browser.runtime.onMessage.removeListener(redirect); // Remove the listener
        browser.runtime.onMessage.addListener(redirect); // Add the listener again
      }
    });
  }
})
