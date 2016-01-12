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

  _on('.js-new', 'click', _e.publish('dom.new'), false);

  // Subscribers
  _e.subscribe('doc.new', function(){
    _.model.create();
  });
}

module.exports = Controller;
