var marked = require('marked');
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

function openMenu(){
  var menu = _.s('[data-menu]')[0];
  if (_class.has(menu, 'is-active')) {
    _class.remove(menu, 'is-active');
  } else {
    _class.add(menu, 'is-active');
  }
}

function createDocs(data){
  var docs = [];
  var doclist = _s('[data-doclist]');
  var docNodes = Array.from(_.s('[data-doc]', doclist));
  var compiled = '';
  var template = require('./../../templates/doc.html');
   
      console.log(data)
  data.map(function(_doc, i){
    var d = {
      content: _doc.content,
      id: _doc.id
    }
    docs.push(d);
  });

  if (docNodes.length > 1){
    update();
  } else {
    create();
  }

  function update(){
    var edited;
    var _doclist = doclist.cloneNode(true); 
    var _docs = Array.from(_.s('[data-doc]', _doclist)); 

    _docs.forEach(function(_doc, i){
      var _id = _doc.getAttribute('data-doc');

      docs.forEach(function(__doc, i){
        if (_id === __doc.id){
          edited = _doc
        }
      });
    });

    var _edited = edited.cloneNode(true); 
    edited.remove();
  }
  function create(){
    docs.forEach(function(_doc, i){
      compiled += template(_doc); 
    });
    doclist.innerHTML = compiled;
  }
}

function View(){
  this.view = _s('.js-view');
  this.editor = _s('.js-editor');

  _e.subscribe('dom.togglePanels', togglePanels);
  _e.subscribe('dom.openMenu', openMenu);

  _e.subscribe('dom.update', update.bind(this));
  _e.subscribe('dom.updateView', updateView.bind(this));

  _e.subscribe('dom.updateDocs', createDocs.bind(this));

  _on('.js-newDoc', 'click', function(){
    _e.publish('stash.new');
  }, false);

  _on('.js-menuToggle', 'click', function(){
    _e.publish('dom.openMenu');
  }, false);
}

module.exports = View;
