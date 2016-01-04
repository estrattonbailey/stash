function Storage(){
  var def = {
    user: 'estrattonbailey',
    docs: []
  }
  window.stash.storage = window.stash.storage || def;
  this.setData();
}
/**
 * Get all stash data
 */
Storage.prototype.getData = function(){
  return localStorage.getItem('stash_data') ? true : false;
}
/**
 * Save all stash data
 */
Storage.prototype.setData = function(){
  localStorage.setItem('stash_data', _str(this.storage));
  console.log("Stash data saved.");
}
/**
 * Save/create individual doc
 */
Storage.prototype.save = function(data){
  if (data.id){
    console.log("Saving a doc with an ID provided.");
    this.storage.docs.forEach(function(doc, i){
      if (this.storage.docs[i].id === id){
        for (var key in data){
          this.storage.docs[i][key] = data[key];
        }
      }  
    });
  } 
  else {
    data.id = new Date().getTime();

    console.log("Saving a doc without an ID provided.");
    window.stash.storage.docs.push(data);
    this.setData();    
  }
}
Storage.prototype.remove = function(id){

}

module.exports = Storage;
