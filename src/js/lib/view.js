var marked = require('marked');

function openModal(){
  _e.publish('stash.new');
}

function update(doc){
  this.editor.value = doc.content || '';
  this.editor.setAttribute('data-id', (doc.id || ''));

  this.view.innerHTML = marked(doc.content || '');
}

function updateView(e){
  this.view.innerHTML = marked(e.target.value);
}

function togglePanels(e){
  if (_class.has(e.target, 'js-panel')) {
    var panel = e.srcElement; 
  } else {
    var panel = $(e.target).closest('.js-panel')[0];
  }
  _class.remove(_s('.panel.is-active'), 'is-active');
  _class.add(panel, 'is-active');
}

function View(){
  this.view = _s('.js-view');
  this.editor = _s('.js-editor');

  _e.subscribe('dom.togglePanels', togglePanels);

  _e.subscribe('dom.new', openModal);
  _e.subscribe('dom.update', update.bind(this));
  _e.subscribe('dom.updateView', updateView.bind(this));
}

module.exports = View;
