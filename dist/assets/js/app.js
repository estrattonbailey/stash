/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	window.events = __webpack_require__(1)();;
	window.stash = {};

	// Util
	const DOM = __webpack_require__(2);
	const Storage = __webpack_require__(3);

	// Lib
	const Doc = __webpack_require__(4);

	jQuery(function ($) {
	  new DOM();

	  new Storage();
	  new Doc();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Minature pub sub module for working with pub sub in a common js pattern
	 * @module common-js-pub-sub
	 * @returns { Object } events
	 * @returns { function } events.publish
	 * @returns { function } events.subscribe
	 */
	module.exports = function() { 
	 
	    var topics = {};

	    /**
	     * Subscribe to a topic
	     * @param  { string } topic - Name of the topic to subscribe to
	     * @param  { function } listener - Callback to be run when the topic is published
	     * @returns {[type]}
	     */
	    function subscribe(topic, listener) {
	        // Create the topic's object if not yet created
	        if (!topics[topic]) {
	            topics[topic] = {
	                queue: []
	            };
	        }

	        // Add the listener to queue
	        var index = topics[topic].queue.push(listener) -1;

	        // Provide handle back for removal of topic
	        return {
	            /**
	             * removes the topic from the queue
	             */
	            remove: function() {
	                delete topics[topic].queue[index];
	            }
	        };
	    }

	    /**
	     * Publish a topic
	     * @param  { string } topic - Name of the topic to be published
	     * @param  { Object } info - Object containing any additional information you want available to the subscribe function
	     */
	    function publish(topic, info) {
	        // If the topic doesn't exist, or there's no listeners in queue, just leave
	        if (!topics[topic] || !topics[topic].queue.length) {
	            return;
	        }

	        // Cycle through topics queue and call the function!
	        var items = topics[topic].queue;

	        for (var i = 0; i < items.length; i++) {
	            items[i](info || {})
	        };
	    }

	    return {
	        subscribe: subscribe,
	        publish: publish
	    };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	function General() {
	  this.panels = $('[data-panel]');

	  // BINDINGS
	  this.panels.on('click', this.setActivePanel);
	}

	General.prototype.setActivePanel = function (e) {
	  var target = $(e.currentTarget);
	  $('[data-panel]').removeClass('is-active');
	  target.addClass('is-active');
	};

	module.exports = General;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function Storage() {
	  if (this.hasData()) {
	    window.stash = this.getData();
	  } else {
	    window.stash = {
	      user: 'estrattonbailey',
	      docs: []
	    };
	    this.setData();
	  }
	}
	Storage.prototype.hasData = function () {
	  return localStorage.getItem('stash_data') ? true : false;
	};
	Storage.prototype.str = function (data) {
	  return JSON.stringify(data);
	};
	Storage.prototype.getData = function () {
	  return JSON.parse(localStorage.getItem('stash_data'));
	};
	Storage.prototype.setData = function () {
	  localStorage.setItem('stash_data', this.str(stash));
	};

	module.exports = Storage;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var uuid = __webpack_require__(5);
	var Storage = __webpack_require__(3);

	function Doc() {
	  if (!Storage.hasData) {}

	  stash.doc = this.ID = uuid();
	}

	module.exports = Doc;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	// To make id smaller we get microseconds count from more recent date
	var start = Date.UTC(2012, 12, 21, 12, 0, 0, 0) * 1000

	// Prefix with number, it reduces chances of collision with variable names
	// (helpful if used as property names on objects)
	  , prefix = String(Math.floor(Math.random() * 10))

	// Make it more unique
	  , postfix = Math.floor(Math.random() * 36).toString(36)

	  , abs = Math.abs;

	module.exports = function (time) {
		return prefix + abs(time - start).toString(36) + postfix;
	};


/***/ }
/******/ ]);