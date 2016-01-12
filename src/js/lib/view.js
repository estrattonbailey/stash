var marked = require('marked');

function View(){
  this.view = _s('.js-view');

  _e.subscribe('stash.create', this.updateView.bind(this));
  _e.subscribe('dom.togglePanels', this.togglePanels.bind(this));
  _e.subscribe('editor.typing', this.convertToMd.bind(this));
  _e.subscribe('dom.new', this.newModal.bind(this));
}

View.prototype.updateView = function(content){
  this.view.innerHTML = content;
}
View.prototype.togglePanels = function(e){
  if (_class.has(e.target, 'js-panel')) {
    var panel = e.srcElement; 
  } else {
    var panel = $(e.target).closest('.js-panel')[0];
  }
  _class.remove(_s('.panel.is-active'), 'is-active');
  _class.add(panel, 'is-active');
}
View.prototype.convertToMd = function(e){
  this.view.innerHTML = marked(e.target.value);
}
View.prototype.newModal = function(){
  
}

module.exports = View;
