function id(){
  return new Date().getTime();
}

function Model(storage){
  this.storage = storage;

  this.editor = _s('.js-editor');
}
/**
 * Create a new blank doc
 */
Model.prototype.create = function(){
  var doc = {};
  doc.content = '';
  doc.id = id();

  this.saveCurrent();

  _e.publish('dom.update', doc);
}

Model.prototype.get = function(){
  var storage = this.storage.get();
  if (storage.docs.length > 0){
    _e.publish('dom.update', storage.docs[0]);
  } else {
    this.create();
  }
}
/**
 * Save a document
 * @param {string} content The plain text content of the editor textarea 
 * @param {integer} id The id of the doc to save (optional)
 */
Model.prototype.saveCurrent = function(){
  var doc = {};

  doc.id = this.editor.getAttribute('data-id');
  doc.content = this.editor.value;

  // if editor is empty
  if (!doc.content) return;

  this.storage.save(doc);
}

module.exports = Model;
