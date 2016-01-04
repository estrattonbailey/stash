function View(){
  this.view = _s('.js-view');

  _e.subscribe('stash.create', this.updateView.bind(this));
  _e.subscribe('dom.openPreview', this.openPreview.bind(this));
}

View.prototype.updateView = function(content){
  this.view.innerHTML = content;
}
View.prototype.openPreview = function(){
  console.log("View");
}

module.exports = View;
