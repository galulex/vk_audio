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
  chrome.tabs.query({url: '*://*.vk.com/*'}, function(t){
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
  play: "document.querySelector('.top_audio_player_play').click()",
  forward: "document.querySelector('button.top_audio_player_next').click()",
  backward: "document.querySelector('button.top_audio_player_prev').click()",
  add: "document.querySelector('button#add').click()",
  download: function(){
    var url = document.getElementsByClassName('audio current')[0].querySelector('input').value;
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'Awesome');
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

var actions = {
  'Play / Pause': player.play,
  'Backward': player.backward,
  'Forward': player.forward,
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
