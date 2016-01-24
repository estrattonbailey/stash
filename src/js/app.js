require('./helpers');
var throttle = require('lodash.throttle');

const Storage = require('./lib/storage');
const Model = require('./lib/model');
const View = require('./lib/view');
const Controller = require('./lib/controller');

jQuery(function($){
  const _ = this;
    
  window.stash = window.stash || {};

  this.storage = new Storage();  
  this.model = new Model(this.storage);  
  this.view = new View();

  // INIT 
  this.model.get()

  // Throttle typing
  var autosave;
  _on('.js-editor', 'keyup', throttle(function(e){
    _e.publish('dom.updateView', e);

    clearTimeout(autosave);
    autosave = setTimeout(function(){
      _.model.save();
    }, 1000);
  }, 50), false);
});
