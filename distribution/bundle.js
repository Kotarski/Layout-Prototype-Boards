/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./typescript/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
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
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
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

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
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
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
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
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
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
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
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
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
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
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
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
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
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

  var base = '', array = false, braces = ['{', '}'];

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
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
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
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
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
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
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
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
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
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret) },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./typescript/-vector.ts":
/*!*******************************!*\
  !*** ./typescript/-vector.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector_asPolar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_vector/-asPolar */ "./typescript/_vector/-asPolar.ts");
/* harmony import */ var _vector_centre__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_vector/-centre */ "./typescript/_vector/-centre.ts");
/* harmony import */ var _vector_centreWith__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_vector/-centreWith */ "./typescript/_vector/-centreWith.ts");
/* harmony import */ var _vector_getAngleTo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_vector/-getAngleTo */ "./typescript/_vector/-getAngleTo.ts");
/* harmony import */ var _vector_isCloseTo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_vector/-isCloseTo */ "./typescript/_vector/-isCloseTo.ts");
/* harmony import */ var _vector_isVector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_vector/-isVector */ "./typescript/_vector/-isVector.ts");
/* harmony import */ var _vector_rotate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_vector/-rotate */ "./typescript/_vector/-rotate.ts");
/* harmony import */ var _vector_scaleWith__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_vector/-scaleWith */ "./typescript/_vector/-scaleWith.ts");
/* harmony import */ var _vector_standardise__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_vector/-standardise */ "./typescript/_vector/-standardise.ts");
/* harmony import */ var _vector_sum__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_vector/-sum */ "./typescript/_vector/-sum.ts");
/* harmony import */ var _vector_sumWith__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./_vector/-sumWith */ "./typescript/_vector/-sumWith.ts");
/* harmony import */ var _vector_subSum__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_vector/-subSum */ "./typescript/_vector/-subSum.ts");
/* harmony import */ var _vector_round__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_vector/-round */ "./typescript/_vector/-round.ts");













// TODO: Refactor using tuple unpacking stuff
const singleExtension = (inVector) => {
    return {
        vector: inVector,
        x: inVector.x,
        y: inVector.y,
        getAngleTo: Object(_vector_getAngleTo__WEBPACK_IMPORTED_MODULE_3__["default"])(inVector),
        asPolar: Object(_vector_asPolar__WEBPACK_IMPORTED_MODULE_0__["default"])(inVector),
        isCloseTo: Object(_vector_isCloseTo__WEBPACK_IMPORTED_MODULE_4__["default"])(inVector),
        sumWith: Object(_vector_sumWith__WEBPACK_IMPORTED_MODULE_10__["sumWithS"])(inVector),
        subSum: Object(_vector_subSum__WEBPACK_IMPORTED_MODULE_11__["subSumS"])(inVector),
        scaleWith: Object(_vector_scaleWith__WEBPACK_IMPORTED_MODULE_7__["scaleWithS"])(inVector),
        scaleMap: Object(_vector_scaleWith__WEBPACK_IMPORTED_MODULE_7__["scaleMapS"])(inVector),
        centreWith: Object(_vector_centreWith__WEBPACK_IMPORTED_MODULE_2__["default"])(inVector),
        rotate: Object(_vector_rotate__WEBPACK_IMPORTED_MODULE_6__["rotateS"])(inVector),
        round: Object(_vector_round__WEBPACK_IMPORTED_MODULE_12__["roundS"])(inVector)
    };
};
const multiExtension = (inVectors) => {
    return {
        vectors: inVectors,
        sum: Object(_vector_sum__WEBPACK_IMPORTED_MODULE_9__["default"])(inVectors),
        sumWith: Object(_vector_sumWith__WEBPACK_IMPORTED_MODULE_10__["sumWithM"])(inVectors),
        subSum: Object(_vector_subSum__WEBPACK_IMPORTED_MODULE_11__["subSumM"])(inVectors),
        scaleWith: Object(_vector_scaleWith__WEBPACK_IMPORTED_MODULE_7__["scaleWithM"])(inVectors),
        rotate: Object(_vector_rotate__WEBPACK_IMPORTED_MODULE_6__["rotateM"])(inVectors),
        centre: Object(_vector_centre__WEBPACK_IMPORTED_MODULE_1__["default"])(inVectors),
        round: Object(_vector_round__WEBPACK_IMPORTED_MODULE_12__["roundM"])(inVectors),
    };
};
function vectorFunction(inVectors, ...moreVectors) {
    // const vectorsAsArray = ((inVectors instanceof Array) ? inVectors : [inVectors]) as Array<T>;
    // const moreVectorsAsArray = (moreVectors !== undefined) ? moreVectors : [];
    const vCopy = Object(_vector_standardise__WEBPACK_IMPORTED_MODULE_8__["default"])(inVectors, ...moreVectors);
    const ext = (vCopy instanceof Array)
        ? multiExtension(vCopy)
        : singleExtension(vCopy);
    return Object.assign({}, ext);
}
const vectorObject = {
    sumWith: _vector_sumWith__WEBPACK_IMPORTED_MODULE_10__["sumWithS"],
    subSum: _vector_subSum__WEBPACK_IMPORTED_MODULE_11__["subSumS"],
    scaleWith: _vector_scaleWith__WEBPACK_IMPORTED_MODULE_7__["scaleWithS"],
    getAngleTo: _vector_getAngleTo__WEBPACK_IMPORTED_MODULE_3__["default"],
    isCloseTo: _vector_isCloseTo__WEBPACK_IMPORTED_MODULE_4__["default"],
    centreWith: _vector_centreWith__WEBPACK_IMPORTED_MODULE_2__["default"],
    rotate: _vector_rotate__WEBPACK_IMPORTED_MODULE_6__["rotateS"],
    round: _vector_round__WEBPACK_IMPORTED_MODULE_12__["roundS"],
    asPolar: _vector_asPolar__WEBPACK_IMPORTED_MODULE_0__["default"],
    standardise: _vector_standardise__WEBPACK_IMPORTED_MODULE_8__["default"],
    isVector: _vector_isVector__WEBPACK_IMPORTED_MODULE_5__["isVector"],
    isVectorArray: _vector_isVector__WEBPACK_IMPORTED_MODULE_5__["isVectorArray"],
};
const vector = Object.assign(vectorFunction, vectorObject);
/* harmony default export */ __webpack_exports__["default"] = (vector);


/***/ }),

/***/ "./typescript/_vector/-asPolar.ts":
/*!****************************************!*\
  !*** ./typescript/_vector/-asPolar.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return asPolar; });
/* harmony import */ var _utility_radiansToDegrees__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/-radiansToDegrees */ "./typescript/utility/-radiansToDegrees.ts");

function asPolar(inVector) {
    return () => {
        return {
            radius: Math.sqrt(Math.pow(inVector.x, 2) + Math.pow(inVector.y, 2)),
            angle: Object(_utility_radiansToDegrees__WEBPACK_IMPORTED_MODULE_0__["default"])(Math.atan2(inVector.y, inVector.x))
        };
    };
}


/***/ }),

/***/ "./typescript/_vector/-centre.ts":
/*!***************************************!*\
  !*** ./typescript/_vector/-centre.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return centre; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../-vector */ "./typescript/-vector.ts");

function centre(inVectors) {
    return () => {
        let sum = { x: 0, y: 0 };
        let count = 0;
        inVectors.forEach(inVector => {
            count += 1;
            sum.x += inVector.x;
            sum.y += inVector.y;
        });
        const mean = {
            x: sum.x / count,
            y: sum.y / count
        };
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(mean);
    };
}


/***/ }),

/***/ "./typescript/_vector/-centreWith.ts":
/*!*******************************************!*\
  !*** ./typescript/_vector/-centreWith.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return centreWith; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../-vector */ "./typescript/-vector.ts");

// TODO, THERE IS SOMETHING WRONG HERE
function centreWith(inVector) {
    return (...vectors) => {
        let sum = { x: 0, y: 0 };
        let count = 0;
        vectors.forEach(vectorSet => {
            let asArray = vectorSet instanceof Array ? vectorSet : [vectorSet];
            asArray.forEach(vector => {
                count += 1;
                sum.x += vector.x;
                sum.y += vector.y;
            });
        });
        const mean = {
            x: sum.x / count,
            y: sum.y / count
        };
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(mean);
    };
}


/***/ }),

/***/ "./typescript/_vector/-getAngleTo.ts":
/*!*******************************************!*\
  !*** ./typescript/_vector/-getAngleTo.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getAngleTo; });
function getAngleTo(inVector) {
    return (compareVector) => {
        return Math.atan2(compareVector.y - inVector.y, compareVector.x - inVector.x) * 180 / Math.PI;
    };
}


/***/ }),

/***/ "./typescript/_vector/-isCloseTo.ts":
/*!******************************************!*\
  !*** ./typescript/_vector/-isCloseTo.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isCloseTo; });
function isCloseTo(inVector) {
    return (compareVector, boundary = 5) => {
        const vectorXisClose = (Math.abs(inVector.x - compareVector.x) < boundary);
        const vectorYisClose = (Math.abs(inVector.y - compareVector.y) < boundary);
        return (vectorXisClose && vectorYisClose);
    };
}


/***/ }),

/***/ "./typescript/_vector/-isVector.ts":
/*!*****************************************!*\
  !*** ./typescript/_vector/-isVector.ts ***!
  \*****************************************/
/*! exports provided: isVector, isVectorArray, isLVector, isUVector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVector", function() { return isVector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVectorArray", function() { return isVectorArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLVector", function() { return isLVector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUVector", function() { return isUVector; });
function isVector(inVector) {
    return inVector && (isLVector(inVector) || isUVector(inVector));
}
function isVectorArray(inVectors) {
    return (inVectors instanceof Array &&
        inVectors.every(isVector));
}
function isLVector(inVector) {
    return ((typeof inVector.x === 'number') &&
        (typeof inVector.y === 'number'));
}
function isUVector(inVector) {
    return ((typeof inVector.X === 'number') &&
        (typeof inVector.Y === 'number'));
}


/***/ }),

/***/ "./typescript/_vector/-rotate.ts":
/*!***************************************!*\
  !*** ./typescript/_vector/-rotate.ts ***!
  \***************************************/
/*! exports provided: rotateS, rotateM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateS", function() { return rotateS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateM", function() { return rotateM; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../-vector */ "./typescript/-vector.ts");

function rotateS(inVector) {
    return (angle) => {
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(curriedRotate(angle)(inVector));
    };
}
function rotateM(inVectors) {
    return (angle) => {
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(inVectors.map(curriedRotate(angle)));
    };
}
function curriedRotate(angle) {
    const radians = (Math.PI / 180) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return (inVector) => {
        return {
            x: (cos * inVector.x) - (sin * inVector.y),
            y: (cos * inVector.y) + (sin * inVector.x)
        };
    };
}


/***/ }),

/***/ "./typescript/_vector/-round.ts":
/*!**************************************!*\
  !*** ./typescript/_vector/-round.ts ***!
  \**************************************/
/*! exports provided: roundS, roundM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundS", function() { return roundS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundM", function() { return roundM; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../-vector */ "./typescript/-vector.ts");

function roundS(inVector) {
    return (to = 1) => {
        const t = typeof to === "number" ? { x: to, y: to } : to;
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])({
            x: Math.round(inVector.x / (t.x)) * (t.x),
            y: Math.round(inVector.y / (t.y)) * (t.y)
        });
    };
}
function roundM(inVectors) {
    return (to = 1) => {
        const t = typeof to === "number" ? { x: to, y: to } : to;
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(inVectors.map(inVector => ({
            x: Math.round(inVector.x / (t.x)) * (t.x),
            y: Math.round(inVector.y / (t.y)) * (t.y)
        })));
    };
}


/***/ }),

/***/ "./typescript/_vector/-scaleWith.ts":
/*!******************************************!*\
  !*** ./typescript/_vector/-scaleWith.ts ***!
  \******************************************/
/*! exports provided: scaleWithS, scaleMapS, scaleWithM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleWithS", function() { return scaleWithS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleMapS", function() { return scaleMapS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleWithM", function() { return scaleWithM; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../-vector */ "./typescript/-vector.ts");

function scaleWithS(inVector) {
    return (scaleIn) => {
        const scaleVector = (typeof scaleIn === "number") ? { x: scaleIn, y: scaleIn } : scaleIn;
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(scale(inVector, scaleVector));
    };
}
function scaleMapS(inVector) {
    return (scaleIns) => {
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(scaleIns.map(scaleIn => {
            const scaleVector = (typeof scaleIn === "number") ? { x: scaleIn, y: scaleIn } : scaleIn;
            return scale(inVector, scaleVector);
        }));
    };
}
function scaleWithM(inVectors) {
    return (scaleIn) => {
        const scaleVector = (typeof scaleIn === "number") ? { x: scaleIn, y: scaleIn } : scaleIn;
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(inVectors.map(a => {
            return scale(a, scaleVector);
        }));
    };
}
function scale(a, b) {
    let bV = {
        x: ((b.x !== undefined) ? b.x : 1),
        y: ((b.y !== undefined) ? b.y : 1)
    };
    return {
        x: a.x * bV.x,
        y: a.y * bV.y
    };
}


/***/ }),

/***/ "./typescript/_vector/-standardise.ts":
/*!********************************************!*\
  !*** ./typescript/_vector/-standardise.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return standardise; });
/* harmony import */ var _isVector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-isVector */ "./typescript/_vector/-isVector.ts");

function standardise(inVectors, ...moreVectors) {
    if (typeof inVectors === "number") {
        return { x: inVectors, y: inVectors };
    }
    const vectorsAsArray = ((Object(_isVector__WEBPACK_IMPORTED_MODULE_0__["isVectorArray"])(inVectors)) ? inVectors : [inVectors]);
    const moreVectorsAsArray = ((moreVectors !== undefined) ? moreVectors : []);
    const standardised = (vectorsAsArray.concat(moreVectorsAsArray)).map(inVector => {
        if (Object(_isVector__WEBPACK_IMPORTED_MODULE_0__["isLVector"])(inVector)) {
            return { x: inVector.x, y: inVector.y };
        }
        else if (Object(_isVector__WEBPACK_IMPORTED_MODULE_0__["isUVector"])(inVector)) {
            return { x: inVector.X, y: inVector.Y };
        }
        else if (inVector instanceof Array && (typeof inVector[0] === "number") && (typeof inVector[1] === "number")) {
            return { x: inVector[0], y: inVector[1] };
        }
        else {
            //TODO 
            /*LOGSTART*/ console.error("IS NOT A VECTOR"); /*LOGEND*/
            return { x: NaN, y: NaN };
        }
    });
    if (standardised.length > 1 || Object(_isVector__WEBPACK_IMPORTED_MODULE_0__["isVectorArray"])(inVectors)) {
        return standardised;
    }
    else {
        return standardised[0];
    }
}


/***/ }),

/***/ "./typescript/_vector/-subSum.ts":
/*!***************************************!*\
  !*** ./typescript/_vector/-subSum.ts ***!
  \***************************************/
/*! exports provided: subSumS, subSumM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subSumS", function() { return subSumS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subSumM", function() { return subSumM; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../-vector */ "./typescript/-vector.ts");

function subSumS(inVector) {
    return (...sumVectors) => {
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(sub(inVector, sum(sumVectors)));
    };
}
function subSumM(inVectors) {
    return (...sumVectors) => {
        let b = sum(sumVectors);
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(inVectors.map(a => {
            return sub(a, b);
        }));
    };
}
function add(a, b) {
    return {
        x: (a.x || 0) + (b.x || 0),
        y: (a.y || 0) + (b.y || 0)
    };
}
function sub(a, b) {
    return {
        x: (a.x || 0) - (b.x || 0),
        y: (a.y || 0) - (b.y || 0)
    };
}
function sum(inVectors) {
    let sum = { x: 0, y: 0 };
    inVectors.forEach(inVector => {
        sum = add(sum, inVector);
    });
    return sum;
}


/***/ }),

/***/ "./typescript/_vector/-sum.ts":
/*!************************************!*\
  !*** ./typescript/_vector/-sum.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return sum; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../-vector */ "./typescript/-vector.ts");

function sum(inVectors) {
    return () => {
        let sum = { x: 0, y: 0 };
        inVectors.forEach(inVector => {
            sum.x += inVector.x;
            sum.y += inVector.y;
        });
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(sum);
    };
}


/***/ }),

/***/ "./typescript/_vector/-sumWith.ts":
/*!****************************************!*\
  !*** ./typescript/_vector/-sumWith.ts ***!
  \****************************************/
/*! exports provided: sumWithS, sumWithM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sumWithS", function() { return sumWithS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sumWithM", function() { return sumWithM; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../-vector */ "./typescript/-vector.ts");

function sumWithS(inVector) {
    return (...sumVectors) => {
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(add(inVector, sum(sumVectors)));
    };
}
function sumWithM(inVectors) {
    return (...sumVectors) => {
        let b = sum(sumVectors);
        return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(inVectors.map(a => {
            return add(a, b);
        }));
    };
}
function add(a, b) {
    return {
        x: (a.x || 0) + (b.x || 0),
        y: (a.y || 0) + (b.y || 0)
    };
}
function sum(inVectors) {
    let sum = { x: 0, y: 0 };
    inVectors.forEach(inVector => {
        sum = add(sum, inVector);
    });
    return sum;
}


/***/ }),

/***/ "./typescript/circuit/+component.ts":
/*!******************************************!*\
  !*** ./typescript/circuit/+component.ts ***!
  \******************************************/
/*! exports provided: Types, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Types", function() { return Types; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg/element/+group */ "./typescript/svg/element/+group.ts");
var Types;
(function (Types) {
    ;
    ;
    ;
    ;
})(Types || (Types = {}));

class Component {
    constructor(values) {
        this.group = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_0__["make"])();
        this.connectorSets = [];
        this.name = values.name;
        this.disabled = values.disabled || false;
    }
}


/***/ }),

/***/ "./typescript/circuit/+diagram.ts":
/*!****************************************!*\
  !*** ./typescript/circuit/+diagram.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Diagram; });
/* harmony import */ var _svg_root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svg/+root */ "./typescript/svg/+root.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events */ "./typescript/circuit/events.ts");
//TODO FOLDER STRUCTURE


class Diagram {
    // Make and draw this
    constructor(node) {
        // For Self
        this.root = new _svg_root__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.group = this.root.group;
        this.root.draw(node);
        $(this.root.element.element).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].drag, (e, drag) => {
            if (e.target === this.root.element.element) {
                this.root.group.translate(drag);
            }
        });
    }
}


/***/ }),

/***/ "./typescript/circuit/_history/-addEvent.ts":
/*!**************************************************!*\
  !*** ./typescript/circuit/_history/-addEvent.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addEvent; });
function addEvent(state, ...participants) {
    // Discard events after the current one if they exist
    const currentIdx = state.currentIdx + 1, lastIdx = currentIdx;
    const previousEvents = state.events.slice(0, lastIdx);
    // Create new event
    const newEvent = participants.map(participant => ({
        participant,
        state: participant.getState()
    }));
    // Return new state
    const events = [...previousEvents, newEvent];
    return { events, currentIdx, lastIdx };
}


/***/ }),

/***/ "./typescript/circuit/_history/-factory.ts":
/*!*************************************************!*\
  !*** ./typescript/circuit/_history/-factory.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return factory; });
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-init */ "./typescript/circuit/_history/-init.ts");
/* harmony import */ var _addEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./-addEvent */ "./typescript/circuit/_history/-addEvent.ts");
/* harmony import */ var _undoEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./-undoEvent */ "./typescript/circuit/_history/-undoEvent.ts");
/* harmony import */ var _redoEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./-redoEvent */ "./typescript/circuit/_history/-redoEvent.ts");
/* harmony import */ var _mergeEvents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./-mergeEvents */ "./typescript/circuit/_history/-mergeEvents.ts");





function factory(...initialParticipants) {
    let state = Object(_init__WEBPACK_IMPORTED_MODULE_0__["default"])(...initialParticipants);
    return {
        reInit(...participants) {
            state = Object(_init__WEBPACK_IMPORTED_MODULE_0__["default"])(...participants);
        },
        add(...participants) {
            state = Object(_addEvent__WEBPACK_IMPORTED_MODULE_1__["default"])(state, ...participants);
        },
        undo() {
            state = Object(_undoEvent__WEBPACK_IMPORTED_MODULE_2__["default"])(state);
        },
        redo() {
            state = Object(_redoEvent__WEBPACK_IMPORTED_MODULE_3__["default"])(state);
        },
        mergeLast(mergeCount = 1) {
            state = Object(_mergeEvents__WEBPACK_IMPORTED_MODULE_4__["default"])(state, mergeCount);
        },
        getState() {
            return Object.assign({}, state, { events: [...state.events] });
        }
    };
}


/***/ }),

/***/ "./typescript/circuit/_history/-init.ts":
/*!**********************************************!*\
  !*** ./typescript/circuit/_history/-init.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return init; });
/* harmony import */ var _addEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-addEvent */ "./typescript/circuit/_history/-addEvent.ts");

function init(...participants) {
    // Clear events, and reset indices
    const events = [];
    const currentIdx = -1, lastIdx = -1;
    // Add an initial event
    return Object(_addEvent__WEBPACK_IMPORTED_MODULE_0__["default"])({ events, currentIdx, lastIdx }, ...participants);
}


/***/ }),

/***/ "./typescript/circuit/_history/-mergeEvents.ts":
/*!*****************************************************!*\
  !*** ./typescript/circuit/_history/-mergeEvents.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mergeEvents; });
function mergeEvents(state, mergeCount) {
    const mergeStartIdx = Math.max(0, state.lastIdx - mergeCount);
    const eventsToMerge = state.events.slice(mergeStartIdx);
    const previousEvents = state.events.slice(0, mergeStartIdx);
    const mergedEvent = [];
    eventsToMerge.forEach(event => {
        event.forEach(dev => {
            if (!mergedEvent.some(mDev => mDev.participant === dev.participant)) {
                mergedEvent.push(dev);
            }
        });
    });
    const events = [...previousEvents, mergedEvent];
    const lastIdx = mergeStartIdx;
    const currentIdx = (state.currentIdx > state.lastIdx)
        ? lastIdx
        : state.currentIdx;
    return { events, currentIdx, lastIdx };
}


/***/ }),

/***/ "./typescript/circuit/_history/-redoEvent.ts":
/*!***************************************************!*\
  !*** ./typescript/circuit/_history/-redoEvent.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return redoEvent; });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events */ "./typescript/circuit/events.ts");
//TODO: Remove Events dependancy

function redoEvent(state) {
    if (state.currentIdx >= state.lastIdx)
        return state;
    // Go forward one event
    const currentIdx = state.currentIdx + 1;
    const currentEvent = state.events[currentIdx];
    // Get the current state of all participants that will be reverted
    const undoEvent = currentEvent.map(development => development.participant).map(participant => ({
        participant,
        state: participant.getState()
    }));
    // Unrevert the current participants
    currentEvent.forEach(development => {
        Object.assign(development.participant, development.state);
        if (development.participant.group) {
            $(development.participant.group.element).trigger(_events__WEBPACK_IMPORTED_MODULE_0__["default"].place);
        }
    });
    // Replace the redone event with an event to undo it
    const previousEvents = state.events.slice(0, currentIdx);
    const nextEvents = state.events.slice(currentIdx + 1);
    const events = [...previousEvents, undoEvent, ...nextEvents];
    return { events, currentIdx, lastIdx: state.lastIdx };
}


/***/ }),

/***/ "./typescript/circuit/_history/-undoEvent.ts":
/*!***************************************************!*\
  !*** ./typescript/circuit/_history/-undoEvent.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return undoEvent; });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events */ "./typescript/circuit/events.ts");
//import * as $ from 'jquery';
//TODO: Remove Events dependancy

function undoEvent(state) {
    if (state.currentIdx <= 0)
        return state;
    const currentEvent = state.events[state.currentIdx];
    // Get the current state of all participants that will be reverted
    const redoEvent = currentEvent.map(development => development.participant).map(participant => ({
        participant,
        state: participant.getState()
    }));
    // Revert the current participants
    currentEvent.forEach(development => {
        Object.assign(development.participant, development.state);
        if (development.participant.group) {
            $(development.participant.group.element).trigger(_events__WEBPACK_IMPORTED_MODULE_0__["default"].draw);
        }
    });
    // Replace the undone event with an event to redo it
    const previousEvents = state.events.slice(0, state.currentIdx);
    const nextEvents = state.events.slice(state.currentIdx + 1);
    const events = [...previousEvents, redoEvent, ...nextEvents];
    // Go back one event
    const currentIdx = state.currentIdx - 1;
    return { events, currentIdx, lastIdx: state.lastIdx };
}


/***/ }),

/***/ "./typescript/circuit/component/_bipolar/-drawLayout.ts":
/*!**************************************************************!*\
  !*** ./typescript/circuit/component/_bipolar/-drawLayout.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawLayout; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_bipolar/constants.ts");
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+text */ "./typescript/svg/element/+text.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");





function drawLayout(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_4__["make"])("body");
    const emitterEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXEMITTER"]];
    const collectorEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXCOLLECTOR"]];
    const baseEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXBASE"]];
    const centre = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(emitterEnd, collectorEnd, baseEnd).centre().vector;
    const rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(emitterEnd).getAngleTo(baseEnd);
    const [emitterStart, collectorStart, baseStart] = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])({ x: -12, y: 3 }, { x: 0, y: -2 }, { x: 12, y: 3 }).rotate(rotation).sumWith(centre).vectors;
    const joints = [
        [emitterStart, emitterEnd],
        [collectorStart, collectorEnd],
        [baseStart, baseEnd],
    ];
    const semiCircleString = "M " + (16) + " " + (4) +
        "a " + (1) + " " + (1) + " " + (0) + " " + (0) + " " + (0) + " " + (-32) + " " + (0) +
        "v " + (3) +
        "h " + (32) +
        "v " + (-3) +
        "Z";
    bodyGroup.append(Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(semiCircleString, "body highlight"), Object(_svg_element_text__WEBPACK_IMPORTED_MODULE_3__["make"])(instance.type, { x: 0, y: 4 }, "text"));
    return [
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(joints, "lead"),
        bodyGroup.translate(centre).rotate(rotation),
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(joints, "leadguide")
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_bipolar/-drawSchematic.ts":
/*!*****************************************************************!*\
  !*** ./typescript/circuit/component/_bipolar/-drawSchematic.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawSchematic; });
/* harmony import */ var _utility_getStandardForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utility/-getStandardForm */ "./typescript/utility/-getStandardForm.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_bipolar/constants.ts");
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+text */ "./typescript/svg/element/+text.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_line__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../svg/element/+line */ "./typescript/svg/element/+line.ts");
/* harmony import */ var _svg_element_circle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../svg/element/+circle */ "./typescript/svg/element/+circle.ts");








function drawSchematic(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_5__["make"])("body");
    const emitterEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_2__["INDEXEMITTER"]];
    const collectorEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_2__["INDEXCOLLECTOR"]];
    const baseEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_2__["INDEXBASE"]];
    // Same as vector([{ x: 7, y: 6 }, { x: 7, y: -6 }, { x: -7, y: 0 }, { x: 7, y: 6 }])
    //    .rotate(149 | -31).sumWith({ x: 18, y: -9.2 } | { x: 6, y: -16.4 })
    const arrowJoints = (instance.type === "PNP")
        ? [{ x: 15, y: -18 }, { x: 9, y: -7.5 }, { x: 24, y: -5.5 }, { x: 15, y: -18 }]
        : [{ x: 9, y: -7.5 }, { x: 15, y: -18 }, { x: 0, y: -20 }, { x: 9, y: -7.5 }];
    // The drawings orientation (before transforms) is: 
    //   emitter at the top
    //   collector at the bottom
    //   base to the right
    bodyGroup.append(
    //Highlight
    Object(_svg_element_circle__WEBPACK_IMPORTED_MODULE_7__["make"])({ x: 10, y: 0 }, 30, "extrathick highlight"), 
    //Base Vertical Bar
    Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_6__["make"])({ x: 25, y: -15 }, { x: 25, y: +15 }, "line medium-thick nocap"), 
    //Collector Angled Line
    Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_6__["make"])({ x: 25, y: -5 }, { x: 0, y: -20 }, "line thin"), 
    //Emitter Angled Line
    Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_6__["make"])({ x: 25, y: 5 }, { x: 0, y: 20 }, "line thin"), 
    //Base Horizontal Line to circle
    Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_6__["make"])({ x: 25, y: 0 }, { x: 40, y: 0 }, "line thin"), 
    //Collector Vertical Line to circle
    Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_6__["make"])({ x: 0, y: -20 }, { x: 0, y: -28 }, "line thin"), 
    //Emitter Vertical Line to circle
    Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_6__["make"])({ x: 0, y: 20 }, { x: 0, y: 28 }, "line thin"), 
    //Arrow
    Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])(arrowJoints, "body black thin"), 
    //Circle
    Object(_svg_element_circle__WEBPACK_IMPORTED_MODULE_7__["make"])({ x: 10, y: 0 }, 30, "line medium nofill"));
    // Image centre does not take base into account
    // Is always directly between the emitter and collector
    const centre = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])(emitterEnd, collectorEnd).centre().vector;
    // all angles are relative to the x-axis, hence in default orientation:
    //   when no rotation is required, angleEmitterCentre = 90, 
    const angleCentreBase = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])(centre).getAngleTo(baseEnd);
    const angleEmitterCollector = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])(emitterEnd).getAngleTo(collectorEnd);
    const rotation = angleEmitterCollector - 90;
    // Don't ask.
    const scale = (((angleEmitterCollector - angleCentreBase + 360) % 360) > 180)
        ? { x: -1 }
        : { x: 1 };
    // Only the start of the connections should be transformed, 
    // the ends should be absolute.
    // (Hence using vector transforms, not svg transforms)
    const [emitterStart, collectorStart, baseStart] = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])({ x: 0, y: -28 }, { x: 0, y: 28 }, { x: 40, y: 0 }).scaleWith(scale).rotate(rotation).sumWith(centre).vectors;
    const joints = [
        [emitterStart, emitterEnd],
        [collectorStart, collectorEnd],
        [baseStart, baseEnd],
    ];
    const text = Object(_utility_getStandardForm__WEBPACK_IMPORTED_MODULE_0__["default"])(instance.currentGain, '');
    const textEl = Object(_svg_element_text__WEBPACK_IMPORTED_MODULE_4__["make"])(text, Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])({ x: -40, y: 0 }).scaleWith(scale), "text");
    return [
        bodyGroup.translate(centre).rotate(rotation).scale(scale, false),
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])(joints, "line thin"),
        textEl.translate(centre).rotatePosition(rotation),
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_bipolar/-loadLayout.ts":
/*!**************************************************************!*\
  !*** ./typescript/circuit/component/_bipolar/-loadLayout.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadLayout; });
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_bipolar/-makeLayout.ts");

function loadLayout(raw) {
    const name = (raw.name);
    const currentGain = (raw.currentGain);
    const type = (raw.type);
    const joints = (raw.joints);
    return Object(_makeLayout__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, currentGain, type, joints });
}


/***/ }),

/***/ "./typescript/circuit/component/_bipolar/-loadSchematic.ts":
/*!*****************************************************************!*\
  !*** ./typescript/circuit/component/_bipolar/-loadSchematic.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadSchematic; });
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_bipolar/-makeSchematic.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");



function loadSchematic(raw) {
    const name = (raw.name);
    const currentGain = (raw.currentGain);
    const type = (raw.type);
    // Joints Block
    const orientation = _valueCheck__WEBPACK_IMPORTED_MODULE_2__["default"].validate(["LR", "RL"], "LR")(raw.orientation);
    const where = _valueCheck__WEBPACK_IMPORTED_MODULE_2__["default"].where({ x: 0, y: 0 })(raw.where);
    const joints = (raw.joints || deriveJoints(orientation, type, where));
    return Object(_makeSchematic__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, currentGain, type, joints });
}
const deriveJoints = (orientation, type, where) => {
    const [emitter, collector] = type === "PNP"
        ? [{ x: 0, y: -50 }, { x: 0, y: +50 }]
        : [{ x: 0, y: +50 }, { x: 0, y: -50 }];
    const [base, offset] = orientation === "LR"
        ? [{ x: -60, y: 0 }, { x: +10 }]
        : [{ x: +60, y: 0 }, { x: -10 }];
    return Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])([emitter, collector, base]).sumWith(where, offset).vectors;
};


/***/ }),

/***/ "./typescript/circuit/component/_bipolar/-makeLayout.ts":
/*!**************************************************************!*\
  !*** ./typescript/circuit/component/_bipolar/-makeLayout.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_bipolar/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_extendable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/extendable */ "./typescript/circuit/component/addins/extendable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");








const defaulterLayout = {
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 20, y: -20 }, { x: 40, y: 0 }]),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "bipolar"),
    currentGain: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0),
    type: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate(["NPN", "PNP"], "NPN")
};
const makeLayout = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["BipolarLayout"], defaulterLayout, _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_extendable__WEBPACK_IMPORTED_MODULE_6__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeLayout);


/***/ }),

/***/ "./typescript/circuit/component/_bipolar/-makeSchematic.ts":
/*!*****************************************************************!*\
  !*** ./typescript/circuit/component/_bipolar/-makeSchematic.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_bipolar/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_extendable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/extendable */ "./typescript/circuit/component/addins/extendable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");








const defaulterSchematic = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "bipolar"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: -50, y: 0 }, { x: +10, y: -50 }, { x: +10, y: +50 }]),
    currentGain: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0),
    type: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate(["NPN", "PNP"], "NPN")
};
const makeSchematic = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["BipolarSchematic"], defaulterSchematic, _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__["default"], _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_extendable__WEBPACK_IMPORTED_MODULE_6__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeSchematic);


/***/ }),

/***/ "./typescript/circuit/component/_bipolar/-maps.ts":
/*!********************************************************!*\
  !*** ./typescript/circuit/component/_bipolar/-maps.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generics_makeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generics/-makeMap */ "./typescript/circuit/generics/-makeMap.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_bipolar/~classes.ts");
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_bipolar/-makeSchematic.ts");
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_bipolar/-makeLayout.ts");
/* harmony import */ var _loadSchematic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./-loadSchematic */ "./typescript/circuit/component/_bipolar/-loadSchematic.ts");
/* harmony import */ var _loadLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./-loadLayout */ "./typescript/circuit/component/_bipolar/-loadLayout.ts");






const schematicMap = {
    savename: "makeBipolar",
    diagramType: "schematic",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["BipolarSchematic"],
    make: _makeSchematic__WEBPACK_IMPORTED_MODULE_2__["default"],
    load: _loadSchematic__WEBPACK_IMPORTED_MODULE_4__["default"],
};
const layoutMap = {
    savename: "makeLayoutBipolar",
    diagramType: "layout",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["BipolarLayout"],
    make: _makeLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
    load: _loadLayout__WEBPACK_IMPORTED_MODULE_5__["default"],
};
const maps = {
    schematic: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(schematicMap, layoutMap),
    layout: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(layoutMap, schematicMap)
};
/* harmony default export */ __webpack_exports__["default"] = (maps);


/***/ }),

/***/ "./typescript/circuit/component/_bipolar/constants.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_bipolar/constants.ts ***!
  \************************************************************/
/*! exports provided: INDEXEMITTER, INDEXCOLLECTOR, INDEXBASE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXEMITTER", function() { return INDEXEMITTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXCOLLECTOR", function() { return INDEXCOLLECTOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXBASE", function() { return INDEXBASE; });
const INDEXEMITTER = 0;
const INDEXCOLLECTOR = 1;
const INDEXBASE = 2;


/***/ }),

/***/ "./typescript/circuit/component/_bipolar/~classes.ts":
/*!***********************************************************!*\
  !*** ./typescript/circuit/component/_bipolar/~classes.ts ***!
  \***********************************************************/
/*! exports provided: BipolarSchematic, BipolarLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BipolarSchematic", function() { return BipolarSchematic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BipolarLayout", function() { return BipolarLayout; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../+component */ "./typescript/circuit/+component.ts");
/* harmony import */ var _utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utility/-deepCopy */ "./typescript/utility/-deepCopy.ts");
/* harmony import */ var _utility_insert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/~insert */ "./typescript/utility/~insert.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_bipolar/constants.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../generics/-getComponentConnections */ "./typescript/circuit/generics/-getComponentConnections.ts");
/* harmony import */ var _generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../generics/-makeConnector */ "./typescript/circuit/generics/-makeConnector.ts");
/* harmony import */ var _drawLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./-drawLayout */ "./typescript/circuit/component/_bipolar/-drawLayout.ts");
/* harmony import */ var _drawSchematic__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./-drawSchematic */ "./typescript/circuit/component/_bipolar/-drawSchematic.ts");

;








//import * as $ from 'jquery';
class BipolarBase extends _component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(values) {
        super(values);
        $(this.group.element).addClass("component " + this.name);
        this.joints = values.joints;
        this.type = values.type;
        this.currentGain = values.currentGain;
    }
    getProperties() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            name: this.name,
            currentGain: this.currentGain,
            type: this.type
        });
    }
    getState() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            joints: this.joints,
            disabled: this.disabled
        });
    }
    insertInto(element) {
        _utility_insert__WEBPACK_IMPORTED_MODULE_2__["default"].last(this.group.element, element);
    }
    transferFunction() { return []; }
    ;
}
class BipolarSchematic extends BipolarBase {
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawSchematic__WEBPACK_IMPORTED_MODULE_8__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_5__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_4__["default"].schematic);
    }
    makeConnectors() {
        this.connectorSets = [[
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "emitter", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_3__["INDEXEMITTER"]], "e"),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "collector", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_3__["INDEXCOLLECTOR"]], "c"),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "base", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_3__["INDEXBASE"]], "b")
            ]];
    }
}
class BipolarLayout extends BipolarBase {
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawLayout__WEBPACK_IMPORTED_MODULE_7__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_5__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_4__["default"].layout);
    }
    makeConnectors() {
        this.connectorSets = [[
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "emitter", "pin", this.joints[_constants__WEBPACK_IMPORTED_MODULE_3__["INDEXEMITTER"]], "e"),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "collector", "pin", this.joints[_constants__WEBPACK_IMPORTED_MODULE_3__["INDEXCOLLECTOR"]], "c"),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "base", "pin", this.joints[_constants__WEBPACK_IMPORTED_MODULE_3__["INDEXBASE"]], "b")
            ]];
    }
}


/***/ }),

/***/ "./typescript/circuit/component/_breadboard/-drawLarge.ts":
/*!****************************************************************!*\
  !*** ./typescript/circuit/component/_breadboard/-drawLarge.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawLarge; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_breadboard/constants.ts");
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_rect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+rect */ "./typescript/svg/element/+rect.ts");
/* harmony import */ var _svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../svg/element/groups/+textSequence */ "./typescript/svg/element/groups/+textSequence.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../~constants */ "./typescript/~constants.ts");







function drawLarge(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_3__["make"])("body");
    const centre = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXCENTRE"]];
    const rotationPoint = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXROTATION"]];
    let rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(centre).getAngleTo(rotationPoint);
    const gS = _constants__WEBPACK_IMPORTED_MODULE_6__["gridSpacing"];
    // Power Rails strings:
    const railPairPathString = [
        "M" + (gS * -29.7) + " " + (gS * -10.5),
        "H" + (gS * -1),
        "M" + (gS * +29.7) + " " + (gS * -10.5),
        "H" + (gS * 1),
        "M" + (gS * -29.7) + " " + (gS * 7.5),
        "H" + (gS * -1),
        "M" + (gS * +29.7) + " " + (gS * 7.5),
        "H" + (gS * 1)
    ].join();
    const plus = "m-5 0 h10 m-5 -5 v10 m0 -5";
    const plussesPathString = [
        "M" + (gS * -30.5) + " " + (gS * -10),
        "M" + (gS * 30.5) + " " + (gS * -10),
        "M" + (gS * -30.5) + " " + (gS * 8),
        "M" + (gS * 30.5) + " " + (gS * 8),
        "" // Do not remove.     
    ].join(plus);
    const minus = "m0 -5 v10 m0 -5";
    const minusesPathString = [
        "M" + (gS * -30.5) + " " + (gS * -11),
        "M" + (gS * 30.5) + " " + (gS * -11),
        "M" + (gS * -30.5) + " " + (gS * 7),
        "M" + (gS * 30.5) + " " + (gS * 7),
        "" // Do not remove.  
    ].join(minus);
    const size = {
        width: 67 * gS,
        height: 22 * gS
    };
    bodyGroup.append([
        //Body
        Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 0, y: 0 }, size, { x: 4, y: 4 }, "body"),
        //Centre rut
        Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 0, y: 0 }, { width: size.width, height: gS * 0.75, }, { x: 0, y: 0 }, "rut"),
        //Body Highlights
        Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 0, y: 0 }, size, { x: 4, y: 4 }, "body highlight"),
        //Power rail positives
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(railPairPathString + plussesPathString, "rail positive"),
        //Power rail negatives
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(railPairPathString + minusesPathString, "rail negative").translate({ x: 0, y: gS * 3 }),
        //Text Left (portrait)
        Object(_svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 31.5 * gS - gS / 6, y: -6.5 * gS }, { x: 0, y: gS }, { start: 1, length: 64 }).rotate(90),
        //Text Right (portrait)
        Object(_svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 31.5 * gS - gS / 6, y: 6.5 * gS }, { x: 0, y: gS }, { start: 1, length: 64 }).rotate(90),
        //Text Top Left (portrait)
        Object(_svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 32.5 * gS - gS / 4, y: -5.5 * gS }, { x: gS, y: 0 }, "abcde").rotate(90),
        //Text Bottom Left (portrait)
        Object(_svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: -32.5 * gS, y: -5.5 * gS }, { x: gS, y: 0 }, "abcde").rotate(90),
        //Text Top Right (portrait)
        Object(_svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 32.5 * gS - gS / 4, y: 5.5 * gS }, { x: -gS, y: 0 }, "jihgf").rotate(90),
        //Text Bottom Right (portrait)
        Object(_svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: -32.5 * gS, y: 5.5 * gS }, { x: -gS, y: 0 }, "jihgf").rotate(90),
    ]);
    return [
        bodyGroup.translate(centre).rotate(rotation)
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_breadboard/-drawSmall.ts":
/*!****************************************************************!*\
  !*** ./typescript/circuit/component/_breadboard/-drawSmall.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawSmall; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_breadboard/constants.ts");
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_rect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+rect */ "./typescript/svg/element/+rect.ts");
/* harmony import */ var _svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../svg/element/groups/+textSequence */ "./typescript/svg/element/groups/+textSequence.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../~constants */ "./typescript/~constants.ts");







function drawSmall(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_3__["make"])("body");
    const centre = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXCENTRE"]];
    const rotationPoint = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXROTATION"]];
    let rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(centre).getAngleTo(rotationPoint);
    const gS = _constants__WEBPACK_IMPORTED_MODULE_6__["gridSpacing"];
    // Power Rails strings:
    const railPairPathString = [
        "M" + (gS * -14.2) + " " + (gS * -10.5),
        "H" + (gS * 14.2),
        "M" + (gS * -14.2) + " " + (gS * 7.5),
        "H" + (gS * 14.2)
    ].join();
    const plus = "m-5 0 h10 m-5 -5 v10 m0 -5";
    const plussesPathString = [
        "M" + (gS * -15) + " " + (gS * -10),
        "M" + (gS * 15) + " " + (gS * -10),
        "M" + (gS * -15) + " " + (gS * 8),
        "M" + (gS * 15) + " " + (gS * 8),
        "" // Do not remove.     
    ].join(plus);
    const minus = "m0 -5 v10 m0 -5";
    const minusesPathString = [
        "M" + (gS * -15) + " " + (gS * -11),
        "M" + (gS * 15) + " " + (gS * -11),
        "M" + (gS * -15) + " " + (gS * 7),
        "M" + (gS * 15) + " " + (gS * 7),
        "" // Do not remove.  
    ].join(minus);
    const size = {
        width: 32 * gS,
        height: 22 * gS
    };
    bodyGroup.append([
        //Body
        Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 0, y: 0 }, size, { x: 4, y: 4 }, "body"),
        //Centre rut
        Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 0, y: 0 }, { width: size.width, height: gS * 0.75, }, { x: 0, y: 0 }, "rut"),
        //Body Highlights
        Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 0, y: 0 }, size, { x: 4, y: 4 }, "body highlight"),
        //Power rail positives
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(railPairPathString + plussesPathString, "rail positive"),
        //Power rail negatives
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(railPairPathString + minusesPathString, "rail negative").translate({ x: 0, y: gS * 3 }),
        //Text Left (portrait)
        Object(_svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 14.5 * gS - gS / 6, y: -6.5 * gS }, { x: 0, y: gS }, { start: 1, length: 30 }).rotate(90),
        //Text Right (portrait)
        Object(_svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 14.5 * gS - gS / 6, y: 6.5 * gS }, { x: 0, y: gS }, { start: 1, length: 30 }).rotate(90),
        //Text Top Left (portrait)
        Object(_svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 15.5 * gS - gS / 4, y: -5.5 * gS }, { x: gS, y: 0 }, "abcde").rotate(90),
        //Text Bottom Left (portrait)
        Object(_svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: -15.5 * gS, y: -5.5 * gS }, { x: gS, y: 0 }, "abcde").rotate(90),
        //Text Top Right (portrait)
        Object(_svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 15.5 * gS - gS / 4, y: 5.5 * gS }, { x: -gS, y: 0 }, "jihgf").rotate(90),
        //Text Bottom Right (portrait)
        Object(_svg_element_groups_textSequence__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: -15.5 * gS, y: 5.5 * gS }, { x: -gS, y: 0 }, "jihgf").rotate(90),
    ]);
    return [
        bodyGroup.translate(centre).rotate(rotation)
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_breadboard/-loadLarge.ts":
/*!****************************************************************!*\
  !*** ./typescript/circuit/component/_breadboard/-loadLarge.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadLarge; });
/* harmony import */ var _makeLarge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeLarge */ "./typescript/circuit/component/_breadboard/-makeLarge.ts");

function loadLarge(raw) {
    const name = (raw.name);
    const joints = (raw.joints);
    return Object(_makeLarge__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, joints });
}


/***/ }),

/***/ "./typescript/circuit/component/_breadboard/-loadSmall.ts":
/*!****************************************************************!*\
  !*** ./typescript/circuit/component/_breadboard/-loadSmall.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadSmall; });
/* harmony import */ var _makeSmall__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeSmall */ "./typescript/circuit/component/_breadboard/-makeSmall.ts");

function loadSmall(raw) {
    const name = (raw.name);
    const joints = (raw.joints);
    return Object(_makeSmall__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, joints });
}


/***/ }),

/***/ "./typescript/circuit/component/_breadboard/-makeLarge.ts":
/*!****************************************************************!*\
  !*** ./typescript/circuit/component/_breadboard/-makeLarge.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_breadboard/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_board__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/board */ "./typescript/circuit/component/addins/board.ts");
/* harmony import */ var _addins_wiresCreatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/wiresCreatable */ "./typescript/circuit/component/addins/wiresCreatable.ts");








const defaulterLarge = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "breadboardlarge"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 20, y: 0 }]),
};
const makeLarge = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Large"], defaulterLarge, _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_board__WEBPACK_IMPORTED_MODULE_6__["default"], _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_wiresCreatable__WEBPACK_IMPORTED_MODULE_7__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeLarge);


/***/ }),

/***/ "./typescript/circuit/component/_breadboard/-makeSmall.ts":
/*!****************************************************************!*\
  !*** ./typescript/circuit/component/_breadboard/-makeSmall.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_breadboard/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_board__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/board */ "./typescript/circuit/component/addins/board.ts");
/* harmony import */ var _addins_wiresCreatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/wiresCreatable */ "./typescript/circuit/component/addins/wiresCreatable.ts");
/* harmony import */ var _addins_rotatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../addins/rotatable */ "./typescript/circuit/component/addins/rotatable.ts");









const defaulterSmall = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "breadboardsmall"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 20, y: 0 }]),
};
const makeSmall = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Small"], defaulterSmall, _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_board__WEBPACK_IMPORTED_MODULE_6__["default"], _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_wiresCreatable__WEBPACK_IMPORTED_MODULE_7__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_rotatable__WEBPACK_IMPORTED_MODULE_8__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeSmall);


/***/ }),

/***/ "./typescript/circuit/component/_breadboard/-makeTracks.ts":
/*!*****************************************************************!*\
  !*** ./typescript/circuit/component/_breadboard/-makeTracks.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return makeTracks; });
/* harmony import */ var _track_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_track/-maps */ "./typescript/circuit/component/_track/-maps.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../~constants */ "./typescript/~constants.ts");



function makeTracks(parent, size) {
    return (size === "small") ? makeTracksSmall(parent) : makeTracksLarge(parent);
}
function makeTracksSmall(parent) {
    let tracks = [];
    let gS = _constants__WEBPACK_IMPORTED_MODULE_2__["gridSpacing"];
    let rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])(parent.joints[0]).getAngleTo(parent.joints[1]);
    let powerTrackYPositions = [-9.5, -8.5, 8.5, 9.5];
    for (let y of powerTrackYPositions) {
        const start = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])({ x: gS * -14, y: y * gS })
            .rotate(rotation)
            .sumWith(parent.joints[0]);
        const step = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])({ x: gS, y: 0 }).rotate(rotation);
        let track = _track_maps__WEBPACK_IMPORTED_MODULE_0__["default"].make({
            holeSpacings: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
            joints: [start, step]
        }, false);
        tracks.push(track);
    }
    let mainGridTrackXPositions = [...Array(30).keys()];
    let mainGridTrackYPositions = [-5.5, +1.5];
    for (let x of mainGridTrackXPositions) {
        for (let y of mainGridTrackYPositions) {
            const start = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])({ x: (x - 14.5) * gS, y: y * gS })
                .rotate(rotation)
                .sumWith(parent.joints[0]);
            const step = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])({ x: 0, y: gS }).rotate(rotation);
            let track = _track_maps__WEBPACK_IMPORTED_MODULE_0__["default"].make({
                holeSpacings: [0, 1, 1, 1, 1],
                joints: [start, step]
            }, false);
            tracks.push(track);
        }
    }
    return tracks;
}
function makeTracksLarge(parent) {
    let tracks = [];
    let gS = _constants__WEBPACK_IMPORTED_MODULE_2__["gridSpacing"];
    let rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])(parent.joints[0]).getAngleTo(parent.joints[1]);
    let powerTrackYPositions = [-9.5, -8.5, 8.5, 9.5];
    let powerTrackXPositions = [-29.5, 1.5];
    for (let x of powerTrackXPositions) {
        for (let y of powerTrackYPositions) {
            const start = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])({ x: x * gS, y: y * gS })
                .rotate(rotation)
                .sumWith(parent.joints[0]);
            const step = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])({ x: gS, y: 0 }).rotate(rotation);
            let track = _track_maps__WEBPACK_IMPORTED_MODULE_0__["default"].make({
                holeSpacings: [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1],
                joints: [start, step]
            }, false);
            tracks.push(track);
        }
    }
    let mainGridTrackXPositions = [...Array(64).keys()];
    let mainGridTrackYPositions = [-5.5, +1.5];
    for (let x of mainGridTrackXPositions) {
        for (let y of mainGridTrackYPositions) {
            const start = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])({ x: (x - 31.5) * gS, y: y * gS })
                .rotate(rotation)
                .sumWith(parent.joints[0]);
            const step = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])({ x: 0, y: gS }).rotate(rotation);
            let track = _track_maps__WEBPACK_IMPORTED_MODULE_0__["default"].make({
                holeSpacings: [0, 1, 1, 1, 1],
                joints: [start, step]
            }, false);
            tracks.push(track);
        }
    }
    return tracks;
}


/***/ }),

/***/ "./typescript/circuit/component/_breadboard/-maps.ts":
/*!***********************************************************!*\
  !*** ./typescript/circuit/component/_breadboard/-maps.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generics_makeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generics/-makeMap */ "./typescript/circuit/generics/-makeMap.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_breadboard/~classes.ts");
/* harmony import */ var _makeSmall__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./-makeSmall */ "./typescript/circuit/component/_breadboard/-makeSmall.ts");
/* harmony import */ var _makeLarge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./-makeLarge */ "./typescript/circuit/component/_breadboard/-makeLarge.ts");
/* harmony import */ var _loadSmall__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./-loadSmall */ "./typescript/circuit/component/_breadboard/-loadSmall.ts");
/* harmony import */ var _loadLarge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./-loadLarge */ "./typescript/circuit/component/_breadboard/-loadLarge.ts");






const smallMap = {
    savename: "makeLayoutBreadboardSmall",
    diagramType: "layout",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Small"],
    make: _makeSmall__WEBPACK_IMPORTED_MODULE_2__["default"],
    load: _loadSmall__WEBPACK_IMPORTED_MODULE_4__["default"],
    isBoard: true
};
const largeMap = {
    savename: "makeLayoutBreadboardLarge",
    diagramType: "layout",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Large"],
    make: _makeLarge__WEBPACK_IMPORTED_MODULE_3__["default"],
    load: _loadLarge__WEBPACK_IMPORTED_MODULE_5__["default"],
    isBoard: true
};
const maps = {
    layoutSmall: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(smallMap),
    layoutLarge: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(largeMap)
};
/* harmony default export */ __webpack_exports__["default"] = (maps);


/***/ }),

/***/ "./typescript/circuit/component/_breadboard/constants.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_breadboard/constants.ts ***!
  \***************************************************************/
/*! exports provided: INDEXCENTRE, INDEXROTATION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXCENTRE", function() { return INDEXCENTRE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXROTATION", function() { return INDEXROTATION; });
const INDEXCENTRE = 0;
const INDEXROTATION = 1;


/***/ }),

/***/ "./typescript/circuit/component/_breadboard/~classes.ts":
/*!**************************************************************!*\
  !*** ./typescript/circuit/component/_breadboard/~classes.ts ***!
  \**************************************************************/
/*! exports provided: Small, Large */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Small", function() { return Small; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Large", function() { return Large; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../+component */ "./typescript/circuit/+component.ts");
/* harmony import */ var _utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utility/-deepCopy */ "./typescript/utility/-deepCopy.ts");
/* harmony import */ var _utility_insert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/~insert */ "./typescript/utility/~insert.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../generics/-getComponentConnections */ "./typescript/circuit/generics/-getComponentConnections.ts");
/* harmony import */ var _drawLarge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./-drawLarge */ "./typescript/circuit/component/_breadboard/-drawLarge.ts");
/* harmony import */ var _drawSmall__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./-drawSmall */ "./typescript/circuit/component/_breadboard/-drawSmall.ts");
/* harmony import */ var _makeTracks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./-makeTracks */ "./typescript/circuit/component/_breadboard/-makeTracks.ts");








class Base extends _component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(values) {
        super(values);
        this.tracks = [];
        this.connectorSets = [];
        this.joints = values.joints;
    }
    getProperties() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            name: this.name,
        });
    }
    getState() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            joints: this.joints,
            disabled: this.disabled
        });
    }
    // Handled in the tracks
    makeConnectors() { }
    insertInto(element) {
        _utility_insert__WEBPACK_IMPORTED_MODULE_2__["default"].first(this.group.element, element);
    }
    transferFunction() { return []; }
    ;
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].layout);
    }
}
class Small extends Base {
    draw() {
        this.tracks = Object(_makeTracks__WEBPACK_IMPORTED_MODULE_7__["default"])(this, "small");
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawSmall__WEBPACK_IMPORTED_MODULE_6__["default"])(this), this.tracks.map(t => t.group));
    }
}
class Large extends Base {
    draw() {
        this.tracks = Object(_makeTracks__WEBPACK_IMPORTED_MODULE_7__["default"])(this, "large");
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawLarge__WEBPACK_IMPORTED_MODULE_5__["default"])(this), this.tracks.map(t => t.group));
    }
}


/***/ }),

/***/ "./typescript/circuit/component/_capacitor/-drawLayout.ts":
/*!****************************************************************!*\
  !*** ./typescript/circuit/component/_capacitor/-drawLayout.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawLayout; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_capacitor/constants.ts");
/* harmony import */ var _utility_getStandardForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/-getStandardForm */ "./typescript/utility/-getStandardForm.ts");
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+text */ "./typescript/svg/element/+text.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_circle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../svg/element/+circle */ "./typescript/svg/element/+circle.ts");
/* harmony import */ var _svg_element_ellipse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../svg/element/+ellipse */ "./typescript/svg/element/+ellipse.ts");








//import * as $ from 'jquery';
function drawLayout(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_5__["make"])("body");
    const cathodeEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXCATHODE"]];
    const anodeEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXANODE"]];
    const centre = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(cathodeEnd, anodeEnd).centre().vector;
    const rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(cathodeEnd).getAngleTo(anodeEnd);
    const text = Object(_utility_getStandardForm__WEBPACK_IMPORTED_MODULE_2__["default"])(instance.capacitance, 'F');
    if (instance.isPolarised) {
        // Electrolytic
        $(bodyGroup.element).addClass("electrolytic");
        const bodyArcEndPoint = 14 / Math.SQRT2;
        const textArcEndPoint = 12.5 / Math.SQRT2;
        const bodyPathString = "m14 0 A14 14 0 1 0 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
        const minusPathString = "m14 0 A14 14 0 0 1 " + (bodyArcEndPoint) + " " + (bodyArcEndPoint);
        const pathForTextString = "m" + (textArcEndPoint) + " " + (textArcEndPoint) + "A12.5 12.5 0 1 1 12.5 0";
        bodyGroup.append(Object(_svg_element_circle__WEBPACK_IMPORTED_MODULE_6__["make"])({ x: 0, y: 0 }, 16, "highlight nofill"), Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])(bodyPathString, "body").rotate(157.5), Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])(minusPathString, "minus").rotate(157.5), Object(_svg_element_text__WEBPACK_IMPORTED_MODULE_4__["make"])(text, { x: 1, y: 0 }, "text").followPath(pathForTextString).rotate(157.5));
    }
    else {
        // Ceramic
        $(bodyGroup.element).addClass("ceramic");
        bodyGroup.append(Object(_svg_element_ellipse__WEBPACK_IMPORTED_MODULE_7__["make"])({ x: 0, y: 0 }, { x: 16, y: 8 }, "body highlight nofill"), Object(_svg_element_text__WEBPACK_IMPORTED_MODULE_4__["make"])(text, { x: 0, y: 0 }, "text"));
    }
    return [
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])([cathodeEnd, anodeEnd], "lead"),
        bodyGroup.translate(centre).rotate(rotation)
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_capacitor/-drawSchematic.ts":
/*!*******************************************************************!*\
  !*** ./typescript/circuit/component/_capacitor/-drawSchematic.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawSchematic; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_capacitor/constants.ts");
/* harmony import */ var _utility_getStandardForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/-getStandardForm */ "./typescript/utility/-getStandardForm.ts");
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+text */ "./typescript/svg/element/+text.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_line__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../svg/element/+line */ "./typescript/svg/element/+line.ts");
/* harmony import */ var _svg_element_rect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../svg/element/+rect */ "./typescript/svg/element/+rect.ts");








function drawSchematic(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_5__["make"])("body");
    const cathodeEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXCATHODE"]];
    const anodeEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXANODE"]];
    let centre = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(cathodeEnd, anodeEnd).centre().vector;
    let rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(cathodeEnd).getAngleTo(anodeEnd);
    let [cathodeStart, anodeStart] = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])({ x: -6, y: 0 }, { x: 6, y: 0 }).rotate(rotation).sumWith(centre).vectors;
    //Text
    let text = Object(_utility_getStandardForm__WEBPACK_IMPORTED_MODULE_2__["default"])(instance.capacitance, 'F');
    bodyGroup.append(Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_7__["make"])(Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(0), { width: 15, height: 30 }, Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(2), "highlight highlightwithfill extrathick"), Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_6__["make"])({ x: -4, y: -15 }, { x: -4, y: +15 }, "line thick nocap"), Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_6__["make"])({ x: +4, y: -15 }, { x: +4, y: +15 }, "line thick nocap"));
    if (instance.isPolarised) {
        bodyGroup.append(Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])([
            [{ x: +15, y: -10 }, { x: +7, y: -10 }],
            [{ x: +11, y: -6 }, { x: +11, y: -14 }]
        ], "line thin"));
    }
    return [
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])([[cathodeStart, cathodeEnd], [anodeStart, anodeEnd]], "line thin"),
        bodyGroup.translate(centre).rotate(rotation),
        Object(_svg_element_text__WEBPACK_IMPORTED_MODULE_4__["make"])(text, { x: 0, y: -20 }, "text").translate(centre).rotatePosition(rotation)
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_capacitor/-loadLayout.ts":
/*!****************************************************************!*\
  !*** ./typescript/circuit/component/_capacitor/-loadLayout.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadLayout; });
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_capacitor/-makeLayout.ts");

function loadLayout(raw) {
    const name = (raw.name);
    const capacitance = (raw.capacitance);
    const isPolarised = (raw.isPolarised);
    const joints = (raw.joints);
    return Object(_makeLayout__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, capacitance, isPolarised, joints });
}


/***/ }),

/***/ "./typescript/circuit/component/_capacitor/-loadSchematic.ts":
/*!*******************************************************************!*\
  !*** ./typescript/circuit/component/_capacitor/-loadSchematic.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadSchematic; });
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_capacitor/-makeSchematic.ts");
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");



function loadSchematic(raw) {
    const name = (raw.name);
    const capacitance = (raw.capacitance || raw.value);
    //Polarisation Block
    const isPolarised = (raw.isPolarised || derivePolarisation(capacitance, raw.polarised));
    const orientations = ["LR", "RL", "UD", "DU"];
    const orientation = _valueCheck__WEBPACK_IMPORTED_MODULE_1__["default"].validate(orientations, "LR")(raw.orientation);
    const where = _valueCheck__WEBPACK_IMPORTED_MODULE_1__["default"].where({ x: 0, y: 0 })(raw.where);
    const joints = (raw.joints || deriveJoints(orientation, where));
    return Object(_makeSchematic__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, capacitance, isPolarised, joints });
}
const derivePolarisation = (capacitance, polarisation) => {
    const isPolarValid = _valueCheck__WEBPACK_IMPORTED_MODULE_1__["default"].test(["polar", "non-polar"]);
    return isPolarValid(polarisation) ? polarisation === "polar" : (capacitance > 1e-6);
};
const deriveJoints = (orientation, where) => {
    const baseJoints = ({
        LR: [{ x: -20, y: 0 }, { x: 20, y: 0 }],
        UD: [{ x: 0, y: -20 }, { x: 0, y: 20 }],
        RL: [{ x: 20, y: 0 }, { x: -20, y: 0 }],
        DU: [{ x: 0, y: 20 }, { x: 0, y: -20 }]
    })[orientation];
    return Object(_vector__WEBPACK_IMPORTED_MODULE_2__["default"])(baseJoints).sumWith(where).vectors;
};


/***/ }),

/***/ "./typescript/circuit/component/_capacitor/-makeLayout.ts":
/*!****************************************************************!*\
  !*** ./typescript/circuit/component/_capacitor/-makeLayout.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_capacitor/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_extendable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/extendable */ "./typescript/circuit/component/addins/extendable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");








const defaulterLayout = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "capacitor"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    isPolarised: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 80, y: 0 }]),
    capacitance: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0)
};
const makeLayout = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Layout"], defaulterLayout, _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_extendable__WEBPACK_IMPORTED_MODULE_6__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeLayout);


/***/ }),

/***/ "./typescript/circuit/component/_capacitor/-makeSchematic.ts":
/*!*******************************************************************!*\
  !*** ./typescript/circuit/component/_capacitor/-makeSchematic.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_capacitor/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_extendable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/extendable */ "./typescript/circuit/component/addins/extendable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");








const defaulterSchematic = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "capacitor"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    isPolarised: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 40, y: 40 }]),
    capacitance: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0)
};
const makeSchematic = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Schematic"], defaulterSchematic, _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__["default"], _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_extendable__WEBPACK_IMPORTED_MODULE_6__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeSchematic);


/***/ }),

/***/ "./typescript/circuit/component/_capacitor/-maps.ts":
/*!**********************************************************!*\
  !*** ./typescript/circuit/component/_capacitor/-maps.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generics_makeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generics/-makeMap */ "./typescript/circuit/generics/-makeMap.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_capacitor/~classes.ts");
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_capacitor/-makeSchematic.ts");
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_capacitor/-makeLayout.ts");
/* harmony import */ var _loadSchematic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./-loadSchematic */ "./typescript/circuit/component/_capacitor/-loadSchematic.ts");
/* harmony import */ var _loadLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./-loadLayout */ "./typescript/circuit/component/_capacitor/-loadLayout.ts");






const schematicMap = {
    savename: "makeCapacitor",
    diagramType: "schematic",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Schematic"],
    make: _makeSchematic__WEBPACK_IMPORTED_MODULE_2__["default"],
    load: _loadSchematic__WEBPACK_IMPORTED_MODULE_4__["default"],
};
const layoutMap = {
    savename: "makeLayoutCapacitor",
    diagramType: "layout",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Layout"],
    make: _makeLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
    load: _loadLayout__WEBPACK_IMPORTED_MODULE_5__["default"],
};
const maps = {
    schematic: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(schematicMap, layoutMap),
    layout: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(layoutMap, schematicMap)
};
/* harmony default export */ __webpack_exports__["default"] = (maps);


/***/ }),

/***/ "./typescript/circuit/component/_capacitor/constants.ts":
/*!**************************************************************!*\
  !*** ./typescript/circuit/component/_capacitor/constants.ts ***!
  \**************************************************************/
/*! exports provided: INDEXCATHODE, INDEXANODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXCATHODE", function() { return INDEXCATHODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXANODE", function() { return INDEXANODE; });
const INDEXCATHODE = 0;
const INDEXANODE = 1;


/***/ }),

/***/ "./typescript/circuit/component/_capacitor/~classes.ts":
/*!*************************************************************!*\
  !*** ./typescript/circuit/component/_capacitor/~classes.ts ***!
  \*************************************************************/
/*! exports provided: Schematic, Layout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Schematic", function() { return Schematic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../+component */ "./typescript/circuit/+component.ts");
/* harmony import */ var _utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utility/-deepCopy */ "./typescript/utility/-deepCopy.ts");
/* harmony import */ var _utility_insert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/~insert */ "./typescript/utility/~insert.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../generics/-getComponentConnections */ "./typescript/circuit/generics/-getComponentConnections.ts");
/* harmony import */ var _generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../generics/-makeConnector */ "./typescript/circuit/generics/-makeConnector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_capacitor/constants.ts");
/* harmony import */ var _drawLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./-drawLayout */ "./typescript/circuit/component/_capacitor/-drawLayout.ts");
/* harmony import */ var _drawSchematic__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./-drawSchematic */ "./typescript/circuit/component/_capacitor/-drawSchematic.ts");









class Base extends _component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(values) {
        super(values);
        this.joints = values.joints;
        this.capacitance = values.capacitance;
        this.isPolarised = values.isPolarised;
    }
    getProperties() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            name: this.name,
            capacitance: this.capacitance,
            isPolarised: this.isPolarised
        });
    }
    getState() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            joints: this.joints,
            disabled: this.disabled
        });
    }
    insertInto(element) {
        _utility_insert__WEBPACK_IMPORTED_MODULE_2__["default"].last(this.group.element, element);
    }
    transferFunction() { return []; }
    ;
}
class Schematic extends Base {
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawSchematic__WEBPACK_IMPORTED_MODULE_8__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].schematic);
    }
    makeConnectors() {
        if (this.isPolarised) {
            this.connectorSets = [[
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "cathode", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_6__["INDEXCATHODE"]], "-"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "anode", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_6__["INDEXANODE"]], "+"),
                ]];
        }
        else {
            this.connectorSets = [[
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_6__["INDEXCATHODE"]]),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_6__["INDEXANODE"]]),
                ]];
        }
    }
}
class Layout extends Base {
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawLayout__WEBPACK_IMPORTED_MODULE_7__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].layout);
    }
    makeConnectors() {
        if (this.isPolarised) {
            this.connectorSets = [[
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "cathode", "pin", this.joints[_constants__WEBPACK_IMPORTED_MODULE_6__["INDEXCATHODE"]], "-"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "anode", "pin", this.joints[_constants__WEBPACK_IMPORTED_MODULE_6__["INDEXANODE"]], "+"),
                ]];
        }
        else {
            this.connectorSets = [[
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "pin", this.joints[_constants__WEBPACK_IMPORTED_MODULE_6__["INDEXCATHODE"]]),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "pin", this.joints[_constants__WEBPACK_IMPORTED_MODULE_6__["INDEXANODE"]]),
                ]];
        }
    }
}


/***/ }),

/***/ "./typescript/circuit/component/_diode/-drawLayout.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_diode/-drawLayout.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawLayout; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_diode/constants.ts");
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_circle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+circle */ "./typescript/svg/element/+circle.ts");
/* harmony import */ var _svg_element_rect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../svg/element/+rect */ "./typescript/svg/element/+rect.ts");






//import * as $ from 'jquery';
function drawLayout(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_3__["make"])("body");
    const cathodeEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXCATHODE"]];
    const anodeEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXANODE"]];
    const centre = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(cathodeEnd, anodeEnd).centre().vector;
    const rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(anodeEnd).getAngleTo(cathodeEnd);
    if (instance.color === "N/A") {
        bodyGroup.append(Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: -5.5, y: 0 }, { width: 29, height: 15 }, { x: 0, y: 0 }, "body"), Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 17.5, y: 0 }, { width: 5, height: 15 }, { x: 0, y: 0 }, "body"), Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 12, y: 0 }, { width: 6, height: 15 }, { x: 0, y: 0 }, "cathode"), Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 0, y: 0 }, { width: 40, height: 15 }, { x: 1, y: 1 }, "highlight nofill"));
    }
    else {
        $(bodyGroup.element).addClass("led");
        const bodyString = "M " + (10) + " " + (15) +
            "a " + (18) + " " + (18) + " " + (0) + " " + (1) + " " + (0) + " " + (-20) + " " + (0) +
            "Z";
        const highlightString = "M " + (10) + " " + (16) +
            "a " + (18.8) + " " + (18.8) + " " + (0) + " " + (1) + " " + (0) + " " + (-20) + " " + (0) +
            "Z";
        const edge = Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(bodyString, "edge");
        const middle = Object(_svg_element_circle__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 0, y: 0 }, 14, "centre");
        $([edge.element, middle.element]).css("fill", instance.color);
        bodyGroup.append(edge, Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(bodyString, "darkener"), middle, Object(_svg_element_circle__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 0, y: 0 }, 8, "lightener"), Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(highlightString, "nofill highlight")).rotate(-90);
    }
    return [
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])([cathodeEnd, anodeEnd], "lead"),
        bodyGroup.translate(centre).rotate(rotation)
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_diode/-drawSchematic.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_diode/-drawSchematic.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawSchematic; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_diode/constants.ts");
/* harmony import */ var _utility_getStandardForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/-getStandardForm */ "./typescript/utility/-getStandardForm.ts");
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+text */ "./typescript/svg/element/+text.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_circle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../svg/element/+circle */ "./typescript/svg/element/+circle.ts");







//import * as $ from 'jquery';
function drawSchematic(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_5__["make"])("body");
    const cathodeEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXCATHODE"]];
    const anodeEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXANODE"]];
    const centre = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(cathodeEnd, anodeEnd).centre().vector;
    const rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(anodeEnd).getAngleTo(cathodeEnd);
    let [cathodeStart, anodeStart] = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])({ x: -12, y: 0 }, { x: 12, y: 0 }).rotate(rotation).sumWith(centre).vectors;
    //Text
    let text = (instance.breakdownVoltage < 51)
        ? Object(_utility_getStandardForm__WEBPACK_IMPORTED_MODULE_2__["default"])(instance.breakdownVoltage, 'V')
        : Object(_utility_getStandardForm__WEBPACK_IMPORTED_MODULE_2__["default"])(instance.saturationCurrent, 'A');
    const bodyPath = 'M 12 0 L -12 12 L -12 -12 L 12 0 Z';
    bodyGroup.append(Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])(bodyPath, "body highlight highlightwithfill extrathick"), Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])(bodyPath, "body black"), 
    // Polarisation Line
    Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])('M 12 -12 L 12 12', "line medium"));
    if (instance.color === "N/A" || instance.color === undefined) {
        if (instance.breakdownVoltage < 51) {
            // Add the "wings" for xener
            bodyGroup.append(Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])([[{ x: 12, y: -12 }, { x: 18, y: -12 },], [{ x: 12, y: 12 }, { x: 6, y: 12 }]], "line medium"));
        }
    }
    else {
        // LED
        const arrowJointsBase = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])([{ x: 0, y: 3 }, { x: -4, y: 0 }, { x: 0, y: -3 }, { x: -4, y: 0 }, { x: 8, y: 0 }]);
        const arrowJoints1 = arrowJointsBase.sumWith({ x: -16, y: -10 }).rotate(-116.43).vectors;
        const arrowJoints2 = arrowJointsBase.sumWith({ x: -16, y: 0 }).rotate(-116.43).vectors;
        const colorCircle = Object(_svg_element_circle__WEBPACK_IMPORTED_MODULE_6__["make"])({ x: -4, y: 0 }, 4, "line thin");
        $(colorCircle.element).css("fill", instance.color);
        $(colorCircle.element).css("stroke", instance.color);
        bodyGroup.append(Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])(arrowJoints1, "line black thin"), //Arrow1
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])(arrowJoints2, "line black thin"), //Arrow2
        colorCircle //Color Indicator
        );
    }
    const textEl = Object(_svg_element_text__WEBPACK_IMPORTED_MODULE_4__["make"])(text, { x: 0, y: -15 }, "text");
    return [
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])([[cathodeStart, cathodeEnd], [anodeStart, anodeEnd]], "line thin"),
        bodyGroup.translate(centre).rotate(rotation),
        textEl.translate(centre).rotatePosition(rotation),
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_diode/-loadLayout.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_diode/-loadLayout.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadLayout; });
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_diode/-makeLayout.ts");

function loadLayout(raw) {
    const name = (raw.name);
    const breakdownVoltage = (raw.breakdownVoltage);
    const saturationCurrent = (raw.saturationCurrent);
    const color = (raw.color);
    const joints = (raw.joints);
    return Object(_makeLayout__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, breakdownVoltage, saturationCurrent, color, joints });
}


/***/ }),

/***/ "./typescript/circuit/component/_diode/-loadSchematic.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_diode/-loadSchematic.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadSchematic; });
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_diode/-makeSchematic.ts");
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");



function loadSchematic(raw) {
    const name = (raw.name);
    const breakdownVoltage = (raw.breakdownVoltage);
    const saturationCurrent = (raw.saturationCurrent);
    const color = (raw.color || raw.colour);
    //Joints Block
    const orientations = ["LR", "RL", "UD", "DU"];
    const orientation = _valueCheck__WEBPACK_IMPORTED_MODULE_1__["default"].validate(orientations, "LR")(raw.orientation);
    const where = _valueCheck__WEBPACK_IMPORTED_MODULE_1__["default"].where({ x: 0, y: 0 })(raw.where);
    const joints = (raw.joints || deriveJoints(orientation, where));
    return Object(_makeSchematic__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, breakdownVoltage, saturationCurrent, color, joints });
}
const deriveJoints = (orientation, where) => {
    const baseJoints = ({
        LR: [{ x: -20, y: 0 }, { x: 20, y: 0 }],
        UD: [{ x: 0, y: -20 }, { x: 0, y: 20 }],
        RL: [{ x: 20, y: 0 }, { x: -20, y: 0 }],
        DU: [{ x: 0, y: 20 }, { x: 0, y: -20 }]
    })[orientation];
    return Object(_vector__WEBPACK_IMPORTED_MODULE_2__["default"])(baseJoints).sumWith(where).vectors;
};


/***/ }),

/***/ "./typescript/circuit/component/_diode/-makeLayout.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_diode/-makeLayout.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_diode/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_extendable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/extendable */ "./typescript/circuit/component/addins/extendable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");








const defaulterLayout = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "diode"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 80, y: 0 }]),
    breakdownVoltage: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0),
    saturationCurrent: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0),
    color: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].color("N/A")
};
const makeLayout = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Layout"], defaulterLayout, _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_extendable__WEBPACK_IMPORTED_MODULE_6__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeLayout);


/***/ }),

/***/ "./typescript/circuit/component/_diode/-makeSchematic.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_diode/-makeSchematic.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_diode/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_extendable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/extendable */ "./typescript/circuit/component/addins/extendable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");








const defaulterSchematic = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "diode"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 40, y: 40 }]),
    breakdownVoltage: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0),
    saturationCurrent: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0),
    color: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].color("N/A")
};
const makeSchematic = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Schematic"], defaulterSchematic, _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_extendable__WEBPACK_IMPORTED_MODULE_6__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeSchematic);


/***/ }),

/***/ "./typescript/circuit/component/_diode/-maps.ts":
/*!******************************************************!*\
  !*** ./typescript/circuit/component/_diode/-maps.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generics_makeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generics/-makeMap */ "./typescript/circuit/generics/-makeMap.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_diode/~classes.ts");
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_diode/-makeSchematic.ts");
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_diode/-makeLayout.ts");
/* harmony import */ var _loadSchematic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./-loadSchematic */ "./typescript/circuit/component/_diode/-loadSchematic.ts");
/* harmony import */ var _loadLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./-loadLayout */ "./typescript/circuit/component/_diode/-loadLayout.ts");






const schematicMap = {
    savename: "makeDiode",
    diagramType: "schematic",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Schematic"],
    make: _makeSchematic__WEBPACK_IMPORTED_MODULE_2__["default"],
    load: _loadSchematic__WEBPACK_IMPORTED_MODULE_4__["default"],
};
const layoutMap = {
    savename: "makeLayoutDiode",
    diagramType: "layout",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Layout"],
    make: _makeLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
    load: _loadLayout__WEBPACK_IMPORTED_MODULE_5__["default"],
};
const maps = {
    schematic: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(schematicMap, layoutMap),
    layout: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(layoutMap, schematicMap)
};
/* harmony default export */ __webpack_exports__["default"] = (maps);


/***/ }),

/***/ "./typescript/circuit/component/_diode/constants.ts":
/*!**********************************************************!*\
  !*** ./typescript/circuit/component/_diode/constants.ts ***!
  \**********************************************************/
/*! exports provided: INDEXANODE, INDEXCATHODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXANODE", function() { return INDEXANODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXCATHODE", function() { return INDEXCATHODE; });
const INDEXANODE = 0;
const INDEXCATHODE = 1;


/***/ }),

/***/ "./typescript/circuit/component/_diode/~classes.ts":
/*!*********************************************************!*\
  !*** ./typescript/circuit/component/_diode/~classes.ts ***!
  \*********************************************************/
/*! exports provided: Schematic, Layout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Schematic", function() { return Schematic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../+component */ "./typescript/circuit/+component.ts");
/* harmony import */ var _utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utility/-deepCopy */ "./typescript/utility/-deepCopy.ts");
/* harmony import */ var _utility_insert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/~insert */ "./typescript/utility/~insert.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../generics/-getComponentConnections */ "./typescript/circuit/generics/-getComponentConnections.ts");
/* harmony import */ var _generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../generics/-makeConnector */ "./typescript/circuit/generics/-makeConnector.ts");
/* harmony import */ var _drawLayout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./-drawLayout */ "./typescript/circuit/component/_diode/-drawLayout.ts");
/* harmony import */ var _drawSchematic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./-drawSchematic */ "./typescript/circuit/component/_diode/-drawSchematic.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_diode/constants.ts");









class Base extends _component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(values) {
        super(values);
        this.joints = values.joints;
        this.saturationCurrent = values.saturationCurrent;
        this.breakdownVoltage = values.breakdownVoltage;
        this.color = values.color;
    }
    getProperties() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            name: this.name,
            breakdownVoltage: this.breakdownVoltage,
            saturationCurrent: this.saturationCurrent,
            color: this.color
        });
    }
    getState() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            joints: this.joints,
            disabled: this.disabled
        });
    }
    insertInto(element) {
        _utility_insert__WEBPACK_IMPORTED_MODULE_2__["default"].last(this.group.element, element);
    }
    transferFunction() { return []; }
    ;
}
class Schematic extends Base {
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawSchematic__WEBPACK_IMPORTED_MODULE_7__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].schematic);
    }
    makeConnectors() {
        this.connectorSets = [[
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "anode", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_8__["INDEXANODE"]], "+"),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "cathode", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_8__["INDEXCATHODE"]], "-"),
            ]];
    }
}
class Layout extends Base {
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawLayout__WEBPACK_IMPORTED_MODULE_6__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].layout);
    }
    makeConnectors() {
        this.connectorSets = [[
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "anode", "pin", this.joints[_constants__WEBPACK_IMPORTED_MODULE_8__["INDEXANODE"]], "+"),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "cathode", "pin", this.joints[_constants__WEBPACK_IMPORTED_MODULE_8__["INDEXCATHODE"]], "-"),
            ]];
    }
}


/***/ }),

/***/ "./typescript/circuit/component/_inductor/-drawLayout.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_inductor/-drawLayout.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawLayout; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_inductor/constants.ts");
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");




function drawLayout(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_3__["make"])("body");
    const end1 = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXEND1"]];
    const end2 = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXEND2"]];
    let centre = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(end1, end2).centre().vector;
    let rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(end1).getAngleTo(end2);
    const nCoils = 4;
    const wireWidth = 8;
    const coilTop = -15;
    const coilBottom = 15;
    const coilStart = (-(nCoils * wireWidth) / 2 + wireWidth / 4);
    let bodyPath = "M" + (coilStart) + " " + (coilBottom);
    let bodyEdgePath = "";
    for (let i = 1; i < nCoils; i++) {
        let x0 = coilStart + wireWidth * (i - 0.5);
        let x1 = coilStart + wireWidth * (i);
        bodyPath += "L" + (x0) + " " + (coilTop) + "L" + (x1) + " " + (coilBottom);
        bodyEdgePath += "M" + (x0) + " " + (coilBottom) + "L" + (x1) + " " + (coilTop);
    }
    bodyPath += "L" + (-coilStart) + " " + (coilTop);
    bodyGroup.append(Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(bodyPath, "highlight highlightwithfill"), Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(bodyPath, "body"), Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(bodyEdgePath, "bodyEdge"));
    return [
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])([end1, end2], "lead"),
        bodyGroup.translate(centre).rotate(rotation)
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_inductor/-drawSchematic.ts":
/*!******************************************************************!*\
  !*** ./typescript/circuit/component/_inductor/-drawSchematic.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawSchematic; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_inductor/constants.ts");
/* harmony import */ var _utility_getStandardForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/-getStandardForm */ "./typescript/utility/-getStandardForm.ts");
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+text */ "./typescript/svg/element/+text.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_rect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../svg/element/+rect */ "./typescript/svg/element/+rect.ts");







function drawSchematic(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_5__["make"])("body");
    const end1 = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXEND1"]];
    const end2 = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXEND2"]];
    let centre = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(end1, end2).centre().vector;
    let rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(end1).getAngleTo(end2);
    let [start1, start2] = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])({ x: -20, y: 0 }, { x: 20, y: 0 }).rotate(rotation).sumWith(centre).vectors;
    //Text
    let text = Object(_utility_getStandardForm__WEBPACK_IMPORTED_MODULE_2__["default"])(instance.inductance, 'H');
    bodyGroup.append(Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_6__["make"])({ x: 0, y: -2 }, { width: 40, height: 12 }, Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(2), "highlight highlightwithfill extrathick"), Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])('M-20 0 q5 -12, 10 0 q5 -12, 10 0 q5 -12, 10 0 q5 -12, 10 0', "line medium"));
    let textEl = Object(_svg_element_text__WEBPACK_IMPORTED_MODULE_4__["make"])(text, { x: 0, y: -13 }, "text");
    return [
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])([[start1, end1], [start2, end2]], "line thin"),
        bodyGroup.translate(centre).rotate(rotation),
        textEl.translate(centre).rotatePosition(rotation),
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_inductor/-loadLayout.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_inductor/-loadLayout.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadLayout; });
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_inductor/-makeLayout.ts");

function loadLayout(raw) {
    const name = (raw.name);
    const inductance = (raw.inductance);
    const joints = (raw.joints);
    return Object(_makeLayout__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, inductance, joints });
}


/***/ }),

/***/ "./typescript/circuit/component/_inductor/-loadSchematic.ts":
/*!******************************************************************!*\
  !*** ./typescript/circuit/component/_inductor/-loadSchematic.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadSchematic; });
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_inductor/-makeSchematic.ts");
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");



function loadSchematic(raw) {
    const name = (raw.name);
    const inductance = (raw.inductance || raw.value);
    //Joints Block
    const orientations = ["LR", "RL", "UD", "DU"];
    const orientation = _valueCheck__WEBPACK_IMPORTED_MODULE_1__["default"].validate(orientations, "LR")(raw.orientation);
    const where = _valueCheck__WEBPACK_IMPORTED_MODULE_1__["default"].where({ x: 0, y: 0 })(raw.where);
    const joints = (raw.joints || deriveJoints(orientation, where));
    return Object(_makeSchematic__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, inductance, joints, });
}
const deriveJoints = (orientation, where) => {
    const baseJoints = ({
        LR: [{ x: -30, y: 0 }, { x: 30, y: 0 }],
        UD: [{ x: 0, y: -30 }, { x: 0, y: 30 }],
        RL: [{ x: 30, y: 0 }, { x: -30, y: 0 }],
        DU: [{ x: 0, y: 30 }, { x: 0, y: -30 }]
    })[orientation];
    return Object(_vector__WEBPACK_IMPORTED_MODULE_2__["default"])(baseJoints).sumWith(where).vectors;
};


/***/ }),

/***/ "./typescript/circuit/component/_inductor/-makeLayout.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_inductor/-makeLayout.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_inductor/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_extendable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/extendable */ "./typescript/circuit/component/addins/extendable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");








const defaulterLayout = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "inductor"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 80, y: 0 }]),
    inductance: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0)
};
const makeLayout = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Layout"], defaulterLayout, _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_extendable__WEBPACK_IMPORTED_MODULE_6__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeLayout);


/***/ }),

/***/ "./typescript/circuit/component/_inductor/-makeSchematic.ts":
/*!******************************************************************!*\
  !*** ./typescript/circuit/component/_inductor/-makeSchematic.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_inductor/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_extendable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/extendable */ "./typescript/circuit/component/addins/extendable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");








const defaulterSchematic = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "inductor"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 40, y: 40 }]),
    inductance: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0)
};
const makeSchematic = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Schematic"], defaulterSchematic, _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__["default"], _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_extendable__WEBPACK_IMPORTED_MODULE_6__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeSchematic);


/***/ }),

/***/ "./typescript/circuit/component/_inductor/-maps.ts":
/*!*********************************************************!*\
  !*** ./typescript/circuit/component/_inductor/-maps.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generics_makeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generics/-makeMap */ "./typescript/circuit/generics/-makeMap.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_inductor/~classes.ts");
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_inductor/-makeSchematic.ts");
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_inductor/-makeLayout.ts");
/* harmony import */ var _loadSchematic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./-loadSchematic */ "./typescript/circuit/component/_inductor/-loadSchematic.ts");
/* harmony import */ var _loadLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./-loadLayout */ "./typescript/circuit/component/_inductor/-loadLayout.ts");






const schematicMap = {
    savename: "makeInductor",
    diagramType: "schematic",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Schematic"],
    make: _makeSchematic__WEBPACK_IMPORTED_MODULE_2__["default"],
    load: _loadSchematic__WEBPACK_IMPORTED_MODULE_4__["default"],
};
const layoutMap = {
    savename: "makeLayoutInductor",
    diagramType: "layout",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Layout"],
    make: _makeLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
    load: _loadLayout__WEBPACK_IMPORTED_MODULE_5__["default"],
};
const maps = {
    schematic: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(schematicMap, layoutMap),
    layout: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(layoutMap, schematicMap)
};
/* harmony default export */ __webpack_exports__["default"] = (maps);


/***/ }),

/***/ "./typescript/circuit/component/_inductor/constants.ts":
/*!*************************************************************!*\
  !*** ./typescript/circuit/component/_inductor/constants.ts ***!
  \*************************************************************/
/*! exports provided: INDEXEND1, INDEXEND2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXEND1", function() { return INDEXEND1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXEND2", function() { return INDEXEND2; });
const INDEXEND1 = 0;
const INDEXEND2 = 1;


/***/ }),

/***/ "./typescript/circuit/component/_inductor/~classes.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_inductor/~classes.ts ***!
  \************************************************************/
/*! exports provided: Schematic, Layout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Schematic", function() { return Schematic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../+component */ "./typescript/circuit/+component.ts");
/* harmony import */ var _utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utility/-deepCopy */ "./typescript/utility/-deepCopy.ts");
/* harmony import */ var _utility_insert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/~insert */ "./typescript/utility/~insert.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../generics/-getComponentConnections */ "./typescript/circuit/generics/-getComponentConnections.ts");
/* harmony import */ var _generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../generics/-makeConnector */ "./typescript/circuit/generics/-makeConnector.ts");
/* harmony import */ var _drawLayout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./-drawLayout */ "./typescript/circuit/component/_inductor/-drawLayout.ts");
/* harmony import */ var _drawSchematic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./-drawSchematic */ "./typescript/circuit/component/_inductor/-drawSchematic.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_inductor/constants.ts");









class Base extends _component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(values) {
        super(values);
        this.joints = values.joints;
        this.inductance = values.inductance;
    }
    getProperties() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            name: this.name,
            inductance: this.inductance,
        });
    }
    getState() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            joints: this.joints,
            disabled: this.disabled
        });
    }
    insertInto(element) {
        _utility_insert__WEBPACK_IMPORTED_MODULE_2__["default"].last(this.group.element, element);
    }
    transferFunction() { return []; }
    ;
}
class Schematic extends Base {
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawSchematic__WEBPACK_IMPORTED_MODULE_7__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].schematic);
    }
    makeConnectors() {
        this.connectorSets = [[
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_8__["INDEXEND1"]]),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_8__["INDEXEND2"]]),
            ]];
    }
}
class Layout extends Base {
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawLayout__WEBPACK_IMPORTED_MODULE_6__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].layout);
    }
    makeConnectors() {
        this.connectorSets = [[
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "pin", this.joints[_constants__WEBPACK_IMPORTED_MODULE_8__["INDEXEND1"]]),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "pin", this.joints[_constants__WEBPACK_IMPORTED_MODULE_8__["INDEXEND2"]]),
            ]];
    }
}


/***/ }),

/***/ "./typescript/circuit/component/_opAmp/-drawLayout.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_opAmp/-drawLayout.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawLayout; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_opAmp/constants.ts");
/* harmony import */ var _svg_element_groups_dip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../svg/element/groups/+dip */ "./typescript/svg/element/groups/+dip.ts");



function drawLayout(instance) {
    const centre = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXCENTRE"]];
    const rotationPoint = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXROTATION"]];
    const rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(centre).getAngleTo(rotationPoint);
    //TODO Make DIP draw in centre? So this can be tidied.
    if (instance.isDual) {
        return Object(_svg_element_groups_dip__WEBPACK_IMPORTED_MODULE_2__["make"])(4, "", "TL072", "").translate(Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(-30)).rotate(rotation, Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(30)).translate(centre);
    }
    else {
        return Object(_svg_element_groups_dip__WEBPACK_IMPORTED_MODULE_2__["make"])(4, "", "TL071", "").translate(Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(-30)).rotate(rotation, Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(30)).translate(centre);
    }
}


/***/ }),

/***/ "./typescript/circuit/component/_opAmp/-drawSchematic.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_opAmp/-drawSchematic.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawSchematic; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_opAmp/constants.ts");
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_line__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+line */ "./typescript/svg/element/+line.ts");





function drawSchematic(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_3__["make"])("body");
    const inPEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXINPOS"]];
    const inNEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXINNEG"]];
    const outEnd = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXOUT"]];
    const pow1End = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXPOW1"]];
    const pow2End = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXPOW2"]];
    // Corners of the body triangle
    const bodyJoints = [{ x: -25, y: -25 }, { x: 25, y: 0 }, { x: -25, y: 25 }, { x: -25, y: -25 }];
    // The drawings orientation (before transforms) is: 
    //   emitter at the top
    //   collector at the bottom
    //   base to the right
    bodyGroup.append(
    //Highlight
    Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(bodyJoints, "highlight highlightwithfill extrathick"), 
    //Main body triangle
    Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(bodyJoints, "body white"), 
    //Plus
    Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: -22, y: -10 }, { x: -14, y: -10 }, "line thin"), Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: -18, y: -6 }, { x: -18, y: -14 }, "line thin"), 
    //Minus
    Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: -22, y: +10 }, { x: -14, y: +10 }, "line thin"));
    // Image centre does not take base into account
    // Is always directly between the emitter and collector
    let centre = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(pow1End, pow2End).centre().vector;
    // all angles are relative to the x-axis, hence in default orientation:
    //   when no rotation is required, angleEmitterCentre = 90, 
    let angleCentreBase = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(centre).getAngleTo(outEnd);
    let angleInPInN = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(pow1End).getAngleTo(pow2End);
    let rotation = angleInPInN - 90;
    // Don't ask.
    let scale = (((angleInPInN - angleCentreBase + 360) % 360) > 180)
        ? { x: -1 }
        : { x: 1 };
    // Only the start of the connections should be transformed, 
    // the ends should be absolute.
    // (Hence using vector transforms, not svg transforms)
    let [inPStart, inNStart, outStart, powPStart, powNStart] = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])({ x: -25, y: -10 }, { x: -25, y: 10 }, { x: 25, y: 0 }, { x: 0, y: -13 }, { x: 0, y: 13 }).scaleWith(scale).rotate(rotation).sumWith(centre).vectors;
    let joints = [
        [inPStart, inPEnd],
        [inNStart, inNEnd],
        [outStart, outEnd],
        [powPStart, pow1End],
        [powNStart, pow2End],
    ];
    return [
        bodyGroup.translate(centre).rotate(rotation).scale(scale, false),
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(joints, "line thin"),
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_opAmp/-loadLayout.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_opAmp/-loadLayout.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadLayout; });
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_opAmp/-makeLayout.ts");

function loadLayout(raw) {
    const name = (raw.name);
    const offsetVoltage = (raw.offsetVoltage);
    const isDual = (raw.isDual);
    const joints = (raw.joints);
    return Object(_makeLayout__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, offsetVoltage, isDual, joints });
}


/***/ }),

/***/ "./typescript/circuit/component/_opAmp/-loadSchematic.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_opAmp/-loadSchematic.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadSchematic; });
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_opAmp/-makeSchematic.ts");
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _power_maps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_power/-maps */ "./typescript/circuit/component/_power/-maps.ts");




function loadSchematic(raw) {
    const name = (raw.name);
    const offsetVoltage = (raw.offsetVoltage);
    //Joints Block
    const orientations = ["LR", "RL"];
    const orientation = _valueCheck__WEBPACK_IMPORTED_MODULE_1__["default"].validate(orientations, "LR")(raw.orientation);
    const inputsAtTop = ["inverting", "non-inverting"];
    const inputAtTop = _valueCheck__WEBPACK_IMPORTED_MODULE_1__["default"].validate(inputsAtTop, "non-inverting")(raw.whichInputAtTop);
    const where = _valueCheck__WEBPACK_IMPORTED_MODULE_1__["default"].where({ x: 0, y: 0 })(raw.where);
    const joints = (raw.joints || deriveJoints(orientation, inputAtTop, where));
    const opAmp = Object(_makeSchematic__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, offsetVoltage, joints });
    // Also make the power connections
    const isNumber = _valueCheck__WEBPACK_IMPORTED_MODULE_1__["default"].test("number");
    const [minOutput, maxOutput] = [raw.minOutput, raw.maxOutput];
    if (isNumber(minOutput) && isNumber(maxOutput)) {
        const topPower = _power_maps__WEBPACK_IMPORTED_MODULE_3__["default"].schematic.make({
            voltage: maxOutput,
            joints: Object(_vector__WEBPACK_IMPORTED_MODULE_2__["default"])([{ x: 0, y: -20 }]).sumWith(where).vectors
        });
        const bottomPower = _power_maps__WEBPACK_IMPORTED_MODULE_3__["default"].schematic.make({
            voltage: minOutput,
            joints: Object(_vector__WEBPACK_IMPORTED_MODULE_2__["default"])([{ x: 0, y: 20 }]).sumWith(where).vectors
        });
        return [topPower, bottomPower, opAmp];
    }
    else {
        return opAmp;
    }
}
const deriveJoints = (orientation, inputAtTop, where) => {
    const [inHigh, inLow] = orientation === "LR"
        ? [{ x: -30, y: -10 }, { x: -30, y: +10 }]
        : [{ x: +30, y: -10 }, { x: +30, y: +10 }];
    const [inInverting, inNonInverting] = inputAtTop === "inverting"
        ? [inHigh, inLow] : [inLow, inHigh];
    const [out] = orientation === "LR"
        ? [{ x: +40, y: 0 }]
        : [{ x: -40, y: 0 }];
    const [powPositive, powNegative] = inputAtTop === "inverting"
        ? [{ x: 0, y: -20 }, { x: 0, y: +20 }]
        : [{ x: 0, y: +20 }, { x: 0, y: -20 }];
    return Object(_vector__WEBPACK_IMPORTED_MODULE_2__["default"])([inInverting, inNonInverting, out, powPositive, powNegative]).sumWith(where).vectors;
};


/***/ }),

/***/ "./typescript/circuit/component/_opAmp/-makeLayout.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_opAmp/-makeLayout.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_opAmp/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_rotatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/rotatable */ "./typescript/circuit/component/addins/rotatable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");








const defaulterLayout = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "opAmp"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    isDual: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 30, y: 30 }, { x: 40, y: 30 }]),
    offsetVoltage: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0)
};
const makeLayout = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Layout"], defaulterLayout, _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_rotatable__WEBPACK_IMPORTED_MODULE_6__["default"], _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeLayout);


/***/ }),

/***/ "./typescript/circuit/component/_opAmp/-makeSchematic.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_opAmp/-makeSchematic.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_opAmp/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_extendable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/extendable */ "./typescript/circuit/component/addins/extendable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");








const defaulterSchematic = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "opAmp"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: -30, y: -10 }, { x: -30, y: +10 }, { x: 40, y: 0 }, { x: 0, y: -20 }, { x: 0, y: 20 }]),
    offsetVoltage: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0)
};
const makeSchematic = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Schematic"], defaulterSchematic, _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__["default"], _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_extendable__WEBPACK_IMPORTED_MODULE_6__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeSchematic);


/***/ }),

/***/ "./typescript/circuit/component/_opAmp/-maps.ts":
/*!******************************************************!*\
  !*** ./typescript/circuit/component/_opAmp/-maps.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generics_makeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generics/-makeMap */ "./typescript/circuit/generics/-makeMap.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_opAmp/~classes.ts");
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_opAmp/-makeSchematic.ts");
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_opAmp/-makeLayout.ts");
/* harmony import */ var _loadSchematic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./-loadSchematic */ "./typescript/circuit/component/_opAmp/-loadSchematic.ts");
/* harmony import */ var _loadLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./-loadLayout */ "./typescript/circuit/component/_opAmp/-loadLayout.ts");






const schematicMap = {
    savename: "makeOpAmp",
    diagramType: "schematic",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Schematic"],
    make: _makeSchematic__WEBPACK_IMPORTED_MODULE_2__["default"],
    load: _loadSchematic__WEBPACK_IMPORTED_MODULE_4__["default"],
};
const layoutMap = {
    savename: "makeLayoutOpAmp",
    diagramType: "layout",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Layout"],
    make: _makeLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
    load: _loadLayout__WEBPACK_IMPORTED_MODULE_5__["default"],
};
const maps = {
    schematic: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(schematicMap, layoutMap),
    layout: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(layoutMap, schematicMap)
};
/* harmony default export */ __webpack_exports__["default"] = (maps);


/***/ }),

/***/ "./typescript/circuit/component/_opAmp/constants.ts":
/*!**********************************************************!*\
  !*** ./typescript/circuit/component/_opAmp/constants.ts ***!
  \**********************************************************/
/*! exports provided: INDEXINPOS, INDEXINNEG, INDEXOUT, INDEXPOW1, INDEXPOW2, INDEXCENTRE, INDEXROTATION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXINPOS", function() { return INDEXINPOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXINNEG", function() { return INDEXINNEG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXOUT", function() { return INDEXOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXPOW1", function() { return INDEXPOW1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXPOW2", function() { return INDEXPOW2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXCENTRE", function() { return INDEXCENTRE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXROTATION", function() { return INDEXROTATION; });
// Schematic
const INDEXINPOS = 0;
const INDEXINNEG = 1;
const INDEXOUT = 2;
const INDEXPOW1 = 3;
const INDEXPOW2 = 4;
// Layout
const INDEXCENTRE = 0;
const INDEXROTATION = 1;


/***/ }),

/***/ "./typescript/circuit/component/_opAmp/~classes.ts":
/*!*********************************************************!*\
  !*** ./typescript/circuit/component/_opAmp/~classes.ts ***!
  \*********************************************************/
/*! exports provided: Schematic, Layout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Schematic", function() { return Schematic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../+component */ "./typescript/circuit/+component.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _utility_deepCopy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/-deepCopy */ "./typescript/utility/-deepCopy.ts");
/* harmony import */ var _utility_insert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utility/~insert */ "./typescript/utility/~insert.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../generics/-getComponentConnections */ "./typescript/circuit/generics/-getComponentConnections.ts");
/* harmony import */ var _generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../generics/-makeConnector */ "./typescript/circuit/generics/-makeConnector.ts");
/* harmony import */ var _drawLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./-drawLayout */ "./typescript/circuit/component/_opAmp/-drawLayout.ts");
/* harmony import */ var _drawSchematic__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./-drawSchematic */ "./typescript/circuit/component/_opAmp/-drawSchematic.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_opAmp/constants.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../~constants */ "./typescript/~constants.ts");











class Base extends _component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(values) {
        super(values);
        this.offsetVoltage = values.offsetVoltage;
    }
    getProperties() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_2__["default"])({
            name: this.name,
            offsetVoltage: this.offsetVoltage
        });
    }
    insertInto(element) {
        _utility_insert__WEBPACK_IMPORTED_MODULE_3__["default"].last(this.group.element, element);
    }
    transferFunction() { return []; }
    ;
}
class Schematic extends Base {
    constructor(values) {
        super(values);
        this.offsetVoltage = values.offsetVoltage;
        this.joints = values.joints;
    }
    getState() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_2__["default"])({
            joints: this.joints,
            disabled: this.disabled
        });
    }
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawSchematic__WEBPACK_IMPORTED_MODULE_8__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_5__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_4__["default"].schematic);
    }
    makeConnectors() {
        let [posPower, negPower] = (this.joints[_constants__WEBPACK_IMPORTED_MODULE_9__["INDEXPOW1"]].y < this.joints[_constants__WEBPACK_IMPORTED_MODULE_9__["INDEXPOW2"]].y)
            ? [this.joints[_constants__WEBPACK_IMPORTED_MODULE_9__["INDEXPOW1"]], this.joints[_constants__WEBPACK_IMPORTED_MODULE_9__["INDEXPOW2"]]]
            : [this.joints[_constants__WEBPACK_IMPORTED_MODULE_9__["INDEXPOW2"]], this.joints[_constants__WEBPACK_IMPORTED_MODULE_9__["INDEXPOW1"]]];
        this.connectorSets = [[
                // The ordering here is important so the colors line up between layout and schematic
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "vcc+", "node", posPower, "v+"),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "out", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_9__["INDEXOUT"]], "o"),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "in-", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_9__["INDEXINNEG"]], "i-"),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "in+", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_9__["INDEXINPOS"]], "i+"),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "vcc-", "node", negPower, "v-"),
            ]];
    }
}
class Layout extends Base {
    constructor(values) {
        super(values);
        this.offsetVoltage = values.offsetVoltage;
        this.isDual = values.isDual;
        this.joints = values.joints;
    }
    getState() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_2__["default"])({
            isDual: this.isDual,
            joints: this.joints,
            disabled: this.disabled
        });
    }
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawLayout__WEBPACK_IMPORTED_MODULE_7__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_5__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_4__["default"].layout);
    }
    makeConnectors() {
        let gs = _constants__WEBPACK_IMPORTED_MODULE_10__["gridSpacing"];
        let c = this.joints[_constants__WEBPACK_IMPORTED_MODULE_9__["INDEXCENTRE"]];
        let r = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])(this.joints[_constants__WEBPACK_IMPORTED_MODULE_9__["INDEXCENTRE"]]).getAngleTo(this.joints[_constants__WEBPACK_IMPORTED_MODULE_9__["INDEXROTATION"]]);
        let connectorPoints = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])([
            { x: 0 * gs, y: 3 * gs },
            { x: 1 * gs, y: 3 * gs },
            { x: 2 * gs, y: 3 * gs },
            { x: 3 * gs, y: 3 * gs },
            { x: 3 * gs, y: 0 * gs },
            { x: 2 * gs, y: 0 * gs },
            { x: 1 * gs, y: 0 * gs },
            { x: 0 * gs, y: 0 * gs } //8
        ]).sumWith(Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])(-30)).rotate(r).sumWith(c).vectors;
        if (this.isDual) {
            // Note that the power selectors physically occupy the same space.
            this.connectorSets = [[
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "vcc+", "pin", connectorPoints[7], "v+"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "out", "pin", connectorPoints[6], "1o"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "in-", "pin", connectorPoints[5], "1i-"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "in+", "pin", connectorPoints[4], "1i+"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "vcc-", "pin", connectorPoints[3], "v-"),
                ], [
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "vcc+", "pin", connectorPoints[7], "v+"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "out", "pin", connectorPoints[0], "2o"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "in-", "pin", connectorPoints[1], "2i-"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "in+", "pin", connectorPoints[2], "2i+"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "vcc-", "pin", connectorPoints[3], "v-"),
                ]];
        }
        else {
            this.connectorSets = [[
                    // The ordering here is important so the colors line up between layout and schematic
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "vcc+", "pin", connectorPoints[6], "v+"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "out", "pin", connectorPoints[5], "o"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "in-", "pin", connectorPoints[1], "i-"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "in+", "pin", connectorPoints[2], "i+"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "vcc-", "pin", connectorPoints[3], "v-"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "nc", "pin", connectorPoints[7], "nc"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "offset n1", "pin", connectorPoints[4], "nc"),
                    Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "offset n2", "pin", connectorPoints[0], "nc"),
                ]];
        }
    }
    replaceWithDual() {
        this.isDual = true;
        this.group.clearChildren();
        this.draw();
        this.makeConnectors();
    }
}


/***/ }),

/***/ "./typescript/circuit/component/_power/-drawLayout.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_power/-drawLayout.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawLayout; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_power/constants.ts");
/* harmony import */ var _svg_element_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../svg/element/+text */ "./typescript/svg/element/+text.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_circle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+circle */ "./typescript/svg/element/+circle.ts");
/* harmony import */ var _svg_element_rect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+rect */ "./typescript/svg/element/+rect.ts");





function drawLayout(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_2__["make"])("body");
    const text = instance.voltage.toFixed(1);
    bodyGroup.append(Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 0, y: -35 }, { width: 180, height: 95 }, { x: 10, y: 10 }, "body highlight"), Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 0, y: -45 }, { width: 160, height: 65 }, { x: 10, y: 10 }, "screen"), Object(_svg_element_text__WEBPACK_IMPORTED_MODULE_1__["make"])("8".repeat(text.length - 1), { x: 0, y: -20 }, "screentext off"), Object(_svg_element_text__WEBPACK_IMPORTED_MODULE_1__["make"])(text, { x: 0, y: -20 }, "screentext on"), Object(_svg_element_circle__WEBPACK_IMPORTED_MODULE_3__["make"])({ x: 0, y: 0 }, 5, "hole"));
    return [
        bodyGroup.translate(instance.joints[_constants__WEBPACK_IMPORTED_MODULE_0__["INDEXCONNECTION"]])
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_power/-drawSchematic.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_power/-drawSchematic.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawSchematic; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_power/constants.ts");
/* harmony import */ var _utility_getStandardForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utility/-getStandardForm */ "./typescript/utility/-getStandardForm.ts");
/* harmony import */ var _svg_element_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../svg/element/+text */ "./typescript/svg/element/+text.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_line__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+line */ "./typescript/svg/element/+line.ts");
/* harmony import */ var _svg_element_rect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../svg/element/+rect */ "./typescript/svg/element/+rect.ts");






function drawSchematic(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_3__["make"])("body");
    if (instance.voltage < 0) {
        bodyGroup.append(powerNegativeGraphics(instance.voltage));
    }
    else if (instance.voltage > 0) {
        bodyGroup.append(powerPositiveGraphics(instance.voltage));
    }
    else {
        bodyGroup.append(powerGroundGraphics());
    }
    return [
        bodyGroup.translate(instance.joints[_constants__WEBPACK_IMPORTED_MODULE_0__["INDEXCONNECTION"]])
    ];
}
function powerNegativeGraphics(voltage) {
    const text = Object(_utility_getStandardForm__WEBPACK_IMPORTED_MODULE_1__["default"])(voltage, "V");
    return [
        Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 0, y: 18 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
        Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: -12, y: 15 }, { x: 12, y: 15 }, "line medium"),
        Object(_svg_element_text__WEBPACK_IMPORTED_MODULE_2__["make"])(text, { x: 0, y: 27 }, "text bold"),
        Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 0, y: 15 }, { x: 0, y: 0 }, "line thin")
    ];
}
function powerPositiveGraphics(voltage) {
    const text = Object(_utility_getStandardForm__WEBPACK_IMPORTED_MODULE_1__["default"])(voltage, "V");
    return [
        Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 0, y: -18 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
        Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: -12, y: -15 }, { x: 12, y: -15 }, "line medium"),
        Object(_svg_element_text__WEBPACK_IMPORTED_MODULE_2__["make"])(text, { x: 0, y: -17 }, "text bold"),
        Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 0, y: -15 }, { x: 0, y: 0 }, "line thin")
    ];
}
function powerGroundGraphics() {
    return [
        Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_5__["make"])({ x: 0, y: 15 }, { width: 40, height: 20 }, { x: 2, y: 2 }, "highlight highlightwithfill extrathick"),
        Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: -18, y: 10 }, { x: 18, y: 10 }, "line medium"),
        Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: -12, y: 15 }, { x: 12, y: 15 }, "line medium"),
        Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: -6, y: 20 }, { x: 6, y: 20 }, "line medium"),
        Object(_svg_element_line__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 0, y: 10 }, { x: 0, y: 0 }, "line thin")
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_power/-loadLayout.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_power/-loadLayout.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadLayout; });
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_power/-makeLayout.ts");

function loadLayout(raw) {
    const name = (raw.name);
    const voltage = (raw.voltage);
    const joints = (raw.joints);
    return Object(_makeLayout__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, voltage, joints });
}


/***/ }),

/***/ "./typescript/circuit/component/_power/-loadSchematic.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_power/-loadSchematic.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadSchematic; });
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_power/-makeSchematic.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");



function loadSchematic(raw) {
    const name = (raw.name);
    const voltage = (raw.voltage || raw.value);
    //Joints Block
    const where = _valueCheck__WEBPACK_IMPORTED_MODULE_2__["default"].where({ x: 0, y: 0 })(raw.where);
    const joints = (raw.joints || deriveJoints(voltage, where));
    return Object(_makeSchematic__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, voltage, joints, });
}
const deriveJoints = (voltage, where) => {
    const baseJoints = (voltage < 0)
        ? [{ x: 0, y: -10 }] // negative
        : (voltage > 0)
            ? [{ x: 0, y: 10 }] // positive
            : [{ x: 0, y: -10 }]; // zero (ground)
    return Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])(baseJoints).sumWith(where).vectors;
};


/***/ }),

/***/ "./typescript/circuit/component/_power/-makeLayout.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_power/-makeLayout.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_power/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");
/* harmony import */ var _addins_wiresCreatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/wiresCreatable */ "./typescript/circuit/component/addins/wiresCreatable.ts");








const defaulterLayout = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "power"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 40 }]),
    voltage: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0)
};
const makeLayout = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["PowerLayout"], defaulterLayout, _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_6__["default"], _addins_wiresCreatable__WEBPACK_IMPORTED_MODULE_7__["default"]);
// TODO: Pass into connection highlight
// function getHighlightColor(component: PowerLayout): string[] {
//    return [(component.voltage < 0)
//       ? "blue" // negative
//       : (component.voltage > 0)
//          ? "red" // positive
//          : "black" // zero (ground);
//    ]
// }
/* harmony default export */ __webpack_exports__["default"] = (makeLayout);


/***/ }),

/***/ "./typescript/circuit/component/_power/-makeSchematic.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_power/-makeSchematic.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_power/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");







const defaulterSchematic = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "power"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }]),
    voltage: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0)
};
const makeSchematic = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["PowerSchematic"], defaulterSchematic, _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_6__["default"], _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeSchematic);


/***/ }),

/***/ "./typescript/circuit/component/_power/-maps.ts":
/*!******************************************************!*\
  !*** ./typescript/circuit/component/_power/-maps.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generics_makeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generics/-makeMap */ "./typescript/circuit/generics/-makeMap.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_power/~classes.ts");
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_power/-makeSchematic.ts");
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_power/-makeLayout.ts");
/* harmony import */ var _loadSchematic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./-loadSchematic */ "./typescript/circuit/component/_power/-loadSchematic.ts");
/* harmony import */ var _loadLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./-loadLayout */ "./typescript/circuit/component/_power/-loadLayout.ts");






const schematicMap = {
    savename: "makePower",
    diagramType: "schematic",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["PowerSchematic"],
    make: _makeSchematic__WEBPACK_IMPORTED_MODULE_2__["default"],
    load: _loadSchematic__WEBPACK_IMPORTED_MODULE_4__["default"],
};
const layoutMap = {
    savename: "makeLayoutPower",
    diagramType: "layout",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["PowerLayout"],
    make: _makeLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
    load: _loadLayout__WEBPACK_IMPORTED_MODULE_5__["default"],
    isUnique: true
};
const maps = {
    schematic: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(schematicMap, layoutMap),
    layout: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(layoutMap, schematicMap)
};
/* harmony default export */ __webpack_exports__["default"] = (maps);


/***/ }),

/***/ "./typescript/circuit/component/_power/constants.ts":
/*!**********************************************************!*\
  !*** ./typescript/circuit/component/_power/constants.ts ***!
  \**********************************************************/
/*! exports provided: INDEXCONNECTION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXCONNECTION", function() { return INDEXCONNECTION; });
const INDEXCONNECTION = 0;


/***/ }),

/***/ "./typescript/circuit/component/_power/~classes.ts":
/*!*********************************************************!*\
  !*** ./typescript/circuit/component/_power/~classes.ts ***!
  \*********************************************************/
/*! exports provided: PowerSchematic, PowerLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PowerSchematic", function() { return PowerSchematic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PowerLayout", function() { return PowerLayout; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../+component */ "./typescript/circuit/+component.ts");
/* harmony import */ var _utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utility/-deepCopy */ "./typescript/utility/-deepCopy.ts");
/* harmony import */ var _utility_insert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/~insert */ "./typescript/utility/~insert.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../generics/-getComponentConnections */ "./typescript/circuit/generics/-getComponentConnections.ts");
/* harmony import */ var _generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../generics/-makeConnector */ "./typescript/circuit/generics/-makeConnector.ts");
/* harmony import */ var _drawLayout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./-drawLayout */ "./typescript/circuit/component/_power/-drawLayout.ts");
/* harmony import */ var _drawSchematic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./-drawSchematic */ "./typescript/circuit/component/_power/-drawSchematic.ts");








class PowerBase extends _component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(values) {
        super(values);
        this.voltage = values.voltage;
        this.joints = values.joints;
    }
    getProperties() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            name: this.name,
            voltage: this.voltage
        });
    }
    getState() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            joints: this.joints,
            disabled: this.disabled
        });
    }
    transferFunction() { return []; }
    ;
}
class PowerSchematic extends PowerBase {
    insertInto(element) {
        _utility_insert__WEBPACK_IMPORTED_MODULE_2__["default"].last(this.group.element, element);
    }
    /** Builds and draws the components connectors */
    makeConnectors() {
        this.connectorSets = [
            [Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "node", this.joints[0])]
        ];
    }
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawSchematic__WEBPACK_IMPORTED_MODULE_7__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].schematic);
    }
}
class PowerLayout extends PowerBase {
    constructor() {
        super(...arguments);
        this.connectorSets = [];
    }
    insertInto(element) {
        _utility_insert__WEBPACK_IMPORTED_MODULE_2__["default"].after(this.group.element, element, ".board");
    }
    /** Builds and draws the components connectors */
    makeConnectors() {
        this.connectorSets = [[
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "hole", this.joints[0])
            ]];
    }
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawLayout__WEBPACK_IMPORTED_MODULE_6__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].layout);
    }
}


/***/ }),

/***/ "./typescript/circuit/component/_resistor/-drawLayout.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_resistor/-drawLayout.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawLayout; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_resistor/constants.ts");
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_rect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+rect */ "./typescript/svg/element/+rect.ts");





//import * as $ from 'jquery';
function drawLayout(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_3__["make"])("body");
    const end1 = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXEND1"]];
    const end2 = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXEND2"]];
    let centre = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(end1, end2).centre().vector;
    let rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(end1).getAngleTo(end2);
    let bodyPath = "m-12.5 -6" + "h25" + "c15 -8 15 20 0 12" + "h-25" + "c-15 +8 -15 -20 0 -12" + "Z";
    bodyGroup.append(Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(bodyPath, "body"), getBands(instance.resistance), Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])(bodyPath, "highlight nofill"));
    return [
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_2__["make"])([end1, end2], "lead"),
        bodyGroup.translate(centre).rotate(rotation)
    ];
}
function getBands(num) {
    // We don't need a value field
    let exp = num.toExponential(1);
    let sigFig1 = exp.slice(exp.indexOf(".") - 1)[0];
    let sigFig2 = exp.slice(exp.indexOf(".") + 1)[0];
    let multiplier = (parseInt(exp.slice(exp.indexOf("e") + 1), 10) - 1).toString();
    let colours = {
        "-3": "pink",
        "-2": "silver",
        "-1": "gold",
        "0": "black",
        "1": "brown",
        "2": "red",
        "3": "#FF7F26",
        "4": "yellow",
        "5": "green",
        "6": "blue",
        "7": "violet",
        "8": "grey",
        "9": "white"
    };
    let b1 = Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: -17.5, y: 0 }, { width: 3, height: 18 }, undefined, "band1");
    let b2 = Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: -11, y: 0 }, { width: 3, height: 12 }, undefined, "band2");
    let b3 = Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: -4, y: 0 }, { width: 3, height: 12 }, undefined, "band3");
    let b4 = Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])({ x: 3.5, y: 0 }, { width: 4, height: 12 }, undefined, "band4");
    $(b1.element).css("fill", colours[sigFig1]);
    $(b2.element).css("fill", colours[sigFig2]);
    $(b3.element).css("fill", colours[multiplier]);
    $(b4.element).css("fill", "transparent");
    return [b1, b2, b3, b4];
}


/***/ }),

/***/ "./typescript/circuit/component/_resistor/-drawSchematic.ts":
/*!******************************************************************!*\
  !*** ./typescript/circuit/component/_resistor/-drawSchematic.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawSchematic; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_resistor/constants.ts");
/* harmony import */ var _utility_getStandardForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/-getStandardForm */ "./typescript/utility/-getStandardForm.ts");
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+text */ "./typescript/svg/element/+text.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_rect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../svg/element/+rect */ "./typescript/svg/element/+rect.ts");







function drawSchematic(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_5__["make"])("body");
    const end1 = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXEND1"]];
    const end2 = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXEND2"]];
    let centre = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(end1, end2).centre().vector;
    let rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(end1).getAngleTo(end2);
    let [start1, start2] = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])({ x: -24, y: 0 }, { x: 24, y: 0 }).rotate(rotation).sumWith(centre).vectors;
    //Text
    let text = Object(_utility_getStandardForm__WEBPACK_IMPORTED_MODULE_2__["default"])(instance.resistance, 'Ω');
    bodyGroup.append(Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_6__["make"])(Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(0), { width: 46, height: 18 }, Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(2), "highlight highlightwithfill extrathick"), Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_6__["make"])(Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(0), { width: 46, height: 18 }, Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(2), "body white"));
    let textEl = Object(_svg_element_text__WEBPACK_IMPORTED_MODULE_4__["make"])(text, { x: 0, y: -15 }, "text");
    return [
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_3__["make"])([[start1, end1], [start2, end2]], "line thin"),
        bodyGroup.translate(centre).rotate(rotation),
        textEl.translate(centre).rotatePosition(rotation),
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_resistor/-loadLayout.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_resistor/-loadLayout.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadLayout; });
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_resistor/-makeLayout.ts");

function loadLayout(raw) {
    const name = (raw.name);
    const resistance = (raw.resistance);
    const joints = (raw.joints);
    return Object(_makeLayout__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, resistance, joints });
}


/***/ }),

/***/ "./typescript/circuit/component/_resistor/-loadSchematic.ts":
/*!******************************************************************!*\
  !*** ./typescript/circuit/component/_resistor/-loadSchematic.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadSchematic; });
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_resistor/-makeSchematic.ts");
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");



function loadSchematic(raw) {
    const name = (raw.name);
    const resistance = (raw.resistance || raw.value);
    //Joints Block
    const orientations = ["LR", "RL", "UD", "DU"];
    const orientation = _valueCheck__WEBPACK_IMPORTED_MODULE_1__["default"].validate(orientations, "LR")(raw.orientation);
    const where = _valueCheck__WEBPACK_IMPORTED_MODULE_1__["default"].where({ x: 0, y: 0 })(raw.where);
    const joints = (raw.joints || deriveJoints(orientation, where));
    return Object(_makeSchematic__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, resistance, joints, });
}
const deriveJoints = (orientation, where) => {
    const baseJoints = ({
        LR: [{ x: -30, y: 0 }, { x: 30, y: 0 }],
        UD: [{ x: 0, y: -30 }, { x: 0, y: 30 }],
        RL: [{ x: 30, y: 0 }, { x: -30, y: 0 }],
        DU: [{ x: 0, y: 30 }, { x: 0, y: -30 }]
    })[orientation];
    return Object(_vector__WEBPACK_IMPORTED_MODULE_2__["default"])(baseJoints).sumWith(where).vectors;
};


/***/ }),

/***/ "./typescript/circuit/component/_resistor/-makeLayout.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_resistor/-makeLayout.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_resistor/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_extendable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/extendable */ "./typescript/circuit/component/addins/extendable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");








const defaulterLayout = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "resistor"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 40, y: 40 }]),
    resistance: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0)
};
const makeLayout = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Layout"], defaulterLayout, _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_extendable__WEBPACK_IMPORTED_MODULE_6__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeLayout);


/***/ }),

/***/ "./typescript/circuit/component/_resistor/-makeSchematic.ts":
/*!******************************************************************!*\
  !*** ./typescript/circuit/component/_resistor/-makeSchematic.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_resistor/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_extendable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/extendable */ "./typescript/circuit/component/addins/extendable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");








const defaulterSchematic = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "resistor"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 40, y: 40 }]),
    resistance: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("number", 0)
};
const makeSchematic = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Schematic"], defaulterSchematic, _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__["default"], _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_extendable__WEBPACK_IMPORTED_MODULE_6__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeSchematic);


/***/ }),

/***/ "./typescript/circuit/component/_resistor/-maps.ts":
/*!*********************************************************!*\
  !*** ./typescript/circuit/component/_resistor/-maps.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generics_makeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generics/-makeMap */ "./typescript/circuit/generics/-makeMap.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_resistor/~classes.ts");
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_resistor/-makeSchematic.ts");
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_resistor/-makeLayout.ts");
/* harmony import */ var _loadSchematic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./-loadSchematic */ "./typescript/circuit/component/_resistor/-loadSchematic.ts");
/* harmony import */ var _loadLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./-loadLayout */ "./typescript/circuit/component/_resistor/-loadLayout.ts");






const schematicMap = {
    savename: "makeResistor",
    diagramType: "schematic",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Schematic"],
    make: _makeSchematic__WEBPACK_IMPORTED_MODULE_2__["default"],
    load: _loadSchematic__WEBPACK_IMPORTED_MODULE_4__["default"],
};
const layoutMap = {
    savename: "makeLayoutResistor",
    diagramType: "layout",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Layout"],
    make: _makeLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
    load: _loadLayout__WEBPACK_IMPORTED_MODULE_5__["default"],
};
const maps = {
    schematic: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(schematicMap, layoutMap),
    layout: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(layoutMap, schematicMap)
};
/* harmony default export */ __webpack_exports__["default"] = (maps);


/***/ }),

/***/ "./typescript/circuit/component/_resistor/constants.ts":
/*!*************************************************************!*\
  !*** ./typescript/circuit/component/_resistor/constants.ts ***!
  \*************************************************************/
/*! exports provided: INDEXEND1, INDEXEND2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXEND1", function() { return INDEXEND1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXEND2", function() { return INDEXEND2; });
const INDEXEND1 = 0;
const INDEXEND2 = 1;


/***/ }),

/***/ "./typescript/circuit/component/_resistor/~classes.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_resistor/~classes.ts ***!
  \************************************************************/
/*! exports provided: Schematic, Layout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Schematic", function() { return Schematic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../+component */ "./typescript/circuit/+component.ts");
/* harmony import */ var _utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utility/-deepCopy */ "./typescript/utility/-deepCopy.ts");
/* harmony import */ var _utility_insert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/~insert */ "./typescript/utility/~insert.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../generics/-getComponentConnections */ "./typescript/circuit/generics/-getComponentConnections.ts");
/* harmony import */ var _generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../generics/-makeConnector */ "./typescript/circuit/generics/-makeConnector.ts");
/* harmony import */ var _drawLayout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./-drawLayout */ "./typescript/circuit/component/_resistor/-drawLayout.ts");
/* harmony import */ var _drawSchematic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./-drawSchematic */ "./typescript/circuit/component/_resistor/-drawSchematic.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_resistor/constants.ts");









class Base extends _component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(values) {
        super(values);
        this.joints = values.joints;
        this.resistance = values.resistance;
    }
    getProperties() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            name: this.name,
            resistance: this.resistance
        });
    }
    getState() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            joints: this.joints,
            disabled: this.disabled
        });
    }
    insertInto(element) {
        _utility_insert__WEBPACK_IMPORTED_MODULE_2__["default"].last(this.group.element, element);
    }
    transferFunction() { return []; }
    ;
}
class Schematic extends Base {
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawSchematic__WEBPACK_IMPORTED_MODULE_7__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].schematic);
    }
    makeConnectors() {
        this.connectorSets = [
            [Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_8__["INDEXEND1"]]),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "node", this.joints[_constants__WEBPACK_IMPORTED_MODULE_8__["INDEXEND2"]]),]
        ];
    }
}
class Layout extends Base {
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawLayout__WEBPACK_IMPORTED_MODULE_6__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].layout);
    }
    makeConnectors() {
        this.connectorSets = [
            [Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "pin", this.joints[_constants__WEBPACK_IMPORTED_MODULE_8__["INDEXEND1"]]),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "pin", this.joints[_constants__WEBPACK_IMPORTED_MODULE_8__["INDEXEND2"]]),]
        ];
    }
}


/***/ }),

/***/ "./typescript/circuit/component/_stripboard/-drawLayout.ts":
/*!*****************************************************************!*\
  !*** ./typescript/circuit/component/_stripboard/-drawLayout.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawLayout; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_stripboard/constants.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _svg_element_rect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+rect */ "./typescript/svg/element/+rect.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../~constants */ "./typescript/~constants.ts");
/* harmony import */ var _makeTracks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./-makeTracks */ "./typescript/circuit/component/_stripboard/-makeTracks.ts");






function drawLayout(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_2__["make"])("body");
    const rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXCENTRE"]]).getAngleTo(instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXROTATION"]]);
    instance.tracks = Object(_makeTracks__WEBPACK_IMPORTED_MODULE_5__["default"])(instance);
    const size = {
        width: (instance.columns + 0.5) * _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"],
        height: (instance.rows + 0.5) * _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"]
    };
    const cornerRounding = { x: 3, y: 3 };
    bodyGroup.append(Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_3__["make"])(Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(0), size, cornerRounding, "body highlight").translate(instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXCENTRE"]]).rotate(rotation), instance.tracks.map(t => t.group));
    return bodyGroup;
}


/***/ }),

/***/ "./typescript/circuit/component/_stripboard/-loadLayout.ts":
/*!*****************************************************************!*\
  !*** ./typescript/circuit/component/_stripboard/-loadLayout.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadLayout; });
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_stripboard/-makeLayout.ts");

function loadLayout(raw) {
    const name = (raw.name);
    const rows = (raw.rows);
    const columns = (raw.columns);
    const trackBreaks = (raw.trackBreaks);
    const joints = (raw.joints);
    return Object(_makeLayout__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, rows, columns, trackBreaks, joints });
}


/***/ }),

/***/ "./typescript/circuit/component/_stripboard/-makeLayout.ts":
/*!*****************************************************************!*\
  !*** ./typescript/circuit/component/_stripboard/-makeLayout.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_stripboard/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_board__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/board */ "./typescript/circuit/component/addins/board.ts");
/* harmony import */ var _addins_wiresCreatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/wiresCreatable */ "./typescript/circuit/component/addins/wiresCreatable.ts");
/* harmony import */ var _addins_rotatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../addins/rotatable */ "./typescript/circuit/component/addins/rotatable.ts");
/* harmony import */ var _addins_reversableBoard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../addins/reversableBoard */ "./typescript/circuit/component/addins/reversableBoard.ts");










const defaulterLayout = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "stripboard"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 20, y: 0 }]),
    rows: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].integer(1),
    columns: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].integer(1),
    trackBreaks: validateTrackBreaks([]),
};
function validateTrackBreaks(fallback) {
    const result = (value, log = true) => {
        const predicate = (v) => ((value && Array.isArray(value) && value.every((tB) => {
            return (('track' in tB) && ('hole' in tB) && (typeof tB.track === 'number') && (typeof tB.hole === 'number'));
        })));
        return _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate(predicate, fallback)(value);
    };
    return result;
}
const makeLayout = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["StripboardLayout"], defaulterLayout, _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_board__WEBPACK_IMPORTED_MODULE_6__["default"], _addins_reversableBoard__WEBPACK_IMPORTED_MODULE_9__["default"], _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_wiresCreatable__WEBPACK_IMPORTED_MODULE_7__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_rotatable__WEBPACK_IMPORTED_MODULE_8__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeLayout);


/***/ }),

/***/ "./typescript/circuit/component/_stripboard/-makeTracks.ts":
/*!*****************************************************************!*\
  !*** ./typescript/circuit/component/_stripboard/-makeTracks.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return makeTracks; });
/* harmony import */ var _track_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_track/-maps */ "./typescript/circuit/component/_track/-maps.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../~constants */ "./typescript/~constants.ts");



function makeTracks(parent) {
    const rotation = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])(parent.joints[0]).getAngleTo(parent.joints[1]);
    const start = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])({ x: parent.columns - 1, y: parent.rows - 1 })
        .scaleWith(-_constants__WEBPACK_IMPORTED_MODULE_2__["gridSpacing"] / 2)
        .rotate(rotation)
        .sumWith(parent.joints[0]);
    const step = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])({ x: _constants__WEBPACK_IMPORTED_MODULE_2__["gridSpacing"], y: 0 }).rotate(rotation);
    const tracks = [...Array(parent.rows).keys()].map((row) => {
        // The position of the start of the row (the first hole)
        const rowStart = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])({ x: 0, y: row * _constants__WEBPACK_IMPORTED_MODULE_2__["gridSpacing"] })
            .rotate(rotation)
            .sumWith(start).vector;
        // The offset between each hole and the next in gridSpacings
        const holeSpacings = [0, ...Array(parent.columns - 1).fill(1)];
        return _track_maps__WEBPACK_IMPORTED_MODULE_0__["default"].make({
            holeSpacings: holeSpacings,
            style: "stripboard",
            joints: [rowStart, step]
        }, false);
    });
    return tracks;
}


/***/ }),

/***/ "./typescript/circuit/component/_stripboard/-maps.ts":
/*!***********************************************************!*\
  !*** ./typescript/circuit/component/_stripboard/-maps.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generics_makeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generics/-makeMap */ "./typescript/circuit/generics/-makeMap.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_stripboard/~classes.ts");
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_stripboard/-makeLayout.ts");
/* harmony import */ var _loadLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./-loadLayout */ "./typescript/circuit/component/_stripboard/-loadLayout.ts");




const layoutMap = {
    savename: "makeLayoutStripboard",
    diagramType: "layout",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["StripboardLayout"],
    make: _makeLayout__WEBPACK_IMPORTED_MODULE_2__["default"],
    load: _loadLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
    isBoard: true
};
const maps = {
    layout: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(layoutMap),
};
/* harmony default export */ __webpack_exports__["default"] = (maps);


/***/ }),

/***/ "./typescript/circuit/component/_stripboard/constants.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/_stripboard/constants.ts ***!
  \***************************************************************/
/*! exports provided: INDEXCENTRE, INDEXROTATION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXCENTRE", function() { return INDEXCENTRE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXROTATION", function() { return INDEXROTATION; });
const INDEXCENTRE = 0;
const INDEXROTATION = 1;


/***/ }),

/***/ "./typescript/circuit/component/_stripboard/~classes.ts":
/*!**************************************************************!*\
  !*** ./typescript/circuit/component/_stripboard/~classes.ts ***!
  \**************************************************************/
/*! exports provided: StripboardLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StripboardLayout", function() { return StripboardLayout; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../+component */ "./typescript/circuit/+component.ts");
/* harmony import */ var _utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utility/-deepCopy */ "./typescript/utility/-deepCopy.ts");
/* harmony import */ var _utility_insert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/~insert */ "./typescript/utility/~insert.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../generics/-getComponentConnections */ "./typescript/circuit/generics/-getComponentConnections.ts");
/* harmony import */ var _drawLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./-drawLayout */ "./typescript/circuit/component/_stripboard/-drawLayout.ts");






class StripboardLayout extends _component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(values) {
        super(values);
        this.tracks = [];
        this.connectorSets = [];
        this.rows = values.rows;
        this.columns = values.columns;
        this.trackBreaks = values.trackBreaks;
        this.joints = values.joints;
    }
    getProperties() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            name: this.name,
            rows: this.rows,
            columns: this.columns
        });
    }
    getState() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            joints: this.joints,
            disabled: this.disabled,
            trackBreaks: this.trackBreaks
        });
    }
    makeConnectors() {
        this.tracks.forEach(track => track.makeConnectors());
        this.tracks.forEach((track, trackIdx) => {
            let trackBreaks = this.trackBreaks.filter(trackBreak => trackBreak.track === trackIdx);
            track.connectorSets[0].forEach((hole, holeIdx) => {
                if (trackBreaks.some(trackBreak => trackBreak.hole === holeIdx)) {
                    hole.type = "brokenhole";
                }
            });
        });
    }
    draw() {
        this.group.prepend(Object(_drawLayout__WEBPACK_IMPORTED_MODULE_5__["default"])(this));
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].layout);
    }
    insertInto(element) {
        _utility_insert__WEBPACK_IMPORTED_MODULE_2__["default"].first(this.group.element, element);
    }
    transferFunction() { return []; }
    ;
}


/***/ }),

/***/ "./typescript/circuit/component/_track/-drawLayout.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_track/-drawLayout.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawLayout; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./typescript/circuit/component/_track/constants.ts");
/* harmony import */ var _utility_cumulativeSum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/-cumulativeSum */ "./typescript/utility/-cumulativeSum.ts");
/* harmony import */ var _svg_element_circle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+circle */ "./typescript/svg/element/+circle.ts");
/* harmony import */ var _svg_element_rect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+rect */ "./typescript/svg/element/+rect.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../~constants */ "./typescript/~constants.ts");






const drawStripboardHole = (position) => Object(_svg_element_circle__WEBPACK_IMPORTED_MODULE_3__["make"])(position, 4, "hole");
const drawBreadboardHole = (position) => Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])(position, { width: 8, height: 8 }, Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(0.5), "hole");
function drawLayout(instance) {
    const holeFunc = (instance.style === "breadboard") ? drawBreadboardHole : drawStripboardHole;
    const start = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXSTART"]];
    const step = instance.joints[_constants__WEBPACK_IMPORTED_MODULE_1__["INDEXSTEP"]];
    // Create the holes
    const holePositions = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(step).scaleMap(Object(_utility_cumulativeSum__WEBPACK_IMPORTED_MODULE_2__["default"])(...instance.holeSpacings)).sumWith(start).vectors;
    const holes = holePositions.map(hp => holeFunc(hp));
    const track = drawTrack(holePositions);
    return [track, ...holes];
}
const drawTrack = (holePositions) => {
    let start = holePositions[0];
    let end = holePositions[holePositions.length - 1];
    //: Vector, step: Vector, stepCount: number
    // Create the track
    let relativeEnd = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(end, Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(start).scaleWith(-1)).sum();
    let { radius, angle } = relativeEnd.asPolar();
    let centre = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(start, start, relativeEnd).sum().scaleWith(0.5).vector;
    let size = {
        width: radius + _constants__WEBPACK_IMPORTED_MODULE_5__["gridSpacing"] * 0.8,
        height: _constants__WEBPACK_IMPORTED_MODULE_5__["gridSpacing"] * 14 / 16
    };
    return Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])(centre, size, Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(0), 'body').rotate(angle, centre);
};


/***/ }),

/***/ "./typescript/circuit/component/_track/-loadLayout.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_track/-loadLayout.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadLayout; });
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_track/-makeLayout.ts");

function loadLayout(raw) {
    return Object(_makeLayout__WEBPACK_IMPORTED_MODULE_0__["default"])({});
}


/***/ }),

/***/ "./typescript/circuit/component/_track/-makeLayout.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/_track/-makeLayout.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_track/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");




const defaulter = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "track"),
    style: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate(["breadboard", "stripboard"], "breadboard"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 20, y: 0 }]),
    holeSpacings: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate(v => Array.isArray(v) && v.every(_valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].test("number")), [0]),
};
const makeLayout = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Layout"], defaulter, _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (makeLayout);


/***/ }),

/***/ "./typescript/circuit/component/_track/-maps.ts":
/*!******************************************************!*\
  !*** ./typescript/circuit/component/_track/-maps.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generics_makeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generics/-makeMap */ "./typescript/circuit/generics/-makeMap.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_track/~classes.ts");
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_track/-makeLayout.ts");
/* harmony import */ var _loadLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./-loadLayout */ "./typescript/circuit/component/_track/-loadLayout.ts");




const maps = Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])({
    savename: "makeLayoutTrack",
    diagramType: "layout",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Layout"],
    make: _makeLayout__WEBPACK_IMPORTED_MODULE_2__["default"],
    load: _loadLayout__WEBPACK_IMPORTED_MODULE_3__["default"]
});
/* harmony default export */ __webpack_exports__["default"] = (maps);


/***/ }),

/***/ "./typescript/circuit/component/_track/constants.ts":
/*!**********************************************************!*\
  !*** ./typescript/circuit/component/_track/constants.ts ***!
  \**********************************************************/
/*! exports provided: INDEXSTART, INDEXSTEP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXSTART", function() { return INDEXSTART; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEXSTEP", function() { return INDEXSTEP; });
const INDEXSTART = 0;
const INDEXSTEP = 1;


/***/ }),

/***/ "./typescript/circuit/component/_track/~classes.ts":
/*!*********************************************************!*\
  !*** ./typescript/circuit/component/_track/~classes.ts ***!
  \*********************************************************/
/*! exports provided: Layout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../+component */ "./typescript/circuit/+component.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _utility_deepCopy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/-deepCopy */ "./typescript/utility/-deepCopy.ts");
/* harmony import */ var _utility_insert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utility/~insert */ "./typescript/utility/~insert.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../generics/-getComponentConnections */ "./typescript/circuit/generics/-getComponentConnections.ts");
/* harmony import */ var _generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../generics/-makeConnector */ "./typescript/circuit/generics/-makeConnector.ts");
/* harmony import */ var _drawLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./-drawLayout */ "./typescript/circuit/component/_track/-drawLayout.ts");








class Layout extends _component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(values) {
        super(values);
        this.connectorSets = [];
        this.name = values.name;
        this.holeSpacings = values.holeSpacings;
        this.style = values.style;
        this.joints = values.joints;
    }
    getProperties() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_2__["default"])({
            name: this.name,
            holeSpacings: this.holeSpacings,
            style: this.style
        });
    }
    getState() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_2__["default"])({
            joints: this.joints,
            disabled: this.disabled
        });
    }
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawLayout__WEBPACK_IMPORTED_MODULE_7__["default"])(this));
    }
    /** Builds and draws the components connectors */
    makeConnectors() {
        const start = this.joints[0];
        const step = this.joints[1];
        this.connectorSets = [[]];
        // Create the holes
        let accHs = 0;
        this.holeSpacings.forEach((hS) => {
            accHs += hS;
            let holePos = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])(step)
                .scaleWith(accHs)
                .sumWith(start)
                .vector;
            this.connectorSets[0].push(Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_6__["default"])(this, "", "hole", holePos));
        });
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_5__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_4__["default"].layout);
    }
    insertInto(element) {
        _utility_insert__WEBPACK_IMPORTED_MODULE_3__["default"].last(this.group.element, element);
    }
    /** ...
    */
    transferFunction(from) {
        let fromIdx = this.connectorSets[0].indexOf(from);
        let connected = [];
        for (let i = fromIdx + 1; i < this.connectorSets[0].length; i++) {
            if (this.connectorSets[0][i].type === "brokenhole")
                break;
            connected.push(this.connectorSets[0][i]);
        }
        for (let i = fromIdx - 1; i >= 0; i--) {
            if (this.connectorSets[0][i].type === "brokenhole")
                break;
            connected.push(this.connectorSets[0][i]);
        }
        return connected;
    }
}


/***/ }),

/***/ "./typescript/circuit/component/_wire/-drawLayout.ts":
/*!***********************************************************!*\
  !*** ./typescript/circuit/component/_wire/-drawLayout.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawLayout; });
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");


//import * as $ from 'jquery';
function drawLayout(instance) {
    const bodyGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_1__["make"])("body");
    const joints = instance.joints;
    let coverPath, leadPath = "";
    //The proportion of half the end joints that is cover not lead
    let coverRatio = 0.6; //BETWEEN 0 and 1
    //Start at the beginning
    coverPath = leadPath = "M " + joints[0].x + " " + joints[0].y;
    // Draw cover towards the midpoint of first two joints (starting from coverRatio)
    coverPath += getSegmentTowardsJointMid(joints[0], joints[1], -coverRatio);
    // Draw lead path from start to midpoint of the first two joints
    leadPath += getSegmentTowardsJointMid(joints[0], joints[1], 1);
    // Draw curve between all mid joints
    let pathMid = getBezierBetweenJoints(joints);
    coverPath += pathMid;
    leadPath += pathMid;
    // Draw cover away from the midpoint of the last two joints (starting from 1-coverRatio)
    coverPath += getSegmentTowardsJointMid(joints[joints.length - 2], joints[joints.length - 1], coverRatio);
    // Draw lead path to end
    leadPath += getSegmentTowardsJointMid(joints[joints.length - 2], joints[joints.length - 1], 1);
    let cover = Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_0__["make"])(coverPath, "cover");
    $(cover.element).css("stroke", instance.color);
    //Style and add lead, cover
    //(Prepend so handles appear on top)
    bodyGroup.append(Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_0__["make"])(leadPath, "lead"), Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_0__["make"])(coverPath, "leadhighlight highlight"), cover);
    return bodyGroup;
}
function getBezierBetweenJoints(joints) {
    //Assume we are starting at the midpoint between first two joints
    let path = "";
    for (let j = 1; j < joints.length - 1; j++) {
        // End each curve at the mid point between the last two joints
        let p3 = {
            x: (joints[j + 1].x + joints[j].x) / 2,
            y: (joints[j + 1].y + joints[j].y) / 2
        };
        path += "Q " + joints[j].x + " " + joints[j].y +
            " " + p3.x + " " + p3.y;
    }
    return path;
}
// Starting or ending at a midpoint
function getSegmentTowardsJointMid(j0, j1, ratio) {
    let changeMid = {
        x: (j1.x - j0.x) / 2,
        y: (j1.y - j0.y) / 2
    };
    if (Math.sign(ratio) >= 0) {
        return 'l' + (changeMid.x * ratio) + " " + (changeMid.y * ratio) +
            'm' + (changeMid.x * (1 - ratio)) + " " + (changeMid.y * (1 - ratio));
    }
    else {
        ratio = Math.abs(ratio);
        return 'm' + (changeMid.x * (1 - ratio)) + " " + (changeMid.y * (1 - ratio)) +
            'l' + (changeMid.x * ratio) + " " + (changeMid.y * ratio);
    }
}


/***/ }),

/***/ "./typescript/circuit/component/_wire/-drawSchematic.ts":
/*!**************************************************************!*\
  !*** ./typescript/circuit/component/_wire/-drawSchematic.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return drawSchematic; });
/* harmony import */ var _svg_element_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../svg/element/+path */ "./typescript/svg/element/+path.ts");

function drawSchematic(instance) {
    return [
        Object(_svg_element_path__WEBPACK_IMPORTED_MODULE_0__["make"])(instance.joints, "line thin")
    ];
}


/***/ }),

/***/ "./typescript/circuit/component/_wire/-loadLayout.ts":
/*!***********************************************************!*\
  !*** ./typescript/circuit/component/_wire/-loadLayout.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadLayout; });
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_wire/-makeLayout.ts");

function loadLayout(raw) {
    const name = (raw.name);
    const color = (raw.color || raw.colour);
    //Joints Block
    const joints = (raw.joints);
    return Object(_makeLayout__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, color, joints });
}


/***/ }),

/***/ "./typescript/circuit/component/_wire/-loadSchematic.ts":
/*!**************************************************************!*\
  !*** ./typescript/circuit/component/_wire/-loadSchematic.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadSchematic; });
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_wire/-makeSchematic.ts");

function loadSchematic(raw) {
    const name = (raw.name);
    //Joints Block
    const joints = (raw.joints);
    return Object(_makeSchematic__WEBPACK_IMPORTED_MODULE_0__["default"])({ name, joints });
}


/***/ }),

/***/ "./typescript/circuit/component/_wire/-makeLayout.ts":
/*!***********************************************************!*\
  !*** ./typescript/circuit/component/_wire/-makeLayout.ts ***!
  \***********************************************************/
/*! exports provided: makeLayout, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeLayout", function() { return makeLayout; });
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_wire/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_extendable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/extendable */ "./typescript/circuit/component/addins/extendable.ts");
/* harmony import */ var _addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/connectionsHighlightable */ "./typescript/circuit/component/addins/connectionsHighlightable.ts");
/* harmony import */ var _addins_recolorable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../addins/recolorable */ "./typescript/circuit/component/addins/recolorable.ts");









const defaulterLayout = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "wire"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 80, y: 0 }], l => l >= 2),
    color: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].color("#545454")
};
const makeLayout = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Layout"], defaulterLayout, _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], [_addins_extendable__WEBPACK_IMPORTED_MODULE_6__["default"], { canAddJoints: true, canRemoveJoints: true, canRemoveComponent: true }], [_addins_connectionsHighlightable__WEBPACK_IMPORTED_MODULE_7__["default"], {}], _addins_recolorable__WEBPACK_IMPORTED_MODULE_8__["default"]);
//{ canAddJoints: true, canRemoveJoints: true, canRemoveComponent: true }
/* harmony default export */ __webpack_exports__["default"] = (makeLayout);


/***/ }),

/***/ "./typescript/circuit/component/_wire/-makeSchematic.ts":
/*!**************************************************************!*\
  !*** ./typescript/circuit/component/_wire/-makeSchematic.ts ***!
  \**************************************************************/
/*! exports provided: makeSchematic, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeSchematic", function() { return makeSchematic; });
/* harmony import */ var _valueCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~valueCheck */ "./typescript/circuit/component/~valueCheck.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_wire/~classes.ts");
/* harmony import */ var _generics_getMaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generics/-getMaker */ "./typescript/circuit/generics/-getMaker.ts");
/* harmony import */ var _addins_graphical__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../addins/graphical */ "./typescript/circuit/component/addins/graphical.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");
/* harmony import */ var _addins_selectable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../addins/selectable */ "./typescript/circuit/component/addins/selectable.ts");
/* harmony import */ var _addins_extendable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../addins/extendable */ "./typescript/circuit/component/addins/extendable.ts");
/* harmony import */ var _addins_junctions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../addins/junctions */ "./typescript/circuit/component/addins/junctions.ts");








const defaulterSchematic = {
    name: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("string", "wire"),
    disabled: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].validate("boolean", false),
    joints: _valueCheck__WEBPACK_IMPORTED_MODULE_0__["default"].joints([{ x: 0, y: 0 }, { x: 10, y: 10 }], l => l >= 2)
};
// TODO: Pass in options for extendable and others (options={?}) (true,true)
const makeSchematic = Object(_generics_getMaker__WEBPACK_IMPORTED_MODULE_2__["default"])(_classes__WEBPACK_IMPORTED_MODULE_1__["Schematic"], defaulterSchematic, _addins_junctions__WEBPACK_IMPORTED_MODULE_7__["default"], _addins_selectable__WEBPACK_IMPORTED_MODULE_5__["default"], _addins_graphical__WEBPACK_IMPORTED_MODULE_3__["default"], _addins_draggable__WEBPACK_IMPORTED_MODULE_4__["default"], [_addins_extendable__WEBPACK_IMPORTED_MODULE_6__["default"], { canAddJoints: true, canRemoveJoints: true, canRemoveComponent: true }]);
/* harmony default export */ __webpack_exports__["default"] = (makeSchematic);


/***/ }),

/***/ "./typescript/circuit/component/_wire/-maps.ts":
/*!*****************************************************!*\
  !*** ./typescript/circuit/component/_wire/-maps.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generics_makeMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../generics/-makeMap */ "./typescript/circuit/generics/-makeMap.ts");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~classes */ "./typescript/circuit/component/_wire/~classes.ts");
/* harmony import */ var _makeSchematic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./-makeSchematic */ "./typescript/circuit/component/_wire/-makeSchematic.ts");
/* harmony import */ var _makeLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./-makeLayout */ "./typescript/circuit/component/_wire/-makeLayout.ts");
/* harmony import */ var _loadSchematic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./-loadSchematic */ "./typescript/circuit/component/_wire/-loadSchematic.ts");
/* harmony import */ var _loadLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./-loadLayout */ "./typescript/circuit/component/_wire/-loadLayout.ts");






const schematicMap = {
    savename: "makeWire",
    diagramType: "schematic",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Schematic"],
    make: _makeSchematic__WEBPACK_IMPORTED_MODULE_2__["default"],
    load: _loadSchematic__WEBPACK_IMPORTED_MODULE_4__["default"]
};
const layoutMap = {
    savename: "makeLayoutWire",
    diagramType: "layout",
    instance: _classes__WEBPACK_IMPORTED_MODULE_1__["Layout"],
    make: _makeLayout__WEBPACK_IMPORTED_MODULE_3__["default"],
    load: _loadLayout__WEBPACK_IMPORTED_MODULE_5__["default"]
};
const maps = {
    schematic: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(schematicMap),
    layout: Object(_generics_makeMap__WEBPACK_IMPORTED_MODULE_0__["default"])(layoutMap)
};
/* harmony default export */ __webpack_exports__["default"] = (maps);


/***/ }),

/***/ "./typescript/circuit/component/_wire/~classes.ts":
/*!********************************************************!*\
  !*** ./typescript/circuit/component/_wire/~classes.ts ***!
  \********************************************************/
/*! exports provided: Schematic, Layout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Schematic", function() { return Schematic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../+component */ "./typescript/circuit/+component.ts");
/* harmony import */ var _utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utility/-deepCopy */ "./typescript/utility/-deepCopy.ts");
/* harmony import */ var _utility_insert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility/~insert */ "./typescript/utility/~insert.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../generics/-getComponentConnections */ "./typescript/circuit/generics/-getComponentConnections.ts");
/* harmony import */ var _generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../generics/-makeConnector */ "./typescript/circuit/generics/-makeConnector.ts");
/* harmony import */ var _utility_flatten__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utility/~flatten */ "./typescript/utility/~flatten.ts");
/* harmony import */ var _utility_isNot__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utility/-isNot */ "./typescript/utility/-isNot.ts");
/* harmony import */ var _drawLayout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./-drawLayout */ "./typescript/circuit/component/_wire/-drawLayout.ts");
/* harmony import */ var _drawSchematic__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./-drawSchematic */ "./typescript/circuit/component/_wire/-drawSchematic.ts");

;









class Base extends _component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    getProperties() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            name: this.name
        });
    }
    transferFunction(from) {
        return _utility_flatten__WEBPACK_IMPORTED_MODULE_6__["default"].flatten2d(this.connectorSets.map(connectorSet => connectorSet.filter(Object(_utility_isNot__WEBPACK_IMPORTED_MODULE_7__["default"])(from))));
    }
}
class Schematic extends Base {
    constructor(values) {
        super(values);
        this.connectorSets = [];
        this.joints = values.joints;
    }
    getState() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            joints: this.joints,
            disabled: this.disabled
        });
    }
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawSchematic__WEBPACK_IMPORTED_MODULE_9__["default"])(this));
    }
    insertInto(element) {
        _utility_insert__WEBPACK_IMPORTED_MODULE_2__["default"].first(this.group.element, element);
    }
    makeConnectors() {
        const end1 = this.joints[0];
        const end2 = this.joints[this.joints.length - 1];
        this.connectorSets = [[
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "node", end1),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "node", end2)
            ]
        ];
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].schematic);
    }
}
class Layout extends Base {
    constructor(values) {
        super(values);
        this.joints = values.joints;
        this.color = values.color;
    }
    getState() {
        return Object(_utility_deepCopy__WEBPACK_IMPORTED_MODULE_1__["default"])({
            joints: this.joints,
            color: this.color,
            disabled: this.disabled
        });
    }
    draw() {
        //(Prepend so handles appear on top)
        this.group.prepend(Object(_drawLayout__WEBPACK_IMPORTED_MODULE_8__["default"])(this));
    }
    insertInto(element) {
        _utility_insert__WEBPACK_IMPORTED_MODULE_2__["default"].last(this.group.element, element);
    }
    makeConnectors() {
        this.connectorSets = [[
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "pin", this.joints[0]),
                Object(_generics_makeConnector__WEBPACK_IMPORTED_MODULE_5__["default"])(this, "", "pin", this.joints[this.joints.length - 1]),
            ]
        ];
    }
    getConnections() {
        return Object(_generics_getComponentConnections__WEBPACK_IMPORTED_MODULE_4__["default"])(this, _manifest__WEBPACK_IMPORTED_MODULE_3__["default"].layout);
    }
}


/***/ }),

/***/ "./typescript/circuit/component/addins/board.ts":
/*!******************************************************!*\
  !*** ./typescript/circuit/component/addins/board.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_flatten__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utility/~flatten */ "./typescript/utility/~flatten.ts");

const Board = (() => {
    const init = (component) => {
        $(component.group.element).addClass("board");
        Object.defineProperty(component, 'connectorSets', {
            get: () => _utility_flatten__WEBPACK_IMPORTED_MODULE_0__["default"].flatten2d(component.tracks.map(track => track.connectorSets))
        });
    };
    return { init };
})();
/* harmony default export */ __webpack_exports__["default"] = (Board);


/***/ }),

/***/ "./typescript/circuit/component/addins/connectionsHighlightable.ts":
/*!*************************************************************************!*\
  !*** ./typescript/circuit/component/addins/connectionsHighlightable.ts ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../events */ "./typescript/circuit/events.ts");
/* harmony import */ var _svg_element_circle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../svg/element/+circle */ "./typescript/svg/element/+circle.ts");
/* harmony import */ var _svg_element_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../svg/element/+text */ "./typescript/svg/element/+text.ts");



const ConnectionsHighlightable = (() => {
    const init = (component, options = {}) => {
        let { propogate = true, colorPalette = defaultColorPalette, } = Object.assign({}, options);
        let element = component.group.element;
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].select, () => {
            createConnectionsHighlights(component, propogate, colorPalette);
        });
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].draw, () => {
            clearConnectionsHighlights(component);
            if ($(component.group.element).hasClass("selected")) {
                createConnectionsHighlights(component, propogate, colorPalette);
            }
        });
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].deselect, () => {
            clearConnectionsHighlights(component);
        });
    };
    const createConnectorHighlights = (component, connection, color) => {
        let highlight = Object(_svg_element_circle__WEBPACK_IMPORTED_MODULE_1__["make"])(connection.point, 4, "highlight highlightwithfill connectivityhighlight");
        $(highlight.element).css({ "fill": color, "stroke": color });
        component.group.append(highlight);
        if (connection.symbol !== undefined) {
            let symbol = Object(_svg_element_text__WEBPACK_IMPORTED_MODULE_2__["make"])(connection.symbol, connection.point, "text connectivityhighlight");
            component.group.append(symbol);
        }
    };
    const createConnectionsHighlights = (component, propogate, colorPalette) => {
        // Make sure the connectors are up to date
        component.makeConnectors();
        const connectionSets = component.getConnections();
        connectionSets.forEach(connectionSet => {
            connectionSet.forEach((connectorConnections, i) => {
                let color = colorPalette[i % colorPalette.length];
                if (connectorConnections.length > 1 && propogate) {
                    connectorConnections.slice(1).forEach(connector => {
                        createConnectorHighlights(component, connector, color);
                    });
                }
                createConnectorHighlights(component, connectorConnections[0], color);
            });
        });
    };
    const clearConnectionsHighlights = (component) => {
        $(component.group.element).find(".connectivityhighlight").remove();
    };
    const defaultColorPalette = [
        "red",
        "#8bc34a",
        "pink",
        "yellow",
        "cyan",
        "orange",
        "purple",
        "magenta"
    ];
    return { init };
})();
/* harmony default export */ __webpack_exports__["default"] = (ConnectionsHighlightable);


/***/ }),

/***/ "./typescript/circuit/component/addins/draggable.ts":
/*!**********************************************************!*\
  !*** ./typescript/circuit/component/addins/draggable.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events */ "./typescript/circuit/events.ts");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../history */ "./typescript/circuit/history.ts");

// import mappings from "../../mappings";


const Draggable = (() => {
    const init = (component, enablePredicate) => {
        const element = component.group.element;
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].dragStart, () => {
            _history__WEBPACK_IMPORTED_MODULE_2__["default"].add(component);
            component.insertInto(component.group.element);
        });
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].drag, (e, drag) => {
            if (e.target === element) {
                component.joints = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(component.joints).sumWith(drag).vectors;
                $(element).trigger(_events__WEBPACK_IMPORTED_MODULE_1__["default"].draw);
            }
        });
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].dragStop, () => {
            component.joints = component.joints.map(j => Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(j).round().vector);
        });
        // // TODO, I don't quite like how this is coupled together
        // if (mappings.getComponentMapSafe(component).isBoard
        //    && !ControlValues.boardDraggingEnabled
        // ) {
        //    disable(component);
        // }
    };
    const disable = (component) => {
        if ($(component.group.element).draggable("instance") !== undefined) {
            $(component.group.element).draggable("disable");
        }
    };
    const enable = (component) => {
        if ($(component.group.element).draggable("instance") !== undefined) {
            $(component.group.element).draggable("enable");
        }
    };
    return { init, disable, enable };
})();
/* harmony default export */ __webpack_exports__["default"] = (Draggable);


/***/ }),

/***/ "./typescript/circuit/component/addins/extendable.ts":
/*!***********************************************************!*\
  !*** ./typescript/circuit/component/addins/extendable.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../events */ "./typescript/circuit/events.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../history */ "./typescript/circuit/history.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _svg_element_circle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+circle */ "./typescript/svg/element/+circle.ts");
/* harmony import */ var _utility_isNot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utility/-isNot */ "./typescript/utility/-isNot.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../~constants */ "./typescript/~constants.ts");







const Extendable = (() => {
    const init = (component, options) => {
        let { canAddJoints = false, canRemoveJoints = false, canRemoveComponent = false } = Object.assign({}, (options ? options : {}));
        let element = component.group.element;
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].select, () => {
            createHandles(component);
        });
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].draw, () => {
            clearHandles(component);
            createHandles(component);
        });
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].dragStop, () => {
            clearHandles(component);
            createHandles(component);
        });
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].deselect, () => {
            clearHandles(component);
        });
        if (canAddJoints)
            initHandleInsertion(component);
        if (canRemoveJoints)
            initJointRemoval(component);
        if (canRemoveComponent)
            initComponentRemoval(component);
    };
    const createHandles = (component) => {
        initHandles(component);
    };
    const clearHandles = (component) => {
        $(component.group.element)
            .children(".dragHandle")
            .remove(":not(.dragging)")
            .hide(0); // I.e. hide the dragging one...
    };
    const initHandles = (component) => {
        component.joints.forEach(joint => {
            addHandle(component, joint);
        });
    };
    const initHandleInsertion = (component) => {
        $(component.group.element).dblclick(e => {
            if ($(e.target).closest(".handle").length < 1) {
                // Get position in svg coordinates, rounded to grid
                const position = Object(_vector__WEBPACK_IMPORTED_MODULE_3__["default"])(component.group.convertVector({ x: e.clientX || 0, y: e.clientY || 0 }, "DomToSvg", "relToGroup")).round(_constants__WEBPACK_IMPORTED_MODULE_6__["gridSpacing"] / 2).vector;
                // Get index for insertion into joint array
                const jointIdx = getJointInsertionIdx(component, position);
                //insert joint at position
                component.joints.splice(jointIdx, 0, position);
                addHandle(component, position);
                $(component.group.element).trigger(_events__WEBPACK_IMPORTED_MODULE_0__["default"].draw, [e]);
            }
        });
    };
    const initJointRemoval = (component) => {
        $(component.group.element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].drag, ".dragHandle", (e) => {
            removeExcessJoints(component, $(e.target).data("point"));
            $(component.group.element).trigger(_events__WEBPACK_IMPORTED_MODULE_0__["default"].draw, [e]);
        });
        $(component.group.element).on("dblclick", ".dragHandle", (e) => {
            // If only two joints remain then they can't be removed by dblclick
            if (component.joints.length <= 2)
                return;
            const point = $(e.target).data("point");
            component.joints = component.joints.filter(Object(_utility_isNot__WEBPACK_IMPORTED_MODULE_5__["default"])(point));
            e.target.remove();
            $(component.group.element).trigger(_events__WEBPACK_IMPORTED_MODULE_0__["default"].draw, [e]);
        });
    };
    const initComponentRemoval = (component) => {
        $(component.group.element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].dragStop, ".dragHandle", (e) => {
            if (component.joints.length === 2 && Object(_vector__WEBPACK_IMPORTED_MODULE_3__["default"])(component.joints[0]).isCloseTo(component.joints[1])) {
                _manifest__WEBPACK_IMPORTED_MODULE_1__["default"].removeComponent(component);
                _history__WEBPACK_IMPORTED_MODULE_2__["default"].mergeLast();
            }
        });
    };
    const addHandle = (component, point) => {
        const handle = Object(_svg_element_circle__WEBPACK_IMPORTED_MODULE_4__["make"])(point, 5, "handle dragHandle highlight").element;
        $(handle).data('point', point);
        component.group.append(handle);
        $(handle).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].drag, (e, drag) => {
            point.x += drag.x;
            point.y += drag.y;
            $(component.group.element).trigger(_events__WEBPACK_IMPORTED_MODULE_0__["default"].draw);
        });
        $(handle).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].dragStop, () => {
            point.x = Math.round(point.x);
            point.y = Math.round(point.y);
        });
    };
    const removeExcessJoints = (component, point) => {
        // If only two joints remain then they can't be removed during a drag
        if (component.joints.length <= 2)
            return;
        component.joints = component.joints.filter((joint) => {
            return (joint === point) || !Object(_vector__WEBPACK_IMPORTED_MODULE_3__["default"])(point).isCloseTo(joint);
        });
        $(component.group.element).children(".dragHandle").not(".dragging").filter((i, handle) => {
            return Object(_vector__WEBPACK_IMPORTED_MODULE_3__["default"])(point).isCloseTo($(handle).data('point'));
        }).remove();
    };
    const getJointInsertionIdx = (component, point) => {
        let jointAngles = component.joints.map((j) => Math.atan2(point.y - j.y, point.x - j.x) * 180 / Math.PI);
        let bestAnglePair = 180;
        let bestJointIdx = 0;
        for (let i = 1; i < jointAngles.length; i++) {
            let anglePair = Math.abs(Math.abs((jointAngles[i - 1] - jointAngles[i])) - 180);
            if (anglePair < bestAnglePair) {
                bestAnglePair = anglePair;
                bestJointIdx = i;
            }
        }
        return bestJointIdx;
    };
    // const getJointFromHandle = (handle: SVGCircleElement): Vector => ({
    //    // Animval is always just-as or more up-to-date than baseval
    //    x: handle.cx.animVal.value,
    //    y: handle.cy.animVal.value
    // })
    return { init };
})();
/* harmony default export */ __webpack_exports__["default"] = (Extendable);


/***/ }),

/***/ "./typescript/circuit/component/addins/graphical.ts":
/*!**********************************************************!*\
  !*** ./typescript/circuit/component/addins/graphical.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../events */ "./typescript/circuit/events.ts");
;

//import * as $ from 'jquery';
const Graphical = (() => {
    const init = (component) => {
        let element = component.group.element;
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].anyDraw, () => {
            if (component.disabled === false) {
                $(component.group.element).show();
                component.group.clearChildren(":not(.handle,.connectivityhighlight)");
                component.draw();
                component.makeConnectors();
            }
            else {
                $(component.group.element).hide();
            }
        });
    };
    return { init };
})();
/* harmony default export */ __webpack_exports__["default"] = (Graphical);


/***/ }),

/***/ "./typescript/circuit/component/addins/junctions.ts":
/*!**********************************************************!*\
  !*** ./typescript/circuit/component/addins/junctions.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events */ "./typescript/circuit/events.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _utility_flatten__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utility/~flatten */ "./typescript/utility/~flatten.ts");
/* harmony import */ var _svg_element_circle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+circle */ "./typescript/svg/element/+circle.ts");





const Junctions = (() => {
    const init = (component) => {
        let element = component.group;
        $(element.element).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].anyDraw, () => {
            clearJunctions(component);
            createJunctions(component);
        });
    };
    const createJunctions = (component) => {
        let otherConnectors = _utility_flatten__WEBPACK_IMPORTED_MODULE_3__["default"].flatten2d(_manifest__WEBPACK_IMPORTED_MODULE_2__["default"].schematic.map(component => _utility_flatten__WEBPACK_IMPORTED_MODULE_3__["default"].flatten2d(component.connectorSets).filter(connector => (connector.type === "node"))));
        component.connectorSets.forEach(connectorSet => connectorSet.forEach(connector => {
            let point = connector.point;
            let attachedConnectors = otherConnectors.filter(other => {
                return Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(point).isCloseTo(other.point);
            });
            if (attachedConnectors.length === 3) {
                //let ctm = Active.schematic.root.group.element.getCTM();
                //point = (ctm) ? point.matrixTransform(ctm.inverse()) : point;
                component.group.prepend(Object(_svg_element_circle__WEBPACK_IMPORTED_MODULE_4__["make"])(point, 5, "junction black"));
            }
        }));
    };
    const clearJunctions = (component) => {
        $(component.group.element).find(".junction").remove();
    };
    return { init };
})();
/* harmony default export */ __webpack_exports__["default"] = (Junctions);


/***/ }),

/***/ "./typescript/circuit/component/addins/recolorable.ts":
/*!************************************************************!*\
  !*** ./typescript/circuit/component/addins/recolorable.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../events */ "./typescript/circuit/events.ts");
/* harmony import */ var _utility_polar_toVector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utility/polar/-toVector */ "./typescript/utility/polar/-toVector.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _svg_element_circle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../svg/element/+circle */ "./typescript/svg/element/+circle.ts");
/* harmony import */ var _svg_element_rect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../svg/element/+rect */ "./typescript/svg/element/+rect.ts");
/* harmony import */ var _svg_element_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../svg/element/+group */ "./typescript/svg/element/+group.ts");
;






const Recolorable = (() => {
    const init = (component, options = {}) => {
        let { colorPalette = defaultColorPalette, } = Object.assign({}, options);
        const element = component.group.element;
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].select, () => {
            createRecolorHandle(component, colorPalette);
        });
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].draw, () => {
            clearRecolorHandle(component);
            createRecolorHandle(component, colorPalette);
        });
        $(element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].deselect, () => {
            clearRecolorHandle(component);
        });
    };
    const createRecolorHandle = (component, colorPalette) => {
        const position = getRecolorPosition(component);
        const recolorSegmentGroup = Object(_svg_element_group__WEBPACK_IMPORTED_MODULE_5__["make"])("recolorSegmentGroup");
        const recolorHandle = Object(_svg_element_circle__WEBPACK_IMPORTED_MODULE_3__["make"])(position, 7, "handle recolorHandle");
        //Segments
        const segment1 = Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])(position, { width: 10, height: 20 }, undefined, "recolorHandleSegment").rotate(45, position).translate({ x: -4, y: -4 });
        const segment2 = Object(_svg_element_rect__WEBPACK_IMPORTED_MODULE_4__["make"])(position, { width: 10, height: 20 }, undefined, "recolorHandleSegment").rotate(45, position).translate({ x: 4, y: 4 });
        $(segment1.element).css("fill", "#4fd56b");
        $(segment2.element).css("fill", "#d54f6b");
        recolorSegmentGroup.append(segment1, segment2);
        component.group.append(recolorHandle, recolorSegmentGroup);
        $(recolorHandle.element).on("click", () => {
            let colorIndex = colorPalette.indexOf(component.color);
            let color;
            if (colorIndex >= 0) {
                color = colorPalette[(colorIndex + 1) % colorPalette.length];
            }
            else {
                color = colorPalette[0];
            }
            ;
            component.color = color;
            $(component.group.element).trigger(_events__WEBPACK_IMPORTED_MODULE_0__["default"].draw);
        });
    };
    const clearRecolorHandle = (component) => {
        $(component.group.element).find(".recolorHandle").remove();
        $(component.group.element).find(".recolorSegmentGroup").remove();
    };
    const getRecolorPosition = (component) => {
        const angle = Object(_vector__WEBPACK_IMPORTED_MODULE_2__["default"])(component.joints[0]).getAngleTo(component.joints[1]);
        const offset = Object(_utility_polar_toVector__WEBPACK_IMPORTED_MODULE_1__["default"])(12, angle + 45);
        return Object(_vector__WEBPACK_IMPORTED_MODULE_2__["default"])(component.joints[0]).sumWith(offset).vector;
    };
    const defaultColorPalette = [
        "#545454",
        "red",
        "#7575FF",
        "#946857",
        "#55DD55",
        "#FFEF00",
        "pink"
    ];
    return { init };
})();
/* harmony default export */ __webpack_exports__["default"] = (Recolorable);


/***/ }),

/***/ "./typescript/circuit/component/addins/reversableBoard.ts":
/*!****************************************************************!*\
  !*** ./typescript/circuit/component/addins/reversableBoard.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events */ "./typescript/circuit/events.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../history */ "./typescript/circuit/history.ts");
/* harmony import */ var _utility_flatten__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utility/~flatten */ "./typescript/utility/~flatten.ts");
/* harmony import */ var _svg_addTransform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../svg/-addTransform */ "./typescript/svg/-addTransform.ts");
/* harmony import */ var _svg_element_circle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../svg/element/+circle */ "./typescript/svg/element/+circle.ts");







const ReversableBoard = (() => {
    const init = (component) => {
        let element = component.group;
        $(element.element).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].select, () => {
            createGhost(component);
        });
        $(element.element).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].dragStart, () => {
            clearGhost(component);
        });
        $(element.element).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].rotate, () => {
            clearGhost(component);
            createGhost(component);
        });
        $(element.element).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].dragStop, () => {
            createGhost(component);
        });
        $(element.element).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].deselect, () => {
            clearGhost(component);
        });
        $(element.element).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].draw, () => {
            if ($(element.element).hasClass("selected")) {
                clearGhost(component);
                createGhost(component);
            }
        });
    };
    const createGhost = (component) => {
        // Create the group
        let ghostGroup = component.group.element.cloneNode();
        let bbox = component.group.element.getBBox();
        //Scale
        Object(_svg_addTransform__WEBPACK_IMPORTED_MODULE_5__["default"])(ghostGroup, t => t.setScale(-1, 1), false);
        //Translate
        Object(_svg_addTransform__WEBPACK_IMPORTED_MODULE_5__["default"])(ghostGroup, t => t.setTranslate(-(bbox.width + bbox.x) * 2 - 1, 0), false);
        ghostGroup.appendChild($(component.group.element).children(".body").clone()[0]);
        $(ghostGroup).addClass("reverseghost");
        $(ghostGroup).data("selects", component);
        let parent = (component.group.element.parentElement);
        if (parent)
            parent.appendChild(ghostGroup);
        let allValidConnectors = _utility_flatten__WEBPACK_IMPORTED_MODULE_4__["default"].flatten2d(_manifest__WEBPACK_IMPORTED_MODULE_2__["default"].layout.map(el => _utility_flatten__WEBPACK_IMPORTED_MODULE_4__["default"].flatten2d(el.connectorSets.map(connectorSet => connectorSet.filter(connector => connector.type === "pin")))));
        // ...
        component.tracks.forEach((track, trackIdx) => {
            let trackGhostGroup = $(track.group.element).clone()[0];
            ghostGroup.appendChild(trackGhostGroup);
            // Add the holes
            //let ctm = (track.group.element.getCTM() || Svg.makeMatrix()).inverse()
            track.connectorSets[0].forEach((hole, holeIdx) => {
                let point = hole.point; //(ctm) ? hole.point.matrixTransform(ctm) : hole.point;
                let breaker = Object(_svg_element_circle__WEBPACK_IMPORTED_MODULE_6__["make"])(point, 6, "breaker");
                if (hole.type === "brokenhole") {
                    $(breaker.element).addClass("broken");
                }
                if (getPinsAtHole(hole, allValidConnectors).length) {
                    $(breaker.element).addClass("withPin");
                }
                ;
                trackGhostGroup.appendChild(breaker.element);
                let holePosition = { track: trackIdx, hole: holeIdx };
                $(breaker.element).click(() => {
                    _history__WEBPACK_IMPORTED_MODULE_3__["default"].add(component);
                    if (hole.type === "hole") {
                        $(breaker.element).addClass("broken");
                        hole.type = "brokenhole";
                        component.trackBreaks.push(holePosition);
                    }
                    else if (hole.type === "brokenhole") {
                        $(breaker.element).removeClass("broken");
                        hole.type = "hole";
                        component.trackBreaks = component.trackBreaks.filter(trackBreak => (trackBreak.hole !== holePosition.hole || trackBreak.track !== holePosition.track));
                    }
                });
            });
        });
    };
    const clearGhost = (component) => {
        let parent = (component.group.element.parentElement);
        if (parent)
            $(parent).children(".reverseghost").remove();
    };
    const getPinsAtHole = (connector, allConnectors) => {
        let acceptedTypes = ["pin"];
        let point = connector.point;
        let attachedConnectors = allConnectors.filter(other => {
            return (acceptedTypes.includes(other.type)
                && Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(point).isCloseTo(other.point));
        });
        return attachedConnectors;
    };
    return { init };
})();
/* harmony default export */ __webpack_exports__["default"] = (ReversableBoard);


/***/ }),

/***/ "./typescript/circuit/component/addins/rotatable.ts":
/*!**********************************************************!*\
  !*** ./typescript/circuit/component/addins/rotatable.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../events */ "./typescript/circuit/events.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../history */ "./typescript/circuit/history.ts");
;



const Rotatable = (() => {
    /** Initialise rotation using joint[0] as the rotation points
     *  Rotation triggered by double click in 90deg incriments
     */
    const init = (component) => {
        $(component.group.element).dblclick(() => {
            _history__WEBPACK_IMPORTED_MODULE_2__["default"].add(component);
            let centre = component.joints[0];
            component.joints = Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])(component.joints)
                .sumWith(Object(_vector__WEBPACK_IMPORTED_MODULE_1__["default"])(centre).scaleWith(-1))
                .rotate(90)
                .sumWith(centre)
                .vectors;
            $(component.group.element).trigger(_events__WEBPACK_IMPORTED_MODULE_0__["default"].draw);
            $(component.group.element).trigger(_events__WEBPACK_IMPORTED_MODULE_0__["default"].rotate);
        });
    };
    return { init };
})();
/* harmony default export */ __webpack_exports__["default"] = (Rotatable);


/***/ }),

/***/ "./typescript/circuit/component/addins/selectable.ts":
/*!***********************************************************!*\
  !*** ./typescript/circuit/component/addins/selectable.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../events */ "./typescript/circuit/events.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");


//import * as $ from 'jquery';
const Selectable = (() => {
    const init = (component) => {
        setSelectTrigger(component);
        setDisplayHandlers(component);
    };
    const getSelectsCheck = (component) => (i, element) => ($(element).data("selects") === component);
    const elementDirectlySelectsComponent = (element, component) => {
        const parents = $(element).parents(); //Ancestors
        const selectionElement = component.group.element;
        const elementCorrespondsToComponent = parents.is(selectionElement);
        const secondarySelectionCheck = getSelectsCheck(component);
        const elementIsComponentSelector = parents.is(secondarySelectionCheck);
        return (elementCorrespondsToComponent || elementIsComponentSelector);
    };
    const elementIndirectlySelectsComponent = (element, component) => {
        const selectionElements = _manifest__WEBPACK_IMPORTED_MODULE_1__["default"].findCorresponding(component).map(el => el.group.element);
        return $(element).parents().is(selectionElements);
    };
    const elementSelectsComponent = (element, component) => (elementDirectlySelectsComponent(element, component) ||
        elementIndirectlySelectsComponent(element, component));
    const setSelectTrigger = (component) => {
        // Selecting component triggers select
        $(component.group.element).one("mousedown", (e) => {
            /*LOGSTART*/ console.groupCollapsed("Selected", component.group.element); /*LOGEND*/
            /*LOGSTART*/ console.log("Primary: %o", component); /*LOGEND*/
            const otherComponents = _manifest__WEBPACK_IMPORTED_MODULE_1__["default"].findCorresponding(component);
            /*LOGSTART*/ console.log("Secondaries: %o", otherComponents); /*LOGEND*/
            const selectComponents = otherComponents.concat(component);
            selectComponents.forEach(selectComponent => {
                $(selectComponent.group.element).trigger(_events__WEBPACK_IMPORTED_MODULE_0__["default"].select);
            });
            setDeselectTrigger(component);
            /*LOGSTART*/ console.groupEnd(); /*LOGEND*/
        });
    };
    const setDeselectTrigger = (component) => {
        // Selecting anywhere else triggers deselect
        $(document).one("mousedown", e => {
            // Checks if target is child of component, ignore if so
            if (elementDirectlySelectsComponent(e.target, component)) {
                setDeselectTrigger(component);
                return;
            }
            const otherComponents = _manifest__WEBPACK_IMPORTED_MODULE_1__["default"].findCorresponding(component);
            const selectComponents = otherComponents.concat(component);
            selectComponents.forEach(selectComponent => {
                // Only deselect if not selected by new selection
                if (!elementSelectsComponent(e.target, selectComponent)) {
                    $(selectComponent.group.element).trigger(_events__WEBPACK_IMPORTED_MODULE_0__["default"].deselect);
                }
            });
            setSelectTrigger(component);
        });
    };
    const setDisplayHandlers = (component) => {
        $(component.group.element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].select, () => {
            $(component.group.element).addClass("selected");
            component.insertInto(component.group.element);
        });
        $(component.group.element).on(_events__WEBPACK_IMPORTED_MODULE_0__["default"].deselect, () => {
            $(component.group.element).removeClass("selected");
        });
    };
    return { init };
})();
/* harmony default export */ __webpack_exports__["default"] = (Selectable);


/***/ }),

/***/ "./typescript/circuit/component/addins/wiresCreatable.ts":
/*!***************************************************************!*\
  !*** ./typescript/circuit/component/addins/wiresCreatable.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events */ "./typescript/circuit/events.ts");
/* harmony import */ var _manifest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _wire_maps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_wire/-maps */ "./typescript/circuit/component/_wire/-maps.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../~constants */ "./typescript/~constants.ts");





const WiresCreatable = (() => {
    const init = (component) => {
        // Hole elements will not exist at initialisation,
        // need to use component filtered by .hole selector
        let wire;
        $(component.group.element).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].dragStart, ".hole", (e, start) => {
            wire = createWireAtPoint(Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(start).round(_constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"] / 2).vector);
            $(wire.group.element).trigger(_events__WEBPACK_IMPORTED_MODULE_1__["default"].select);
            const dragHandle = $(wire.group.element).find(".dragHandle")[0];
            $(dragHandle).addClass("dragging");
            $(dragHandle).trigger(_events__WEBPACK_IMPORTED_MODULE_1__["default"].dragStart, start);
            $(e.target).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].drag, (e, drag) => {
                $(dragHandle).trigger(_events__WEBPACK_IMPORTED_MODULE_1__["default"].drag, drag);
            });
            $(e.target).on(_events__WEBPACK_IMPORTED_MODULE_1__["default"].dragStop, (e, stop) => {
                $(dragHandle).removeClass("dragging");
                $(dragHandle).trigger(_events__WEBPACK_IMPORTED_MODULE_1__["default"].dragStop, stop);
            });
        });
    };
    const createWireAtPoint = (vector) => {
        const wire = _wire_maps__WEBPACK_IMPORTED_MODULE_3__["default"].layout.make({
            joints: [vector, vector],
        });
        _manifest__WEBPACK_IMPORTED_MODULE_2__["default"].addComponent(_manifest__WEBPACK_IMPORTED_MODULE_2__["default"].layout, wire);
        return wire;
    };
    return { init };
})();
/* harmony default export */ __webpack_exports__["default"] = (WiresCreatable);


/***/ }),

/***/ "./typescript/circuit/component/~valueCheck.ts":
/*!*****************************************************!*\
  !*** ./typescript/circuit/component/~valueCheck.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _utility_testType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utility/-testType */ "./typescript/utility/-testType.ts");
/* harmony import */ var _utility_validateType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utility/-validateType */ "./typescript/utility/-validateType.ts");



var ValueCheck;
(function (ValueCheck) {
    ValueCheck.test = _utility_testType__WEBPACK_IMPORTED_MODULE_1__["default"];
    ValueCheck.validate = _utility_validateType__WEBPACK_IMPORTED_MODULE_2__["default"];
    const integerTest = (n) => ValueCheck.test("number")(n) && Number.isInteger(n);
    function integer(fallback) {
        const result = (value, log = false) => {
            return ValueCheck.validate(integerTest, fallback)(value, log);
        };
        return result;
    }
    ValueCheck.integer = integer;
    function where(fallback) {
        const result = (value, log = false) => {
            const anyVector = ValueCheck.validate(_vector__WEBPACK_IMPORTED_MODULE_0__["default"].isVector, fallback)(value, log);
            return _vector__WEBPACK_IMPORTED_MODULE_0__["default"].standardise(anyVector);
        };
        return result;
    }
    ValueCheck.where = where;
    function joints(fallback, lengthTest = l => l === fallback.length) {
        const jointTest = (value) => _vector__WEBPACK_IMPORTED_MODULE_0__["default"].isVectorArray(value) && lengthTest(value.length);
        const result = (value, log = false) => {
            const anyVectors = ValueCheck.validate(jointTest, fallback)(value, log);
            return _vector__WEBPACK_IMPORTED_MODULE_0__["default"].standardise(anyVectors);
        };
        return result;
    }
    ValueCheck.joints = joints;
    /* Can't guarantee validity, but can guarantee it isn't definitely invalid*/
    const maxValidCSSColorLength = 25;
    const colorTest = (s) => ValueCheck.test("string")(s) && s.length <= maxValidCSSColorLength;
    function color(fallback) {
        const result = (value, log = false) => {
            return ValueCheck.validate(colorTest, fallback)(value, log);
        };
        return result;
    }
    ValueCheck.color = color;
})(ValueCheck || (ValueCheck = {}));
/* harmony default export */ __webpack_exports__["default"] = (ValueCheck);


/***/ }),

/***/ "./typescript/circuit/events.ts":
/*!**************************************!*\
  !*** ./typescript/circuit/events.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Events;
(function (Events) {
    Events.rotate = "rotate";
    Events.drag = "drag";
    Events.dragStart = "dragstart";
    Events.dragStop = "dragstop";
    Events.anyMove = [Events.rotate, Events.drag].join(" ");
    Events.place = "place";
    Events.select = "svgSelect";
    Events.deselect = "svgDeselect";
    Events.draw = "draw";
    Events.anyDraw = [Events.draw, Events.place].join(" ");
})(Events || (Events = {}));
/* harmony default export */ __webpack_exports__["default"] = (Events);


/***/ }),

/***/ "./typescript/circuit/generics/-getComponentConnections.ts":
/*!*****************************************************************!*\
  !*** ./typescript/circuit/generics/-getComponentConnections.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getComponentConnections; });
/* harmony import */ var _utility_flatten__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility/~flatten */ "./typescript/utility/~flatten.ts");
/* harmony import */ var _mappings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mappings */ "./typescript/circuit/mappings.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../-vector */ "./typescript/-vector.ts");



/** Returns an array of connected connectors for each connector in each connector set
 * of the component
 */
function getComponentConnections(component, otherComponents) {
    // Get all of the other connectors
    const allConnectors = _utility_flatten__WEBPACK_IMPORTED_MODULE_0__["default"].flatten3d(otherComponents.map(el => el.connectorSets));
    // For each connector set ([])
    return component.connectorSets.map(connectorSet => {
        // Find the unique nets
        const uniqueNetConnectors = getUniqueNetConnectors(connectorSet);
        // For each unique net ([][])
        return uniqueNetConnectors.map(connector => {
            // Find all connectors on that net ([][][])
            return getConnectorConnections(connector, allConnectors);
        });
    });
}
/** Gets a single connector for each connector net */
function getUniqueNetConnectors(connectors) {
    let nonCheckedConnectors = connectors;
    let uniqueNetConnectors = [];
    // While any connector is not checked
    while (nonCheckedConnectors.length) {
        // It must be on a new unique net, so add it
        uniqueNetConnectors.push(nonCheckedConnectors[0]);
        // Find all the others on that net
        let nettedConnectors = nonCheckedConnectors[0]
            .component.transferFunction(nonCheckedConnectors[0])
            .concat(nonCheckedConnectors[0]);
        // Remove them from the list to check
        nonCheckedConnectors = nonCheckedConnectors.filter(connector => !nettedConnectors.includes(connector));
    }
    return uniqueNetConnectors;
}
/** Returns an array of the connectors connected to a connector */
function getConnectorConnections(connector, allConnectors) {
    let connectedConnectors = [];
    let nonCheckedConnections = connector.component.transferFunction(connector).concat(connector);
    // If any connection is unchecked
    while (nonCheckedConnections.length) {
        // Add it as a connector
        connectedConnectors.push(...nonCheckedConnections);
        // Find new connections from nonchecked
        let newConnections = [];
        nonCheckedConnections.forEach(connection => {
            // Find the direct connections, and add to connections
            getConnectorDirectConnections(connection, allConnectors).forEach(connected => {
                // Don't add if they already have been (prevents infinite loops!)
                if (!(connectedConnectors.includes(connected))) {
                    connectedConnectors.push(connected);
                    newConnections.push(...connected.component.transferFunction(connected));
                }
            });
        });
        // Start again with new set (each iteration we move one connector further down any nets)
        nonCheckedConnections = newConnections;
    }
    return connectedConnectors;
}
/** Returns an array of the connectors which directly connect to a connector */
function getConnectorDirectConnections(connector, allConnectors) {
    // Get the connectorTypes which it is ok to connect to
    const acceptedTypes = _mappings__WEBPACK_IMPORTED_MODULE_1__["default"].connectorAcceptedTypes[connector.type];
    // Get the location of the connector
    const point = connector.point;
    // Return other connectors that can be connected to
    return allConnectors.filter(other => {
        return (acceptedTypes.includes(other.type)
            && Object(_vector__WEBPACK_IMPORTED_MODULE_2__["default"])(point).isCloseTo(other.point));
    });
}


/***/ }),

/***/ "./typescript/circuit/generics/-getMaker.ts":
/*!**************************************************!*\
  !*** ./typescript/circuit/generics/-getMaker.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getMaker; });
/* harmony import */ var _loadObjectWithDefaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-loadObjectWithDefaults */ "./typescript/circuit/generics/-loadObjectWithDefaults.ts");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./node_modules/util/util.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);


function getMaker(instanceClass, defaulter, ...addins) {
    return (partialValues, log = true) => {
        /*LOGSTART*/
        if (log) {
            console.groupCollapsed("Loading...");
        }
        /*LOGEND*/
        const values = Object(_loadObjectWithDefaults__WEBPACK_IMPORTED_MODULE_0__["default"])(defaulter, partialValues, log);
        /*LOGSTART*/
        if (log) {
            console.groupEnd();
        }
        /*LOGEND*/
        const component = new instanceClass(values);
        addins.forEach(addin => {
            if (Object(util__WEBPACK_IMPORTED_MODULE_1__["isArray"])(addin)) {
                addin[0].init(component, addin[1]);
            }
            else {
                addin.init(component);
            }
        });
        component.draw();
        component.makeConnectors();
        /*LOGSTART*/
        if (log) {
            console.groupCollapsed("%s: %o", component.name, component.group.element);
            console.log(component);
            console.groupEnd();
        }
        /*LOGEND*/
        $(component.group.element).addClass(component.name);
        return component;
    };
}


/***/ }),

/***/ "./typescript/circuit/generics/-loadObjectWithDefaults.ts":
/*!****************************************************************!*\
  !*** ./typescript/circuit/generics/-loadObjectWithDefaults.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadObjectWithDefaults; });
function loadObjectWithDefaults(defaulter, partial, log = true) {
    //TS just needs to trust me here...
    const result = Object.keys(defaulter).reduce((acc, key) => {
        /*LOGSTART*/ if (log) {
            console.group(key);
        } /*LOGEND*/
        const defaultFn = defaulter[key];
        const partialValue = (partial) ? partial[key] : undefined;
        acc[key] = defaultFn(partialValue, log);
        /*LOGSTART*/ if (log) {
            console.groupEnd();
        } /*LOGEND*/
        return acc;
    }, {});
    return result;
}


/***/ }),

/***/ "./typescript/circuit/generics/-makeConnector.ts":
/*!*******************************************************!*\
  !*** ./typescript/circuit/generics/-makeConnector.ts ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return makeConnector; });
function makeConnector(component, name, type, position, symbol) {
    let connector = {
        name: name,
        symbol: symbol,
        type: type,
        component: component,
        point: position,
    };
    return connector;
}


/***/ }),

/***/ "./typescript/circuit/generics/-makeMap.ts":
/*!*************************************************!*\
  !*** ./typescript/circuit/generics/-makeMap.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return makeMap; });
function makeMap(map, correspondsTo) {
    return Object.assign(map, { correspondsTo });
}


/***/ }),

/***/ "./typescript/circuit/history.ts":
/*!***************************************!*\
  !*** ./typescript/circuit/history.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _history_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_history/-factory */ "./typescript/circuit/_history/-factory.ts");

const history = Object(_history_factory__WEBPACK_IMPORTED_MODULE_0__["default"])();
/* harmony default export */ __webpack_exports__["default"] = (history);


/***/ }),

/***/ "./typescript/circuit/manifest.ts":
/*!****************************************!*\
  !*** ./typescript/circuit/manifest.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _active__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~active */ "./typescript/~active.ts");
/* harmony import */ var _component_opAmp_classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/_opAmp/~classes */ "./typescript/circuit/component/_opAmp/~classes.ts");
/* harmony import */ var _utility_curry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility/~curry */ "./typescript/utility/~curry.ts");
/* harmony import */ var _utility_split__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utility/-split */ "./typescript/utility/-split.ts");
/* harmony import */ var _utility_is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utility/-is */ "./typescript/utility/-is.ts");
/* harmony import */ var _utility_isUnaryMap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utility/-isUnaryMap */ "./typescript/utility/-isUnaryMap.ts");
/* harmony import */ var _mappings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mappings */ "./typescript/circuit/mappings.ts");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./history */ "./typescript/circuit/history.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./events */ "./typescript/circuit/events.ts");









//import * as $ from 'jquery';
const manifest = (() => {
    const clear = () => {
        manifest.layout = manifest.layout.filter(component => {
            component.group.element.remove();
            return false;
        });
        manifest.schematic = manifest.schematic.filter(component => {
            component.group.element.remove();
            return false;
        });
        $(_active__WEBPACK_IMPORTED_MODULE_0__["default"].layout.root.element).children().remove();
        $(_active__WEBPACK_IMPORTED_MODULE_0__["default"].schematic.root.element).children().remove();
    };
    let activeBoard;
    const constructFrom = (savedManifest) => {
        manifest.clear();
        manifest.schematic = savedManifest.schematic;
        manifest.layout = savedManifest.layout;
        if (!savedManifest.layout || savedManifest.layout.length === 0)
            completeManifestLayout();
        manifest.activeBoard = manifest.layout.find(component => _mappings__WEBPACK_IMPORTED_MODULE_6__["default"].getComponentMapSafe(component).isBoard === true);
        draw();
    };
    const addComponent = (manifestSection, ...components) => {
        let diagram;
        if (manifestSection === manifest.schematic) {
            diagram = _active__WEBPACK_IMPORTED_MODULE_0__["default"].schematic;
        }
        else {
            diagram = _active__WEBPACK_IMPORTED_MODULE_0__["default"].layout;
        }
        components.forEach(component => component.disabled = true);
        _history__WEBPACK_IMPORTED_MODULE_7__["default"].add(manifest, ...components);
        components.forEach(component => {
            component.disabled = false;
            manifestSection.push(component);
            placeComponent(component, diagram);
        });
    };
    const placeComponent = (component, diagram) => {
        component.insertInto(diagram.root.group.element);
        $(component.group.element).trigger(_events__WEBPACK_IMPORTED_MODULE_8__["default"].place);
    };
    const draw = () => {
        manifest.schematic.forEach(component => placeComponent(component, _active__WEBPACK_IMPORTED_MODULE_0__["default"].schematic));
        manifest.layout.forEach(component => placeComponent(component, _active__WEBPACK_IMPORTED_MODULE_0__["default"].layout));
    };
    const removeComponent = (...components) => {
        _history__WEBPACK_IMPORTED_MODULE_7__["default"].add(manifest, ...components);
        manifest.layout = manifest.layout.filter(el => !components.includes(el));
        manifest.schematic = manifest.schematic.filter(el => !components.includes(el));
        components.forEach(component => {
            $(component.group.element).hide();
            component.disabled = true;
        });
    };
    const findCorresponding = (component) => {
        if (!_mappings__WEBPACK_IMPORTED_MODULE_6__["default"].getComponentMapSafe(component).correspondsTo)
            return [];
        //Find component
        if (manifest.layout.includes(component)) {
            return manifest.schematic.filter(areComponentsSimilar(component));
        }
        else if (manifest.schematic.includes(component)) {
            return manifest.layout.filter(areComponentsSimilar(component));
        }
        else {
            return [];
        }
    };
    const checkAll = () => {
        /*LOGSTART*/ console.groupCollapsed("Check Data"); /*LOGEND*/
        // Only look at components which need to be compared
        let layComponents = manifest.layout.filter(c => _mappings__WEBPACK_IMPORTED_MODULE_6__["default"].getComponentMapSafe(c).correspondsTo);
        let schComponents = manifest.schematic.filter(c => _mappings__WEBPACK_IMPORTED_MODULE_6__["default"].getComponentMapSafe(c).correspondsTo);
        let schConnectorData = schComponents.map(schComponent => ({
            component: schComponent,
            connectorSets: getMinConnections(schComponent)
        }));
        // Split the layout components by whether they pass the test
        let passSorted = Object(_utility_split__WEBPACK_IMPORTED_MODULE_3__["default"])(layComponents, (layComponent) => {
            if (schConnectorData.length === 0)
                return false;
            // Find the layout components connector sets
            let layConnectorSets = getMinConnections(layComponent);
            // Find the connector sets for schematic components that are similar
            let schConnectorMinData = schConnectorData.filter(datum => areComponentsSimilar(layComponent)(datum.component));
            // Merge them into one if the component is unique (e.g. power supplies)
            const componentIsUnique = _mappings__WEBPACK_IMPORTED_MODULE_6__["default"].getComponentMapSafe(layComponent).isUnique;
            if (componentIsUnique) {
                let merged = mergeConnectorsSets(schConnectorMinData.map(datum => datum.connectorSets));
                schConnectorMinData.forEach(datum => {
                    datum.connectorSets = merged;
                });
            }
            let found = schConnectorMinData.filter(datum => connectorSetsHaveMatch(layConnectorSets, datum.connectorSets));
            if (componentIsUnique) {
                schConnectorData = schConnectorData.filter(datum => !found.includes(datum));
                /*LOGSTART*/ console.log("Layout %s '%o, matched with '%o'", layComponent.name, [layComponent], found); /*LOGEND*/
            }
            else {
                schConnectorData = schConnectorData.filter(datum => datum !== found[0]);
                /*LOGSTART*/ console.log("Layout %s '%o, matched with '%o'", layComponent.name, [layComponent], [found[0]]); /*LOGEND*/
            }
            // Check if there is any match between connector sets
            return found.length > 0;
        });
        /*LOGSTART*/
        console.log("Unmatched schematic components: %o", schConnectorData.map(datum => datum.component));
        console.log("Unmatched layout components: %o", passSorted.fails);
        console.groupEnd();
        /*LOGEND*/
        return {
            corrects: passSorted.passes,
            incorrects: passSorted.fails
        };
    };
    const getState = () => {
        return {
            schematic: [...manifest.schematic],
            layout: [...manifest.layout],
            activeBoard: manifest.activeBoard
        };
    };
    return {
        schematic: [],
        layout: [],
        addComponent: addComponent,
        constructFrom: constructFrom,
        removeComponent: removeComponent,
        findCorresponding: findCorresponding,
        checkAll: checkAll,
        activeBoard: activeBoard,
        getState: getState,
        clear: clear
    };
})();
const arePropertiesEqual = _utility_curry__WEBPACK_IMPORTED_MODULE_2__["default"].makeOptional((A, B) => {
    let Akeys = Object.keys(A);
    let Bkeys = Object.keys(B);
    return ((Akeys.length === Bkeys.length) &&
        Akeys.every(key => {
            return (B.hasOwnProperty(key) && A[key] === B[key]);
        }));
});
const areComponentsSimilar = _utility_curry__WEBPACK_IMPORTED_MODULE_2__["default"].makeOptional((componentA, componentB) => {
    return (componentA.name === componentB.name &&
        arePropertiesEqual(componentA.getProperties(), componentB.getProperties()));
});
const createMissingLayoutElements = () => {
    let layoutCopy = manifest.layout.slice();
    manifest.schematic.forEach(schematicElement => {
        let properties = schematicElement.getProperties();
        let match = layoutCopy.find(layoutElement => arePropertiesEqual(properties, layoutElement.getProperties()));
        if (match) {
            if (!_mappings__WEBPACK_IMPORTED_MODULE_6__["default"].getComponentMapSafe(match).isUnique) {
                layoutCopy = layoutCopy.filter(Object(_utility_is__WEBPACK_IMPORTED_MODULE_4__["default"])(match));
            }
        }
        else {
            const correspondsTo = _mappings__WEBPACK_IMPORTED_MODULE_6__["default"].getComponentMapSafe(schematicElement).correspondsTo;
            if (correspondsTo !== undefined) {
                const newComponentMaker = correspondsTo.make;
                const newComponent = newComponentMaker(schematicElement.getProperties());
                //mappings.getLayoutInstanceFromSchematic(schematicElement);
                manifest.layout.push(newComponent);
                if (_mappings__WEBPACK_IMPORTED_MODULE_6__["default"].getComponentMapSafe(newComponent).isUnique) {
                    layoutCopy.push(newComponent);
                }
            }
        }
    });
};
const mergeSingleOpAmps = () => {
    // For dual op amps
    let layoutOpAmps = manifest.layout.filter(layoutElement => (layoutElement["constructor"] === _component_opAmp_classes__WEBPACK_IMPORTED_MODULE_1__["Layout"]));
    let opAmpGroups = [];
    layoutOpAmps.forEach((opAmp, i) => {
        let groupIdx = opAmpGroups.findIndex(group => arePropertiesEqual(opAmp.getProperties(), group[0].getProperties()));
        if (groupIdx >= 0) {
            opAmpGroups[groupIdx].push(opAmp);
        }
        else {
            opAmpGroups.push([opAmp]);
        }
    });
    opAmpGroups.forEach(group => {
        while (group.length >= 2) {
            group[0].replaceWithDual();
            manifest.removeComponent(group[1]);
            group = group.splice(2);
        }
    });
};
// Add equivalent layout components for each schematic component
const completeManifestLayout = () => {
    createMissingLayoutElements();
    mergeSingleOpAmps();
};
const mergeConnectorSets = (connectorSets) => {
    // Reduce group to set
    return connectorSets.reduce((mergedConnectorSet, connectorSet) => {
        // Check each connector in set
        connectorSet.forEach(connector => {
            // If merged includes connector, merge, otherwise add 
            let found = mergedConnectorSet.find((mConnector) => mConnector.name === connector.name);
            if (found) {
                found.connections.push(...connector.connections);
            }
            else {
                mergedConnectorSet.push(connector);
            }
        });
        return mergedConnectorSet;
    });
};
const mergeConnectorsSets = (connectorSetGroups) => {
    return connectorSetGroups.reduce((mergedConnectorSetGroup, connectorSetGroup) => {
        connectorSetGroup.forEach((connectorSet, i) => {
            mergedConnectorSetGroup[i] = mergeConnectorSets([(mergedConnectorSetGroup[i] || []), connectorSet]);
        });
        return mergedConnectorSetGroup;
    });
};
const getMinConnections = (component) => {
    return (component.getConnections().map(connectorSet => {
        return (connectorSet.map(connections => {
            let connectorName = connections[0].name;
            connections.shift();
            let blackHole = connections.find(connection => _mappings__WEBPACK_IMPORTED_MODULE_6__["default"].getComponentMapSafe(connection.component).isUnique === true);
            if (blackHole)
                connections = connections.filter(Object(_utility_is__WEBPACK_IMPORTED_MODULE_4__["default"])(blackHole));
            return {
                name: connectorName,
                connections: connections.filter((connection) => _mappings__WEBPACK_IMPORTED_MODULE_6__["default"].getComponentMapSafe(connection.component).correspondsTo)
            };
        })).filter(c => c.connections.length !== 0);
    }));
};
const connectorSetsHaveMatch = _utility_curry__WEBPACK_IMPORTED_MODULE_2__["default"].makeOptional((connectorSetsA, connectorSetsB) => {
    return connectorSetsA.some(connectorSetA => {
        return connectorSetsB.some(connectorSetMatch(connectorSetA));
    });
});
const connectorSetMatch = _utility_curry__WEBPACK_IMPORTED_MODULE_2__["default"].makeOptional((connectorSetA, connectorSetB) => {
    // Returns true if both connector sets have the same set of connectors 
    // connected to the same set of connections...
    // Every connector in each connector set has a match in the corresponding set.
    return Object(_utility_isUnaryMap__WEBPACK_IMPORTED_MODULE_5__["default"])(connectorSetA, connectorSetB, (connectorA, connectorB) => {
        if (connectorA.name !== connectorB.name)
            return false;
        const connectionsA = connectorA.connections;
        const connectionsB = connectorB.connections;
        // Every connection in each connector has a match in the corresponding connector
        return Object(_utility_isUnaryMap__WEBPACK_IMPORTED_MODULE_5__["default"])(connectionsA, connectionsB, (connectionA, connectionB) => {
            // Connections are the same if:
            return (connectionA.name === connectionB.name
                && areComponentsSimilar(connectionA.component, connectionB.component));
        });
    });
});
/* harmony default export */ __webpack_exports__["default"] = (manifest);


/***/ }),

/***/ "./typescript/circuit/mappings.ts":
/*!****************************************!*\
  !*** ./typescript/circuit/mappings.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utility_tuple__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/-tuple */ "./typescript/utility/-tuple.ts");
/* harmony import */ var _component_wire_maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/_wire/-maps */ "./typescript/circuit/component/_wire/-maps.ts");
/* harmony import */ var _component_resistor_maps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/_resistor/-maps */ "./typescript/circuit/component/_resistor/-maps.ts");
/* harmony import */ var _component_capacitor_maps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/_capacitor/-maps */ "./typescript/circuit/component/_capacitor/-maps.ts");
/* harmony import */ var _component_inductor_maps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/_inductor/-maps */ "./typescript/circuit/component/_inductor/-maps.ts");
/* harmony import */ var _component_diode_maps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/_diode/-maps */ "./typescript/circuit/component/_diode/-maps.ts");
/* harmony import */ var _component_opAmp_maps__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/_opAmp/-maps */ "./typescript/circuit/component/_opAmp/-maps.ts");
/* harmony import */ var _component_power_maps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component/_power/-maps */ "./typescript/circuit/component/_power/-maps.ts");
/* harmony import */ var _component_bipolar_maps__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./component/_bipolar/-maps */ "./typescript/circuit/component/_bipolar/-maps.ts");
/* harmony import */ var _component_breadboard_maps__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./component/_breadboard/-maps */ "./typescript/circuit/component/_breadboard/-maps.ts");
/* harmony import */ var _component_stripboard_maps__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./component/_stripboard/-maps */ "./typescript/circuit/component/_stripboard/-maps.ts");
/* harmony import */ var _component_track_maps__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./component/_track/-maps */ "./typescript/circuit/component/_track/-maps.ts");












const mappingsBuilder = (() => {
    const componentMaps = Object(_utility_tuple__WEBPACK_IMPORTED_MODULE_0__["default"])(_component_wire_maps__WEBPACK_IMPORTED_MODULE_1__["default"].schematic, _component_wire_maps__WEBPACK_IMPORTED_MODULE_1__["default"].layout, _component_resistor_maps__WEBPACK_IMPORTED_MODULE_2__["default"].schematic, _component_resistor_maps__WEBPACK_IMPORTED_MODULE_2__["default"].layout, _component_capacitor_maps__WEBPACK_IMPORTED_MODULE_3__["default"].schematic, _component_capacitor_maps__WEBPACK_IMPORTED_MODULE_3__["default"].layout, _component_inductor_maps__WEBPACK_IMPORTED_MODULE_4__["default"].schematic, _component_inductor_maps__WEBPACK_IMPORTED_MODULE_4__["default"].layout, _component_diode_maps__WEBPACK_IMPORTED_MODULE_5__["default"].schematic, _component_diode_maps__WEBPACK_IMPORTED_MODULE_5__["default"].layout, _component_opAmp_maps__WEBPACK_IMPORTED_MODULE_6__["default"].schematic, _component_opAmp_maps__WEBPACK_IMPORTED_MODULE_6__["default"].layout, _component_power_maps__WEBPACK_IMPORTED_MODULE_7__["default"].schematic, _component_power_maps__WEBPACK_IMPORTED_MODULE_7__["default"].layout, _component_bipolar_maps__WEBPACK_IMPORTED_MODULE_8__["default"].schematic, _component_bipolar_maps__WEBPACK_IMPORTED_MODULE_8__["default"].layout, _component_breadboard_maps__WEBPACK_IMPORTED_MODULE_9__["default"].layoutLarge, _component_breadboard_maps__WEBPACK_IMPORTED_MODULE_9__["default"].layoutSmall, _component_stripboard_maps__WEBPACK_IMPORTED_MODULE_10__["default"].layout, _component_track_maps__WEBPACK_IMPORTED_MODULE_11__["default"]);
    function getComponentMapSafe(data) {
        const result = (typeof data === "string")
            ? componentMaps.find(map => map.savename === data)
            : componentMaps.find(map => {
                return (data instanceof map.instance);
            });
        if (result !== undefined) {
            return result;
        }
        else {
            /*LOGSTART*/ console.error("Component map not found with data %o", data); /*LOGEND*/
            throw new Error("Component map does not exist!");
        }
    }
    function getComponentMap(data) {
        return (typeof data === "string")
            ? componentMaps.find(map => map.savename === data)
            : componentMaps.find(map => map.instance === data["constructor"]);
    }
    //TODO use map(ts) to enforce correct values
    const connectorAcceptedTypes = {
        "pin": ["hole"],
        "hole": ["pin"],
        "brokenhole": [],
        "node": ["node"],
    };
    return {
        getComponentMap: getComponentMap,
        getComponentMapSafe: getComponentMapSafe,
        connectorAcceptedTypes: connectorAcceptedTypes,
    };
});
const mappings = mappingsBuilder();
/* harmony default export */ __webpack_exports__["default"] = (mappings);


/***/ }),

/***/ "./typescript/fileIO/load/-handleFileInputEvent.ts":
/*!*********************************************************!*\
  !*** ./typescript/fileIO/load/-handleFileInputEvent.ts ***!
  \*********************************************************/
/*! exports provided: lastFilename, handleFileInputEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lastFilename", function() { return lastFilename; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleFileInputEvent", function() { return handleFileInputEvent; });
/* harmony import */ var _nodeElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../~nodeElements */ "./typescript/~nodeElements.ts");
/* harmony import */ var _ui_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ui/~events */ "./typescript/ui/~events.ts");
/* harmony import */ var _dasim_buildComponents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dasim/-buildComponents */ "./typescript/fileIO/load/dasim/-buildComponents.ts");
/* harmony import */ var _dasim_filterInvalidComponents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dasim/-filterInvalidComponents */ "./typescript/fileIO/load/dasim/-filterInvalidComponents.ts");
/* harmony import */ var _dasim_getRawComponentsFromString__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dasim/-getRawComponentsFromString */ "./typescript/fileIO/load/dasim/-getRawComponentsFromString.ts");
/* harmony import */ var _dasim_getStringFromFileInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dasim/-getStringFromFileInput */ "./typescript/fileIO/load/dasim/-getStringFromFileInput.ts");
/* harmony import */ var _circuit_manifest__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../circuit/manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _circuit_history__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../circuit/history */ "./typescript/circuit/history.ts");








//import * as $ from 'jquery';
//TODO lastFilename shouldn't be exported here...! Maybe move
let lastFilename;
function handleFileInputEvent(event) {
    let fileInput = event.target;
    if (fileInput.value.length === 0) {
        // User selected to cancel, no action required
    }
    else {
        // Creates a queue forceing the following functions to occur in order,
        // and pass their output to the next function. This is necessary as some
        // are asynchronous but all require the prevous function to completed.
        // Prevents callback hell.
        // Note that each time '.then(fn)' is written it could be replaced with
        // '.then((args) => fn(args)' which is more explicit but more verbose
        /*LOGSTART*/ console.groupCollapsed("File Load Data"); /*LOGEND*/
        $.Deferred().resolve(fileInput)
            // Get the file as a string from the fileinput
            // (effectively the output of $.Deferred().resolve(fileInput))
            .then(() => Object(_dasim_getStringFromFileInput__WEBPACK_IMPORTED_MODULE_5__["default"])(fileInput))
            // Action changes depending on file type
            .then((file, fileString) => {
            let filename = file.name;
            let fileExtension = filename.split('.').pop();
            lastFilename = filename;
            if (fileExtension === "dasim" || fileExtension === "layout") {
                $.Deferred().resolve(fileString)
                    // Get the circuit from the string (output of above)
                    .then((string) => Object(_dasim_getRawComponentsFromString__WEBPACK_IMPORTED_MODULE_4__["default"])(string))
                    // Get the drawable components only from the circuit (output of above)
                    .then((circuitObjects) => Object(_dasim_filterInvalidComponents__WEBPACK_IMPORTED_MODULE_3__["default"])(circuitObjects))
                    // Build components
                    .then((rawComponents) => Object(_dasim_buildComponents__WEBPACK_IMPORTED_MODULE_2__["default"])(rawComponents))
                    // Called if any of the functions fail using detail from their context
                    .then((savedManifest) => {
                    _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].fileStatusText.innerText = "File:\r\n\"" + filename + "\"\r\nLoaded Successfully";
                    if (savedManifest) {
                        _circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].constructFrom(savedManifest);
                        _circuit_history__WEBPACK_IMPORTED_MODULE_7__["default"].reInit(..._circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].layout);
                    }
                    else {
                        /*LOGSTART*/ console.error("savedManifest is undefined"); /*LOGEND*/
                    }
                    /*LOGSTART*/ console.groupEnd(); /*LOGEND*/
                    _ui_events__WEBPACK_IMPORTED_MODULE_1__["default"].schematicPaneResize();
                    _ui_events__WEBPACK_IMPORTED_MODULE_1__["default"].layoutPaneResize();
                })
                    // Construct circuit
                    .fail((failText) => {
                    /*LOGSTART*/ console.warn("Failed to load circuit: ", failText); /*LOGEND*/
                    _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].fileStatusText.innerText = "Failed to load file:\r\n\""
                        + "" + filename + "\"\r\n"
                        + "Error:\r\n\"" +
                        failText + "\"";
                    /*LOGSTART*/ console.groupEnd(); /*LOGEND*/
                });
            }
            else {
                /*LOGSTART*/ console.error("Failed to load circuit: Incorrect file extenstion %o", fileExtension); /*LOGEND*/
                _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].fileStatusText.innerText = "Failed to load file:\r\n\""
                    + "" + filename + "\"\r\n"
                    + "Error:\r\n\"" +
                    "Incorrect file extenstion: \"." + fileExtension + "\"\"";
                /*LOGSTART*/ console.groupEnd(); /*LOGEND*/
            }
            //Clear file input
            $(fileInput).val("");
        });
    }
}



/***/ }),

/***/ "./typescript/fileIO/load/dasim/-buildComponents.ts":
/*!**********************************************************!*\
  !*** ./typescript/fileIO/load/dasim/-buildComponents.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return buildComponents; });
/* harmony import */ var _circuit_mappings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../circuit/mappings */ "./typescript/circuit/mappings.ts");

function buildComponents(rawComponents) {
    /*LOGSTART*/ console.groupCollapsed("Component Load Data"); /*LOGEND*/
    let manifest = {
        schematic: [],
        layout: []
    };
    for (let rawComponent of rawComponents) {
        const componentMap = _circuit_mappings__WEBPACK_IMPORTED_MODULE_0__["default"].getComponentMap(rawComponent.func);
        if (componentMap === undefined) {
            /*LOGSTART*/ console.error("I don't know how to build %o yet!", rawComponent); /*LOGEND*/
            continue;
        }
        const sectionName = componentMap.diagramType;
        let manifestSection = (sectionName === "schematic") ? manifest.schematic : manifest.layout;
        let newComponents = componentMap.load(rawComponent);
        if (Array.isArray(newComponents)) {
            manifestSection.push(...newComponents);
        }
        else {
            manifestSection.push(newComponents);
        }
    }
    /*LOGSTART*/ console.groupEnd(); /*LOGEND*/
    return manifest;
}


/***/ }),

/***/ "./typescript/fileIO/load/dasim/-filterInvalidComponents.ts":
/*!******************************************************************!*\
  !*** ./typescript/fileIO/load/dasim/-filterInvalidComponents.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return filterInvalidComponents; });
/* harmony import */ var _circuit_mappings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../circuit/mappings */ "./typescript/circuit/mappings.ts");

//import * as $ from 'jquery';
function filterInvalidComponents(circuitObjects) {
    // Allow caller to see when function completes
    let deferred = $.Deferred();
    // List of components from circuit objects that can be drawn
    let validComponents = [];
    // List of objects that can be removed
    let knownInvalidComponents = [];
    // List of components from circuit objects that can't be drawn
    let unknownInvalidComponents = [];
    // Iterate through each circuit object
    for (let circuitObject of circuitObjects) {
        // If object does not have property 'func' (as all should)
        if (!("func" in circuitObject)) {
            // Reject as there is a file format issue
            /*LOGSTART*/ console.error("Object %o format is incorrect", [circuitObject]); /*LOGEND*/
            deferred.reject("Object format is incorrect");
        }
        // If object is in the supportedComponentList
        if (_circuit_mappings__WEBPACK_IMPORTED_MODULE_0__["default"].getComponentMap(circuitObject.func)) {
            // Add to drawableComponents
            validComponents.push(circuitObject);
        }
        // If object is not supported but can be safely discarded
        else if (discardableObjects.some(dO => dO === circuitObject.func)) {
            // We know its ok to remove and the user did not expect it to be drawn
            knownInvalidComponents.push(circuitObject);
        }
        else {
            // If object is not in either list then user will expect it to be drawn
            // and needs to be notified that it is not supported
            unknownInvalidComponents.push(circuitObject);
        }
    }
    if (knownInvalidComponents.length) {
        /*LOGSTART*/ console.debug("Sim objects %o have been safely removed", [knownInvalidComponents]); /*LOGEND*/
    }
    if (unknownInvalidComponents.length) {
        /*LOGSTART*/ console.warn("Components %o are either not supported or not valid", [unknownInvalidComponents]); /*LOGEND*/
    }
    /*LOGSTART*/ console.info("Components %o successfully retrieved", [validComponents]); /*LOGEND*/
    deferred.resolve(validComponents);
    // Allow caller to see when function completes
    return deferred.promise();
}
// List of expected but safely ignorable objects
const discardableObjects = [
    "setSimMode",
    "setGraphicsControls",
    "setDrawingControls",
];


/***/ }),

/***/ "./typescript/fileIO/load/dasim/-getRawComponentsFromString.ts":
/*!*********************************************************************!*\
  !*** ./typescript/fileIO/load/dasim/-getRawComponentsFromString.ts ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getRawComponentsFromString; });
//import * as $ from 'jquery';
function getRawComponentsFromString(fileString) {
    // Used to queue asynchronous actions which require the output of previous
    // actions
    let deferred = $.Deferred();
    // Queues functions where each input is the previous functions output
    // Shortcut to pass fileString into the first function
    $.Deferred().resolve(fileString)
        // Get an array of the strings for each object
        .then(() => getComponentStrings(fileString))
        // Get an array of the objects
        .then((strings) => getCircuitObjects(strings))
        // Return the array of objects
        .then(deferred.resolve)
        // Pass the failiure back up to calling function
        .fail((failText) => deferred.reject(failText));
    // Allow caller to see when function completes
    return deferred.promise();
}
// Internal function to turn the string into an array of object strings
function getComponentStrings(fileString) {
    // Allow caller to see when function completes
    let deferred = $.Deferred();
    // Failure to parse text into JSON is a common cause of errors
    // catching them prevents failure of the program.
    try {
        let circuitObjectStrings = [];
        circuitObjectStrings = JSON.parse(fileString.replace("\n", ""));
        // Function complete, return array of strings
        deferred.resolve(circuitObjectStrings);
    }
    catch (e) {
        // Almost definitely a file format issue
        if (e instanceof SyntaxError)
            /*LOGSTART*/ console.error("Error in file list format: %o ", [e]); /*LOGEND*/
        // Function failed, return error text
        deferred.reject("Error in file list format");
    }
    // Allow caller to see when function completes
    return deferred.promise();
}
// Internal function to turn the string array into circuit objects
function getCircuitObjects(circuitObjectStrings) {
    // Allow caller to see when function completes
    let deferred = $.Deferred();
    // Failure to parse text into JSON is a common cause of errors
    // catching them prevents failure of the program.
    try {
        // Array of circuit objects
        let circuitObjects = [];
        // Parse each string into an object individually and add to array
        for (let circuitObjectString of circuitObjectStrings) {
            let circuitObject = JSON.parse(circuitObjectString);
            circuitObjects.push(circuitObject);
        }
        // Function complete, return array of objects
        /*LOGSTART*/ console.info("Circuit objects %o successfully parsed", [circuitObjects]); /*LOGEND*/
        deferred.resolve(circuitObjects);
    }
    catch (e) {
        // Almost definitely a file format issue
        if (e instanceof SyntaxError)
            /*LOGSTART*/ console.error("Error in file object format: %o", [e]); /*LOGEND*/
        // Function failed, return error text
        deferred.reject("Error in file object format");
    }
    // Allow caller to see when function completes
    return deferred.promise();
}


/***/ }),

/***/ "./typescript/fileIO/load/dasim/-getStringFromFileInput.ts":
/*!*****************************************************************!*\
  !*** ./typescript/fileIO/load/dasim/-getStringFromFileInput.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getStringFromFileInput; });
//import * as $ from 'jquery';
function getStringFromFileInput(fileInput) {
    // Used to queue asynchronous actions which require the output of previous
    // actions
    let deferred = $.Deferred();
    // Create Asynchronous file reader
    let reader = new FileReader;
    let files = fileInput.files;
    // Event called when read started
    reader.onloadstart = function (event) {
        /*LOGSTART*/ console.debug("Read of %o started with %o", [this.result], [event]); /*LOGEND*/
    };
    // Event called if read aborted (Not expected to ever happen)
    reader.onabort = function (event) {
        /*LOGSTART*/ console.error("Read of %o aborted with %o", [this.result], [event]); /*LOGEND*/
        // Async action failed, abort queue
        deferred.reject("File read aborted");
    };
    // Event called if error occurs during read
    reader.onerror = function (event) {
        /*LOGSTART*/ console.error("Read of %o failed with %o", [this.result], [event]); /*LOGEND*/
        // Async action failed, abort queue
        deferred.reject("File could not be read");
    };
    // Event called if read completed successfully
    reader.onload = function (event) {
        /*LOGSTART*/ console.info("Read of %o successfully complete with %o", [this.result], [event]); /*LOGEND*/
        let fileString = reader.result; //TODO
        if (files && files[0]) {
            deferred.resolve(files[0], fileString);
        }
        else {
            // Async action failed, abort queue
            deferred.reject("File undefined");
        }
    };
    if (files && files[0]) {
        // Catches other errors such as if the file opject is undefined
        try {
            // Retreive file from file input, file input is configured
            // to open a single file only but still returns as array.
            reader.readAsText(files[0]);
        }
        catch (e) {
            /*LOGSTART*/ console.error("Read of %o failed with %o", [files[0]], [e]); /*LOGEND*/
            // Async action failed, abort queue
            deferred.reject("File could not be read as string");
        }
    }
    else {
        // Async action failed, abort queue
        deferred.reject("File undefined");
    }
    // Return promise that async function will eventually finish
    return deferred.promise();
}


/***/ }),

/***/ "./typescript/fileIO/save/-createFile.ts":
/*!***********************************************!*\
  !*** ./typescript/fileIO/save/-createFile.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _circuit_manifest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../circuit/manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _circuit_mappings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../circuit/mappings */ "./typescript/circuit/mappings.ts");


function createFile() {
    let componentStrings = [];
    _circuit_manifest__WEBPACK_IMPORTED_MODULE_0__["default"].layout.concat(_circuit_manifest__WEBPACK_IMPORTED_MODULE_0__["default"].schematic).forEach(component => {
        try {
            const componentMap = _circuit_mappings__WEBPACK_IMPORTED_MODULE_1__["default"].getComponentMap(component);
            if (componentMap === undefined) {
                /*LOGSTART*/ console.error("No component map found!", component); /*LOGEND*/
                throw new Error("Could not save component");
            }
            let componentObject = Object.assign({ func: _circuit_mappings__WEBPACK_IMPORTED_MODULE_1__["default"].getComponentMapSafe(component).savename }, component.getProperties(), component.getState());
            // Don't save disabled objects
            if (componentObject.disabled === false) {
                // Remove disabled field (no need to save it)
                delete componentObject.disabled;
                componentStrings.push(JSON.stringify(componentObject));
            }
        }
        catch (e) {
            /*LOGSTART*/ console.error("Item %o cannot be saved (check mappings) with error %o", component, e); /*LOGEND*/
        }
    });
    return JSON.stringify(componentStrings, undefined, 2);
}
/* harmony default export */ __webpack_exports__["default"] = (createFile);


/***/ }),

/***/ "./typescript/fileIO/save/-handleFileSaveEvent.ts":
/*!********************************************************!*\
  !*** ./typescript/fileIO/save/-handleFileSaveEvent.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handleFileSaveEvent; });
/* harmony import */ var _nodeElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../~nodeElements */ "./typescript/~nodeElements.ts");
/* harmony import */ var _createFile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./-createFile */ "./typescript/fileIO/save/-createFile.ts");
/* harmony import */ var _load_handleFileInputEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../load/-handleFileInputEvent */ "./typescript/fileIO/load/-handleFileInputEvent.ts");



//import * as $ from 'jquery';
function handleFileSaveEvent(event) {
    // Create an temporary element to download
    let downloadElement = document.createElement('a');
    // Specify encoding and define content
    let fileString = Object(_createFile__WEBPACK_IMPORTED_MODULE_1__["default"])();
    downloadElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileString));
    // Give the file a name
    if (_load_handleFileInputEvent__WEBPACK_IMPORTED_MODULE_2__["lastFilename"] !== undefined) {
        downloadElement.setAttribute('download', _load_handleFileInputEvent__WEBPACK_IMPORTED_MODULE_2__["lastFilename"].split('.').shift() + ".layout");
    }
    else {
        downloadElement.setAttribute('download', 'filename.layout');
    }
    // Don't display the element
    downloadElement.style.display = 'none';
    document.body.appendChild(downloadElement);
    // Click the element on behalf of the user
    downloadElement.click();
    // Remove the element
    document.body.removeChild(downloadElement);
    // Can't detect if cancel pressed but can detect that save window is opened and closed.
    // This mechanism isn't perfect, but it doesn't need to be.
    $(window).one("blur", () => {
        $(window).one("focus", () => {
            _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].fileStatusText.innerText = "File Saved Successfully";
        });
    });
}


/***/ }),

/***/ "./typescript/main.ts":
/*!****************************!*\
  !*** ./typescript/main.ts ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nodeElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./~nodeElements */ "./typescript/~nodeElements.ts");
/* harmony import */ var _active__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~active */ "./typescript/~active.ts");
/* harmony import */ var _ui_init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/-init */ "./typescript/ui/-init.ts");



$(document).ready(() => {
    //TODO NodeElements must go before UI, remove dependancy
    _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].init();
    _active__WEBPACK_IMPORTED_MODULE_1__["default"].init();
    _ui_init__WEBPACK_IMPORTED_MODULE_2__["default"].init();
});


/***/ }),

/***/ "./typescript/svg/+element.ts":
/*!************************************!*\
  !*** ./typescript/svg/+element.ts ***!
  \************************************/
/*! exports provided: make, Functions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make", function() { return make; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Functions", function() { return Functions; });
/* harmony import */ var _addTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-addTransform */ "./typescript/svg/-addTransform.ts");
/* harmony import */ var _makeMatrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./-makeMatrix */ "./typescript/svg/-makeMatrix.ts");
/* harmony import */ var _svg_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../svg/-svg */ "./typescript/svg/-svg.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../~constants */ "./typescript/~constants.ts");




//import * as $ from 'jquery';
function make(type, classes = "") {
    const element = document.createElementNS(_constants__WEBPACK_IMPORTED_MODULE_3__["svgURI"], type);
    $(element).addClass(classes);
    return element;
}
var Functions;
(function (Functions) {
    /** FROM EAST, COUNTER-CLOCKWISE */
    function rotate(element) {
        return (rotation, centre, insertBefore = false) => {
            let centreV;
            if (centre) {
                centreV = centre;
            }
            else {
                let bounds = element.getBBox();
                centreV = { x: bounds.width / 2 + bounds.x, y: bounds.height / 2 + bounds.y };
            }
            Object(_addTransform__WEBPACK_IMPORTED_MODULE_0__["default"])(element, t => t.setRotate(rotation, centreV.x, centreV.y), insertBefore);
            return Object(_svg_svg__WEBPACK_IMPORTED_MODULE_2__["default"])(element);
        };
    }
    Functions.rotate = rotate;
    function translate(element) {
        return (translation, insertBefore = true) => {
            Object(_addTransform__WEBPACK_IMPORTED_MODULE_0__["default"])(element, t => t.setTranslate(translation.x, translation.y), insertBefore);
            return Object(_svg_svg__WEBPACK_IMPORTED_MODULE_2__["default"])(element);
        };
    }
    Functions.translate = translate;
    function scale(element) {
        return (scale, insertBefore = true) => {
            let scaleV = (typeof scale === "number") ? { x: scale, y: scale } : scale;
            Object(_addTransform__WEBPACK_IMPORTED_MODULE_0__["default"])(element, t => t.setScale((scaleV.x || 1), (scaleV.y || 1)), insertBefore);
            return Object(_svg_svg__WEBPACK_IMPORTED_MODULE_2__["default"])(element);
        };
    }
    Functions.scale = scale;
    function getTransforms(element) {
        return () => {
            let transform = element.transform.baseVal.consolidate();
            return (transform === null) ? Object(_makeMatrix__WEBPACK_IMPORTED_MODULE_1__["default"])() : {
                a: transform.matrix.a, b: transform.matrix.b, c: transform.matrix.c,
                d: transform.matrix.d, e: transform.matrix.e, f: transform.matrix.f
            };
        };
    }
    Functions.getTransforms = getTransforms;
    function setTransforms(element) {
        return (transformMatrix) => {
            element.transform.baseVal.clear();
            element.removeAttribute('transform');
            let matrix = Object(_makeMatrix__WEBPACK_IMPORTED_MODULE_1__["default"])();
            matrix.a = transformMatrix.a;
            matrix.b = transformMatrix.b;
            matrix.c = transformMatrix.c;
            matrix.d = transformMatrix.d;
            matrix.e = transformMatrix.e;
            matrix.f = transformMatrix.f;
            let transform = element.transform.baseVal.createSVGTransformFromMatrix(matrix);
            element.transform.baseVal.appendItem(transform);
            return Object(_svg_svg__WEBPACK_IMPORTED_MODULE_2__["default"])(element);
        };
    }
    Functions.setTransforms = setTransforms;
    // Converts vectors between the Dom and SVG frame of reference
    // Generally will want to use relative for sizes (or drags) and absolute for the rest
    function convertVector(element) {
        return (vector, direction, type) => {
            // Matrix representing transforms from element coordinates to dom coordinates
            // (It actually converts to the SVGs viewport, but that is unused and will be same as DOM)
            let conversionMatrix = element.getScreenCTM() || Object(_makeMatrix__WEBPACK_IMPORTED_MODULE_1__["default"])();
            // Inverts the matrix (to convert the other way)
            if (direction === "DomToSvg")
                conversionMatrix = conversionMatrix.inverse();
            // Reverses the transforms which could cause transformations on the reference frame...
            // In practice, this means top left will always be top left,
            // A rotation of 90(deg) will not cause a top left dom coordinate to
            // convert to the top right of the group and a rightwards drag to convert to a downwards drag
            if (type === "absToDoc" && element.transform.baseVal.numberOfItems > 0) {
                element.transform.baseVal.consolidate();
                let groupMatrix = element.transform.baseVal.getItem(0).matrix;
                conversionMatrix = conversionMatrix.multiply(groupMatrix);
            }
            // Apply rotational/scale conversions
            let convertedVector = {
                x: vector.x * conversionMatrix.a + vector.y * conversionMatrix.c,
                y: vector.y * conversionMatrix.d + vector.x * conversionMatrix.b
            };
            // If relative then also apply the translations...
            if (type === "relToGroup") {
                convertedVector.x += conversionMatrix.e;
                convertedVector.y += conversionMatrix.f;
            }
            return convertedVector;
        };
    }
    Functions.convertVector = convertVector;
})(Functions || (Functions = {}));


/***/ }),

/***/ "./typescript/svg/+root.ts":
/*!*********************************!*\
  !*** ./typescript/svg/+root.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Root; });
/* harmony import */ var _element_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element/+svg */ "./typescript/svg/element/+svg.ts");
/* harmony import */ var _element_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _addins_draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addins/draggable */ "./typescript/svg/addins/draggable.ts");
/* harmony import */ var _addins_scaleable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addins/scaleable */ "./typescript/svg/addins/scaleable.ts");




//import * as $ from 'jquery';
class Root {
    constructor(classes = "") {
        this.element = Object(_element_svg__WEBPACK_IMPORTED_MODULE_0__["make"])();
        this.group = Object(_element_group__WEBPACK_IMPORTED_MODULE_1__["make"])();
        $(this.element.element).addClass(classes);
    }
    draw(node) {
        this.element.append(this.group);
        node.appendChild(this.element.element);
        _addins_draggable__WEBPACK_IMPORTED_MODULE_2__["default"].init(this.element.element);
        _addins_scaleable__WEBPACK_IMPORTED_MODULE_3__["default"].init(this.group.element, {
            eventTarget: this.element.element,
        });
    }
}


/***/ }),

/***/ "./typescript/svg/-addTransform.ts":
/*!*****************************************!*\
  !*** ./typescript/svg/-addTransform.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addTransform; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./+element */ "./typescript/svg/+element.ts");

function addTransform(element, transformationFunction, insertBefore = true) {
    let transform = makeTransform();
    transformationFunction(transform);
    let transforms = element.transform.baseVal;
    if (insertBefore) {
        transforms.insertItemBefore(transform, 0);
    }
    else {
        transforms.appendItem(transform);
    }
    transforms.consolidate();
}
function makeTransform() {
    return Object(_element__WEBPACK_IMPORTED_MODULE_0__["make"])("svg").createSVGTransform();
}


/***/ }),

/***/ "./typescript/svg/-makeMatrix.ts":
/*!***************************************!*\
  !*** ./typescript/svg/-makeMatrix.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return makeMatrix; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./+element */ "./typescript/svg/+element.ts");

function makeMatrix() {
    return Object(_element__WEBPACK_IMPORTED_MODULE_0__["make"])("svg").createSVGMatrix();
}


/***/ }),

/***/ "./typescript/svg/-svg.ts":
/*!********************************!*\
  !*** ./typescript/svg/-svg.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return svg; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./+element */ "./typescript/svg/+element.ts");
/* harmony import */ var _element_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element/+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _element_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./element/+text */ "./typescript/svg/element/+text.ts");



function svg(element) {
    let extension = {
        element: element
    };
    let elementExtension = (element instanceof SVGGraphicsElement) ? {
        rotate: _element__WEBPACK_IMPORTED_MODULE_0__["Functions"].rotate(element),
        translate: _element__WEBPACK_IMPORTED_MODULE_0__["Functions"].translate(element),
        scale: _element__WEBPACK_IMPORTED_MODULE_0__["Functions"].scale(element),
        getTransforms: _element__WEBPACK_IMPORTED_MODULE_0__["Functions"].getTransforms(element),
        setTransforms: _element__WEBPACK_IMPORTED_MODULE_0__["Functions"].setTransforms(element),
        convertVector: _element__WEBPACK_IMPORTED_MODULE_0__["Functions"].convertVector(element),
    } : null;
    let groupExtension = (element instanceof SVGGElement || element instanceof SVGSVGElement) ? {
        append: _element_group__WEBPACK_IMPORTED_MODULE_1__["Functions"].append(element),
        prepend: _element_group__WEBPACK_IMPORTED_MODULE_1__["Functions"].prepend(element),
        clearChildren: _element_group__WEBPACK_IMPORTED_MODULE_1__["Functions"].clearChildren(element)
    } : null;
    let textExtension = (element instanceof SVGTextElement) ? {
        followPath: _element_text__WEBPACK_IMPORTED_MODULE_2__["Functions"].followPath(element),
        rotatePosition: _element_text__WEBPACK_IMPORTED_MODULE_2__["Functions"].rotatePosition(element),
    } : null;
    return Object.assign({}, extension, elementExtension, groupExtension, textExtension);
}


/***/ }),

/***/ "./typescript/svg/addins/draggable.ts":
/*!********************************************!*\
  !*** ./typescript/svg/addins/draggable.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../-vector */ "./typescript/-vector.ts");
/* harmony import */ var _circuit_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../circuit/events */ "./typescript/circuit/events.ts");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../-svg */ "./typescript/svg/-svg.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../~constants */ "./typescript/~constants.ts");




//import * as $ from 'jquery';
const Draggable = (() => {
    const init = (container) => {
        // Parameterise
        const dragStepThresholdSvg = _constants__WEBPACK_IMPORTED_MODULE_3__["gridSpacing"] / 2;
        const dragStartThresholdSvg = _constants__WEBPACK_IMPORTED_MODULE_3__["gridSpacing"] / 2;
        let state = "Idle";
        let lastMousePosSvg;
        let element;
        let onMouseDown = (e) => {
            // Possible states should be 'Idle'
            // Get the target element
            element = e.target;
            element = $(e.target).closest(":not(g.body,g.body *)").get(0);
            // Do drag prep
            const mouseDownDom = { x: e.clientX, y: e.clientY };
            lastMousePosSvg = Object(_svg__WEBPACK_IMPORTED_MODULE_2__["default"])(element).convertVector(mouseDownDom, "DomToSvg", "relToGroup");
            // Trigger drag prepped if I care
            $(document).on("mousemove", onMouseMove);
            $(document).one("mouseup", onMouseUp);
            state = "Ready";
        };
        const onMouseMove = (e) => {
            // Possible states should 'Ready' or 'Dragging'
            // Get absolute position of mouse event
            const mouseMoveToDom = { x: e.clientX, y: e.clientY };
            const mousePosSvg = Object(_svg__WEBPACK_IMPORTED_MODULE_2__["default"])(element).convertVector(mouseMoveToDom, "DomToSvg", "relToGroup");
            if (state === "Ready") {
                if (!Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(mousePosSvg).isCloseTo(lastMousePosSvg, dragStartThresholdSvg / 2)) {
                    // If new position > threshold from start
                    $(element).addClass("dragging");
                    $(element).trigger(_circuit_events__WEBPACK_IMPORTED_MODULE_1__["default"].dragStart, lastMousePosSvg);
                    state = "Dragging";
                }
                else {
                    return;
                }
            }
            if (state === "Dragging") {
                if (!Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(mousePosSvg).isCloseTo(lastMousePosSvg, dragStepThresholdSvg / 2)) {
                    const mouseMoveSvg = Object(_vector__WEBPACK_IMPORTED_MODULE_0__["default"])(mousePosSvg).subSum(lastMousePosSvg);
                    const dragSteps = mouseMoveSvg.scaleWith(1 / dragStepThresholdSvg).round();
                    const dragSizeSvg = dragSteps.scaleWith(dragStepThresholdSvg);
                    $(element).trigger(_circuit_events__WEBPACK_IMPORTED_MODULE_1__["default"].drag, dragSizeSvg.vector);
                    lastMousePosSvg = dragSizeSvg.sumWith(lastMousePosSvg).vector;
                }
            }
        };
        const onMouseUp = (e) => {
            // Possible states should be 'Dragging' or 'Ready'     
            $(document).off("mousemove", onMouseMove);
            if (state === "Dragging") {
                $(element).removeClass("dragging");
                $(element).trigger(_circuit_events__WEBPACK_IMPORTED_MODULE_1__["default"].dragStop, lastMousePosSvg);
            }
            state = "Idle";
        };
        $(container).on("mousedown", onMouseDown);
    };
    return { init };
})();
/* harmony default export */ __webpack_exports__["default"] = (Draggable);


/***/ }),

/***/ "./typescript/svg/addins/scaleable.ts":
/*!********************************************!*\
  !*** ./typescript/svg/addins/scaleable.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../-svg */ "./typescript/svg/-svg.ts");

var Scaleable;
(function (Scaleable) {
    Scaleable.init = (element, options = {}) => {
        // Set the event to occur on another target, but apply to yourself
        let eventTarget = options.eventTarget !== undefined ? options.eventTarget : element;
        // Scale occurs on mousewheel
        let mouseWheelHandler = (e) => {
            // Prevent scaling if a drag is in progress
            // Grid size is calculated on dragstart and will get messed up
            if (e.buttons === 1 || e.buttons === 3) {
                return;
            }
            // Change scale by +/-0.05 on each step depending on wheel direction
            let scaleChange = Math.sign(e.deltaY) * -0.05;
            // Find the postion and size of the element on screen
            let clientBounds = element.getBoundingClientRect();
            // Find the position relative to the SVG position
            let owner = element.ownerSVGElement;
            let rootClientBounds = (owner) ? owner.getBoundingClientRect() : {
                left: 0,
                top: 0
            };
            let clientStart = {
                x: clientBounds.left - rootClientBounds.left,
                y: clientBounds.top - rootClientBounds.top
            };
            // Find the elements relative position in its own coordinate system
            let svgStart = Object(_svg__WEBPACK_IMPORTED_MODULE_0__["default"])(element).convertVector(clientStart, "DomToSvg", "absToDoc");
            let svgSize = Object(_svg__WEBPACK_IMPORTED_MODULE_0__["default"])(element).convertVector({
                x: clientBounds.width,
                y: clientBounds.height
            }, "DomToSvg", "absToDoc");
            // Find the position of the mouse relative to the centre of the element on screen
            let mousePosDomFromCentre = {
                x: e.clientX - (clientBounds.left + clientBounds.width / 2),
                y: e.clientY - (clientBounds.top + clientBounds.height / 2)
            };
            // Find the position of the mouse relative to the centre of the element in its own coordinate system
            let mousePosSvgFromCentre = Object(_svg__WEBPACK_IMPORTED_MODULE_0__["default"])(element).convertVector(mousePosDomFromCentre, "DomToSvg", "absToDoc");
            // Perform the scale
            let scale = {
                x: 1 + scaleChange,
                y: 1 + scaleChange
            };
            Object(_svg__WEBPACK_IMPORTED_MODULE_0__["default"])(element).scale(scale, true);
            // Work out the translation required to keep the element under the mouse
            let scaleTranslationAdjust = {
                x: (svgStart.x + svgSize.x / 2 + mousePosSvgFromCentre.x) * -scaleChange,
                y: (svgStart.y + svgSize.y / 2 + mousePosSvgFromCentre.y) * -scaleChange
            };
            // Translate
            Object(_svg__WEBPACK_IMPORTED_MODULE_0__["default"])(element).translate(scaleTranslationAdjust, true);
            if (options.onScale !== undefined) {
                options.onScale(scale, scaleTranslationAdjust);
            }
        };
        // Add event listeners for mousewheel
        // Typescript definitions for addEventListener are incorrect (as any surpresses warning)
        eventTarget.addEventListener("DOMMouseScroll", (e) => mouseWheelHandler(e), {
            passive: true
        }); // For Firefox
        eventTarget.addEventListener("mousewheel", (e) => mouseWheelHandler(e), {
            passive: true
        }); // For everyone else
    };
})(Scaleable || (Scaleable = {}));
/* harmony default export */ __webpack_exports__["default"] = (Scaleable);


/***/ }),

/***/ "./typescript/svg/element/+circle.ts":
/*!*******************************************!*\
  !*** ./typescript/svg/element/+circle.ts ***!
  \*******************************************/
/*! exports provided: make */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make", function() { return make; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../+element */ "./typescript/svg/+element.ts");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../-svg */ "./typescript/svg/-svg.ts");


function make(centreVector, radius, classes = "") {
    const element = Object(_element__WEBPACK_IMPORTED_MODULE_0__["make"])("circle", classes);
    element.setAttribute("cx", centreVector.x.toString());
    element.setAttribute("cy", centreVector.y.toString());
    element.setAttribute("r", radius.toString());
    return Object(_svg__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
}


/***/ }),

/***/ "./typescript/svg/element/+ellipse.ts":
/*!********************************************!*\
  !*** ./typescript/svg/element/+ellipse.ts ***!
  \********************************************/
/*! exports provided: make */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make", function() { return make; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../+element */ "./typescript/svg/+element.ts");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../-svg */ "./typescript/svg/-svg.ts");


function make(centreVector, radiusVector, classes = "") {
    const element = Object(_element__WEBPACK_IMPORTED_MODULE_0__["make"])("ellipse", classes);
    element.setAttribute("cx", centreVector.x.toString());
    element.setAttribute("cy", centreVector.y.toString());
    element.setAttribute("rx", radiusVector.x.toString());
    element.setAttribute("ry", radiusVector.y.toString());
    return Object(_svg__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
}


/***/ }),

/***/ "./typescript/svg/element/+group.ts":
/*!******************************************!*\
  !*** ./typescript/svg/element/+group.ts ***!
  \******************************************/
/*! exports provided: make, Functions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make", function() { return make; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Functions", function() { return Functions; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../+element */ "./typescript/svg/+element.ts");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../-svg */ "./typescript/svg/-svg.ts");


function make(classes = "") {
    return Object(_svg__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_element__WEBPACK_IMPORTED_MODULE_0__["make"])("g", classes));
}
var Functions;
(function (Functions) {
    function append(element) {
        return (...elements) => {
            addChildren(element, (child) => {
                element.appendChild(child);
            }, ...elements);
            return Object(_svg__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
        };
    }
    Functions.append = append;
    //Note when given an array, the z-order is not reversed.
    function prepend(element) {
        return (...elements) => {
            let firstChild = element.firstChild;
            addChildren(element, (child) => {
                element.insertBefore(child, firstChild);
            }, ...elements);
            return Object(_svg__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
        };
    }
    Functions.prepend = prepend;
    function clearChildren(element) {
        return (inclusionSelector = "*") => {
            $(element).children(inclusionSelector).remove();
            return Object(_svg__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
        };
    }
    Functions.clearChildren = clearChildren;
    function addChildren(to, addCallback, ...elements) {
        elements.forEach(item => {
            //item = item instanceof Array ? item : [item];
            let asArray = item instanceof Array ? item : [item];
            asArray.forEach(member => {
                let element = member instanceof SVGGraphicsElement ? member : member.element;
                addCallback(element);
            });
        });
        // To allow method chaining;
        return to;
    }
})(Functions || (Functions = {}));


/***/ }),

/***/ "./typescript/svg/element/+line.ts":
/*!*****************************************!*\
  !*** ./typescript/svg/element/+line.ts ***!
  \*****************************************/
/*! exports provided: make */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make", function() { return make; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../+element */ "./typescript/svg/+element.ts");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../-svg */ "./typescript/svg/-svg.ts");


function make(startVector, endVector, classes = "") {
    const element = Object(_element__WEBPACK_IMPORTED_MODULE_0__["make"])("line", classes);
    element.setAttribute("x1", startVector.x.toString());
    element.setAttribute("y1", startVector.y.toString());
    element.setAttribute("x2", endVector.x.toString());
    element.setAttribute("y2", endVector.y.toString());
    return Object(_svg__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
}


/***/ }),

/***/ "./typescript/svg/element/+path.ts":
/*!*****************************************!*\
  !*** ./typescript/svg/element/+path.ts ***!
  \*****************************************/
/*! exports provided: make */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make", function() { return make; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../+element */ "./typescript/svg/+element.ts");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../-svg */ "./typescript/svg/-svg.ts");


function make(path, classes = "") {
    const element = Object(_element__WEBPACK_IMPORTED_MODULE_0__["make"])("path", classes);
    let pathString = (path instanceof Array) ? getLinePath(path) : path;
    element.setAttribute('d', pathString);
    return Object(_svg__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
}
function getLinePath(jointSet) {
    if (jointSet.length > 0 && jointSet[0] instanceof Array) {
        let jointArrays = jointSet;
        return jointArrays.map(getSingleLinePath).join();
    }
    else {
        let joints = jointSet;
        return getSingleLinePath(joints);
    }
}
function getSingleLinePath(joints) {
    if (joints.length < 1) {
        return "";
    }
    else {
        return "M" + joints[0].x + " " + joints[0].y
            + joints.map(joint => "L" + joint.x + " " + joint.y).join();
    }
}


/***/ }),

/***/ "./typescript/svg/element/+rect.ts":
/*!*****************************************!*\
  !*** ./typescript/svg/element/+rect.ts ***!
  \*****************************************/
/*! exports provided: make */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make", function() { return make; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../+element */ "./typescript/svg/+element.ts");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../-svg */ "./typescript/svg/-svg.ts");


function make(centre, size, cornerRounding = { x: 0, y: 0 }, classes = "") {
    const element = Object(_element__WEBPACK_IMPORTED_MODULE_0__["make"])("rect", classes);
    element.setAttribute("x", (centre.x - size.width / 2).toString());
    element.setAttribute("y", (centre.y - size.height / 2).toString());
    element.setAttribute("width", size.width.toString());
    element.setAttribute("height", size.height.toString());
    element.setAttribute("rx", cornerRounding.x.toString());
    element.setAttribute("ry", cornerRounding.y.toString());
    return Object(_svg__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
}


/***/ }),

/***/ "./typescript/svg/element/+svg.ts":
/*!****************************************!*\
  !*** ./typescript/svg/element/+svg.ts ***!
  \****************************************/
/*! exports provided: make */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make", function() { return make; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../+element */ "./typescript/svg/+element.ts");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../-svg */ "./typescript/svg/-svg.ts");


function make(classes = "") {
    const element = Object(_element__WEBPACK_IMPORTED_MODULE_0__["make"])("svg", classes);
    return Object(_svg__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
}


/***/ }),

/***/ "./typescript/svg/element/+text.ts":
/*!*****************************************!*\
  !*** ./typescript/svg/element/+text.ts ***!
  \*****************************************/
/*! exports provided: make, Functions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make", function() { return make; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Functions", function() { return Functions; });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../+element */ "./typescript/svg/+element.ts");
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../-svg */ "./typescript/svg/-svg.ts");



//import * as $ from 'jquery';
let textPathCount = 0;
function make(text, startVector, classes = "") {
    const element = Object(_element__WEBPACK_IMPORTED_MODULE_0__["make"])("text", classes);
    element.setAttribute('x', startVector.x.toString());
    element.setAttribute('y', startVector.y.toString());
    element.appendChild(document.createTextNode(text));
    return Object(_svg__WEBPACK_IMPORTED_MODULE_2__["default"])(element);
}
var Functions;
(function (Functions) {
    function followPath(element) {
        return (pathString) => {
            // Make a new path
            let path = Object(_path__WEBPACK_IMPORTED_MODULE_1__["make"])(pathString);
            $(path.element).hide();
            // Give it a generated (hopefully unique)  ID
            let pathID = "pathForText" + textPathCount;
            path.element.setAttribute("id", pathID);
            textPathCount += 1;
            // Make the text path, and link it to the path
            let textPathEl = Object(_element__WEBPACK_IMPORTED_MODULE_0__["make"])("textPath");
            textPathEl.setAttribute("href", "#" + pathID);
            // Get text content, remove from textEl and add to text pathEl
            let text = $(element).text();
            $(element).text("");
            textPathEl.appendChild(document.createTextNode(text));
            // Add the path and textpath as children
            element.appendChild(path.element);
            element.appendChild(textPathEl);
            return Object(_svg__WEBPACK_IMPORTED_MODULE_2__["default"])(element);
        };
    }
    Functions.followPath = followPath;
    function rotatePosition(element) {
        return (rotation) => {
            const position = {
                x: Number(element.getAttribute("x")),
                y: Number(element.getAttribute("y"))
            };
            Object(_svg__WEBPACK_IMPORTED_MODULE_2__["default"])(element).rotate(rotation).rotate(-rotation, position);
            if (25 < rotation && rotation < 155) {
                $(element).css("text-anchor", "start");
            }
            else if (-155 < rotation && rotation < -25) {
                $(element).css("text-anchor", "end");
            }
            else {
                $(element).css("text-anchor", "middle");
            }
            if (135 < rotation || rotation < -135) {
                $(element).css("alignment-baseline", "hanging");
            }
            else if (-55 < rotation && rotation < 45) {
                $(element).css("alignment-baseline", "baseline");
            }
            else {
                $(element).css("alignment-baseline", "middle");
            }
            return Object(_svg__WEBPACK_IMPORTED_MODULE_2__["default"])(element);
        };
    }
    Functions.rotatePosition = rotatePosition;
})(Functions || (Functions = {}));


/***/ }),

/***/ "./typescript/svg/element/groups/+dip.ts":
/*!***********************************************!*\
  !*** ./typescript/svg/element/groups/+dip.ts ***!
  \***********************************************/
/*! exports provided: make */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make", function() { return make; });
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../+text */ "./typescript/svg/element/+text.ts");
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../+path */ "./typescript/svg/element/+path.ts");
/* harmony import */ var _rect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../+rect */ "./typescript/svg/element/+rect.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../~constants */ "./typescript/~constants.ts");





function make(pinsPerSide = 4, textLineOne = "", textLineTwo = "", textLineThree = "", classes = "") {
    const element = Object(_group__WEBPACK_IMPORTED_MODULE_0__["make"])("dip" + classes);
    let bodySize = {
        width: _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"] * pinsPerSide,
        height: _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"] * 2.8
    };
    let centre = {
        x: _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"] * (pinsPerSide - 1) / 2,
        y: _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"] * 1.5
    };
    let pinString = "M " + (0) + " " + (-2.5)
        + "h " + (-4)
        + "v " + (3)
        + "l " + (1) + " " + (0.5)
        + "h " + (6)
        + "l " + (1) + " " + (-0.5)
        + "v " + (-3)
        + "Z";
    // let pinXBase = 0;
    for (let i = 0; i < pinsPerSide; i++) {
        element.append(Object(_path__WEBPACK_IMPORTED_MODULE_2__["make"])(pinString, "pin").scale({ x: 1, y: -1 }).translate({ x: _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"] * i, y: 0 }), Object(_path__WEBPACK_IMPORTED_MODULE_2__["make"])(pinString, "pin").translate({ x: _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"] * i, y: 3 * _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"] }));
    }
    ;
    let notchString = "M " + (-0.5 * _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"]) + " " + (centre.y) +
        "v " + (8) +
        "a " + (1) + " " + (1) + " " + (0) + " " + (0) + " " + (0) + " " + (0) + " " + (-16) +
        "Z";
    element.append(Object(_rect__WEBPACK_IMPORTED_MODULE_3__["make"])(centre, bodySize, { x: 5, y: 5 }, "body"), Object(_path__WEBPACK_IMPORTED_MODULE_2__["make"])(notchString, "notch"), Object(_rect__WEBPACK_IMPORTED_MODULE_3__["make"])(centre, bodySize, { x: 5, y: 5 }, "body highlight"), Object(_text__WEBPACK_IMPORTED_MODULE_1__["make"])(textLineOne, { x: 0.25 * _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"], y: 1 * _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"] }, "text"), Object(_text__WEBPACK_IMPORTED_MODULE_1__["make"])(textLineTwo, { x: 0.25 * _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"], y: 1.75 * _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"] }, "text"), Object(_text__WEBPACK_IMPORTED_MODULE_1__["make"])(textLineThree, { x: 0.25 * _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"], y: 2.5 * _constants__WEBPACK_IMPORTED_MODULE_4__["gridSpacing"] }, "text"));
    return element;
}


/***/ }),

/***/ "./typescript/svg/element/groups/+textSequence.ts":
/*!********************************************************!*\
  !*** ./typescript/svg/element/groups/+textSequence.ts ***!
  \********************************************************/
/*! exports provided: make */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make", function() { return make; });
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../+group */ "./typescript/svg/element/+group.ts");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../+text */ "./typescript/svg/element/+text.ts");


function make(start, gap, sequence, classes = "") {
    const element = Object(_group__WEBPACK_IMPORTED_MODULE_0__["make"])(classes);
    let textArray = [];
    if (sequence instanceof Array) {
        // Converts to text (using 'String(val)')
        textArray = sequence.map(String);
    }
    else if (typeof sequence === "string") {
        textArray = sequence.split("");
    }
    else {
        // Its the object
        textArray = [...Array(sequence.length).keys()].map(v => (v + sequence.start).toString());
    }
    element.append(textArray.map((txt, i) => Object(_text__WEBPACK_IMPORTED_MODULE_1__["make"])(txt, { x: gap.x * i, y: gap.y * i }, "text")));
    element.translate(start);
    return element;
}


/***/ }),

/***/ "./typescript/ui/-init.ts":
/*!********************************!*\
  !*** ./typescript/ui/-init.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nodeElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~nodeElements */ "./typescript/~nodeElements.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./~events */ "./typescript/ui/~events.ts");


//import * as $ from 'jquery';
var Ui;
(function (Ui) {
    function init() {
        $("body").layout({
            center: {
                size: "35%",
                spacing_open: 10,
                spacing_closed: 10,
            },
            west: {
                onresize_end: () => {
                    _events__WEBPACK_IMPORTED_MODULE_1__["default"].layoutPaneResize();
                },
                onclose: () => {
                    _events__WEBPACK_IMPORTED_MODULE_1__["default"].layoutPaneResize();
                },
                onopen: () => {
                    _events__WEBPACK_IMPORTED_MODULE_1__["default"].layoutPaneResize();
                },
                // Override as the external typings are incorrect in this case
                size: "30%",
                minSize: "270",
                spacing_open: 10,
                spacing_closed: 10,
                slidable: false,
            },
            east: {
                onresize_end: () => {
                    _events__WEBPACK_IMPORTED_MODULE_1__["default"].schematicPaneResize();
                    _events__WEBPACK_IMPORTED_MODULE_1__["default"].layoutPaneResize();
                },
                onclose: () => {
                    _events__WEBPACK_IMPORTED_MODULE_1__["default"].schematicPaneResize();
                    _events__WEBPACK_IMPORTED_MODULE_1__["default"].layoutPaneResize();
                },
                onopen: () => {
                    _events__WEBPACK_IMPORTED_MODULE_1__["default"].schematicPaneResize();
                    _events__WEBPACK_IMPORTED_MODULE_1__["default"].layoutPaneResize();
                },
                // Override as the external typings are incorrect in this case
                size: "35%",
                minSize: "5%",
                spacing_open: 10,
                spacing_closed: 10,
                slidable: false,
            }
        });
        $("#welcomeAccordion").accordion({
            collapsible: true,
            heightStyle: "content"
        });
        // Control Listeners
        $(document).keydown(e => {
            if (e.ctrlKey) {
                if (e.key === "z") {
                    _events__WEBPACK_IMPORTED_MODULE_1__["default"].undo();
                }
                else if (e.key === "y") {
                    _events__WEBPACK_IMPORTED_MODULE_1__["default"].redo();
                }
            }
        });
        // File listeners
        _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].fileInput.addEventListener('change', e => {
            _events__WEBPACK_IMPORTED_MODULE_1__["default"].fileInput(e);
        });
        _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].fileSave.addEventListener('click', e => {
            _events__WEBPACK_IMPORTED_MODULE_1__["default"].fileSave(e);
        });
        // Schematic Listeners
        _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].schematicEditingEnabled.addEventListener('click', e => {
            const state = _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].schematicEditingEnabled.checked;
            _events__WEBPACK_IMPORTED_MODULE_1__["default"].enableSchematicEditingPress(state);
        });
        // Board Listeners
        _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].makeStripboard.addEventListener('click', e => {
            _events__WEBPACK_IMPORTED_MODULE_1__["default"].makeStripBoardButtonPress();
        });
        _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].makeHalfBreadboard.addEventListener('click', e => {
            _events__WEBPACK_IMPORTED_MODULE_1__["default"].makeBreadBoardSmallButtonPress();
        });
        _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].makeFullBreadboard.addEventListener('click', e => {
            _events__WEBPACK_IMPORTED_MODULE_1__["default"].makeBreadBoardLargeButtonPress();
        });
        _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].boardDraggingEnabled.addEventListener('click', e => {
            const state = _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].boardDraggingEnabled.checked;
            _events__WEBPACK_IMPORTED_MODULE_1__["default"].enableBoardDraggingPress(state);
        });
        // Check listeners
        _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].checkCircuitButton.addEventListener('click', e => {
            _events__WEBPACK_IMPORTED_MODULE_1__["default"].checkCircuit();
        });
    }
    Ui.init = init;
})(Ui || (Ui = {}));
/* harmony default export */ __webpack_exports__["default"] = (Ui);


/***/ }),

/***/ "./typescript/ui/~events.ts":
/*!**********************************!*\
  !*** ./typescript/ui/~events.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nodeElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../~nodeElements */ "./typescript/~nodeElements.ts");
/* harmony import */ var _controlValues__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../~controlValues */ "./typescript/~controlValues.ts");
/* harmony import */ var _active__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../~active */ "./typescript/~active.ts");
/* harmony import */ var _fileIO_load_handleFileInputEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fileIO/load/-handleFileInputEvent */ "./typescript/fileIO/load/-handleFileInputEvent.ts");
/* harmony import */ var _fileIO_save_handleFileSaveEvent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../fileIO/save/-handleFileSaveEvent */ "./typescript/fileIO/save/-handleFileSaveEvent.ts");
/* harmony import */ var _circuit_history__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../circuit/history */ "./typescript/circuit/history.ts");
/* harmony import */ var _circuit_manifest__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../circuit/manifest */ "./typescript/circuit/manifest.ts");
/* harmony import */ var _circuit_component_stripboard_maps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../circuit/component/_stripboard/-maps */ "./typescript/circuit/component/_stripboard/-maps.ts");
/* harmony import */ var _circuit_component_breadboard_maps__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../circuit/component/_breadboard/-maps */ "./typescript/circuit/component/_breadboard/-maps.ts");
/* harmony import */ var _circuit_component_addins_draggable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../circuit/component/addins/draggable */ "./typescript/circuit/component/addins/draggable.ts");










//import * as $ from 'jquery';
var Events;
(function (Events) {
    // Control (explicit)
    function undo() {
        if (_circuit_history__WEBPACK_IMPORTED_MODULE_5__["default"] !== undefined) {
            _circuit_history__WEBPACK_IMPORTED_MODULE_5__["default"].undo();
        }
    }
    Events.undo = undo;
    function redo() {
        if (_circuit_history__WEBPACK_IMPORTED_MODULE_5__["default"] !== undefined) {
            _circuit_history__WEBPACK_IMPORTED_MODULE_5__["default"].redo();
        }
    }
    Events.redo = redo;
    // Controls (implicit)
    function fitDiagramContents(diagram) {
        let rootEl = diagram.root.element.element;
        let group = diagram.group;
        let margin = 3;
        let groupBBox = group.element.getBBox();
        let groupWidth = groupBBox.width + margin * 2;
        let groupHeight = groupBBox.height + margin * 2;
        let scaleX = (groupWidth) ? (rootEl.width.baseVal.value / groupWidth) : 0;
        let scaleY = (groupHeight) ? (rootEl.height.baseVal.value / groupHeight) : 0;
        let scaleMin = Math.min(scaleX, scaleY);
        let offsetX = -groupBBox.x * scaleMin + (rootEl.width.baseVal.value - groupWidth * scaleMin) / 2 + margin;
        let offsetY = (-groupBBox.y * scaleMin) + (rootEl.height.baseVal.value - groupHeight * scaleMin) / 2 + margin;
        let transformString = "translate(" + offsetX + " " + offsetY + ")" + "scale(" + scaleMin + ")";
        group.element.setAttribute('transform', transformString);
    }
    function schematicPaneResize() {
        window.setTimeout(() => {
            fitDiagramContents(_active__WEBPACK_IMPORTED_MODULE_2__["default"].schematic);
        }, 5);
    }
    Events.schematicPaneResize = schematicPaneResize;
    function layoutPaneResize() {
        window.setTimeout(() => {
            fitDiagramContents(_active__WEBPACK_IMPORTED_MODULE_2__["default"].layout);
        }, 5);
    }
    Events.layoutPaneResize = layoutPaneResize;
    // File
    function fileInput(event) {
        Object(_fileIO_load_handleFileInputEvent__WEBPACK_IMPORTED_MODULE_3__["handleFileInputEvent"])(event);
    }
    Events.fileInput = fileInput;
    function fileSave(event) {
        Object(_fileIO_save_handleFileSaveEvent__WEBPACK_IMPORTED_MODULE_4__["default"])(event);
    }
    Events.fileSave = fileSave;
    // Schematic
    function enableSchematicEditingPress(isChecked) {
        _controlValues__WEBPACK_IMPORTED_MODULE_1__["default"].schematicEditingEnabled = isChecked;
    }
    Events.enableSchematicEditingPress = enableSchematicEditingPress;
    // Board
    function addBoard(board) {
        if (_circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].activeBoard !== undefined) {
            _circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].removeComponent(_circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].activeBoard);
            _circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].addComponent(_circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].layout, board);
            _circuit_history__WEBPACK_IMPORTED_MODULE_5__["default"].mergeLast();
        }
        else {
            _circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].addComponent(_circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].layout, board);
        }
        _circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].activeBoard = board;
    }
    function makeStripBoardButtonPress() {
        let rowElement = _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].stripboardRows;
        let columnElement = _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].stripboardColumns;
        let rows = parseInt(rowElement.value);
        let columns = parseInt(columnElement.value);
        if (rows && columns &&
            rows >= parseInt(rowElement.min) && columns >= parseInt(columnElement.min) &&
            rows <= parseInt(rowElement.max) && columns <= parseInt(columnElement.max)) {
            addBoard(_circuit_component_stripboard_maps__WEBPACK_IMPORTED_MODULE_7__["default"].layout.make({
                rows: rows,
                columns: columns
            }));
        }
    }
    Events.makeStripBoardButtonPress = makeStripBoardButtonPress;
    function makeBreadBoardSmallButtonPress() {
        addBoard(_circuit_component_breadboard_maps__WEBPACK_IMPORTED_MODULE_8__["default"].layoutSmall.make({}));
    }
    Events.makeBreadBoardSmallButtonPress = makeBreadBoardSmallButtonPress;
    function makeBreadBoardLargeButtonPress() {
        addBoard(_circuit_component_breadboard_maps__WEBPACK_IMPORTED_MODULE_8__["default"].layoutLarge.make({}));
    }
    Events.makeBreadBoardLargeButtonPress = makeBreadBoardLargeButtonPress;
    function enableBoardDraggingPress(isChecked) {
        _controlValues__WEBPACK_IMPORTED_MODULE_1__["default"].boardDraggingEnabled = isChecked;
        if (_circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].activeBoard !== undefined) {
            if (isChecked) {
                _circuit_component_addins_draggable__WEBPACK_IMPORTED_MODULE_9__["default"].enable(_circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].activeBoard);
            }
            else {
                _circuit_component_addins_draggable__WEBPACK_IMPORTED_MODULE_9__["default"].disable(_circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].activeBoard);
            }
        }
    }
    Events.enableBoardDraggingPress = enableBoardDraggingPress;
    // Check
    function highlightCorrectComponentsPress(isChecked) {
        _controlValues__WEBPACK_IMPORTED_MODULE_1__["default"].highlightCorrectComponents = isChecked;
    }
    Events.highlightCorrectComponentsPress = highlightCorrectComponentsPress;
    function highlightIncorrectComponentsPress(isChecked) {
        _controlValues__WEBPACK_IMPORTED_MODULE_1__["default"].highlightIncorrectComponents = isChecked;
    }
    Events.highlightIncorrectComponentsPress = highlightIncorrectComponentsPress;
    // TODO: Move this
    function checkCircuit() {
        let circuitStatus = _circuit_manifest__WEBPACK_IMPORTED_MODULE_6__["default"].checkAll();
        const highlightCheck = () => {
            if (_controlValues__WEBPACK_IMPORTED_MODULE_1__["default"].highlightIncorrectComponents) {
                circuitStatus.incorrects.forEach(incorrect => {
                    $(incorrect.group.element).find(".highlight").css("stroke", "red");
                    $(incorrect.group.element).find(".highlightwithfill").css("fill", "red");
                    ;
                });
            }
            if (_controlValues__WEBPACK_IMPORTED_MODULE_1__["default"].highlightCorrectComponents) {
                circuitStatus.corrects.forEach(correct => {
                    $(correct.group.element).find(".highlight").css("stroke", "green");
                    $(correct.group.element).find(".highlightwithfill").css("fill", "green");
                    ;
                });
            }
        };
        const clearHighlightCheck = () => {
            if (_controlValues__WEBPACK_IMPORTED_MODULE_1__["default"].highlightIncorrectComponents) {
                circuitStatus.incorrects.forEach(incorrect => {
                    $(incorrect.group.element).find(".highlight").css("stroke", "");
                    $(incorrect.group.element).find(".highlightwithfill").css("fill", "");
                });
            }
            if (_controlValues__WEBPACK_IMPORTED_MODULE_1__["default"].highlightCorrectComponents) {
                circuitStatus.corrects.forEach(correct => {
                    $(correct.group.element).find(".highlight").css("stroke", "");
                    $(correct.group.element).find(".highlightwithfill").css("fill", "");
                    ;
                });
            }
        };
        highlightCheck();
        window.setTimeout(() => {
            clearHighlightCheck();
            window.setTimeout(() => {
                highlightCheck();
                window.setTimeout(() => {
                    clearHighlightCheck();
                    window.setTimeout(() => {
                        highlightCheck();
                        window.setTimeout(() => {
                            clearHighlightCheck();
                        }, 400);
                    }, 200);
                }, 400);
            }, 200);
        }, 400);
        let completion = (circuitStatus.corrects.length / (circuitStatus.corrects.length + circuitStatus.incorrects.length) * 100).toFixed(1);
        _nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].checkStatusText.innerText = "Correct: " + completion + "%";
    }
    Events.checkCircuit = checkCircuit;
})(Events || (Events = {}));
/* harmony default export */ __webpack_exports__["default"] = (Events);


/***/ }),

/***/ "./typescript/utility/-cumulativeSum.ts":
/*!**********************************************!*\
  !*** ./typescript/utility/-cumulativeSum.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cumulativeSum; });
/** Return value in radians */
function cumulativeSum(...values) {
    return values.reduce((acc, value, idx) => acc.concat(value + acc[idx]), [0]).slice(1);
}


/***/ }),

/***/ "./typescript/utility/-deepCopy.ts":
/*!*****************************************!*\
  !*** ./typescript/utility/-deepCopy.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return deepCopy; });
/** Only safe for JSON friendly objects */
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}


/***/ }),

/***/ "./typescript/utility/-degreesToRadians.ts":
/*!*************************************************!*\
  !*** ./typescript/utility/-degreesToRadians.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return degreesToRadians; });
/** Return value in radians */
function degreesToRadians(angle) {
    return angle * Math.PI / 180;
}


/***/ }),

/***/ "./typescript/utility/-getStandardForm.ts":
/*!************************************************!*\
  !*** ./typescript/utility/-getStandardForm.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getStandardForm; });
function getStandardForm(value, unit = "") {
    let exponentialParts = value.toExponential().split("e");
    let coefficient = parseFloat(exponentialParts[0]);
    let exponent = parseInt(exponentialParts[1]);
    for (let i = 0; i < 3; i++) {
        if (exponent in prefixes)
            break;
        coefficient *= 10;
        exponent--;
    }
    const numeric = parseFloat(coefficient.toPrecision(2));
    const prefix = prefixes[exponent] || "";
    return numeric + prefix + unit;
}
const prefixes = {
    '-24': 'y',
    '-21': 'z',
    '-18': 'a',
    '-15': 'f',
    '-12': 'p',
    '-9': 'n',
    '-6': 'µ',
    '-3': 'm',
    '0': '',
    '3': 'k',
    '6': 'M',
    '9': 'G',
    '12': 'T',
    '15': 'P',
    '18': 'E',
    '21': 'Z',
    '24': 'Y'
};


/***/ }),

/***/ "./typescript/utility/-is.ts":
/*!***********************************!*\
  !*** ./typescript/utility/-is.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return is; });
function is(check) {
    return (test) => test === check;
}


/***/ }),

/***/ "./typescript/utility/-isNot.ts":
/*!**************************************!*\
  !*** ./typescript/utility/-isNot.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isNot; });
function isNot(check) {
    return (test) => test !== check;
}


/***/ }),

/***/ "./typescript/utility/-isUnaryMap.ts":
/*!*******************************************!*\
  !*** ./typescript/utility/-isUnaryMap.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isUnaryMap; });
/* harmony import */ var _isNot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-isNot */ "./typescript/utility/-isNot.ts");

/** Tests that for every element in array A there is exactly one corresponding element
 * in array B for which the predicate is true when presented with both elements.
 */
function isUnaryMap(A, B, predicate) {
    const isPredicateMatchForAllA = A.every(elA => {
        let match = B.find(elB => predicate(elA, elB));
        B = B.filter(Object(_isNot__WEBPACK_IMPORTED_MODULE_0__["default"])(match));
        return (match !== undefined);
    });
    const allBMatched = (B.length === 0);
    return (isPredicateMatchForAllA && allBMatched);
}


/***/ }),

/***/ "./typescript/utility/-radiansToDegrees.ts":
/*!*************************************************!*\
  !*** ./typescript/utility/-radiansToDegrees.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return radiansToDegrees; });
/** Return value in Degrees */
function radiansToDegrees(angle) {
    return angle * 180 / Math.PI;
}


/***/ }),

/***/ "./typescript/utility/-split.ts":
/*!**************************************!*\
  !*** ./typescript/utility/-split.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return split; });
/** Splits an array by predicate*/
function split(A, predicate) {
    let passes = [];
    let fails = [];
    A.forEach(elA => {
        if (predicate(elA)) {
            passes.push(elA);
        }
        else {
            fails.push(elA);
        }
    });
    return { passes: passes, fails: fails };
}


/***/ }),

/***/ "./typescript/utility/-testType.ts":
/*!*****************************************!*\
  !*** ./typescript/utility/-testType.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return testType; });
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-is */ "./typescript/utility/-is.ts");

function testType(test) {
    const predicate = ((typeof test === "string")
        ? (v) => typeof v === test
        : (test instanceof Array)
            ? (v) => test.some(Object(_is__WEBPACK_IMPORTED_MODULE_0__["default"])(v))
            : test);
    return predicate;
}


/***/ }),

/***/ "./typescript/utility/-tuple.ts":
/*!**************************************!*\
  !*** ./typescript/utility/-tuple.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return tuple; });
/** Restructures inputs as a Tuple */
function tuple(...args) {
    return args;
}


/***/ }),

/***/ "./typescript/utility/-validateType.ts":
/*!*********************************************!*\
  !*** ./typescript/utility/-validateType.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return validateType; });
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./-is */ "./typescript/utility/-is.ts");

;
function validateType(test, fallback) {
    // Effectively convert all cases into a boolean returning function
    const predicate = ((typeof test === "string")
        ? (v) => typeof v === test
        : (test instanceof Array)
            ? (v) => test.some(Object(_is__WEBPACK_IMPORTED_MODULE_0__["default"])(v))
            : test);
    const validator = (value, log = false) => {
        if (predicate(value)) {
            /*LOGSTART*/ if (log) {
                console.log(`Value '%o' passed test '%o`, value, test);
            } /*LOGEND*/
            return value;
        }
        else {
            /*LOGSTART*/ if (log) {
                console.log(`Validation failure, value '%o' did not pass test '%o',
                fallback '%o' used.`, value, test, fallback);
            } /*LOGEND*/
            return fallback;
        }
    };
    return validator;
}


/***/ }),

/***/ "./typescript/utility/polar/-toVector.ts":
/*!***********************************************!*\
  !*** ./typescript/utility/polar/-toVector.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return toVector; });
/* harmony import */ var _degreesToRadians__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../-degreesToRadians */ "./typescript/utility/-degreesToRadians.ts");

function toVector(radius, angle) {
    const rads = Object(_degreesToRadians__WEBPACK_IMPORTED_MODULE_0__["default"])(angle);
    return {
        x: radius * Math.cos(rads),
        y: radius * Math.sin(rads)
    };
}


/***/ }),

/***/ "./typescript/utility/~curry.ts":
/*!**************************************!*\
  !*** ./typescript/utility/~curry.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Curry;
(function (Curry) {
    function makeOptional(fn) {
        function curried(A, B) {
            if (B !== undefined) {
                return fn(A, B);
            }
            else {
                return (B) => fn(A, B);
            }
        }
        return curried;
    }
    Curry.makeOptional = makeOptional;
})(Curry || (Curry = {}));
/* harmony default export */ __webpack_exports__["default"] = (Curry);


/***/ }),

/***/ "./typescript/utility/~flatten.ts":
/*!****************************************!*\
  !*** ./typescript/utility/~flatten.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var flatten;
(function (flatten) {
    flatten.flatten2d = (array) => [].concat.apply([], array);
    flatten.flatten3d = (array) => flatten.flatten2d(flatten.flatten2d(array));
})(flatten || (flatten = {}));
/* harmony default export */ __webpack_exports__["default"] = (flatten);


/***/ }),

/***/ "./typescript/utility/~insert.ts":
/*!***************************************!*\
  !*** ./typescript/utility/~insert.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//import * as $ from 'jquery';
var Insert;
(function (Insert) {
    function last(element, target) {
        if (element === target || target === undefined) {
            $(element).insertAfter($(element).siblings().last());
        }
        else if ($(target).children().length) {
            $(element).insertAfter($(target).children().last());
        }
        else {
            $(element).appendTo(target);
        }
    }
    Insert.last = last;
    function first(element, target) {
        if (element === target || target === undefined) {
            $(element).insertBefore($(element).siblings().first());
        }
        else if ($(target).children().length) {
            $(element).insertBefore($(target).children().first());
        }
        else {
            $(element).prependTo(target);
        }
    }
    Insert.first = first;
    function before(element, targetOrRef, referenceSelector = "*") {
        let target = (typeof targetOrRef === "string") ? undefined : targetOrRef;
        referenceSelector = (typeof targetOrRef === "string") ? targetOrRef : referenceSelector;
        if (element === target || target === undefined) {
            $(element).insertBefore($(element).siblings(referenceSelector).first());
        }
        else if ($(target).children(referenceSelector).length) {
            $(element).insertBefore($(target).children(referenceSelector).first());
        }
        else {
            $(element).prependTo(target);
        }
    }
    Insert.before = before;
    function after(element, targetOrRef, referenceSelector = "*") {
        let target = (typeof targetOrRef === "string") ? undefined : targetOrRef;
        referenceSelector = (typeof targetOrRef === "string") ? targetOrRef : referenceSelector;
        if (element === target || target === undefined) {
            $(element).insertAfter($(element).siblings(referenceSelector).last());
        }
        else if ($(target).children(referenceSelector).length) {
            $(element).insertAfter($(target).children(referenceSelector).last());
        }
        else {
            $(element).prependTo(target);
        }
    }
    Insert.after = after;
})(Insert || (Insert = {}));
/* harmony default export */ __webpack_exports__["default"] = (Insert);


/***/ }),

/***/ "./typescript/~active.ts":
/*!*******************************!*\
  !*** ./typescript/~active.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nodeElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./~nodeElements */ "./typescript/~nodeElements.ts");
/* harmony import */ var _circuit_diagram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./circuit/+diagram */ "./typescript/circuit/+diagram.ts");


//import * as $ from 'jquery';
var Active;
(function (Active) {
    function init() {
        Active.layout = new _circuit_diagram__WEBPACK_IMPORTED_MODULE_1__["default"](_nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].layoutContainer);
        $(Active.layout.root.group.element).addClass("layout");
        Active.schematic = new _circuit_diagram__WEBPACK_IMPORTED_MODULE_1__["default"](_nodeElements__WEBPACK_IMPORTED_MODULE_0__["default"].schematicContainer);
        $(Active.schematic.root.group.element).addClass("schematic");
    }
    Active.init = init;
})(Active || (Active = {}));
/* harmony default export */ __webpack_exports__["default"] = (Active);


/***/ }),

/***/ "./typescript/~constants.ts":
/*!**********************************!*\
  !*** ./typescript/~constants.ts ***!
  \**********************************/
/*! exports provided: gridSpacing, svgURI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gridSpacing", function() { return gridSpacing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svgURI", function() { return svgURI; });
const gridSpacing = 20;
const svgURI = "http://www.w3.org/2000/svg";


/***/ }),

/***/ "./typescript/~controlValues.ts":
/*!**************************************!*\
  !*** ./typescript/~controlValues.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ControlValues;
(function (ControlValues) {
    // schematic
    ControlValues.schematicEditingEnabled = false;
    // board
    ControlValues.boardDraggingEnabled = false;
    // check
    ControlValues.highlightCorrectComponents = true;
    ControlValues.highlightIncorrectComponents = true;
})(ControlValues || (ControlValues = {}));
/* harmony default export */ __webpack_exports__["default"] = (ControlValues);


/***/ }),

/***/ "./typescript/~nodeElements.ts":
/*!*************************************!*\
  !*** ./typescript/~nodeElements.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//import * as $ from 'jquery';
var NodeElements;
(function (NodeElements) {
    function init() {
        //File
        NodeElements.fileInput = $("input#fileInput")[0];
        NodeElements.fileSave = $("input#fileSave")[0];
        NodeElements.fileStatusText = $("p#fileStatusText")[0];
        //Schematic Editing
        NodeElements.schematicEditingEnabled = $("input#schematicEditingEnabled")[0];
        //Board Control
        NodeElements.stripboardRows = $("input#stripboardRows")[0];
        NodeElements.stripboardColumns = $("input#stripboardColumns")[0];
        NodeElements.makeStripboard = $("input#makeStripboard")[0];
        NodeElements.makeHalfBreadboard = $("input#makeHalfBreadboard")[0];
        NodeElements.makeFullBreadboard = $("input#makeFullBreadboard")[0];
        NodeElements.boardDraggingEnabled = $("input#boardDraggingEnabled")[0];
        //Checking
        NodeElements.checkCircuitButton = $("input#checkCircuitButton")[0];
        NodeElements.checkShowCorrect = $("input#checkShowCorrect")[0];
        NodeElements.checkShowIncorrect = $("input#checkShowIncorrect")[0];
        NodeElements.checkStatusText = $("p#checkStatusText")[0];
        //Svg Containers
        NodeElements.layoutContainer = $("div#layoutContainer")[0];
        NodeElements.schematicContainer = $("div#schematicContainer")[0];
    }
    NodeElements.init = init;
})(NodeElements || (NodeElements = {}));
/* harmony default export */ __webpack_exports__["default"] = (NodeElements);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map