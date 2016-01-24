var throttle = require('lodash.throttle');

function Controller(model, view){
  const _ = this;
  _.model = model; 
  _.view = view; 

  // SUBSCRIBERS 
  // App init
  _e.subscribe('stash.init', function(){
    _.model.get()
  });

  // Throttle typing
  var autosave;
  _on('.js-editor', 'keyup', throttle(function(e){
    _e.publish('dom.updateView', e);

    clearTimeout(autosave);
    autosave = setTimeout(function(){
      _.model.save();
    }, 1000);
  }, 50), false);
}

module.exports = Controller;
