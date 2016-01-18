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
  console.log('%cSaved!', 'color: #ff4567')
}

/**
 * Save/create individual doc
 */
function save(doc){
  var docs = window.stash.storage.docs;

  var exists = exists || false;
  docs.map(function(_doc, i){
    exists = _doc.id === doc.id ? true : false;
  });

  if (exists){
    docs.map(function(_doc, i, _docs){
      if (_doc.id === doc.id){
        for (var key in doc){
          _docs[i][key] = doc[key];
        }
      } 
    });
  } else {
    docs.push(doc); 
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

  set();

  // exposed methods
  return {
    save: save,
    get: get
  }
}

module.exports = Storage;
