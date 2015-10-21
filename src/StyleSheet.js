import bindAll from './utils/bindAll';
import selectorsEquivalent from './utils/selectorsEquivalent';

let instanceCount = 0;

export default class StyleSheet {
  _instance = ++instanceCount
  _element = null
  _sheet = null
  _rules = null
  _deleteRuleAtIndex = null

  constructor(stylesBySelector) {
    bindAll(this);

    if (stylesBySelector) {
      this.setStylesForSelectors(stylesBySelector);
    }
  }

  // alias to createStylesForSelector
  stylesForSelector(selector) {
    return this.createStylesForSelector(selector);
  }

  setStylesForSelectors(stylesBySelector) {
    Object.keys(stylesBySelector).forEach(selector =>
      this.setStylesForSelector(selector, stylesBySelector[selector])
    );
    return this;
  }

  setStylesForSelector(selector, styles) {
    Object.assign(this.stylesForSelector(selector), styles);
    return this;
  }

  // returns a CSSStyleDeclaration
  createStylesForSelector(selector) {
    const existing = this.getStylesForSelector(selector);
    if (existing) { return existing; }

    const sheet = this._getSheet();
    const rules = this._getRules();
    const nextRuleIndex = rules.length;
    const ruleText = selector + ' { }';

    // insert ruleText to generate a CSSStyleDeclaration object as a byproduct
    sheet.insertRule(ruleText, nextRuleIndex);

    return rules.item(nextRuleIndex).style;
  }

  getStylesForSelector(selector) {
    const rule = this._getRuleForSelector(selector);
    return rule ? rule.style : undefined;
  }

  deleteStylesForSelector(selector) {
    const deleteRuleAtIndex = this._getDeleteRuleAtIndex();
    let ruleIndex;
    while ((ruleIndex = this._getRuleIndexForSelector(selector)) !== -1) {
      deleteRuleAtIndex(ruleIndex);
    }
  }

  deleteStyles() {
    const deleteRuleAtIndex = this._getDeleteRuleAtIndex();
    let ruleIndex = this._getRules().length;
    while (ruleIndex--) {
      deleteRuleAtIndex(ruleIndex);
    }
  }

  disable() {
    this._getSheet().disabled = true;
    return this;
  }

  enable() {
    this._getSheet().disabled = false;
    return this;
  }

  _getDeleteRuleAtIndex() {
    return this._deleteRuleAtIndex || (function () {
      const sheet = this._getSheet();
      return this._deleteRuleAtIndex = (sheet.removeRule || sheet.deleteRule).bind(sheet);
    }).call(this);
  }

  _getRuleIndexForSelector(selector) {
    return Array.prototype.indexOf.call(
      this._getRules(),
      this._getRuleForSelector(selector)
    );
  }

  _getRuleForSelector(selector) {
    const rules = this._getRules();
    let i = rules.length;
    let rule;

    while (i--) {
      rule = rules[i];
      if (selectorsEquivalent(selector, rule.selectorText)) {
        return rule;
      }
    }
    return undefined;
  }

  _getRules() {
    return this._rules || (function () {
      const sheet = this._getSheet();
      return this._rules = sheet.cssRules || sheet.rules;
    }).call(this);
  }

  _getSheet() {
    return this._sheet || (function () {
      return this._sheet = this._getElement().sheet;
    }).call(this);
  }

  _getElement() {
    return this._element || (function () {
      const styleSheet = document.createElement('style');
      const head = document.head || document.getElementsByTagName('head')[0];
      styleSheet.type = 'text/css';
      styleSheet.setAttribute('id', 'sheetjs-' + this._instance);
      (head).appendChild(styleSheet);
      return this._element = styleSheet;
    }).call(this);
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
