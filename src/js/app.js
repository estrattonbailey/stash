require('./helpers');
var throttle = require('lodash.throttle');

const Storage = require('./lib/storage');
const Model = require('./lib/model');
const View = require('./lib/view');

window.addEventListener('load', function(){
  const _ = this;
    
  window.stash = window.stash || {};

  storage = Storage();  
  model = Model(this.storage);  
  view = new View();

  // INIT 
  _e.publish('app.init');

  var autosave;
  _on('.js-editor', 'keyup', throttle(function(e){
    _e.publish('dom.updateView', e);

    clearTimeout(autosave);
    autosave = setTimeout(function(){
      model.save();
    }, 1000);
  }, 50), false);
}, true);
