require('./helpers');
var throttle = require('lodash.throttle');

const $ = require('nab-select');

const Storage = require('./lib/storage');
const Model = require('./lib/model');
const View = require('./lib/view');

window.addEventListener('load', function(){
  const _ = this;
    
  window.stash = window.stash || {};

  storage = Storage();  
  model = Model(storage);  
  view = new View();

  // INIT 
  _e.publish('app.init');

  _on('[data-menu]', 'click', function(e){
    var doc = $(e.target).closest('[data-doc]'),
        id = doc[0].getAttribute('data-doc');
    storage.read(id);
  }, false);

  var autosave;
  _on('.js-editor', 'keyup', throttle(function(e){
    _e.publish('dom.updateView', e);

    clearTimeout(autosave);
    autosave = setTimeout(function(){
      _e.publish('stash.save', e);
    }, 1000);
  }, 50), false);
}, true);
