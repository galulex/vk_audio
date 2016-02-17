var bg = chrome.extension.getBackgroundPage(),
  script = `
    var btn = document.createElement('button');
    btn.setAttribute('id', 'btn');
    btn.setAttribute('onclick', "$code");
    document.body.appendChild(btn);
    btn.click();
    btn.remove();
  `;

function execute(code) {
  chrome.tabs.query({url: '*://vk.com/*'}, function(t){
    if (!t[0]) {
      chrome.tabs.create({ url: 'https://vk.com/audio', pinned: true }, function(t){
        execute(code);
      })
      return true
    }
    chrome.tabs.executeScript(t[0].id, {
      code: script.replace('$code', code)
    });
  });
}

var player = {
  play: "headPlayPause(event)",
  forward: "audioPlayer.nextTrack()",
  backward: "audioPlayer.prevTrack()",
  add: "audioPlayer.addCurrentTrack()",
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
  bg.execute(actions[command]);
});

window.addEventListener('DOMContentLoaded', function() {
  buttons = document.getElementsByTagName('button')
  for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function(){
      bg.execute(player[this.id]);
    }, false);
  }
})
