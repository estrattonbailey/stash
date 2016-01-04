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

	__webpack_require__(1);

	const Storage = __webpack_require__(3);
	const Model = __webpack_require__(4);
	const View = __webpack_require__(5);
	const Controller = __webpack_require__(6);

	jQuery(function ($) {

	  window.stash = window.stash || {};

	  function Stash() {
	    this.storage = new Storage();
	    this.model = new Model(this.storage);
	    this.view = new View();
	    this.controller = new Controller(this.model, this.view);
	  }

	  const stash = new Stash();

	  _e.publish('stash.setView');
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (function () {
	  window._e = __webpack_require__(2)();

	  window._s = function (selector, scope) {
	    return (scope || document).querySelector(selector);
	  };

	  window._sa = function (selector, scope) {
	    return (scope || document).querySelectorAll(selector);
	  };

	  window._on = function (scope, event, callback, useCapture) {
	    _s(scope).addEventListener(event, callback, !!useCapture);
	  };

	  window._str = function (data) {
	    return JSON.stringify(data);
	  };
	})();

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports) {

	function Storage() {
	  var def = {
	    user: 'estrattonbailey',
	    docs: []
	  };
	  window.stash.storage = window.stash.storage || def;
	  this.setData();
	}
	/**
	 * Get all stash data
	 */
	Storage.prototype.getData = function () {
	  return localStorage.getItem('stash_data') ? true : false;
	};
	/**
	 * Save all stash data
	 */
	Storage.prototype.setData = function () {
	  localStorage.setItem('stash_data', _str(this.storage));
	  console.log("Stash data saved.");
	};
	/**
	 * Save/create individual doc
	 */
	Storage.prototype.save = function (data) {
	  if (data.id) {
	    console.log("Saving a doc with an ID provided.");
	    this.storage.docs.forEach(function (doc, i) {
	      if (this.storage.docs[i].id === id) {
	        for (var key in data) {
	          this.storage.docs[i][key] = data[key];
	        }
	      }
	    });
	  } else {
	    data.id = new Date().getTime();

	    console.log("Saving a doc without an ID provided.");
	    window.stash.storage.docs.push(data);
	    this.setData();
	  }
	};
	Storage.prototype.remove = function (id) {};

	module.exports = Storage;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function Model(storage) {
	  this.storage_docs = storage.docs;
	  this.storage = Object.getPrototypeOf(storage);
	}
	/**
	 * Create a new blank doc
	 */
	Model.prototype.create = function () {
	  var doc = {};
	  doc.content = '';

	  this.storage.save(doc);
	  _e.publish('stash.create', doc.content);
	};
	Model.prototype.read = function () {};
	/**
	 * Save a document
	 * @param {string} content The plain text content of the editor textarea 
	 * @param {integer} id The id of the doc to save (optional)
	 */
	Model.prototype.save = function (content, id) {
	  var doc = {};
	  doc.content = content;

	  if (id) {
	    doc.id = id;
	  }

	  this.storage.save(doc, id);
	};

	module.exports = Model;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function View() {
	  this.view = _s('.js-view');

	  _e.subscribe('stash.create', this.updateView.bind(this));
	  _e.subscribe('dom.openPreview', this.openPreview.bind(this));
	}

	View.prototype.updateView = function (content) {
	  this.view.innerHTML = content;
	};
	View.prototype.openPreview = function () {
	  console.log("View");
	};

	module.exports = View;

/***/ },
/* 6 */
/***/ function(module, exports) {

	function Controller(model, view) {
	  const _ = this;
	  _.model = model;
	  _.view = view;

	  // Bindings
	  _on('.js-view', 'click', _e.publish('dom.openPreview'));

	  // Subscribers
	  _e.subscribe('stash.setView', function () {
	    _.model.create();
	  });
	}

	module.exports = Controller;

/***/ }
/******/ ]);