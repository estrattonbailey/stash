var marked = require('marked');
var mustache = require('mustache');
var _ = require('../lib/util');

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

function parseDocs(data){
  var docs = []; 
   
  // Normalize
  data.map(function(_doc, i){
    var d = {
      content: _doc.content,
      id: _doc.id
    }
    docs.push(d);
  });
  
  var items = Array.prototype.slice.call(_sa('[data-doc]', _s('[data-menu]')));

  // items.forEach(function(_item, i){
  //   var itemId = _item.getAttribute('data-doc');
  //   var itemContent = _s('data-contet', _item); 
  //   docs.forEach(function(_doc, i){
  //     if (_doc.id === id){
  //       console.log(_doc.id);
  //       console.log(id);
  //       itemContent.innerHTML = _doc.content; 
  //     }
  //   }) 
  // });
}

function View(){
  this.view = _s('.js-view');
  this.editor = _s('.js-editor');

  _e.subscribe('dom.togglePanels', togglePanels);

  _e.subscribe('dom.update', update.bind(this));
  _e.subscribe('dom.updateView', updateView.bind(this));

  _e.subscribe('dom.updateDocs', parseDocs.bind(this));

  _on('.js-newDoc', 'click', function(){
    _e.publish('stash.new');
  }, false);
}

module.exports = View;
