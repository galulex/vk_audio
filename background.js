function isGmailUrl(url) {
  return url.indexOf("http://vk.com/audio") == 0;
}

function goToInbox() {
  console.log('Going to inbox...');
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isGmailUrl(tab.url)) {
        chrome.tabs.executeScript(tab.id, {
          code: "var a = document.getElementsByClassName('audio current')[0].getElementsByClassName('audio_remove')[0], evObj = document.createEvent('Events'); evObj.initEvent('click', true, false); a.dispatchEvent(evObj);"
        });
        return;
      }
    }
    chrome.tabs.create({url: getGmailUrl()});
  });
}

chrome.browserAction.onClicked.addListener(goToInbox);
