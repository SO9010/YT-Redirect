
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

function redirect() {
    let url = window.location.href;
    let newUrl = "https://";
    console.log(url);

    if (url.includes('youtube.com/watch?v=')) {
    // Redirect to the specified webpage
    let tmp = url;
    newUrl = newUrl + FrontEnd + url.slice(23, tmp.length);
    window.location.href = newUrl;
  }
  else if (ytHomeValue && url.includes(FrontEnd) && !url.includes("watch?v=")){
    window.location.href = "https://www.youtube.com";
  }
}
// Listen to background which asks this to run again.
loadVals().then(() => {
  if(run){
    browser.runtime.onMessage.addListener(redirect);
    redirect();
  }
});

browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && 'value' in changes){
    loadVals().then(() => {
      if(run){
        browser.runtime.onMessage.addListener(redirect);
        redirect();
      }
    });
  }
})