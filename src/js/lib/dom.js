function General(){
  this.panels = $('[data-panel]');

  // BINDINGS
  this.panels.on('click', this.setActivePanel);
}

General.prototype.setActivePanel = function(e){
  var target = $(e.currentTarget);
  $('[data-panel]').removeClass('is-active');
  target.addClass('is-active');
}

module.exports = General;
