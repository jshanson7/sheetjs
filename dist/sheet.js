(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sheet"] = factory();
	else
		root["sheet"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _objectAssign = __webpack_require__(2);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _objectKeys = __webpack_require__(3);

	var _objectKeys2 = _interopRequireDefault(_objectKeys);

	//  // CSSStyleSheet:
	//  {
	//    // CSSRuleList
	//    rules: [
	//      // CSSStyleRule:
	//      {
	//        // CSSStyleDeclaration:
	//        style: {
	//          backgroundColor: 'red'
	//        }
	//      }
	//    ]
	//  }

	var instanceCount = 0;

	var StyleSheet = (function () {
	  function StyleSheet(stylesBySelector) {
	    _classCallCheck(this, StyleSheet);

	    this._instance = instanceCount++;
	    this._styleSheet = null;
	    this._sheet = null;
	    this._rules = null;

	    // bind context of public methods
	    var self = this;
	    ['stylesForSelector', 'createStylesForSelector', 'getStylesForSelector', 'deleteStylesForSelector', 'disable', 'enable'].forEach(function (method) {
	      return self[method] = self[method].bind(self);
	    });

	    if (stylesBySelector) {
	      this.setStylesForSelectors(stylesBySelector);
	    }
	  }

	  _createClass(StyleSheet, [{
	    key: 'setStylesForSelectors',
	    value: function setStylesForSelectors(stylesBySelector) {
	      var _this = this;

	      (0, _objectKeys2['default'])(stylesBySelector).forEach(function (selector) {
	        return _this.setStylesForSelector(selector, stylesBySelector[selector]);
	      });
	      return this;
	    }
	  }, {
	    key: 'setStylesForSelector',
	    value: function setStylesForSelector(selector, styles) {
	      (0, _objectAssign2['default'])(this.stylesForSelector(selector), styles);
	      return this;
	    }

	    // returns a CSSStyleDeclaration
	  }, {
	    key: 'stylesForSelector',
	    value: function stylesForSelector(selector) {
	      return this.getStylesForSelector(selector) || this.createStylesForSelector(selector);
	    }
	  }, {
	    key: 'createStylesForSelector',
	    value: function createStylesForSelector(selector) {
	      var sheet = this._getSheet();
	      var rules = this._getRules();
	      var nextRuleIndex = rules.length;
	      var ruleText = selector + ' { }';

	      // insert ruleText to generate a CSSStyleDeclaration object as a byproduct
	      sheet.insertRule(ruleText, nextRuleIndex);

	      return rules.item(nextRuleIndex).style;
	    }
	  }, {
	    key: 'getStylesForSelector',
	    value: function getStylesForSelector(selector) {
	      var rule = this._getRule(selector);
	      return rule ? rule.style : undefined;
	    }
	  }, {
	    key: 'deleteStylesForSelector',
	    value: function deleteStylesForSelector(selector) {
	      var sheet = this._getSheet();
	      var deleteRule = sheet.removeRule || sheet.deleteRule;
	      var ruleIndex = this._getRuleIndex(selector);

	      return ruleIndex === -1 ? false : deleteRule.call(sheet, ruleIndex);
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this._getSheet().disabled = true;
	      return this;
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      this._getSheet().disabled = false;
	      return this;
	    }
	  }, {
	    key: '_getRuleIndex',
	    value: function _getRuleIndex(selector) {
	      var rules = this._getRules();
	      var rule = this._getRule(selector);

	      return Array.prototype.indexOf.call(rules, rule);
	    }
	  }, {
	    key: '_getRule',
	    value: function _getRule(selector) {
	      var rules = this._getRules();
	      var il = rules.length;
	      var i = 0;

	      for (; i < il; i++) {
	        if (rules[i].selectorText === selector) {
	          return rules[i];
	        }
	      }

	      return undefined;
	    }
	  }, {
	    key: '_getSheet',
	    value: function _getSheet() {
	      return this._sheet || (function () {
	        return this._sheet = this._getStylesForSelectorsheet().sheet;
	      }).call(this);
	    }
	  }, {
	    key: '_getRules',
	    value: function _getRules() {
	      return this._rules || (function () {
	        var sheet = this._getSheet();
	        return this._rules = sheet.cssRules || sheet.rules;
	      }).call(this);
	    }
	  }, {
	    key: '_getStylesForSelectorsheet',
	    value: function _getStylesForSelectorsheet() {
	      return this._styleSheet || (function () {
	        var style = document.createElement('style');
	        var head = document.head || document.getElementsByTagName('head')[0];
	        style.type = 'text/css';
	        style.setAttribute('id', 'sheetjs-' + this._instance);
	        head.appendChild(style);
	        return this._styleSheet = style;
	      }).call(this);
	    }
	  }]);

	  return StyleSheet;
	})();

	exports['default'] = StyleSheet;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var slice = Array.prototype.slice;
	var isArgs = __webpack_require__(4);
	var hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
	var hasProtoEnumBug = (function () {}).propertyIsEnumerable('prototype');
	var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
	var equalsConstructorPrototype = function equalsConstructorPrototype(o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var blacklistedKeys = {
		$console: true,
		$frameElement: true,
		$frames: true,
		$parent: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') {
			return false;
		}
		for (var k in window) {
			try {
				if (!blacklistedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	})();
	var equalsConstructorPrototypeIfNotBuggy = function equalsConstructorPrototypeIfNotBuggy(o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	var keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};

	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				return (Object.keys(arguments) || '').length === 2;
			})(1, 2);
			if (!keysWorksWithArguments) {
				var originalKeys = Object.keys;
				Object.keys = function keys(object) {
					if (isArgs(object)) {
						return originalKeys(slice.call(object));
					} else {
						return originalKeys(object);
					}
				};
			}
		} else {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};

	module.exports = keysShim;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var toStr = Object.prototype.toString;

	module.exports = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _StyleSheet = __webpack_require__(1);

	var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

	exports['default'] = { StyleSheet: _StyleSheet2['default'] };
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;