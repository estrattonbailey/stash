const $ = require('nab-select');

var proto = {
  returnId: function(){
    return new Date().getTime();
  },
  create: function(){
    var doc = {};
    doc.content = '';
    doc.id = this.returnId();

    this.save();

    _e.publish('dom.update', doc);
  },
  get: function(){
    var storage = this.storage.get();
    if (storage.docs.length > 0){
      _e.publish('dom.update', this.lastDoc(storage));
      _e.publish('dom.updateDocs', storage.docs);
    } else {
      this.create();
    }
  },
  save: function(){
    var doc = {};
    var docs = [];

    doc.id = this.editor.getAttribute('data-id');
    doc.content = this.editor.value;

    docs.push(doc);

    // if editor is empty
    if (!doc.content) return;

    _e.publish('dom.updateDocs', docs);
    this.storage.save(doc);
  },
  lastDoc: function(storage){
    var last,
        id = 0;
    storage.docs.forEach(function(_doc, i){
      id = Math.max(id, _doc.id);
    });
    storage.docs.forEach(function(_doc){
      if (id === parseInt(_doc.id, 10)) {
        last = _doc;
      }
    });
    return last;
  }
}

function Model(storage){
  var _model = Object.create(proto, {
    storage: {
      value: storage
    },
    editor: {
      value: $('.js-editor')[0]
    }
  });

  _e.subscribe('app.init', function(){
    _model.get()
  });
  
  // On click of new doc button
  _e.subscribe('stash.new', function(){
    _model.create()
  }); 

  _e.subscribe('stash.save', function(){
    _model.save()
  }); 

  return {
    get: _model.get,
    create: _model.create
  }
}

module.exports = Model;
