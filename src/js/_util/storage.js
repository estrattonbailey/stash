function Storage(){
  if (this.hasData()){
    window.stash = this.getData();
  } else {
    window.stash = {
      user: 'estrattonbailey',
      docs: []
    }
    this.setData();
  }
}
Storage.prototype.hasData = function(){
  return localStorage.getItem('stash_data') ? true : false;
}
Storage.prototype.str = function(data){
  return JSON.stringify(data);
}
Storage.prototype.getData = function(){
  return JSON.parse(localStorage.getItem('stash_data'));
}
Storage.prototype.setData = function(){
  localStorage.setItem('stash_data', this.str(stash));
}

module.exports = Storage;
