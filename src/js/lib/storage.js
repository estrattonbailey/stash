/**
 * Get all stash data
 */
function get(){
  return localStorage.getItem('stash_data') ? _parse(localStorage.getItem('stash_data')) : false;
}

/**
 * Save all stash data
 */
function set(){
  localStorage.setItem('stash_data', _str(window.stash.storage));
}

/**
 * Save/create individual doc
 */
function save(doc){
  if (doc.id){
    console.log("Saving a doc with an ID provided.");
    var docs = window.stash.storage.docs;

    // ONLY SAVING FIRST DOC,
    // bc after that, the .length is > 0, 
    // and that doc ID doesn't exist yet,
    // so it can't be updated

    if (docs.length > 0) {
      docs.forEach(function(_doc, i){
        if (_doc.id === doc.id){
          for (var key in doc){
            window.stash.storage.docs[i][key] = doc[key];
          }
        } 
      });
    } else {
      docs.push(doc);
    }
  } 
  else {
    console.log("Saving a doc without an ID provided.");
    window.stash.storage.docs.push(doc);
  }
  set();    
}

/**
 * Base
 */
function Storage(){
  var data = {
    user: 'estrattonbailey',
    docs: []
  }

  window.stash.storage = get() || data;

  console.log(localStorage.getItem('stash_data'))

  set();

  // exposed methods
  return {
    save: save,
    get: get
  }
}

module.exports = Storage;
