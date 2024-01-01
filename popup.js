let input = document.querySelector('input');

input.addEventListener('change', e => setValue(e.target.value))

async function setValue(value) {
    await browser.storage.local.set({ value });
}

async function init() {
    let {value} = browser.local.storage.get('value');
    if(!isValidURL(value)){
        value = "youtube.com"
    }
    input.value = value;
    setValue(value);
}

function isValidURL(url) {
    var encodedURL = encodeURIComponent(url);
    var isValid = false;

    $.ajax({
      url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22" + encodedURL + "%22&format=json",
      type: "get",
      async: false,
      dataType: "json",
      success: function(data) {
        isValid = data.query.results != null;
      },
      error: function(){
        isValid = false;
      }
    });

    return isValid;
}

init().catch(e => console.error(e));