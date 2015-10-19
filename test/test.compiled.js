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

	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	var _assert = __webpack_require__(2);

	var _assert2 = _interopRequireDefault(_assert);

	var _StyleSheet = __webpack_require__(30);

	var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

	(0, _assert2['default'])(_StyleSheet2['default'] === _StyleSheet2['default']);

	describe('sheetjs', function () {
	  describe('#createStyle()', function () {
	    return it('should be true', function () {
	      return (0, _assert2['default'])(true);
	    });
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	// when used in node, this will actually load the util module we depend on
	// versus loading the builtin util module as happens otherwise
	// this is a bug in node module loading as far as I am concerned
	'use strict';

	var _Object$keys = __webpack_require__(3)['default'];

	var util = __webpack_require__(13);

	var pSlice = Array.prototype.slice;
	var hasOwn = Object.prototype.hasOwnProperty;

	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.

	var assert = module.exports = ok;

	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })

	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;

	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;

	      // try to strip useless frames
	      var fn_name = stackStartFunction.name;
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }

	      this.stack = out;
	    }
	  }
	};

	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);

	function replacer(key, value) {
	  if (util.isUndefined(value)) {
	    return '' + value;
	  }
	  if (util.isNumber(value) && !isFinite(value)) {
	    return value.toString();
	  }
	  if (util.isFunction(value) || util.isRegExp(value)) {
	    return value.toString();
	  }
	  return value;
	}

	function truncate(s, n) {
	  if (util.isString(s)) {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}

	function getMessage(self) {
	  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' + self.operator + ' ' + truncate(JSON.stringify(self.expected, replacer), 128);
	}

	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.

	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.

	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}

	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;

	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.

	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;

	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);

	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};

	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);

	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};

	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);

	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};

	function _deepEqual(actual, expected) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
	    if (actual.length != expected.length) return false;

	    for (var i = 0; i < actual.length; i++) {
	      if (actual[i] !== expected[i]) return false;
	    }

	    return true;

	    // 7.2. If the expected value is a Date object, the actual value is
	    // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	      return actual.getTime() === expected.getTime();

	      // 7.3 If the expected value is a RegExp object, the actual value is
	      // equivalent if it is also a RegExp object with the same source and
	      // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	    } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	        return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;

	        // 7.4. Other pairs that do not both pass typeof value == 'object',
	        // equivalence is determined by ==.
	      } else if (!util.isObject(actual) && !util.isObject(expected)) {
	          return actual == expected;

	          // 7.5 For all other Object pairs, including Array objects, equivalence is
	          // determined by having the same number of owned properties (as verified
	          // with Object.prototype.hasOwnProperty.call), the same set of keys
	          // (although not necessarily the same order), equivalent values for every
	          // corresponding key, and an identical 'prototype' property. Note: this
	          // accounts for both named and indexed properties on Arrays.
	        } else {
	            return objEquiv(actual, expected);
	          }
	}

	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}

	function objEquiv(a, b) {
	  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b)) return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b)) {
	    return a === b;
	  }
	  var aIsArgs = isArguments(a),
	      bIsArgs = isArguments(b);
	  if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs) return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b);
	  }
	  var ka = objectKeys(a),
	      kb = objectKeys(b),
	      key,
	      i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length) return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i]) return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key])) return false;
	  }
	  return true;
	}

	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);

	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};

	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);

	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};

	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};

	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }

	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  } else if (actual instanceof expected) {
	    return true;
	  } else if (expected.call({}, actual) === true) {
	    return true;
	  }

	  return false;
	}

	function _throws(shouldThrow, block, expected, message) {
	  var actual;

	  if (util.isString(expected)) {
	    message = expected;
	    expected = null;
	  }

	  try {
	    block();
	  } catch (e) {
	    actual = e;
	  }

	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');

	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }

	  if (!shouldThrow && expectedException(actual, expected)) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }

	  if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
	    throw actual;
	  }
	}

	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);

	assert.throws = function (block, /*optional*/error, /*optional*/message) {
	  _throws.apply(this, [true].concat(pSlice.call(arguments)));
	};

	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function (block, /*optional*/message) {
	  _throws.apply(this, [false].concat(pSlice.call(arguments)));
	};

	assert.ifError = function (err) {
	  if (err) {
	    throw err;
	  }
	};

	var objectKeys = _Object$keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(5);
	module.exports = __webpack_require__(11).Object.keys;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	'use strict';

	var toObject = __webpack_require__(6);

	__webpack_require__(8)('keys', function ($keys) {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	'use strict';

	var defined = __webpack_require__(7);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	"use strict";

	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	'use strict';

	module.exports = function (KEY, exec) {
	  var $def = __webpack_require__(9),
	      fn = (__webpack_require__(11).Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(12)(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(10),
	    core = __webpack_require__(11),
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
/* 10 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	'use strict';

	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var core = module.exports = { version: '1.2.2' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var _Object$keys = __webpack_require__(3)['default'];

	var _Object$getOwnPropertyNames = __webpack_require__(15)['default'];

	var _Object$getOwnPropertyDescriptor = __webpack_require__(23)['default'];

	var formatRegExp = /%[sdj%]/g;
	exports.format = function (f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function (x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s':
	        return String(args[i++]);
	      case '%d':
	        return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};

	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function (fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function () {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};

	var debugs = {};
	var debugEnviron;
	exports.debuglog = function (set) {
	  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function () {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function () {};
	    }
	  }
	  return debugs[set];
	};

	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;

	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold': [1, 22],
	  'italic': [3, 23],
	  'underline': [4, 24],
	  'inverse': [7, 27],
	  'white': [37, 39],
	  'grey': [90, 39],
	  'black': [30, 39],
	  'blue': [34, 39],
	  'cyan': [36, 39],
	  'green': [32, 39],
	  'magenta': [35, 39],
	  'red': [31, 39],
	  'yellow': [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};

	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}

	function stylizeNoColor(str, styleType) {
	  return str;
	}

	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function (val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}

	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect && value && isFunction(value.inspect) &&
	  // Filter out the util module, it's inspect function is special
	  value.inspect !== exports.inspect &&
	  // Also filter out any prototype objects using the circular check.
	  !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = _Object$keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = _Object$getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '',
	      array = false,
	      braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function (key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}

	function formatPrimitive(ctx, value) {
	  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value)) return ctx.stylize('' + value, 'number');
	  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value)) return ctx.stylize('null', 'null');
	}

	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}

	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function (key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
	    }
	  });
	  return output;
	}

	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = _Object$getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function (line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function (line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}

	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function (prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
	  typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(26);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}

	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function () {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};

	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(27);

	exports._extend = function (origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = _Object$keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(14)))

/***/ },
/* 14 */
/***/ function(module, exports) {

	// shim for using process in browser

	'use strict';

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(16), __esModule: true };

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(17);
	__webpack_require__(18);
	module.exports = function getOwnPropertyNames(it) {
	  return $.getNames(it);
	};

/***/ },
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	'use strict';

	__webpack_require__(8)('getOwnPropertyNames', function () {
	  return __webpack_require__(19).get;
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	'use strict';

	var _Object$getOwnPropertyNames = __webpack_require__(15)['default'];

	var toString = ({}).toString,
	    toIObject = __webpack_require__(20),
	    getNames = __webpack_require__(17).getNames;

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	'use strict';

	var IObject = __webpack_require__(21),
	    defined = __webpack_require__(7);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	'use strict';

	var cof = __webpack_require__(22);
	module.exports = 0 in Object('z') ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	var toString = ({}).toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(24), __esModule: true };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(17);
	__webpack_require__(25);
	module.exports = function getOwnPropertyDescriptor(it, key) {
	  return $.getDesc(it, key);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	'use strict';

	var toIObject = __webpack_require__(20);

	__webpack_require__(8)('getOwnPropertyDescriptor', function ($getOwnPropertyDescriptor) {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$create = __webpack_require__(28)['default'];

	if (typeof _Object$create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = _Object$create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function TempCtor() {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(29), __esModule: true };

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(17);
	module.exports = function create(P, D) {
	  return $.create(P, D);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(31);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	(function webpackUniversalModuleDefinition(root, factory) {
		if (true) module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if (typeof exports === 'object') exports["StyleSheet"] = factory();else root["StyleSheet"] = factory();
	})(undefined, function () {
		return (/******/(function (modules) {
				// webpackBootstrap
				/******/ // The module cache
				/******/var installedModules = {};

				/******/ // The require function
				/******/function __webpack_require__(moduleId) {

					/******/ // Check if module is in cache
					/******/if (installedModules[moduleId])
						/******/return installedModules[moduleId].exports;

					/******/ // Create a new module (and put it into the cache)
					/******/var module = installedModules[moduleId] = {
						/******/exports: {},
						/******/id: moduleId,
						/******/loaded: false
						/******/ };

					/******/ // Execute the module function
					/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

					/******/ // Flag the module as loaded
					/******/module.loaded = true;

					/******/ // Return the exports of the module
					/******/return module.exports;
					/******/
				}

				/******/ // expose the modules object (__webpack_modules__)
				/******/__webpack_require__.m = modules;

				/******/ // expose the module cache
				/******/__webpack_require__.c = installedModules;

				/******/ // __webpack_public_path__
				/******/__webpack_require__.p = "";

				/******/ // Load entry module and return exports
				/******/return __webpack_require__(0);
				/******/
			})(
			/************************************************************************/
			/******/[
			/* 0 */
			function (module, exports, __webpack_require__) {

				module.exports = __webpack_require__(1);

				/***/
			},
			/* 1 */
			function (module, exports, __webpack_require__) {

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

				'use strict';

				var _createClass = __webpack_require__(2)['default'];

				var _classCallCheck = __webpack_require__(6)['default'];

				var _Object$keys = __webpack_require__(7)['default'];

				var _Object$assign = __webpack_require__(17)['default'];

				Object.defineProperty(exports, '__esModule', {
					value: true
				});
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
						['setStylesForSelectors', 'setStylesForSelector', 'stylesForSelector', 'createStylesForSelector', 'getStylesForSelector', 'deleteStylesForSelector', 'disable', 'enable'].forEach(function (method) {
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

				/***/
			},
			/* 2 */
			function (module, exports, __webpack_require__) {

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

				/***/
			},
			/* 3 */
			function (module, exports, __webpack_require__) {

				"use strict";

				module.exports = { "default": __webpack_require__(4), __esModule: true };

				/***/
			},
			/* 4 */
			function (module, exports, __webpack_require__) {

				'use strict';

				var $ = __webpack_require__(5);
				module.exports = function defineProperty(it, key, desc) {
					return $.setDesc(it, key, desc);
				};

				/***/
			},
			/* 5 */
			function (module, exports) {

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

				/***/
			},
			/* 6 */
			function (module, exports) {

				"use strict";

				exports["default"] = function (instance, Constructor) {
					if (!(instance instanceof Constructor)) {
						throw new TypeError("Cannot call a class as a function");
					}
				};

				exports.__esModule = true;

				/***/
			},
			/* 7 */
			function (module, exports, __webpack_require__) {

				"use strict";

				module.exports = { "default": __webpack_require__(8), __esModule: true };

				/***/
			},
			/* 8 */
			function (module, exports, __webpack_require__) {

				'use strict';

				__webpack_require__(9);
				module.exports = __webpack_require__(15).Object.keys;

				/***/
			},
			/* 9 */
			function (module, exports, __webpack_require__) {

				// 19.1.2.14 Object.keys(O)
				'use strict';

				var toObject = __webpack_require__(10);

				__webpack_require__(12)('keys', function ($keys) {
					return function keys(it) {
						return $keys(toObject(it));
					};
				});

				/***/
			},
			/* 10 */
			function (module, exports, __webpack_require__) {

				// 7.1.13 ToObject(argument)
				'use strict';

				var defined = __webpack_require__(11);
				module.exports = function (it) {
					return Object(defined(it));
				};

				/***/
			},
			/* 11 */
			function (module, exports) {

				// 7.2.1 RequireObjectCoercible(argument)
				"use strict";

				module.exports = function (it) {
					if (it == undefined) throw TypeError("Can't call method on  " + it);
					return it;
				};

				/***/
			},
			/* 12 */
			function (module, exports, __webpack_require__) {

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

				/***/
			},
			/* 13 */
			function (module, exports, __webpack_require__) {

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

				/***/
			},
			/* 14 */
			function (module, exports) {

				// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
				'use strict';

				var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
				if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

				/***/
			},
			/* 15 */
			function (module, exports) {

				'use strict';

				var core = module.exports = { version: '1.2.2' };
				if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

				/***/
			},
			/* 16 */
			function (module, exports) {

				"use strict";

				module.exports = function (exec) {
					try {
						return !!exec();
					} catch (e) {
						return true;
					}
				};

				/***/
			},
			/* 17 */
			function (module, exports, __webpack_require__) {

				"use strict";

				module.exports = { "default": __webpack_require__(18), __esModule: true };

				/***/
			},
			/* 18 */
			function (module, exports, __webpack_require__) {

				'use strict';

				__webpack_require__(19);
				module.exports = __webpack_require__(15).Object.assign;

				/***/
			},
			/* 19 */
			function (module, exports, __webpack_require__) {

				// 19.1.3.1 Object.assign(target, source)
				'use strict';

				var $def = __webpack_require__(13);

				$def($def.S + $def.F, 'Object', { assign: __webpack_require__(20) });

				/***/
			},
			/* 20 */
			function (module, exports, __webpack_require__) {

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

				/***/
			},
			/* 21 */
			function (module, exports, __webpack_require__) {

				"use strict";

				module.exports = { "default": __webpack_require__(22), __esModule: true };

				/***/
			},
			/* 22 */
			function (module, exports, __webpack_require__) {

				'use strict';

				__webpack_require__(23);
				module.exports = __webpack_require__(15).Symbol;

				/***/
			},
			/* 23 */
			function (module, exports, __webpack_require__) {

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

				/***/
			},
			/* 24 */
			function (module, exports) {

				"use strict";

				var hasOwnProperty = ({}).hasOwnProperty;
				module.exports = function (it, key) {
					return hasOwnProperty.call(it, key);
				};

				/***/
			},
			/* 25 */
			function (module, exports, __webpack_require__) {

				// Thank's IE8 for his funny defineProperty
				'use strict';

				module.exports = !__webpack_require__(16)(function () {
					return Object.defineProperty({}, 'a', { get: function get() {
							return 7;
						} }).a != 7;
				});

				/***/
			},
			/* 26 */
			function (module, exports, __webpack_require__) {

				'use strict';

				module.exports = __webpack_require__(27);

				/***/
			},
			/* 27 */
			function (module, exports, __webpack_require__) {

				'use strict';

				var $ = __webpack_require__(5),
				    createDesc = __webpack_require__(28);
				module.exports = __webpack_require__(25) ? function (object, key, value) {
					return $.setDesc(object, key, createDesc(1, value));
				} : function (object, key, value) {
					object[key] = value;
					return object;
				};

				/***/
			},
			/* 28 */
			function (module, exports) {

				"use strict";

				module.exports = function (bitmap, value) {
					return {
						enumerable: !(bitmap & 1),
						configurable: !(bitmap & 2),
						writable: !(bitmap & 4),
						value: value
					};
				};

				/***/
			},
			/* 29 */
			function (module, exports, __webpack_require__) {

				'use strict';

				var global = __webpack_require__(14),
				    SHARED = '__core-js_shared__',
				    store = global[SHARED] || (global[SHARED] = {});
				module.exports = function (key) {
					return store[key] || (store[key] = {});
				};

				/***/
			},
			/* 30 */
			function (module, exports, __webpack_require__) {

				'use strict';

				var def = __webpack_require__(5).setDesc,
				    has = __webpack_require__(24),
				    TAG = __webpack_require__(31)('toStringTag');

				module.exports = function (it, tag, stat) {
					if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
				};

				/***/
			},
			/* 31 */
			function (module, exports, __webpack_require__) {

				'use strict';

				var store = __webpack_require__(29)('wks'),
				    Symbol = __webpack_require__(14).Symbol;
				module.exports = function (name) {
					return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || __webpack_require__(32))('Symbol.' + name));
				};

				/***/
			},
			/* 32 */
			function (module, exports) {

				'use strict';

				var id = 0,
				    px = Math.random();
				module.exports = function (key) {
					return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
				};

				/***/
			},
			/* 33 */
			function (module, exports, __webpack_require__) {

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

				/***/
			},
			/* 34 */
			function (module, exports, __webpack_require__) {

				// to indexed object, toObject with fallback for non-array-like ES3 strings
				'use strict';

				var IObject = __webpack_require__(35),
				    defined = __webpack_require__(11);
				module.exports = function (it) {
					return IObject(defined(it));
				};

				/***/
			},
			/* 35 */
			function (module, exports, __webpack_require__) {

				// indexed object, fallback for non-array-like ES3 strings
				'use strict';

				var cof = __webpack_require__(36);
				module.exports = 0 in Object('z') ? Object : function (it) {
					return cof(it) == 'String' ? it.split('') : Object(it);
				};

				/***/
			},
			/* 36 */
			function (module, exports) {

				"use strict";

				var toString = ({}).toString;

				module.exports = function (it) {
					return toString.call(it).slice(8, -1);
				};

				/***/
			},
			/* 37 */
			function (module, exports, __webpack_require__) {

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

				/***/
			},
			/* 38 */
			function (module, exports, __webpack_require__) {

				"use strict";

				module.exports = { "default": __webpack_require__(39), __esModule: true };

				/***/
			},
			/* 39 */
			function (module, exports, __webpack_require__) {

				'use strict';

				var $ = __webpack_require__(5);
				__webpack_require__(40);
				module.exports = function getOwnPropertyNames(it) {
					return $.getNames(it);
				};

				/***/
			},
			/* 40 */
			function (module, exports, __webpack_require__) {

				// 19.1.2.7 Object.getOwnPropertyNames(O)
				'use strict';

				__webpack_require__(12)('getOwnPropertyNames', function () {
					return __webpack_require__(37).get;
				});

				/***/
			},
			/* 41 */
			function (module, exports, __webpack_require__) {

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

				/***/
			},
			/* 42 */
			function (module, exports, __webpack_require__) {

				// 7.2.2 IsArray(argument)
				'use strict';

				var cof = __webpack_require__(36);
				module.exports = Array.isArray || function (arg) {
					return cof(arg) == 'Array';
				};

				/***/
			},
			/* 43 */
			function (module, exports, __webpack_require__) {

				'use strict';

				var isObject = __webpack_require__(44);
				module.exports = function (it) {
					if (!isObject(it)) throw TypeError(it + ' is not an object!');
					return it;
				};

				/***/
			},
			/* 44 */
			function (module, exports) {

				'use strict';

				module.exports = function (it) {
					return typeof it === 'object' ? it !== null : typeof it === 'function';
				};

				/***/
			},
			/* 45 */
			function (module, exports) {

				"use strict";

				module.exports = true;

				/***/
			}
			/******/])
		);
	});
	;
	/***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/ /***/

/***/ }
/******/ ]);