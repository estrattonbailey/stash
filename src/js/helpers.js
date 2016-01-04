module.exports = (function(){
  window._e = require('common-js-pub-sub')(); 

  window._s = function(selector, scope){
    return (scope || document).querySelector(selector);
  }

  window._sa = function(selector, scope){
    return (scope || document).querySelectorAll(selector);
  }

  window._on = function(scope, event, callback, useCapture){
    _s(scope).addEventListener(event, callback, !!useCapture);
  }

  window._str = function(data){
    return JSON.stringify(data);
  }
})();
