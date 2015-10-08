function execute(code) {
  chrome.tabs.query({url: 'https://vk.com/audio*'}, function(t){
    if (!t[0]) return false;
    chrome.tabs.executeScript(t[0].id, {
      code: code
    });
  });
}

chrome.browserAction.onClicked.addListener(function(){
  execute("document.getElementsByClassName('audio current')[0].getElementsByClassName('audio_remove')[0].click()");
});

var actions = {
  'Play / Pause': "document.getElementById('ac_play').click()",
  'Next Song': "document.getElementById('ac_next').click()",
  'Previous Song': "document.getElementById('ac_prev').click()",
  'Remove': "document.getElementsByClassName('audio current')[0].getElementsByClassName('audio_remove')[0].click()"
}

chrome.commands.onCommand.addListener(function(command) {
  if (Object.keys(actions).indexOf(command) < 0) return false;
  execute(actions[command]);
});
