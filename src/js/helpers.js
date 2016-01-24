module.exports = (function(){
  window._e = require('common-js-pub-sub')(); 

  window._delay = function(cb, ms){
    var _timer = null;
    console.log(cb);
    return function(){
      clearTimeout(_timer);
      _timer = setTimeout(cb, ms);
    }
  }

  window._class = require('desandro-classie');

  window._s = function(selector, scope){
    return (scope || document).querySelector(selector);
  }

  window._sa = function(selector, scope){
    return (scope || document).querySelectorAll(selector);
  }

  window._toArray = function(collection){
    return Array.prototype.slice.call(collection); 
  }

  window._on = function(scope, event, callback, useCapture){
    if (!_s(scope)) return console.log('%cERROR: Specified scope does not exist in DOM.', 'color:#ff4567');

    var collection = _toArray(_sa(scope));
    if (collection.length > 1){
      for (var i = 0; i < collection.length; i++){
        collection[i].addEventListener(event, callback, !!useCapture);
      } 
    } else {
      _s(scope).addEventListener(event, callback, !!useCapture);
    }
  }

  window._str = function(data){
    return JSON.stringify(data);
  }

  window._parse = function(data){
    return JSON.parse(data);
  }
})();
