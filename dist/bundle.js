(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';
;(function (window, undefined) {
  
  function Sheetjs() {
    // allow omission of 'new'
    if (!(this instanceof Sheetjs)) { return new Sheetjs(); }
    // one of these globally
    if (Sheetjs.instance) { return Sheetjs.instance; }

    Sheetjs.instance = this;

    this._styleSheet = null;
    this._sheet = null;
    this._rules = null;
  }

  Sheetjs.prototype = {
    // returns a CSSStyleDeclaration object that can be maniuplated with javascript
    createStyle: function (selector) {
      var existing = this.getStyle(selector);
      if (existing) { return existing;}

      var sheet = this._getSheet();
      var rules = this._getRules();
      var nextRuleIndex = rules.length;
      var dummyRule = selector + ' { }';

      // insert dummy rule to generate a CSSStyleDeclaration object as a byproduct
      sheet.insertRule( dummyRule, nextRuleIndex );

      return rules.item( nextRuleIndex ).style;
    },
    deleteStyle: function (selector) {
      var sheet = this._getSheet();
      var deleteRule = sheet.removeRule || sheet.deleteRule;
      var ruleIndex = this._getRuleIndex(selector);
      
      return ruleIndex === -1 ?
        false :
        deleteRule.call(sheet, ruleIndex);
    },
    getStyle: function (selector) {
      var rule = this._getRule(selector);
      return rule ? rule.style : undefined;
    },
    disable: function () {
      this._getSheet().disabled = true; return this;
    },
    enable: function () {
      this._getSheet().disabled = false; return this;
    },
    _getRuleIndex: function (selector) {
      var rules = this._getRules();
      var rule = this._getRule(selector);

      return Array.prototype.indexOf.call(rules, rule);
    },
    _getRule: function (selector) {
      var rules = this._getRules();
      var i = 0;
      var il = rules.length;

      for (; i < il; i++) {
        if (rules[i].selectorText === selector) {
          return rules[i];
        }
      }

      return undefined;
    },
    _getSheet: function() {
      return this._sheet || (function () {
        return this._sheet = this._getStylesheet().sheet;
      }).call(this);
    },
    _getRules: function() {
      return this._rules || (function () {
        var sheet = this._getSheet();
        return this._rules = sheet.cssRules || sheet.rules;  
      }).call(this);
    },
    _getStylesheet: function () {
      return this._styleSheet || (function () {
        var style = document.createElement('style');
        var head = document.head || document.getElementsByTagName('head')[0];
        style.type = 'text/css';
        style.setAttribute('id', 'sheetjs');
        (head).appendChild(style);
        return this._styleSheet = style;
      }).call(this);
    }
  };

  var sheetjs = new Sheetjs();

  // export module -- from lodash
  var objectTypes = { 'function': true, 'object': true };
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global && global.Object && global;
  var freeSelf = objectTypes[typeof self] && self && self.Object && self;
  var freeWindow = objectTypes[typeof window] && window && window.Object && window;
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    root.sheetjs = sheetjs;
    define(function() {
      return sheetjs;
    });
  } else if (freeExports && freeModule) {
    if (moduleExports) {
      (freeModule.exports = sheetjs).sheetjs = sheetjs;
    }
    else {
      freeExports.sheetjs = sheetjs;
    }
  } else {
    root.sheetjs = sheetjs;
  }

})(window);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2hlZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuOyhmdW5jdGlvbiAod2luZG93LCB1bmRlZmluZWQpIHtcbiAgXG4gIGZ1bmN0aW9uIFNoZWV0anMoKSB7XG4gICAgLy8gYWxsb3cgb21pc3Npb24gb2YgJ25ldydcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU2hlZXRqcykpIHsgcmV0dXJuIG5ldyBTaGVldGpzKCk7IH1cbiAgICAvLyBvbmUgb2YgdGhlc2UgZ2xvYmFsbHlcbiAgICBpZiAoU2hlZXRqcy5pbnN0YW5jZSkgeyByZXR1cm4gU2hlZXRqcy5pbnN0YW5jZTsgfVxuXG4gICAgU2hlZXRqcy5pbnN0YW5jZSA9IHRoaXM7XG5cbiAgICB0aGlzLl9zdHlsZVNoZWV0ID0gbnVsbDtcbiAgICB0aGlzLl9zaGVldCA9IG51bGw7XG4gICAgdGhpcy5fcnVsZXMgPSBudWxsO1xuICB9XG5cbiAgU2hlZXRqcy5wcm90b3R5cGUgPSB7XG4gICAgLy8gcmV0dXJucyBhIENTU1N0eWxlRGVjbGFyYXRpb24gb2JqZWN0IHRoYXQgY2FuIGJlIG1hbml1cGxhdGVkIHdpdGggamF2YXNjcmlwdFxuICAgIGNyZWF0ZVN0eWxlOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHZhciBleGlzdGluZyA9IHRoaXMuZ2V0U3R5bGUoc2VsZWN0b3IpO1xuICAgICAgaWYgKGV4aXN0aW5nKSB7IHJldHVybiBleGlzdGluZzt9XG5cbiAgICAgIHZhciBzaGVldCA9IHRoaXMuX2dldFNoZWV0KCk7XG4gICAgICB2YXIgcnVsZXMgPSB0aGlzLl9nZXRSdWxlcygpO1xuICAgICAgdmFyIG5leHRSdWxlSW5kZXggPSBydWxlcy5sZW5ndGg7XG4gICAgICB2YXIgZHVtbXlSdWxlID0gc2VsZWN0b3IgKyAnIHsgfSc7XG5cbiAgICAgIC8vIGluc2VydCBkdW1teSBydWxlIHRvIGdlbmVyYXRlIGEgQ1NTU3R5bGVEZWNsYXJhdGlvbiBvYmplY3QgYXMgYSBieXByb2R1Y3RcbiAgICAgIHNoZWV0Lmluc2VydFJ1bGUoIGR1bW15UnVsZSwgbmV4dFJ1bGVJbmRleCApO1xuXG4gICAgICByZXR1cm4gcnVsZXMuaXRlbSggbmV4dFJ1bGVJbmRleCApLnN0eWxlO1xuICAgIH0sXG4gICAgZGVsZXRlU3R5bGU6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgdmFyIHNoZWV0ID0gdGhpcy5fZ2V0U2hlZXQoKTtcbiAgICAgIHZhciBkZWxldGVSdWxlID0gc2hlZXQucmVtb3ZlUnVsZSB8fCBzaGVldC5kZWxldGVSdWxlO1xuICAgICAgdmFyIHJ1bGVJbmRleCA9IHRoaXMuX2dldFJ1bGVJbmRleChzZWxlY3Rvcik7XG4gICAgICBcbiAgICAgIHJldHVybiBydWxlSW5kZXggPT09IC0xID9cbiAgICAgICAgZmFsc2UgOlxuICAgICAgICBkZWxldGVSdWxlLmNhbGwoc2hlZXQsIHJ1bGVJbmRleCk7XG4gICAgfSxcbiAgICBnZXRTdHlsZTogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICB2YXIgcnVsZSA9IHRoaXMuX2dldFJ1bGUoc2VsZWN0b3IpO1xuICAgICAgcmV0dXJuIHJ1bGUgPyBydWxlLnN0eWxlIDogdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgZGlzYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5fZ2V0U2hlZXQoKS5kaXNhYmxlZCA9IHRydWU7IHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgZW5hYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLl9nZXRTaGVldCgpLmRpc2FibGVkID0gZmFsc2U7IHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgX2dldFJ1bGVJbmRleDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICB2YXIgcnVsZXMgPSB0aGlzLl9nZXRSdWxlcygpO1xuICAgICAgdmFyIHJ1bGUgPSB0aGlzLl9nZXRSdWxlKHNlbGVjdG9yKTtcblxuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwocnVsZXMsIHJ1bGUpO1xuICAgIH0sXG4gICAgX2dldFJ1bGU6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgdmFyIHJ1bGVzID0gdGhpcy5fZ2V0UnVsZXMoKTtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHZhciBpbCA9IHJ1bGVzLmxlbmd0aDtcblxuICAgICAgZm9yICg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIGlmIChydWxlc1tpXS5zZWxlY3RvclRleHQgPT09IHNlbGVjdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIHJ1bGVzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBfZ2V0U2hlZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NoZWV0IHx8IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGVldCA9IHRoaXMuX2dldFN0eWxlc2hlZXQoKS5zaGVldDtcbiAgICAgIH0pLmNhbGwodGhpcyk7XG4gICAgfSxcbiAgICBfZ2V0UnVsZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3J1bGVzIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzaGVldCA9IHRoaXMuX2dldFNoZWV0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9ydWxlcyA9IHNoZWV0LmNzc1J1bGVzIHx8IHNoZWV0LnJ1bGVzOyAgXG4gICAgICB9KS5jYWxsKHRoaXMpO1xuICAgIH0sXG4gICAgX2dldFN0eWxlc2hlZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdHlsZVNoZWV0IHx8IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgc3R5bGUuc2V0QXR0cmlidXRlKCdpZCcsICdzaGVldGpzJyk7XG4gICAgICAgIChoZWFkKS5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZVNoZWV0ID0gc3R5bGU7XG4gICAgICB9KS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgc2hlZXRqcyA9IG5ldyBTaGVldGpzKCk7XG5cbiAgLy8gZXhwb3J0IG1vZHVsZSAtLSBmcm9tIGxvZGFzaFxuICB2YXIgb2JqZWN0VHlwZXMgPSB7ICdmdW5jdGlvbic6IHRydWUsICdvYmplY3QnOiB0cnVlIH07XG4gIHZhciBmcmVlRXhwb3J0cyA9IG9iamVjdFR5cGVzW3R5cGVvZiBleHBvcnRzXSAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG4gIHZhciBmcmVlTW9kdWxlID0gb2JqZWN0VHlwZXNbdHlwZW9mIG1vZHVsZV0gJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuICB2YXIgZnJlZUdsb2JhbCA9IGZyZWVFeHBvcnRzICYmIGZyZWVNb2R1bGUgJiYgdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCAmJiBnbG9iYWw7XG4gIHZhciBmcmVlU2VsZiA9IG9iamVjdFR5cGVzW3R5cGVvZiBzZWxmXSAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ICYmIHNlbGY7XG4gIHZhciBmcmVlV2luZG93ID0gb2JqZWN0VHlwZXNbdHlwZW9mIHdpbmRvd10gJiYgd2luZG93ICYmIHdpbmRvdy5PYmplY3QgJiYgd2luZG93O1xuICB2YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cyAmJiBmcmVlRXhwb3J0cztcbiAgdmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8ICgoZnJlZVdpbmRvdyAhPT0gKHRoaXMgJiYgdGhpcy53aW5kb3cpKSAmJiBmcmVlV2luZG93KSB8fCBmcmVlU2VsZiB8fCB0aGlzO1xuICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcbiAgICByb290LnNoZWV0anMgPSBzaGVldGpzO1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBzaGVldGpzO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmIGZyZWVNb2R1bGUpIHtcbiAgICBpZiAobW9kdWxlRXhwb3J0cykge1xuICAgICAgKGZyZWVNb2R1bGUuZXhwb3J0cyA9IHNoZWV0anMpLnNoZWV0anMgPSBzaGVldGpzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGZyZWVFeHBvcnRzLnNoZWV0anMgPSBzaGVldGpzO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByb290LnNoZWV0anMgPSBzaGVldGpzO1xuICB9XG5cbn0pKHdpbmRvdyk7Il19
