function Model(storage){
  this.storage_docs = storage.docs;
  this.storage = Object.getPrototypeOf(storage);
}
/**
 * Create a new blank doc
 */
Model.prototype.create = function(){
  var doc = {};
  doc.content = '';

  this.storage.save(doc);
  _e.publish('stash.create', doc.content);
}
Model.prototype.read = function(){
}
/**
 * Save a document
 * @param {string} content The plain text content of the editor textarea 
 * @param {integer} id The id of the doc to save (optional)
 */
Model.prototype.save = function(content, id){
  var doc = {};
  doc.content = content;

  if (id){
    doc.id = id;
  }

  this.storage.save(doc, id);
}

module.exports = Model;
