function View(){
  this.view = document.querySelector('.js-view');
  events.subscribe('markdown.parsed', this.updateView.bind(this));
}

View.prototype.updateView = function(data){
  this.view.innerHTML = data.parsed;
}

module.exports = View;
