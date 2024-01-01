function sendMessageToContentScript(tabId, changeInfo, tabInfo) {
  if (changeInfo.url) {
    browser.tabs.sendMessage(tabId, { type: 'RUN'});
  }
}
  
// listen to tab URL changes
browser.tabs.onUpdated.addListener(sendMessageToContentScript);
