require('./helpers');

const Storage = require('./lib/storage');
const Model = require('./lib/model');
const View = require('./lib/view');
const Controller = require('./lib/controller');

jQuery(function($){

  window.stash = window.stash || {};

  function Stash(){
    this.storage = new Storage();  
    this.model = new Model(this.storage);  
    this.view = new View();
    this.controller = new Controller(this.model, this.view);  
  }

  const stash = new Stash();

  _e.publish('stash.setView');
});
