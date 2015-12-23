window.events = require('common-js-pub-sub')();;
window.stash = {};

// Util
const DOM = require('./_util/dom.js');
const Storage = require('./_util/storage');

// Lib
const Doc = require('./_lib/doc.js');

jQuery(function($){
  new DOM();

  new Storage();
  new Doc();
});
