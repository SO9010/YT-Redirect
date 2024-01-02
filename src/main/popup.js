let input = document.querySelector("#text_input");
let enable = document.querySelector('#toggle');
let ytHome = document.querySelector('#toggle_yt_as_home');

input.addEventListener("input", e => setValue("value", e.target.value));
enable.addEventListener("change", e => toggleTextChange(e.target.checked, "Redirecting", "Not Redirecting", "onOff"));
ytHome.addEventListener("change", e => toggleTextChange(e.target.checked, "YouTube As Home", "YouTube Not As Home", "ytAsHome"));

async function setValue(key, value) {
    let storedValues = await browser.storage.local.get();
    storedValues[key] = value;
    await browser.storage.local.set(storedValues);
}

async function toggleTextChange(enableValue, original, changed, whichId) {
    let label = document.getElementById(whichId);
    label.textContent = enableValue ? original : changed;

    if(whichId == "onOff"){
        await setValue("enable", enableValue);
    }
    else{
        await setValue("ytHome", enableValue);
    }
}

async function init() {
    let { value } = await browser.storage.local.get("value");
    if (!value) {
        value = "yewtu.be";
    }
    input.value = value;

    let { enable: enableValue } = await browser.storage.local.get("enable");
    enable.checked = enableValue;
    toggleTextChange(enableValue, "Redirecting", "Not Redirecting", "onOff");

    let { ytHome: ytHomeValue } = await browser.storage.local.get("ytHome");
    ytHome.checked = ytHomeValue;
    toggleTextChange(ytHomeValue, "YouTube As Home", "YouTube Not As Home", "ytAsHome");
}

init().catch(e => console.error(e));
