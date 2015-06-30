'use strict';
;(function(window, undefined) {
  
  function Sheetjs() {
    // allow omission of 'new'
    if (!(this instanceof Sheetjs)) { return new Sheetjs(); }
    // one of these globally
    if (Sheetjs.instance) { return Sheetjs.instance; }

    Sheetjs.instance = this;

    this._styleSheet = null;
    this._sheet = null;
    this._rules = null;
    
    // bind context of public methods
    var self = this;
    ['createStyle', 'deleteStyle', 'getStyle', 'disable', 'enable'].forEach(function(method) {
      self[method] = self[method].bind(self);
    });
  }

  Sheetjs.prototype = {
    // returns a CSSStyleDeclaration object that can be maniuplated with javascript
    createStyle: function(selector) {
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
    deleteStyle: function(selector) {
      var sheet = this._getSheet();
      var deleteRule = sheet.removeRule || sheet.deleteRule;
      var ruleIndex = this._getRuleIndex(selector);
      
      return ruleIndex === -1 ?
        false :
        deleteRule.call(sheet, ruleIndex);
    },
    getStyle: function(selector) {
      var rule = this._getRule(selector);
      return rule ? rule.style : undefined;
    },
    disable: function() {
      this._getSheet().disabled = true; return this;
    },
    enable: function() {
      this._getSheet().disabled = false; return this;
    },
    _getRuleIndex: function(selector) {
      var rules = this._getRules();
      var rule = this._getRule(selector);

      return Array.prototype.indexOf.call(rules, rule);
    },
    _getRule: function(selector) {
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
      return this._sheet || (function() {
        return this._sheet = this._getStylesheet().sheet;
      }).call(this);
    },
    _getRules: function() {
      return this._rules || (function() {
        var sheet = this._getSheet();
        return this._rules = sheet.cssRules || sheet.rules;  
      }).call(this);
    },
    _getStylesheet: function() {
      return this._styleSheet || (function() {
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