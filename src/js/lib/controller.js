var throttle = require('lodash.throttle');

function Controller(model, view){
  const _ = this;
  _.model = model; 
  _.view = view; 

  // Subscribers
  _e.subscribe('stash.init', function(){
    _.model.get()
  });
  _e.subscribe('stash.new', function(){
    _.model.create()
  });

  // Bindings
  _on('.js-panel', 'click', function(e){
    _e.publish('dom.togglePanels', e);
  }, false);

  _on('.js-editor', 'keyup', throttle(function(e){
    _e.publish('dom.updateView', e)

    _.model.saveCurrent(); // NEEDS THROTTLING
  }, 50), false);

  _on('.js-newDoc', 'click', function(e){
    _e.publish('dom.new');
  }, false);

}

module.exports = Controller;
