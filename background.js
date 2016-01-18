function execute(code) {
  chrome.tabs.query({url: '*://vk.com/*'}, function(t){
    if (!t[0]) return false;
    chrome.tabs.executeScript(t[0].id, {
      code: code
    });
  });
}

var player = {
  play: "document.getElementById('ac_play').click()",
  forward: "document.getElementById('ac_next').click()",
  backward: "document.getElementById('ac_prev').click()",
  add: "document.getElementById('ac_add').click()",
  remove:  "document.getElementsByClassName('audio current')[0].getElementsByClassName('audio_remove')[0].click()"
}

var actions = {
  'Play / Pause': player.play,
  'Next Song': player.next,
  'Previous Song': player.prev,
  'Remove': player.remove,
  'Add': player.add
}

chrome.commands.onCommand.addListener(function(command) {
  if (Object.keys(actions).indexOf(command) < 0) return false;
  execute(actions[command]);
});

window.addEventListener('DOMContentLoaded', function() {
  buttons = document.getElementsByTagName('button')
  for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function(){
      execute(player[this.id]);
    }, false);
  }
})
