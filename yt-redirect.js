let client = "piped.video"
let currentTab;

function redirect(tabs) {
    let url = window.location.href;
    let newUrl = "https://";
    console.log(url);
    if (url.includes('youtube.com/watch?v=')) {
        // Redirect to the specified webpage
        newUrl = newUrl + client + url.slice(23, url.length);
    console.log(newUrl);
    window.location.href = newUrl;
  }
}

// Listen to background which asks this to run again.
browser.runtime.onMessage.addListener(redirect);

redirect();