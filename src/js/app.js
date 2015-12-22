const DOM = require('./_util/dom.js');
const Editor = require('./_lib/editor.js');
const View = require('./_lib/view.js');
const Markdown = require('./_util/markdown.js');
const E = require('common-js-pub-sub')();
window.events = E;

jQuery(function($){
  new DOM();
  new Editor();
  new Markdown();
  new View();
});
