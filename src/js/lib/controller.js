function Controller(model, view){
  const _ = this;
  _.model = model; 
  _.view = view; 

  // Bindings
  _on('.js-view', 'click', _e.publish('dom.openPreview'));

  // Subscribers
  _e.subscribe('stash.setView', function(){
    _.model.create();
  });
}

module.exports = Controller;
