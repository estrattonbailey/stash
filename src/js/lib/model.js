function id(){
  return new Date().getTime();
}

function last(storage){
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

/**
 * Create a new blank doc
 */
function create(){
  var doc = {};
  doc.content = '';
  doc.id = id();

  this.save();

  _e.publish('dom.update', doc);
}

function get(){
  var storage = this.storage.get();
  if (storage.docs.length > 0){
    _e.publish('dom.update', last(storage));
    _e.publish('dom.updateDocs', storage.docs);
  } else {
    this.create();
  }
}
/**
 * Save a document
 */
function save(){
  var doc = {};
  var docs = [];

  doc.id = this.editor.getAttribute('data-id');
  doc.content = this.editor.value;

  docs.push(doc);

  // if editor is empty
  if (!doc.content) return;

  _e.publish('dom.updateDocs', docs);
  this.storage.save(doc);
}

function Model(storage){
  this.storage = storage;

  this.editor = _s('.js-editor');

  this.save = save;
  this.create = create;
  this.get = get;

  // On click of new doc button
  _e.subscribe('stash.new', this.create.bind(this)); 
}

module.exports = Model;
