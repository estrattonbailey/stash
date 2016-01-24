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
  var doclistClone;
  var editedDoc;
  var docsData = [];
  var menu = _s('[data-menu]');
  var doclist = _s('[data-doclist]', menu);
  var docs = Array.from(_sa('[data-doc]', doclist));

  function hasDoc(){
    var edited = null;

    docs.forEach(function(el){
      var id = el.getAttribute('data-doc');
      
      docsData.forEach(function(d, i){
        if (id === d.id){
          edited = d;

          el.remove();
        } 
      });
    });

    return edited;
  }

  function update(data){
    var _template = docs[0].cloneNode(true);

    _template.setAttribute('data-doc', data.id);
    _s('[data-content]', _template).innerHTML = data.content;

    doclistClone.insertBefore(_template, doclistClone.firstChild);
  }

  function create(){
    docsData.forEach(function(d){
      update(d);  
    });
  }

  data.map(function(d){
    var _doc = {
      content: d.content,
      id: d.id
    }
    docsData.push(_doc);
  });

  editedDoc = hasDoc(); 

  if (!!editedDoc){
    doclistClone = doclist.cloneNode(true);
    update(editedDoc);
  } else {
    doclistClone = doclist.cloneNode(true);
    create();
  }

  menu.children[0].appendChild(doclistClone);
  doclist.remove();
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

  _on('.js-menuToggle', 'click', openMenu, false);
}

module.exports = View;
