var throttle = require('throttly');

function Editor(){
  const editor = $('.js-editor');

  editor.on('keyup', throttle(this.getData,50));
}

Editor.prototype.getData = function(e){
  this.content = e.target.value;
  events.publish('editor.data', this.content);
}

module.exports = Editor;
