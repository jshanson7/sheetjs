(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sheetjs"] = factory();
	else
		root["sheetjs"] = factory();
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

	module.exports = __webpack_require__(51);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(2)['default'];

	var _classCallCheck = __webpack_require__(6)['default'];

	var _Object$keys = __webpack_require__(7)['default'];

	var _Object$assign = __webpack_require__(17)['default'];

	var _interopRequireDefault = __webpack_require__(46)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _utilsBindAll = __webpack_require__(47);

	var _utilsBindAll2 = _interopRequireDefault(_utilsBindAll);

	var _utilsSelectorsEquivalent = __webpack_require__(49);

	var _utilsSelectorsEquivalent2 = _interopRequireDefault(_utilsSelectorsEquivalent);

	var instanceCount = 0;

	var StyleSheet = (function () {
	  function StyleSheet(stylesBySelector) {
	    _classCallCheck(this, StyleSheet);

	    this._instance = ++instanceCount;
	    this._element = null;
	    this._sheet = null;
	    this._rules = null;
	    this._deleteRuleAtIndex = null;

	    (0, _utilsBindAll2['default'])(this);

	    if (stylesBySelector) {
	      this.setStylesForSelectors(stylesBySelector);
	    }
	  }

	  //  'style' dom element property reference
	  //  {
	  //    // CSSStyleSheet
	  //    sheet: {
	  //      // CSSRuleList
	  //      rules: [
	  //        // CSSStyleRule
	  //        {
	  //          // CSSStyleDeclaration
	  //          style: {
	  //            backgroundColor: 'red'
	  //          }
	  //        }
	  //      ]
	  //    }
	  //  }

	  // alias to createStylesForSelector

	  _createClass(StyleSheet, [{
	    key: 'stylesForSelector',
	    value: function stylesForSelector(selector) {
	      return this.createStylesForSelector(selector);
	    }
	  }, {
	    key: 'setStylesForSelectors',
	    value: function setStylesForSelectors(stylesBySelector) {
	      var _this = this;

	      _Object$keys(stylesBySelector).forEach(function (selector) {
	        return _this.setStylesForSelector(selector, stylesBySelector[selector]);
	      });
	      return this;
	    }
	  }, {
	    key: 'setStylesForSelector',
	    value: function setStylesForSelector(selector, styles) {
	      _Object$assign(this.stylesForSelector(selector), styles);
	      return this;
	    }

	    // returns a CSSStyleDeclaration
	  }, {
	    key: 'createStylesForSelector',
	    value: function createStylesForSelector(selector) {
	      var existing = this.getStylesForSelector(selector);
	      if (existing) {
	        return existing;
	      }

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
	      var rule = this._getRuleForSelector(selector);
	      return rule ? rule.style : undefined;
	    }
	  }, {
	    key: 'deleteStylesForSelector',
	    value: function deleteStylesForSelector(selector) {
	      var deleteRuleAtIndex = this._getDeleteRuleAtIndex();
	      var ruleIndex = undefined;
	      while ((ruleIndex = this._getRuleIndexForSelector(selector)) !== -1) {
	        deleteRuleAtIndex(ruleIndex);
	      }
	    }
	  }, {
	    key: 'deleteStyles',
	    value: function deleteStyles() {
	      var deleteRuleAtIndex = this._getDeleteRuleAtIndex();
	      var ruleIndex = this._getRules().length;
	      while (ruleIndex--) {
	        deleteRuleAtIndex(ruleIndex);
	      }
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
	    key: '_getDeleteRuleAtIndex',
	    value: function _getDeleteRuleAtIndex() {
	      return this._deleteRuleAtIndex || (function () {
	        var sheet = this._getSheet();
	        return this._deleteRuleAtIndex = (sheet.removeRule || sheet.deleteRule).bind(sheet);
	      }).call(this);
	    }
	  }, {
	    key: '_getRuleIndexForSelector',
	    value: function _getRuleIndexForSelector(selector) {
	      return Array.prototype.indexOf.call(this._getRules(), this._getRuleForSelector(selector));
	    }
	  }, {
	    key: '_getRuleForSelector',
	    value: function _getRuleForSelector(selector) {
	      var rules = this._getRules();
	      var i = rules.length;
	      var rule = undefined;

	      while (i--) {
	        rule = rules[i];
	        if ((0, _utilsSelectorsEquivalent2['default'])(selector, rule.selectorText)) {
	          return rule;
	        }
	      }
	      return undefined;
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
	    key: '_getSheet',
	    value: function _getSheet() {
	      return this._sheet || (function () {
	        return this._sheet = this._getElement().sheet;
	      }).call(this);
	    }
	  }, {
	    key: '_getElement',
	    value: function _getElement() {
	      return this._element || (function () {
	        var styleSheet = document.createElement('style');
	        var head = document.head || document.getElementsByTagName('head')[0];
	        styleSheet.type = 'text/css';
	        styleSheet.setAttribute('id', 'sheetjs-' + this._instance);
	        head.appendChild(styleSheet);
	        return this._element = styleSheet;
	      }).call(this);
	    }
	  }]);

	  return StyleSheet;
	})();

	exports['default'] = StyleSheet;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(3)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5);
	module.exports = function defineProperty(it, key, desc) {
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var $Object = Object;
	module.exports = {
	  create: $Object.create,
	  getProto: $Object.getPrototypeOf,
	  isEnum: ({}).propertyIsEnumerable,
	  getDesc: $Object.getOwnPropertyDescriptor,
	  setDesc: $Object.defineProperty,
	  setDescs: $Object.defineProperties,
	  getKeys: $Object.keys,
	  getNames: $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each: [].forEach
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(9);
	module.exports = __webpack_require__(15).Object.keys;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	'use strict';

	var toObject = __webpack_require__(10);

	__webpack_require__(12)('keys', function ($keys) {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	'use strict';

	var defined = __webpack_require__(11);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	"use strict";

	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	'use strict';

	module.exports = function (KEY, exec) {
	  var $def = __webpack_require__(13),
	      fn = (__webpack_require__(15).Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(16)(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(14),
	    core = __webpack_require__(15),
	    PROTOTYPE = 'prototype';
	var ctx = function ctx(fn, that) {
	  return function () {
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function $def(type, name, source) {
	  var key,
	      own,
	      out,
	      exp,
	      isGlobal = type & $def.G,
	      isProto = type & $def.P,
	      target = isGlobal ? global : type & $def.S ? global[name] : (global[name] || {})[PROTOTYPE],
	      exports = isGlobal ? core : core[name] || (core[name] = {});
	  if (isGlobal) source = name;
	  for (key in source) {
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if (isGlobal && typeof target[key] != 'function') exp = source[key];
	    // bind timers to global for call from export context
	    else if (type & $def.B && own) exp = ctx(out, global);
	      // wrap global constructors for prevent change them in library
	      else if (type & $def.W && target[key] == out) !(function (C) {
	          exp = function (param) {
	            return this instanceof C ? new C(param) : C(param);
	          };
	          exp[PROTOTYPE] = C[PROTOTYPE];
	        })(out);else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if (isProto) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1; // forced
	$def.G = 2; // global
	$def.S = 4; // static
	$def.P = 8; // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 14 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	'use strict';

	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var core = module.exports = { version: '1.2.2' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(18), __esModule: true };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(19);
	module.exports = __webpack_require__(15).Object.assign;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	'use strict';

	var $def = __webpack_require__(13);

	$def($def.S + $def.F, 'Object', { assign: __webpack_require__(20) });

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	'use strict';

	var _Object$assign = __webpack_require__(17)['default'];

	var _Symbol = __webpack_require__(21)['default'];

	var _Object$keys = __webpack_require__(7)['default'];

	var $ = __webpack_require__(5),
	    toObject = __webpack_require__(10),
	    IObject = __webpack_require__(35);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(16)(function () {
	  var a = _Object$assign,
	      A = {},
	      B = {},
	      S = _Symbol(),
	      K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return a({}, A)[S] != 7 || _Object$keys(a({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target),
	      $$ = arguments,
	      $$len = $$.length,
	      index = 1,
	      getKeys = $.getKeys,
	      getSymbols = $.getSymbols,
	      isEnum = $.isEnum;
	  while ($$len > index) {
	    var S = IObject($$[index++]),
	        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
	        length = keys.length,
	        j = 0,
	        key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  }
	  return T;
	} : _Object$assign;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(23);
	module.exports = __webpack_require__(15).Symbol;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $ = __webpack_require__(5),
	    global = __webpack_require__(14),
	    has = __webpack_require__(24),
	    SUPPORT_DESC = __webpack_require__(25),
	    $def = __webpack_require__(13),
	    $redef = __webpack_require__(26),
	    $fails = __webpack_require__(16),
	    shared = __webpack_require__(29),
	    setTag = __webpack_require__(30),
	    uid = __webpack_require__(32),
	    wks = __webpack_require__(31),
	    keyOf = __webpack_require__(33),
	    $names = __webpack_require__(37),
	    enumKeys = __webpack_require__(41),
	    isArray = __webpack_require__(42),
	    anObject = __webpack_require__(43),
	    toIObject = __webpack_require__(34),
	    createDesc = __webpack_require__(28),
	    getDesc = $.getDesc,
	    setDesc = $.setDesc,
	    _create = $.create,
	    getNames = $names.get,
	    $Symbol = global.Symbol,
	    $JSON = global.JSON,
	    _stringify = $JSON && $JSON.stringify,
	    setter = false,
	    HIDDEN = wks('_hidden'),
	    isEnum = $.isEnum,
	    SymbolRegistry = shared('symbol-registry'),
	    AllSymbols = shared('symbols'),
	    useNative = typeof $Symbol == 'function',
	    ObjectProto = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = SUPPORT_DESC && $fails(function () {
	  return _create(setDesc({}, 'a', {
	    get: function get() {
	      return setDesc(this, 'a', { value: 7 }).a;
	    }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = getDesc(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  setDesc(it, key, D);
	  if (protoDesc && it !== ObjectProto) setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function wrap(tag) {
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  SUPPORT_DESC && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function set(value) {
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function isSymbol(it) {
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (D && has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    }return setSymbolDesc(it, key, D);
	  }return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P)),
	      i = 0,
	      l = keys.length,
	      key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  var D = getDesc(it = toIObject(it), key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = getNames(toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) if (!has(AllSymbols, key = names[i++]) && key != HIDDEN) result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var names = getNames(toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) if (has(AllSymbols, key = names[i++])) result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it) {
	  var args = [it],
	      i = 1,
	      $$ = arguments,
	      replacer,
	      $replacer;
	  while ($$.length > i) args.push($$[i++]);
	  replacer = args[1];
	  if (typeof replacer == 'function') $replacer = replacer;
	  if ($replacer || !isArray(replacer)) replacer = function (key, value) {
	    if ($replacer) value = $replacer.call(this, key, value);
	    if (!isSymbol(value)) return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if (!useNative) {
	  $Symbol = function Symbol() {
	    if (isSymbol(this)) throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  $redef($Symbol.prototype, 'toString', function toString() {
	    return this._k;
	  });

	  isSymbol = function (it) {
	    return it instanceof $Symbol;
	  };

	  $.create = $create;
	  $.isEnum = $propertyIsEnumerable;
	  $.getDesc = $getOwnPropertyDescriptor;
	  $.setDesc = $defineProperty;
	  $.setDescs = $defineProperties;
	  $.getNames = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if (SUPPORT_DESC && !__webpack_require__(45)) {
	    $redef(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function _for(key) {
	    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key) {
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function useSetter() {
	    setter = true;
	  },
	  useSimple: function useSimple() {
	    setter = false;
	  }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call(('hasInstance,isConcatSpreadable,iterator,match,replace,search,' + 'species,split,toPrimitive,toStringTag,unscopables').split(','), function (it) {
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$def($def.G + $def.W, { Symbol: $Symbol });

	$def($def.S, 'Symbol', symbolStatics);

	$def($def.S + $def.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $def($def.S + $def.F * (!useNative || buggyJSON), 'JSON', { stringify: $stringify });

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setTag(global.JSON, 'JSON', true);

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	var hasOwnProperty = ({}).hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	'use strict';

	module.exports = !__webpack_require__(16)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(27);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5),
	    createDesc = __webpack_require__(28);
	module.exports = __webpack_require__(25) ? function (object, key, value) {
	  return $.setDesc(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(14),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var def = __webpack_require__(5).setDesc,
	    has = __webpack_require__(24),
	    TAG = __webpack_require__(31)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(29)('wks'),
	    Symbol = __webpack_require__(14).Symbol;
	module.exports = function (name) {
	  return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || __webpack_require__(32))('Symbol.' + name));
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5),
	    toIObject = __webpack_require__(34);
	module.exports = function (object, el) {
	  var O = toIObject(object),
	      keys = $.getKeys(O),
	      length = keys.length,
	      index = 0,
	      key;
	  while (length > index) if (O[key = keys[index++]] === el) return key;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	'use strict';

	var IObject = __webpack_require__(35),
	    defined = __webpack_require__(11);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	'use strict';

	var cof = __webpack_require__(36);
	module.exports = 0 in Object('z') ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	var toString = ({}).toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	'use strict';

	var _Object$getOwnPropertyNames = __webpack_require__(38)['default'];

	var toString = ({}).toString,
	    toIObject = __webpack_require__(34),
	    getNames = __webpack_require__(5).getNames;

	var windowNames = typeof window == 'object' && _Object$getOwnPropertyNames ? _Object$getOwnPropertyNames(window) : [];

	var getWindowNames = function getWindowNames(it) {
	  try {
	    return getNames(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it) {
	  if (windowNames && toString.call(it) == '[object Window]') return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(39), __esModule: true };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5);
	__webpack_require__(40);
	module.exports = function getOwnPropertyNames(it) {
	  return $.getNames(it);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	'use strict';

	__webpack_require__(12)('getOwnPropertyNames', function () {
	  return __webpack_require__(37).get;
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	'use strict';

	var $ = __webpack_require__(5);
	module.exports = function (it) {
	  var keys = $.getKeys(it),
	      getSymbols = $.getSymbols;
	  if (getSymbols) {
	    var symbols = getSymbols(it),
	        isEnum = $.isEnum,
	        i = 0,
	        key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	'use strict';

	var cof = __webpack_require__(36);
	module.exports = Array.isArray || function (arg) {
	  return cof(arg) == 'Array';
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(44);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";

	module.exports = true;

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$getOwnPropertyNames = __webpack_require__(38)['default'];

	var _interopRequireDefault = __webpack_require__(46)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _isFunction = __webpack_require__(48);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	exports['default'] = function (obj) {
	  return _Object$getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(function (key) {
	    return (0, _isFunction2['default'])(obj[key]);
	  }).forEach(function (method) {
	    return obj[method] = obj[method].bind(obj);
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = function (obj) {
	  return !!(obj && obj.constructor && obj.call && obj.apply);
	};

	module.exports = exports["default"];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(46)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _normalizeSelector = __webpack_require__(50);

	var _normalizeSelector2 = _interopRequireDefault(_normalizeSelector);

	exports['default'] = function (first, second) {
	  return (0, _normalizeSelector2['default'])(first) === (0, _normalizeSelector2['default'])(second);
	};

	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (selector) {
	  return selector.trim().replace(/ +(?= )/g, '').replace(/, /g, ',').replace(/ ,/g, ',');
	};

	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(46)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _StyleSheet = __webpack_require__(1);

	var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

	exports['default'] = { StyleSheet: _StyleSheet2['default'] };
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;