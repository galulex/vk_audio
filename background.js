function isVkUrl(url) {
  return url.indexOf("https://vk.com/audio") == 0;
}

function removeAudio() {
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
    for (var i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url && isVkUrl(tab.url)) {
        chrome.tabs.executeScript(tab.id, {
          code: "var a = document.getElementsByClassName('audio current')[0].getElementsByClassName('audio_remove')[0], evObj = document.createEvent('Events'); evObj.initEvent('click', true, false); a.dispatchEvent(evObj);"
        });
        return;
      }
    }
  });
}

chrome.browserAction.onClicked.addListener(removeAudio);
