var throttle = require('lodash.throttle');

function Controller(model, view){
  const _ = this;
  _.model = model; 
  _.view = view; 

  // Bindings
  _on('.js-panel', 'click', function(e){
    _e.publish('dom.togglePanels', e);
  }, false);

  _on('.js-editor', 'keyup', throttle(function(e){
      _e.publish('editor.typing', e)
  }, 50), false);

  // Subscribers
  _e.subscribe('stash.setView', function(){
    _.model.create();
  });
}

module.exports = Controller;
